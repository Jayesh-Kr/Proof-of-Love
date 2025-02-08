import "./navbar.css";
import {Heart,Trophy,BookHeart,Gift,Wallet} from "lucide-react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <div className="nav_part1" onClick={() => navigate('/')}>
          <Heart/>
          <p className="text-gradient">Proof of Love</p>
        </div>
        <div className="nav_part2">
          <div className="nav_part2_elem" onClick={() => navigate('/dashboard')}>
            <Heart/>
            <p>DashBoard</p>
          </div>
          <div className="nav_part2_elem" onClick={()=>navigate('/leaderboard')}>
            <Trophy/>
            <p>LeaderBoard</p>
          </div>
          <div className="nav_part2_elem" onClick={() => navigate('/lovestory')}>
            <BookHeart/>
            <p>Love Stories</p>
          </div>
          <div className="nav_part2_elem" onClick={()=>navigate('/gifts')}>
            <Gift/>
            <p>Gifts</p>
          </div>
        </div>
        <div className="nav_part3">
            <Wallet/>
            <p>Connect Wallet</p>
        </div>
    </nav>
  )
}

export default Navbar