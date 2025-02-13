// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PolNFT is ERC721URIStorage {
    uint private _tokenIds;
    constructor() ERC721("Proof of Love NFT" , "POL") {}
    
    function mintNFT(address user, string memory tokenURI) public returns (uint) {
        _tokenIds+=1;
         uint newTokenId = _tokenIds;
         _mint(user,newTokenId);
         _setTokenURI(newTokenId,tokenURI);
         return newTokenId;
    }
    function burnNFT(address owner,uint tokenID) public {
        require(ownerOf(tokenID) == owner, "You are not the owner");
        _burn(tokenID);
    }
    function getNFTURI(uint256 tokenID) public view returns (string memory) {
        return tokenURI(tokenID);
    }
}
