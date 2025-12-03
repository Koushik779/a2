import { useState } from 'react';
import { Code2 } from 'lucide-react';
import DeveloperForm from './components/DeveloperForm';
import DeveloperList from './components/DeveloperList';
import Toast from './components/Toast';

function App() {
  const [toast, setToast] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleSuccess = (message) => {
    showToast(message, 'success');
    setRefreshKey(prev => prev + 1);
  };

  const handleError = (message) => {
    showToast(message, 'error');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Developer Directory</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage and explore talented developers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <DeveloperForm onSuccess={handleSuccess} onError={handleError} />
          </div>
          <div className="lg:col-span-2">
            <DeveloperList refresh={refreshKey} />
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-4">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
