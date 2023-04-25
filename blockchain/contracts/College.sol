// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract College is ERC1155, Ownable {
    // Define some token IDs as constants
    uint256 public constant CICS = 1;
    uint256 public constant AMV_COA = 2;

    // Define the constructor function
    constructor()
        ERC1155(
            "https://my-json-server.typicode.com/cedricquitor/blockchain-web-app/colleges/{id}"
        )
    {
        // Mint some tokens and assign them to the contract deployer
        _mint(msg.sender, CICS, 1, "");
        _mint(msg.sender, AMV_COA, 1, "");
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
