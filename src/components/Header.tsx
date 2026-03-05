import { Link, useLocation } from 'react-router-dom';
import { Book, Menu, X, Github, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">HamR Docs</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
              <Search className="w-5 h-5" />
              <span className="text-sm">搜索文档</span>
              <kbd className="px-2 py-1 text-xs bg-gray-100 border border-gray-300 rounded">⌘K</kbd>
            </button>
            <a
              href="https://hamr.top"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              开发者门户
            </a>
            <a
              href="https://github.com/hamr-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-primary-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-4">
            <a
              href="https://hamr.top"
              className="block text-gray-600 hover:text-primary-600"
            >
              开发者门户
            </a>
            <a
              href="https://github.com/hamr-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
