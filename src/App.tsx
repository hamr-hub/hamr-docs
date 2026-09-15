import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import AppRoutes from './AppRoutes';
import { useSearchHotkey } from './hooks/useSearchHotkey';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useSearchHotkey(() => setSearchOpen(true));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header
          onOpenSearch={() => setSearchOpen(true)}
          onToggleSidebar={() => setSidebarOpen((open) => !open)}
        />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-grow p-4 md:p-8 min-w-0">
            <AppRoutes />
          </main>
        </div>
        <SearchModal onClose={() => setSearchOpen(false)} key={searchOpen ? 'open' : 'closed'} />
      </div>
    </Router>
  );
}