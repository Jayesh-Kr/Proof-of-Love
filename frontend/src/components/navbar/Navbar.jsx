import "./navbar.css";
import {Heart,Trophy,BookHeart,Gift,Wallet} from "lucide-react";
const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="nav_part1">
          <Heart/>
          <p className="text-gradient">Proof of Love</p>
        </div>
        <div className="nav_part2">
          <div className="nav_part2_elem">
            <Heart/>
            <p>DashBoard</p>
          </div>
          <div className="nav_part2_elem">
            <Trophy/>
            <p>LeaderBoard</p>
          </div>
          <div className="nav_part2_elem">
            <BookHeart/>
            <p>Love Stories</p>
          </div>
          <div className="nav_part2_elem">
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