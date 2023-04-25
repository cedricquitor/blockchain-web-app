# 💎 blockchain-web-app
This project has two applications:
- [blockchain](#polygon-app-solidity-hardhat-ethers---blockchain)
- [client](#react-app---client)

## Installation
To clone the repository:

Navigate to the directory where you plan to clone the project in.
```bash
git clone https://github.com/cedricquitor/blockchain-web-app.git
```

## Polygon App (Solidity, Hardhat, Ethers) - blockchain
### Environment Variables
- ALCHEMY_API_KEY: Contact collaborators or [@cedricquitor](https://github.com/cedricquitor/blockchain-web-app)
- PRIVATE_KEY: Click [here](#how-to-get-your-metamask-private-key) for instructions on how to get your private key

### How to deploy the smart contract in Polygon Mumbai testnet
1. Navigate to blockchain
```bash
cd blockchain
```
2. Run the nft_deploy script using Hardhat
```bash
npx hardhat run scripts/nft_deploy.ts --network mumbai
```

### How to get your MetaMask private key

## React App - client
### Environment Variables
- None so far

### How to setup local dev environment
1. Navigate to client
```bash
cd client
```
2. Install dependencies
```bash
npm install
```
3. Run local dev server script
```bash
npm dev
```
