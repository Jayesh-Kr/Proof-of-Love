// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PolNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    constructor() ERC721("Proof of Love NFT" , "POL") {}
    
    function mintNFT(address user, string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
         uint newTokenId = _tokenIds.current();
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
