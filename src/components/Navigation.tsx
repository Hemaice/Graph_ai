import { Link, useLocation } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              HandwritingAI
            </span>
          </Link>

          <div className="flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/about')
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link
              to="/predict"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/predict')
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg'
              }`}
            >
              Analyze Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
