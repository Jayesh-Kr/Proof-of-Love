import { Wallet } from "lucide-react";
import "./walletpopup.css";

// eslint-disable-next-line react/prop-types
const WalletPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <Wallet size={32} className="wallet-icon" />
        <h2>Connect Wallet Required</h2>
        <p>Please connect your wallet to access this page</p>
        <button className="close-button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default WalletPopup;