import "./navbar.css";
import {Heart,Trophy,BookHeart,Gift,Wallet} from "lucide-react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {useConnect,useAccount,useDisconnect} from 'wagmi';
const Navbar = () => {
  const [showDropdown,setShowDropdown] = useState(false);
  const [connected,setConnected] = useState(false);
  const navigate = useNavigate();
  const {address} = useAccount();
  const {disconnect} = useDisconnect();
  const {connect,connectors} = useConnect();

  const handleConnectorClick = (connector) => {
    console.log(connector);
    connect({connector});
    setConnected(true);
    setShowDropdown(false);
  }

  const formatAddress = (address) => {
    if(!address) return "Connect Wallet";
    return `${address.slice(0,6)}...${address.slice(-4)}`;
  }

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
        <div className="nav_part3_container">
          <div className="nav_part3" onClick={()=>setShowDropdown(!showDropdown)}>
              <Wallet/>
              <p>{formatAddress(address)}</p>
          </div>
          {
            showDropdown && (!connected) && (
              <div className="wallet-dropdown">
                {connectors.map((connector)=>(
                  <div key={connector.id} onClick={()=>handleConnectorClick(connector)} className="wallet-option">
                    <p>{connector.name}</p>
                  </div>
                ))}
              </div>
            )
          }
          {
            showDropdown && connected && (
              <div className="wallet-dropdown">
                <div className="wallet-option fontfamily" onClick={()=>{disconnect(); setConnected(false);setShowDropdown(!showDropdown)}}>Disconnect</div>
              </div>
            )
          }
        </div>
    </nav>
  )
}

export default Navbar