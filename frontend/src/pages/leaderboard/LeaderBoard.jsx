import { Search, Heart } from "lucide-react";
import "./leaderboard.css";
import { usePublicClient, useReadContract } from "wagmi";
import { stakeConfig } from "../../contractABI/stakeConfig";
import { useEffect, useState } from "react";
const Leaderboard = () => {
  // const couples = [
  //   { id: 1, names: "Alice & Bob", duration: "5 years", amount: "10 ETH" },
  //   { id: 2, names: "Carol & Dave", duration: "3 years", amount: "8 ETH" },
  //   { id: 3, names: "Eve & Frank", duration: "2 years", amount: "5 ETH" },
  // ];
  const publicClient = usePublicClient();
  const [seconds,setSeconds] = useState(null);
  const {data:users,error,isPending} = useReadContract({
    ...stakeConfig,
    functionName : 'getLeaderboard'
  })
  if(error)
    console.log("Error while getting leaderBoard");

  async function getBlockTimestamp() {
    const block = await publicClient.getBlock();
    return block.timestamp
  }
  useEffect(()=>{
    async function fetchTimestamp() {
      try {
        const timestamp = await getBlockTimestamp();
        setSeconds(timestamp);
      } catch(err) {
        console.log(err);
      }
    }
    fetchTimestamp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  if(!isPending) {
    console.log([...users]);
  }
  // Function to convert second into years,months,days
  function convertSecondsToTime(seconds) {
    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30; 
    const secondsInYear = secondsInDay * 365; 

    const years = Math.floor(seconds / secondsInYear);
    seconds %= secondsInYear;

    const months = Math.floor(seconds / secondsInMonth);
    seconds %= secondsInMonth;

    const days = Math.floor(seconds / secondsInDay);

    return `${years} years, ${months} months, ${days} days`;
}

const formatAddress = (address) => {
  if(!address) return "Connect Wallet";
  return `${address.slice(0,6)}...${address.slice(-4)}`;
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copied to clipboard");
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
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
        {users?.map((couple, index) => (
          <div key={index} className="leaderboard-card">
            <div className="rank-badge fontfamily">#{index + 1}</div>
            <div className="couple-info">
              <h3 className="couple-name fontfamily">{couple.coupleName}</h3>
              <p className="couple-duration fontfamily">Staked for {!isPending ? convertSecondsToTime(Number(seconds)-Number(users[index]?.commitedTime)) : "Loading"}</p>
              <p className="fontfamily" style={{fontWeight:"500",cursor:"pointer"}} onClick={()=>copyToClipboard(couple.user)}>Address : <span className="fontfamily" style={{color:"gray"}}>{formatAddress(couple.user)}</span></p>
            </div>
            <div className="amount-info">
              {/* <p className="amount fontfamily">{couple.amount}</p> */}
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
