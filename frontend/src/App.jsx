import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import LandingPage from './pages/landingPage/LandingPage';
import Breakup from './pages/breakup/Breakup';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/breakup" element={<Breakup />} />
      </Routes>
    </Router>
  );
};

export default App;
