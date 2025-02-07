import FloatingHeart from "../../components/floatingheart/FloatingHeart";
import LandingPageCard from "../../components/landingpage_card/LandingPageCard";
import "./landingpage.css";
import {ArrowRight,Heart,Gift,Trophy} from "lucide-react";
const LandingPage = () => {
  return (
    <header className="header">
      <FloatingHeart/>
        <h1 className="text-gradient landingpage-text">Immortalize Your Love on the<br/>Blockchain</h1>
        <p className="landingpage-text header_p">Stake your love with ETH, mint beautiful NFT memories, and join a community of eternal <br/>romantics. Because true love deserves to be forever.</p>
        <div className="landingpage_btns">
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
    </header>
  )
}

export default LandingPage