import  { useEffect, useState } from 'react';
import { Timer, Heart, Calendar, AlertTriangle,Banknote} from 'lucide-react';
import BreakupModal from '../../components/breakupmodal/BreakupModal';
import "./dashboard.css";
import WithdrawModal from '../../components/withdrawmodal/WithdrawModal';
import StakeModal from '../../components/stakemodal/StakeModal';
import StakeFormModal from '../../components/stakeform/StakeFormModal';
import { useAccount, useReadContract } from 'wagmi';
import {polNFTConfig} from '../../contractABI/polNFTConfig.js'
import { stakeConfig } from '../../contractABI/stakeConfig';
import axios from 'axios';
const Dashboard = () => {
  const [callFnc,setCallFnc] = useState(false);
  useEffect(()=>{
    setCallFnc(true);
  },[setCallFnc])
  const [showBreakupModal, setShowBreakupModal] = useState(false);
  const [showWithdrawModal , setShowWithdrawModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showMintAnniModal, setShowMintAnniModal] = useState(false);
  const [uriResult, setUriResult] = useState(null);
  const {address} = useAccount();
  const {data:NFTArr,error:NFTERR,isPending:NFT_Pending} = useReadContract({
    ...stakeConfig,
    functionName : 'getAllNFTs',
    query : {
      enabled : callFnc
    }
  });
  if(!NFT_Pending) {
    console.log("NFT number")
    console.log(NFTArr);
  }
  if(NFTERR) {
    console.log("Error while fetching NFT number of the user...")
    console.log(NFTERR);
  }
  
  
  const {data:NFT_Uri,error,isPending} = useReadContract({
    ...polNFTConfig,
    functionName : 'getNFTURI',
    args : [3],
    query : {
      enabled : callFnc
    }
  });
  useEffect(()=>{
    async function getDate() {
      return axios.get(NFT_Uri);
    }
    getDate().then((res)=>{console.log(res.data.name);setUriResult(res.data)}).catch(()=>console.log("error while getting date"));
  },[NFT_Uri])

  if(!isPending)
    console.log(NFT_Uri);
  if(error)
    console.log("Error in getting NFT URI : " , error);
  const {data:stakedAmt , error:stakeError} = useReadContract({
      ...stakeConfig,
      functionName : 'stakedBalance',
      args : [address],
      query : {
        enabled : callFnc
      }
  });
  if(stakeError)
      console.log("Error in get Staked amount : ",stakeError);
  // Mock data - in a real app, this would come from blockchain

  function getDurationSince(dateString) {
    const anniversaryDate = new Date(dateString);
    const currentDate = new Date();

    let years = currentDate.getFullYear() - anniversaryDate.getFullYear();
    let months = currentDate.getMonth() - anniversaryDate.getMonth();
    let days = currentDate.getDate() - anniversaryDate.getDate();

    if (days < 0) {
        months -= 1;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return `${years} years, ${months} months, ${days} days`;
}
const anniversaryDate = uriResult?.attributes?.find(attr => attr.trait_type === "Anniversary")?.value;
const imageURL = uriResult?.image;

// Calculating the duration
  const stakingDuration = getDurationSince(anniversaryDate) || "2 years, 3 months";
  const stakingAmount = stakedAmt !== undefined && stakedAmt !== null 
  ? `${Number(stakedAmt) / 1e18} ETH` 
  : "2.5 ETH";

  let date = new Date(anniversaryDate);
  date.setFullYear(date.getFullYear()+1);
  const nextAnniversary = date.toDateString() || "March 15, 2025";

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title text-gradient">Your Love Dashboard</h1>
        <div className="dashboard_btn">
        <button onClick={() => setShowStakeModal(true)} className="breakup-button">
          <Banknote width={16} height={16} />
          Stake
        </button>
        <button onClick={() => setShowWithdrawModal(true)} className="breakup-button">
          <Banknote width={16} height={16} />
          Withdraw
        </button>
        <button onClick={() => setShowBreakupModal(true)} className="breakup-button">
          <AlertTriangle width={16} height={16} />
          Initiate Breakup
        </button>
        </div>
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
          <p className="card-value" style={{margin:"20px 0"}}>{nextAnniversary}</p>

          <button onClick={() => setShowMintAnniModal(true)} className="text-gradient mint-anni-btn">
          Mint Anniversary NFT
        </button>
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
              <p className="card-text">{anniversaryDate}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cards">
        <h2 className="card-title">Your NFT Gallery</h2> 
        <div className="nft-gallery">
        <div className="nft-card" style={{backgroundImage:`url(${imageURL})`, backgroundSize:"cover"}}> 
              {/* FIX this */}
          </div>
          {[1, 2].map((i) => (
            <div key={i} className="nft-card">
              <Heart width={48} height={48} color="#ec4899" />
            </div>
          ))}
        </div>
      </div>

      {showBreakupModal && <BreakupModal onClose={() => setShowBreakupModal(false)} />}
      {showWithdrawModal && <WithdrawModal onClose={()=>setShowWithdrawModal(false)} />}
      {showStakeModal && <StakeModal onClose={()=>setShowStakeModal(false)} />}
      <StakeFormModal isOpen={showMintAnniModal} onClose={()=>setShowMintAnniModal(false)} title={"Mint your anniversary NFT"} duration={"Anniversary Year"} time={"Enter the year of anniversary"} btnText={"Mint NFT"} coupleName={false}/>
    </div>
  );
};


export default Dashboard;
