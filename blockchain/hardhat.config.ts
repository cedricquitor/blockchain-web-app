import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
    goerli: {
      url: "https://goerli.infura.io/v3/4b65da1fb2be4e45aaf60782c5a305f8",
      accounts: ["95d37e1c6710bda12a11b749ea7f30c68b1aeaf7f49bc19e518e4e31bc2c5eb7"],
      gasPrice: 20000000000, // 20 gwei
    },
  },
};

export default config;
