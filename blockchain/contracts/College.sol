// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract College is ERC1155, Ownable {
    // Define some token IDs as constants
    uint256 public constant CICS = 1;
    uint256 public constant AMV_COA = 2;
    uint256 public constant Architecture = 3;
    uint256 public constant Arts_and_Letters = 4;
    uint256 public constant Civil_Law = 5;
    uint256 public constant CBA = 6;
    uint256 public constant CoE = 7;
    uint256 public constant FoE = 8;
    uint256 public constant CFAD = 9;
    uint256 public constant Medicine_and_Surgery = 10;
    uint256 public constant Music = 11;
    uint256 public constant Nursing = 12;
    uint256 public constant FoP = 13;
    uint256 public constant IPEA = 14;
    uint256 public constant CRS = 15;
    uint256 public constant CoS = 16;
    uint256 public constant CTHM = 17;

    // Define the constructor function
    constructor()
        ERC1155(
            "https://my-json-server.typicode.com/cedricquitor/blockchain-web-app/colleges/{id}"
        )
    {
        // Mint some tokens and assign them to the contract deployer
        // Test Minting: Make sure to only mint one in production
        _mint(msg.sender, CICS, 1, "");
        _mint(msg.sender, AMV_COA, 1, "");
        _mint(msg.sender, Architecture, 1, "");
        _mint(msg.sender, Arts_and_Letters, 1, "");
        _mint(msg.sender, Civil_Law, 1, "");
        _mint(msg.sender, CBA, 1, "");
        _mint(msg.sender, CoE, 1, "");
        _mint(msg.sender, FoE, 1, "");
        _mint(msg.sender, CFAD, 1, "");
        _mint(msg.sender, Medicine_and_Surgery, 1, "");
        _mint(msg.sender, Music, 1, "");
        _mint(msg.sender, Nursing, 1, "");
        _mint(msg.sender, FoP, 1, "");
        _mint(msg.sender, IPEA, 1, "");
        _mint(msg.sender, CRS, 1, "");
        _mint(msg.sender, CoS, 1, "");
        _mint(msg.sender, CTHM, 1, "");
    }

    // Define a function to mint new tokens
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        // Call the _mint function from the ERC1155 contract
        _mint(account, id, amount, data);
    }

    // Define a function to burn tokens
    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public {
        // Make sure the caller is the account that owns the tokens
        require(msg.sender == account);

        // Call the _burn function from the ERC1155 contract
        _burn(account, id, amount);
    }
}
