import { Heart, X } from "lucide-react";
import { useRef } from "react";
import { parseEther } from "viem";
import {useWriteContract} from 'wagmi';
import {stakeConfig} from "../../contractABI/stakeConfig.js";

// eslint-disable-next-line react/prop-types
const StakeModal = ({onClose}) => {
  const {data:hash , writeContract} = useWriteContract();
    const stakeAmt = useRef(0);
    const handleSubmit = (e) => {
      try {
      e.preventDefault();
      const eth = stakeAmt.current?.value;
      writeContract({
        ...stakeConfig,
        functionName : 'stake',
        value : parseEther(eth)
      })
      console.log(hash);
      console.log(stakeAmt.current?.value);
    } catch(err) {
      console.log("Error in staking more");
      console.log(err);
    }
    };
    return (
    <div className="stake-form-overlay fontfamily">
    <div className="stake-form-modal">
      <button onClick={onClose} className="stake-form-close-btn">
        <X className="stake-form-icon" />
      </button>
  
      <div className="stake-form-header">
        <div className="stake-form-icon-wrapper">
          <Heart className="stake-form-heart-icon" fill="currentColor" />
        </div>
        <h2 className="stake-form-title text-gradient">Stake More</h2>
        <p className="stake-form-subtitle" style={{margin:"10px 0"}}>
          Stake More! Greater the stake, greater the Love.
        </p>
      </div>
  
      <form onSubmit={handleSubmit} className="stake-form-body" style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
  
        <div className="stake-form-right">
          <div>
            <label className="stake-form-label">Stake Amount (in Eth)</label>
            <input
              type="number"
              min="1"
              className="stake-form-input"
              placeholder="Enter the amount"
              required
              style={{margin:"10px 0"}}
              ref={stakeAmt}
            />
          </div>
  
          <button type="submit" className="stake-form-submit-btn">
            <Heart className="stake-form-submit-icon" />
            <span>Stake</span>
          </button>
        </div>
      </form>
    </div>
  </div>
    )
  }

  export default StakeModal;