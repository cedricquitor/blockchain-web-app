import { ethers } from "ethers";
import College from "../utils/College.json";

interface MintNftParams {
  account: string;
  id: number;
  amount: number;
}

const provider = new ethers.JsonRpcProvider(
  import.meta.env.VITE_ALCHEMY_RPC_PROVIDER
);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractAbi = College.abi;
const contract = new ethers.Contract(contractAddress, contractAbi, provider);
console.log("Testing College smart contract...");

export const testContract = async () => {
  try {
    const test = await contract.test();
    console.log("testContract Results: ", test);
  } catch (error) {
    console.error("testContract Error: ", error);
  }
};

export const mintNft = async (params: MintNftParams) => {
  const { account, id, amount } = params;
  try {
    const mint = await contract.mint(account, id, amount);
    console.log("mintNft Result: ", mint);
  } catch (error) {
    console.error("mintNft Error: ", error);
  }
};
