# 💎 blockchain-web-app
This project has two applications:
- [blockchain](#polygon-app-solidity-hardhat-ethers---blockchain)
- [client](#react-app---client)

This project is still a work in progress, click [here](#todos) to view the list of TODO's

## TODO's
### blockchain TODO's
- None

### client TODO's
Candidate.tsx
- Add remove candidate button and connect it to the smart contract.
- Hide the remove candidate button for non-admins.

Vote.tsx
- Show a modal that displays the winner(s) of the election.
- Call resetVoting() after displaying the winner(s) of the election.


## Installation
To clone the repository:

Navigate to the directory where you plan to clone the project in.
```bash
git clone https://github.com/cedricquitor/blockchain-web-app.git
```

### Setup blockchain's Environment Variables
1. Create a .env file in blockchain/
2. Click [here](#environment-variables) for Environment Variables setup instructions

### Setup client's Environment Variables
1. Create a .env file in client/
2. Click [here](#environment-variables-1) for Environment Variables setup instructions

## Polygon App (Solidity, Hardhat, Ethers) - blockchain
### Environment Variables
- ALCHEMY_API_KEY: Contact collaborators or [@cedricquitor](https://github.com/cedricquitor/blockchain-web-app)
- PRIVATE_KEY: Click [here](#how-to-get-your-metamask-private-key) for instructions on how to get your private key

### How to deploy the smart contract in localhost
1. Navigate to blockchain
```bash
cd blockchain
```
2. Start a local node
```bash
npx hardhat node
```
3. Open a new terminal and run the nft_deploy script using Hardhat
```bash
npm run deploy:localhost
```

### How to deploy the smart contract in Polygon Mumbai testnet
1. Navigate to blockchain
```bash
cd blockchain
```
2. Run the nft_deploy script using Hardhat
```bash
npm run deploy:mumbai
```

### How to get your MetaMask private key
1. Head to your MetaMask account
2. Click the kebab menu (three dots) on the furthest right
3. Click Account details
![image](https://user-images.githubusercontent.com/89262762/234272783-6885406e-298e-4e48-8fbd-5cbfce74e9cf.png)
4. Click Export private key
5. Type in your MetaMask password
6. Copy your private key (red text)
7. Paste it in your .env file and name it PRIVATE_KEY

**Note**: Make sure you're in Polygon's Mumbai Testnet ([*How to add Mumbai Testnet*](#how-to-add-polygons-mumbai-testnet))

### How to add Polygon's Mumbai Testnet
1. Head to your MetaMask browser extension
2. Click your current network
![image](https://user-images.githubusercontent.com/89262762/234273391-1ba72845-f6ce-4114-8b69-0dd8641bd9e0.png)
3. Click Add network
4. On the bottom part of the page, click Add a network manually
![image](https://user-images.githubusercontent.com/89262762/234273639-cbf63f5d-c944-451e-9cfa-10bf8a7484c0.png)
5. Fill the form with the following details:

| Syntax             | Description                        |
|--------------------|------------------------------------|
| Network Name       | Mumbai Testnet                     |
| New RPC URL        | https://rpc-mumbai.maticvigil.com/ |
| Chain ID           | 80001                              |
| Currency Symbol    | MATIC                              |
| Block Explorer URL | https://polygonscan.com/           |

## React App - client
### Environment Variables
- VITE_ALCHEMY_RPC_PROVIDER: Contact collaborators or [@cedricquitor](https://github.com/cedricquitor/blockchain-web-app)
- VITE_CONTRACT_ADDRESS: Deploy the smart contract in Polygon Mumbai testnet ([*How to deploy the smart contract in Polygon Mumbai testnet*](#how-to-deploy-the-smart-contract-in-polygon-mumbai-testnet)) and copy and paste the contract address in your .env file.

***Note**: Don't forget to replace the contract address if you redeploy your smart contract!*

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
npm run dev
```
