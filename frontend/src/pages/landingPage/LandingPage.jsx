import FloatingHeart from "../../components/floatingheart/FloatingHeart";
import LandingPageCard from "../../components/landingpage_card/LandingPageCard";
import "./landingpage.css";
import {ArrowRight,Heart,Gift,Trophy} from "lucide-react";
import StakeFormModal from "../../components/stakeform/StakeFormModal";
import { useState } from "react";
const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className="header">
      <FloatingHeart/>
        <h1 className="text-gradient landingpage-text">Immortalize Your Love on the<br/>Blockchain</h1>
        <p className="landingpage-text header_p">Stake your love with ETH, mint beautiful NFT memories, and join a community of eternal <br/>romantics. Because true love deserves to be forever.</p>
        <div className="landingpage_btns" onClick={()=>setIsModalOpen(true)}>
            <div className="landing_btn">
                <p>Start Your Love Journey</p>
                <ArrowRight/>
            </div>
            <p className="landing_btn2">Learn More</p>
        </div>
        <div className="cards_section">
          <LandingPageCard Logo={Heart} title={"Stake Your Love"} description={"Lock ETH together as a symbol of your commitment"}/>
          <LandingPageCard Logo={Gift} title={"Mint Memories"} description={"Create unique NFTs for your special moments"}/>
          <LandingPageCard Logo={Trophy} title={"Earn Rewards"} description={"Get rewarded for your lasting commitment"}/>
        </div>
        <StakeFormModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} title={"Stake your love and create a beautiful NFT memory"} duration={"Duration of Stake (in months)"} time={"Enter duration in months"} btnText={"Stake Your Love"} coupleName={true} />
    </header>
  )
}

export default LandingPage