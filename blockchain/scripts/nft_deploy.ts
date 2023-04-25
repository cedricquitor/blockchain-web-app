import { ethers } from "hardhat";
import { expect } from "chai";
import { ALCHEMY_API_KEY, PRIVATE_KEY } from "../constants";

const MUMBAI_RPC_URL = `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

// Change to GOERLI_INFURA_PROJECT_ID or SEPOLIA_INFURA_PROJECT_ID depending on deployment
const provider = new ethers.providers.JsonRpcProvider(MUMBAI_RPC_URL);

const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with the account:", deployer.address);

  // Compile the contract
  const CollegeFactory = await ethers.getContractFactory("College", wallet);
  const college = await CollegeFactory.deploy();
  await college.deployed();

  const receipt = await college.deployTransaction.wait();
  const gasUsed = receipt.gasUsed.toString();

  console.log("Contract address college deployed to:", college.address);
  console.log(`View contract on polygonscan: https://mumbai.polygonscan.com/address/${college.address}`);
  console.log(`View collection on OpenSea: https://testnets.opensea.io/assets/mumbai/${college.address}`);
  console.log(`Gas used: ${gasUsed}`);

  // Test the contract
  const CICS = 1;
  const AMV_COA = 2;
  const Architecture = 3;
  const Arts_and_Letters = 4;
  const Civil_Law = 5;
  const CBA = 6;
  const CoE = 7;
  const FoE = 8;
  const CFAD = 9;
  const Medicine_and_Surgery = 10;
  const Music = 11;
  const Nursing = 12;
  const FoP = 13;
  const IPEA = 14;
  const CRS = 15;
  const CoS = 16;
  const CTHM = 17;

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
