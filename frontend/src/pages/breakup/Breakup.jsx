import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './breakup.css'; 

const Breakup = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`breakup-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="text-center max-w-lg mx-auto px-4">
        
        <div className="heart-container">
          <Heart className="broken-heart" />
          <div className="heart-crack">
            <div className="crack-line" />
          </div>
        </div>

        <h1 className="breakup-title fontfamily">Sometimes, love needs a new path...</h1>
        
        <p className="breakup-text fontfamily">
          Your staked ETH has been split and returned to both wallets.
          We hope you both find happiness in your new journeys.
        </p>

        <div className="transaction-details fontfamily">
          <p>Transaction completed</p>
          <p>NFTs have been archived</p>
          <p>Redirecting to home page...</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar" />
        </div>
        
      </div>
    </div>
  );
};

export default Breakup;
