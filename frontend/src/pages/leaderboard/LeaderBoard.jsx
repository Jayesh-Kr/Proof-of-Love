import { Search, Heart } from "lucide-react";
import "./leaderboard.css";

const Leaderboard = () => {
  const couples = [
    { id: 1, names: "Alice & Bob", duration: "5 years", amount: "10 ETH" },
    { id: 2, names: "Carol & Dave", duration: "3 years", amount: "8 ETH" },
    { id: 3, names: "Eve & Frank", duration: "2 years", amount: "5 ETH" },
  ];

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1 className="leaderboard-title text-gradient fontfamily">Love Leaderboard</h1>
        <div className="search-container">
          <input type="text" placeholder="Search couples..." className="search-input fontfamily" />
          <Search className="search-icon" />
        </div>
      </div>

      <div className="leaderboard-list">
        {couples.map((couple, index) => (
          <div key={couple.id} className="leaderboard-card">
            <div className="rank-badge fontfamily">#{index + 1}</div>
            <div className="couple-info">
              <h3 className="couple-name fontfamily">{couple.names}</h3>
              <p className="couple-duration fontfamily">Staked for {couple.duration}</p>
            </div>
            <div className="amount-info">
              <p className="amount fontfamily">{couple.amount}</p>
              <div className="power-score-container">
                <Heart className="heart-icon" fill="currentColor" />
                <span className="power-score fontfamily">Power Score</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
