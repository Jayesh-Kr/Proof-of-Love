import  { useState } from 'react';
import { Timer, Heart, Calendar, AlertTriangle } from 'lucide-react';
import BreakupModal from '../../components/breakupmodal/BreakupModal';
import "./dashboard.css";

const Dashboard = () => {
  const [showBreakupModal, setShowBreakupModal] = useState(false);

  // Mock data - in a real app, this would come from blockchain
  const stakingDuration = "2 years, 3 months";
  const stakingAmount = "2.5 ETH";
  const nextAnniversary = "March 15, 2025";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title text-gradient">Your Love Dashboard</h1>
        <button onClick={() => setShowBreakupModal(true)} className="breakup-button">
          <AlertTriangle width={16} height={16} />
          Initiate Breakup
        </button>
      </div>

      <div className="grid-container">
        <div className="cards">
          <div className="card-header">
            <h2 className="card-title">Staking Status</h2>
            <Timer width={24} height={24} color="#ec4899" />
          </div>
          <div>
            <p className="card-text">Time Staked</p>
            <p className="card-value">{stakingDuration}</p>
          </div>
          <div>
            <p className="card-text">Amount Staked</p>
            <p className="card-value">{stakingAmount}</p>
          </div>
        </div>

        <div className="cards">
          <div className="card-header">
            <h2 className="card-title">Next Milestone</h2>
            <Calendar width={24} height={24} color="#ec4899" />
          </div>
          <p className="card-text">Next Anniversary NFT Mint</p>
          <p className="card-value">{nextAnniversary}</p>
        </div>
      </div>

      <div className="cards timeline">
        <h2 className="card-title">Relationship Timeline</h2>
        {[1, 2, 3].map((i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-icon">
              <Heart width={16} height={16} color="#ec4899" />
            </div>
            <div>
              <p className="timeline-text">First Year Anniversary NFT Minted</p>
              <p className="card-text">March 15, 2024</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cards">
        <h2 className="card-title">Your NFT Gallery</h2>
        <div className="nft-gallery">
          {[1, 2, 3].map((i) => (
            <div key={i} className="nft-card">
              <Heart width={48} height={48} color="#ec4899" />
            </div>
          ))}
        </div>
      </div>

      {showBreakupModal && <BreakupModal onClose={() => setShowBreakupModal(false)} />}
    </div>
  );
};

export default Dashboard;
