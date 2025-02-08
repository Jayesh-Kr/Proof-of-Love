import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import LandingPage from './pages/landingPage/LandingPage';
import Breakup from './pages/breakup/Breakup';
import Leaderboard from './pages/leaderboard/LeaderBoard';
import LoveStories from './pages/lovestories/LoveStories';
import Gifts from './pages/gifts/Gifts';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className='mt'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/breakup" element={<Breakup />} />
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/lovestory" element={<LoveStories/>}/>
        <Route path='/gifts' element={<Gifts/>}/>
      </Routes>
      </div>
    </Router>
  );
};

export default App;
