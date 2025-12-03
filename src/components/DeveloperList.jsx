import { useState, useEffect } from 'react';
import { Users, Search, Filter, Briefcase, Code } from 'lucide-react';

export default function DeveloperList({ refresh }) {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchDevelopers();
  }, [refresh]);

  useEffect(() => {
    filterDevelopers();
  }, [searchTerm, roleFilter, developers]);

  const fetchDevelopers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/developers');
      if (response.ok) {
        const data = await response.json();
        setDevelopers(data);
      }
    } catch (error) {
      console.error('Failed to fetch developers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDevelopers = () => {
    let filtered = [...developers];

    if (roleFilter) {
      filtered = filtered.filter(dev => dev.role === roleFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(dev =>
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredDevelopers(filtered);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Developer Directory</h2>
        <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          {filteredDevelopers.length} {filteredDevelopers.length === 1 ? 'Developer' : 'Developers'}
        </span>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="">All Roles</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full-Stack">Full-Stack</option>
          </select>
          {(searchTerm || roleFilter) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('');
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {filteredDevelopers.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No developers found</p>
          <p className="text-gray-400 text-sm mt-2">
            {developers.length === 0 ? 'Add your first developer to get started' : 'Try adjusting your filters'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((developer) => (
            <div
              key={developer._id}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{developer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{developer.role}</span>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                  {developer.experience} {developer.experience === 1 ? 'year' : 'years'}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Tech Stack</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {developer.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
