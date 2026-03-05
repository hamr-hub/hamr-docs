import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import QuickStart from './pages/QuickStart';
import APIOverview from './pages/APIOverview';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-grow p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/getting-started/quickstart" element={<QuickStart />} />
              <Route path="/api/overview" element={<APIOverview />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
