// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SendGift {
    struct Gift {
        address sender;
        uint timestamp;
        uint amount;
    }
    event SendGiftEvent(address indexed receiver, address indexed sender, uint amount);

    mapping(address => Gift[]) public gift;
    
    function sendGift(address receiver,uint256 amount) public payable{
        require(msg.value > 0 , "Gift cannot be 0");
        gift[receiver].push(Gift(msg.sender,block.timestamp,amount));
        emit SendGiftEvent(receiver, msg.sender, amount);
    }

    function getReceivedGifts() public view returns(Gift[] memory) {
        return gift[msg.sender];
    }

function withdrawGifts(address user) public payable {
    uint totalGifts = 0;

    for (uint i = 0; i < gift[user].length; i++) {
        totalGifts += gift[user][i].amount;
    }

    require(totalGifts > 0, "No gifts to withdraw");

    delete gift[user];
    (bool success, ) = payable(user).call{value: totalGifts}("");
    require(success, "Gift transfer failed");
}

}