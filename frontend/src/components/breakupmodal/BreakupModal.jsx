import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useWriteContract } from 'wagmi';
import {stakeConfig} from "../../contractABI/stakeConfig.js"
import './breakupModal.css';

// eslint-disable-next-line react/prop-types
const BreakupModal = ({ onClose }) => {
  const {data:hash ,writeContract} = useWriteContract();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isBreakingUp, setIsBreakingUp] = useState(false);
  const navigate = useNavigate();

  const handleBreakup = async () => {
    try {
    if (!isConfirmed) return;
    writeContract({
      ...stakeConfig,
      functionName : 'breakup'
    })
    console.log(hash);
    
    setIsBreakingUp(true);
    setTimeout(() => {
      setIsBreakingUp(false);
      navigate('/breakup');
    }, 2000);
  } catch(err) {
    console.log("Error while Breakup");
    console.log(err);
  }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&times;</button>
        
        <div className="modal-header">
          <div className="icon-container">
            <AlertTriangle className="alert-icon" />
          </div>
          <h2 className='fontfamily'>Are you sure you want to break up?</h2>
          <p className='fontfamily'>This action cannot be undone. All staked ETH will be split and your NFTs will be burned forever.</p>
        </div>

        <div className="modal-body">
          <div className="consequences">
            <h3 className='fontfamily'>Consequences:</h3>
            <ul className='fontfamily'>
              <li>Your staked ETH (2.5 ETH) will be split equally</li>
              <li>All minted NFTs will be permanently burned</li>
              <li>Your relationship status will be terminated</li>
              <li>Your timeline and memories will be archived</li>
            </ul>
          </div>

          <label className="confirmation fontfamily">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            I understand the consequences and wish to proceed with the breakup
          </label>

          <div className="modal-actions">
            <button onClick={onClose} className="cancel-button fontfamily">Cancel</button>
            <button 
              onClick={handleBreakup} 
              disabled={!isConfirmed || isBreakingUp} 
              className={`confirm-button ${!isConfirmed ? 'disabled' : ''} fontfamily`}
            >
              {isBreakingUp ? 'Processing...' : 'Confirm Breakup'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakupModal;
