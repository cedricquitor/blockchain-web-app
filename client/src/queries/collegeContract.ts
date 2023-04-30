import { ethers } from "ethers";
import College from "../utils/College.json";

interface MintNftParams {
  (account: string, id: number, amount: number, data: string): void;
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const contractAbi = College.abi;
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

console.log("Testing College smart contract...");

export const testContract = async () => {
  try {
    const test = await contract.test();
    console.log("testContract Results: ", test);
  } catch (error) {
    console.error("testContract Error: ", error);
  }
};

export const mintNft: MintNftParams = async (account, id, amount, data) => {
  try {
    const tx = await contract.mint(account, id, amount, data);
    console.log("mintNft Result: ", tx.hash);
  } catch (error) {
    console.error("mintNft Error: ", error);
  }
};
