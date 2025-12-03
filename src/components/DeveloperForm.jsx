import { useState } from 'react';
import { UserPlus } from 'lucide-react';

export default function DeveloperForm({ onSuccess, onError }) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    techStack: '',
    experience: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (formData.experience < 0) {
      newErrors.experience = 'Experience cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/developers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess('Developer added successfully!');
        setFormData({
          name: '',
          role: '',
          techStack: '',
          experience: ''
        });
        setErrors({});
      } else {
        onError(data.error || 'Failed to add developer');
      }
    } catch (error) {
      onError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Add Developer</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter developer name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a role</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <div>
          <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-2">
            Tech Stack
          </label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.techStack ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="React, Node.js, MongoDB (comma-separated)"
          />
          {errors.techStack && <p className="text-red-500 text-sm mt-1">{errors.techStack}</p>}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Experience (years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            min="0"
            step="0.5"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter years of experience"
          />
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Developer'}
        </button>
      </form>
    </div>
  );
}
