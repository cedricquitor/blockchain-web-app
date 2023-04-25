import { ethers } from "hardhat";
import { expect } from "chai";

const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/4b65da1fb2be4e45aaf60782c5a305f8");

const wallet = new ethers.Wallet("95d37e1c6710bda12a11b749ea7f30c68b1aeaf7f49bc19e518e4e31bc2c5eb7", provider);

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Compile the contract
  const CollegeFactory = await ethers.getContractFactory("College", wallet);
  const college = await CollegeFactory.deploy();
  await college.deployed();

  console.log("Contract address college deployed to:", college.address);

  // Test the contract
  const CICS = 1;
  const AMV_COA = 2;

  expect(await college.balanceOf(deployer.address, CICS)).to.equal(1);
  expect(await college.balanceOf(deployer.address, AMV_COA)).to.equal(1);

  console.log("All tests passed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
