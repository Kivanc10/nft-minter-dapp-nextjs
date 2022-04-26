// SPDX-License-Identifier: Unlicense
//pragma solidity >= 0.7.2;
//pragma solidity ^0.8.4;
pragma solidity <= 0.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DogNftDemo is ERC721 {
    address payable my_addr = 0xbE8D4707B4D9b7A87DE9bAc74A9Fa583ca04BfC1;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; //--
    //---
    using SafeMath for uint256;
    string[] public tokenURIsMinted;
    mapping(string => bool) _tokenUriExists;
    // Contract global variables.
    uint256 public constant mintPrice = 30000000000000000; // 0.03 ETH.
    uint256 public constant maxMint = 3;
    uint256 public MAX_TOKENS = 10;

      bool public saleIsActive = true;
      bool public presaleIsActive = true;

    // Name token using inherited ERC721 constructor.
    constructor() public ERC721("DogNftDemo", "DOGNFT") {
       _setBaseURI("https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/");
    }
    

    // The main token minting function (recieves Ether).
    function mint(
        uint256 numberOfTokens,
        address recipient,
        string memory tokenUri
    ) public payable returns (uint256) {
        // uint256 newItemId = _tokenIds.current();
        // string memory tempToken = "";
        // if(newItemId == 0) {tempToken = "https://gateway.pinata.cloud/ipfs/QmbUmggBrbBPPv18gKaBX7xeXM8Vh4qJt3dYvn8eWmjYTH/0.json";}
        // else {
        //     tempToken = string(abi.encodePacked(baseURI(),uintToString(newItemId)));
        //     tempToken = string(abi.encodePacked(tempToken,".json"));
        // }
        
        require(saleIsActive, "Sale must be active to mint Token");

        require(!_tokenUriExists[tokenUri],"This nft is minted already");   
        // Number of tokens can't be 0.
        require(numberOfTokens != 0, "You need to mint at least 1 token");
        // Check that the number of tokens requested doesn't exceed the max. allowed.
        require(
            numberOfTokens <= maxMint,
            "You can only mint 3 tokens at a time"
        );
        // Check that the number of tokens requested wouldn't exceed what's left.
        require(
            totalSupply().add(numberOfTokens) <= MAX_TOKENS,
            "Minting would exceed max. supply"
        );
        // Check that the right amount of Ether was sent.
        require(
            mintPrice.mul(numberOfTokens) <= msg.value,
            "Not enough Ether sent."
        );

        // For each token requested, mint one.
        for (uint256 i = 0; i < numberOfTokens; i++) {
            uint256 mintIndex = totalSupply();
            if (mintIndex < MAX_TOKENS) {
                uint256 newItemId = _tokenIds.current();
                _mint(recipient, newItemId);                
                _setTokenURI(newItemId, tokenUri);   
                _tokenIds.increment();
                tokenURIsMinted.push(string(abi.encodePacked(baseURI(),tokenUri)));     
                _tokenUriExists[tokenUri] = true;
                withdrawMoneyTo(my_addr);
            }
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function uintToString(uint256 v) internal pure returns (string memory str) {
        uint256 maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint256 i = 0;
        while (v != 0) {
            uint256 remainder = v % 10;
            v = v / 10;
            reversed[i++] = bytes1(uint8(48 + remainder));
        }
        bytes memory s = new bytes(i);
        for (uint256 j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    function toggleSaleState() external {
        saleIsActive = !saleIsActive;
      }
    
    function togglePresaleState() external {
        presaleIsActive = !presaleIsActive;
      }   

    function withdrawMoneyTo(address payable _to) public {
        _to.transfer(getBalance());
    }    


}
