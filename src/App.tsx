import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Rockets from './pages/Rockets';
import Launches from './pages/Launches';
import News from './pages/News';
import LaunchBases from './pages/LaunchBases';
import Companies from './pages/Companies';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rockets" element={<Rockets />} />
            <Route path="/launches" element={<Launches />} />
            <Route path="/news" element={<News />} />
            <Route path="/bases" element={<LaunchBases />} />
            <Route path="/companies" element={<Companies />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
