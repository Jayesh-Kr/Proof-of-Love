import { Gift, History } from 'lucide-react';
import './gifts.css';
const Gifts = () => {
  // Mock data - in a real app, this would come from blockchain
  const giftHistory = [
    { id: 1, type: "sent", to: "Alice & Bob", amount: "0.5 ETH", date: "Feb 14, 2024" },
    { id: 2, type: "received", from: "Carol & Dave", amount: "0.3 ETH", date: "Jan 1, 2024" }
  ];

  return (
    <div className="gift-container">
      <h1 className="title text-gradient fontfamily">Anniversary Gifts</h1>

      <div className="grid-container">
        <div className="gift-card">
          <h2 className="card-title fontfamily">Send a Gift</h2>
          <div className="form-group">
            <label className='fontfamily'>Recipient Address</label>
            <input type="text" placeholder="0x..." className="input-box fontfamily" />
          </div>
          <div className="form-group">
            <label className='fontfamily'>Amount (ETH)</label>
            <input type="number" placeholder="0.0" step="0.01" className="input-box fontfamily" />
          </div>
          <div className="form-group">
            <label className='fontfamily'>Message</label>
            <textarea placeholder="Write a lovely message..." className="input-box text-area fontfamily"></textarea>
          </div>
          <button className="btn fontfamily">Send Gift</button>
        </div>

        <div className="gift-card">
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
      </div>
    </div>
  );
};

export default Gifts;
