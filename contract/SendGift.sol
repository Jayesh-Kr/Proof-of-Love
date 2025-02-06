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
    
    function sendGift(address receiver) public payable{
        require(msg.value > 0 , "Gift cannot be 0");
        gift[receiver].push(Gift(msg.sender,block.timestamp,msg.value));
        emit SendGiftEvent(receiver, msg.sender, msg.value);
    }

    function getReceivedGifts() public view returns(Gift[] memory) {
        return gift[msg.sender];
    }

    function withdrawGifts() public {
    uint totalGifts = 0;

    for (uint i = 0; i < gift[msg.sender].length; i++) {
        totalGifts += gift[msg.sender][i].amount;
    }

    require(totalGifts > 0, "No gifts to withdraw");

    delete gift[msg.sender];
    (bool success, ) = payable(msg.sender).call{value: totalGifts}("");
    require(success, "Gift transfer failed");
}

}