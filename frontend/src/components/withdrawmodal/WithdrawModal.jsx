import { AlertTriangle, Heart, X } from "lucide-react";
import { useRef } from "react";
import {useWriteContract} from 'wagmi';
import {parseEther} from 'viem';
// eslint-disable-next-line react/prop-types
const WithdrawModal = ({onClose}) => {
  const {data:hash , writeContract} = useWriteContract();
    const withdrawAmt = useRef(0);
    const handleSubmit = (e) => {
      e.preventDefault();
      const amount = withdrawAmt.current?.value;
      console.log(BigInt(amount));
      console.log(parseEther(amount));
      writeContract({
        address : "contract address",
        abi : 'Contract ABI',
        functionName : 'unStakeEth',
        args : [parseEther(amount)]
      });
      console.log(hash);
      console.log(withdrawAmt.current?.value);
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
        <h2 className="stake-form-title text-gradient">Withdraw some staked amount</h2>
        <AlertTriangle style={{color:"red", margin:"5px 0"}}/>
        <p className="stake-form-subtitle">
          Do not withdraw full staked amount. It will lead to breakup!
        </p>
      </div>
  
      <form onSubmit={handleSubmit} className="stake-form-body" style={{display:"flex",justifyContent:"center",alignItems:"center"}}> 
  
        <div className="stake-form-right">
          <div>
            <label className="stake-form-label">Withdraw Amount (in Eth)</label>
            <input
              type="number"
              min="1"
              className="stake-form-input"
              placeholder="Enter the amount"
              required
              style={{marginBottom:"10px"}}
              ref={withdrawAmt}
            />
          </div>
  
          <button type="submit" className="stake-form-submit-btn">
            <Heart className="stake-form-submit-icon" />
            <span>Withdraw Amount</span>
          </button>
        </div>
      </form>
    </div>
  </div>
    )
  }

  export default WithdrawModal;