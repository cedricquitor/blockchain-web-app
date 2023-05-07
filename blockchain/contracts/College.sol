// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract College is ERC1155, Ownable {
    // Contract Public Name
    string public name = "BOTOmasino";

    // Define some token IDs as constants
    uint256 internal constant CICS = 1;
    uint256 internal constant AMV_COA = 2;
    uint256 internal constant Architecture = 3;
    uint256 internal constant Arts_and_Letters = 4;
    uint256 internal constant Civil_Law = 5;
    uint256 internal constant CBA = 6;
    uint256 internal constant CoE = 7;
    uint256 internal constant FoE = 8;
    uint256 internal constant CFAD = 9;
    uint256 internal constant Medicine_and_Surgery = 10;
    uint256 internal constant Music = 11;
    uint256 internal constant Nursing = 12;
    uint256 internal constant FoP = 13;
    uint256 internal constant IPEA = 14;
    uint256 internal constant CRS = 15;
    uint256 internal constant CoS = 16;
    uint256 internal constant CTHM = 17;

    mapping(address => bool) internal hasMinted;

    // Define the constructor function
    constructor()
        ERC1155(
            "https://my-json-server.typicode.com/cedricquitor/blockchain-web-app/colleges/{id}"
        )
    {
    }

    // Define a function to mint new tokens
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        // Make sure the college id is valid
        require(id >= 1 && id <= 17, "Invalid college id!");

        // Make sure the user has only one NFT
        require(
            hasMinted[account] == false,
            "You've already minted an NFT!"
        );

        // Call the _mint function from the ERC1155 contract
        _mint(account, id, amount, data);
        hasMinted[account] = true;
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
        hasMinted[account] = false;
    }

    // Define a function that check's NFT ownership
    function checkNFTOwnership(address account, uint256 id)
        public
        view
        returns (bool)
    {
        uint256 balance = balanceOf(account, id);
        return (balance > 0);
    }

    // Define a function that returns the ID of the user's owned NFT.
    function getOwnedNFT(address account) public view returns (uint256) {
        for (uint256 i = 1; i <= 17; i++) {
            if (checkNFTOwnership(account, i)) {
                return i;
            }
        }

        return 0;
    }

    function test() public pure returns (string memory) {
        return "Connected to College smart contract!";
    }

    // Define Candidate Struct
    struct Candidate {
        string name;
        string program;
        string imageUrl;
        uint256 voteCount;
	}

    mapping(uint256 => Candidate) internal candidates;
    uint256 internal candidateCount = 0;

    mapping(address => bool) public hasVoted;
    address[] voters;

    // Define a function to add a candidate
    function addCandidate(string memory _name, string memory _program, string memory _imageUrl) public {
        require(msg.sender == owner(), "Only the contract owner can add candidates!");

        candidateCount++;

        candidates[candidateCount] = Candidate({
            name: _name,
            program: _program,
            imageUrl: _imageUrl,
            voteCount: 0
        });
    }

    // Define a function to remove a candidate
    function removeCandidate(uint256 _id) public {
        require(msg.sender == owner(), "Only the contract owner can remove candidates!");
        require(_id > 0 && _id <= candidateCount, "Invalid candidate ID!");

        for (uint256 i = _id; i < candidateCount; i++) {
            candidates[i] = candidates[i + 1];
        }

        candidateCount--;
        delete candidates[candidateCount + 1];
    }

    // Define a function to get all candidates
    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);

        for (uint256 i = 1; i <= candidateCount; i++) {
            allCandidates[i - 1] = candidates[i];
        }

        return allCandidates;
    }

    // Define a function to vote for a candidate
    function voteCandidate(uint256 _id) public {
        require(!hasVoted[msg.sender], "You've already voted!");
        require(hasMinted[msg.sender], "You must have an NFT to vote!");
        require(_id > 0 && _id <= candidateCount, "Invalid candidate ID!");

        candidates[_id].voteCount++;

        hasVoted[msg.sender] = true;
        voters.push(msg.sender);
    }

    // Define a function to reset voting
    function resetVoting() public {
        require(msg.sender == owner(), "Only the contract owner can reset the contrac!");
        // Reset candidates
        for (uint256 i = 1; i <= candidateCount; i++) {
            delete candidates[i];
        }
        candidateCount = 0;

        // Reset voters
        for (uint256 i = 0; i < voters.length; i++) {
            delete hasVoted[voters[i]];
        }
        delete voters;
    }
}
