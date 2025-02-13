import { Gift, History } from 'lucide-react';
import './gifts.css';
import { useRef } from 'react';
import {useReadContract, useWriteContract} from 'wagmi';
import {stakeConfig} from "../../contractABI/stakeConfig.js";
import {sendgiftConfig} from "../../contractABI/sendgiftConfig.js"
import { parseEther } from 'viem';
const Gifts = () => {
  // Mock data - in a real app, this would come from blockchain
  const giftHistory = [
    { id: 1, type: "sent", to: "Alice & Bob", amount: "0.5 ETH", date: "Feb 14, 2024" },
    { id: 2, type: "received", from: "Carol & Dave", amount: "0.3 ETH", date: "Jan 1, 2024" }
  ];
  const {data : hash, writeContract,error,isPending:sendPending} = useWriteContract();
  const {data : hash2, writeContract:claimwriteContract,error:error2} = useWriteContract();
  const addressRef = useRef("");
  const amtRef = useRef(0);

  const {data:receivedGifts,isPending} = useReadContract({
    ...sendgiftConfig,
    functionName : 'getReceivedGifts',
  })
if(!isPending) 
    console.log([...receivedGifts]);

  const handleSendGift = () =>{
      const address = addressRef.current.value;
      const amount = amtRef.current.value;
      writeContract({
        ...stakeConfig,
        functionName : 'sendGiftToUser',
        args : [address],
        value : parseEther(amount+""),
      })
      addressRef.current.value = "";
      amtRef.current.value = null;
    }
    if(!sendPending)
    console.log(hash);
  const handleClaimGift = () =>{
    claimwriteContract({
      ...stakeConfig,
      functionName : 'claimGifts'
    })
    console.log(hash2);
  }
  if(error2) {
    console.log("Error while claiming the gift");
    console.log(error2);
  }
  if(error) {
    console.log("error while sending the gift");
    console.log(error);
  }

  return (
    <div className="gift-container">
      <h1 className="title text-gradient fontfamily">Anniversary Gifts</h1>

      <div className="grid-container">
        <div className="gift-card">
          <h2 className="card-title fontfamily">Send a Gift</h2>
          <div className="form-group">
            <label className='fontfamily'>Recipient Address</label>
            <input type="text" placeholder="0x..." className="input-box fontfamily" ref={addressRef} />
          </div>
          <div className="form-group">
            <label className='fontfamily'>Amount (ETH)</label>
            <input type="number" placeholder="0.0" step="0.01" className="input-box fontfamily" ref={amtRef} />
          </div>
          <div className="form-group">
            <label className='fontfamily'>Message</label>
            <textarea placeholder="Write a lovely message..." className="input-box text-area fontfamily"></textarea>
          </div>
          <button className="btn fontfamily" onClick={handleSendGift}>Send Gift</button>
        </div>

        <div className="gift-card" id="gift_send">
          <div>
          <div className="history-header">
            <h2 className="card-title fontfamily">Gift History</h2>
            <History className="history-icon" />
          </div>
          <div className="history-list">
            {giftHistory.map((gift) => (
              <div key={gift.id} className="history-item">
                <div className="icon-box">
                  <Gift className="gift-icon" />
                </div>
                <div className="history-text">
                  <p className="history-description fontfamily">
                    {gift.type === 'sent' ? `Sent to ${gift.to}` : `Received from ${gift.from}`}
                  </p>
                  <p className="history-date fontfamily">{gift.date}</p>
                </div>
                <p className="history-amount fontfamily">{gift.amount}</p>
              </div>
            ))}
          </div>
          </div>
          <button className='btn fontfamily' onClick={handleClaimGift}>Claim All Gift</button>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
