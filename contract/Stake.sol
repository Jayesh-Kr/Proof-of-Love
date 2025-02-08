// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PolNFT.sol";
import "./SendGift.sol";
import "./LoveStory.sol";
contract Stake {

    PolNFT public polNFT;
    SendGift public sendGift;
    LoveStory public loveStory;

    event Commited(address indexed user, uint startTime, uint amount, uint nftId);
    event WithDraw(address indexed user, uint amount);
    event Breakup(address indexed user, uint amount);
    event AnniversaryNFTMinted(address indexed user, uint year, uint nftId);
    event NFTBurned(address indexed user, uint nftId);

    mapping(address => uint) public stakedBalance;
    mapping(address => uint) public startTime;
    mapping(address => bool) public isActive;
    mapping(address => uint) public duration;
    mapping(address => uint[]) public userNFTs;
    mapping(address => mapping(uint => bool)) public anniversaryNFTMinted; // Tracks NFT minting per year
    mapping(address => bool) public hasReceivedFirstNFT; // Tracks if user has received first NFT
    mapping(address => uint) public userIndexInLeaderBoard;

    struct RelationShipInfo {
        address user;
        uint commitedTime;
        uint commitedDuration;
    }

    RelationShipInfo[] public leaderBoard;

    constructor(address _polNFTAddress, address _sendGiftAddress,address _loveStoryAddress) {
        polNFT = PolNFT(_polNFTAddress);
        sendGift = SendGift(_sendGiftAddress);
        loveStory = LoveStory(_loveStoryAddress);
    }

    modifier isActiveCheck() {
        require(isActive[msg.sender], "You are not committed");
        _;
    }

    modifier balanceCheck(uint amount) {
        require(stakedBalance[msg.sender] >= amount, "Insufficient balance");
        _;
    }

    modifier isCommited(address receiver) {
        require(isActive[receiver],"User is not commited");
        _;
    }

    function commit(uint _duration, string memory tokenURI) public payable {
        require(msg.value > 0, "Staked Amt must be > 0");
        if(isActive[msg.sender]) {
            stakedBalance[msg.sender] += msg.value;
            return;
        }
        stakedBalance[msg.sender] += msg.value;
        startTime[msg.sender] = block.timestamp;
        isActive[msg.sender] = true;
        duration[msg.sender] = _duration;

        // Mint NFT only if this is the first commitment
        uint nftId = 0;
        if (!hasReceivedFirstNFT[msg.sender]) {
            nftId = polNFT.mintNFT(msg.sender,tokenURI);
            userNFTs[msg.sender].push(nftId);
            hasReceivedFirstNFT[msg.sender] = true;
        }
            userIndexInLeaderBoard[msg.sender] = leaderBoard.length;
            leaderBoard.push(RelationShipInfo(msg.sender, startTime[msg.sender], duration[msg.sender]));

        emit Commited(msg.sender, block.timestamp, msg.value, nftId);
    }

    function unStakeEth(uint amount) public isActiveCheck balanceCheck(amount) {
        require(block.timestamp > startTime[msg.sender] + duration[msg.sender], "You can't withdraw right now");

        if (amount == stakedBalance[msg.sender]) {
            breakup();
            return;
        }

        stakedBalance[msg.sender] -= amount;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Eth transfer failed");
        emit WithDraw(msg.sender, amount);
    }

    function breakup() public isActiveCheck {
        uint balance = stakedBalance[msg.sender];

        burnAllNFTs();
        if (userIndexInLeaderBoard[msg.sender] < leaderBoard.length) {
            uint index = userIndexInLeaderBoard[msg.sender];
            leaderBoard[index] = leaderBoard[leaderBoard.length - 1];
            userIndexInLeaderBoard[leaderBoard[index].user] = index;
            leaderBoard.pop();
            delete userIndexInLeaderBoard[msg.sender];
        }

        delete stakedBalance[msg.sender];
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Eth transfer failed");

        delete isActive[msg.sender];
        delete duration[msg.sender];
        delete startTime[msg.sender];
        delete hasReceivedFirstNFT[msg.sender];

        emit Breakup(msg.sender, balance);
    }

    function mintAnniversaryNFT(uint year, string memory tokenURI) public isActiveCheck {
        require(year > 0, "Year must be greater than 0");
        require(block.timestamp >= startTime[msg.sender] + (year * 365 days), "Anniversary not reached");
        require(!anniversaryNFTMinted[msg.sender][year], "NFT for this year already minted");

        uint nftId = polNFT.mintNFT(msg.sender,tokenURI);
        userNFTs[msg.sender].push(nftId);
        anniversaryNFTMinted[msg.sender][year] = true;

        emit AnniversaryNFTMinted(msg.sender, year, nftId);
    }

    function getAllNFTs() public view returns (uint[] memory) {
        return userNFTs[msg.sender];
    }

    function burnAllNFTs() private {
        uint[] storage nfts = userNFTs[msg.sender];

        for (uint i = 0; i < nfts.length; i++) {
            polNFT.burnNFT(msg.sender,nfts[i]);
            emit NFTBurned(msg.sender, nfts[i]);
        }

        delete userNFTs[msg.sender]; 
        require(userNFTs[msg.sender].length == 0,"userNFTs length should be zero");
    }

    function getLeaderboard() public view returns (RelationShipInfo[] memory) {
        uint len = leaderBoard.length;
        RelationShipInfo[] memory sorted = new RelationShipInfo[](len);

        
        for (uint i = 0; i < len; i++) {
            sorted[i] = leaderBoard[i];
            sorted[i].commitedDuration = block.timestamp - sorted[i].commitedTime;
        }

        // Sort in descending
        for (uint i = 0; i < len; i++) {
            for (uint j = i + 1; j < len; j++) {
                if (sorted[i].commitedDuration < sorted[j].commitedDuration) {
                    RelationShipInfo memory temp = sorted[i];
                    sorted[i] = sorted[j];
                    sorted[j] = temp;
                }
            }
        }

        return sorted;
    }

    function sendGiftToUser(address receiver) public payable isCommited(receiver) {
        sendGift.sendGift{value : msg.value}(receiver,msg.sender,msg.value);
    }
    function claimGifts() public payable isActiveCheck {
        sendGift.withdrawGifts(msg.sender);
    }
    function createLovePost(string memory _hashofPost) public isActiveCheck{
        loveStory.createPost(_hashofPost, msg.sender);
    }
}
