import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ALCHEMY_API_KEY, GOERLI_INFURA_PROJECT_ID, PRIVATE_KEY, SEPOLIA_INFURA_PROJECT_ID } from "./constants";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_INFURA_PROJECT_ID,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: SEPOLIA_INFURA_PROJECT_ID,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
