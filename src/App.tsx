import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import Installation from './pages/Installation';
import QuickStart from './pages/QuickStart';
import APIOverview from './pages/APIOverview';
import Authentication from './pages/Authentication';
import Errors from './pages/Errors';
import SystemArchitecture from './pages/SystemArchitecture';
import SecurityArchitecture from './pages/SecurityArchitecture';
import { useSearchHotkey } from './hooks/useSearchHotkey';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  useSearchHotkey(() => setSearchOpen(true));

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header onOpenSearch={() => setSearchOpen(true)} />
        <div className="flex">
          <Sidebar />
          <main className="flex-grow p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/getting-started/installation" element={<Installation />} />
              <Route path="/getting-started/quickstart" element={<QuickStart />} />
              <Route path="/api/overview" element={<APIOverview />} />
              <Route path="/api/authentication" element={<Authentication />} />
              <Route path="/api/errors" element={<Errors />} />
              <Route path="/architecture/system" element={<SystemArchitecture />} />
              <Route path="/architecture/security" element={<SecurityArchitecture />} />
            </Routes>
          </main>
        </div>
        <SearchModal onClose={() => setSearchOpen(false)} key={searchOpen ? 'open' : 'closed'} />
      </div>
    </Router>
  );
}
