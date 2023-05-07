import { ContractReceipt, ethers } from "ethers";
import College from "../utils/College.json";
import { showToast } from "../utils/toast";
import { getEthersErrorMessage } from "../utils/errors";
import { Candidate } from "../types/college";

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

export const mintNft = async (
  account: string,
  id: number,
  amount: number,
  data: string
) => {
  try {
    const tx = await contract.mint(account, id, amount, data);
    const receipt: ContractReceipt = await tx.wait();

    if (receipt.status === 1) {
      showToast("success", "Successfully minted NFT!");

      const polygonScanUrl = `https://mumbai.polygonscan.com/tx/${tx.hash}`;
      const openSeaUrl = `https://testnets.opensea.io/assets/mumbai/${contractAddress}/${id}`;

      return { polygonScanUrl, openSeaUrl };
    }
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }

  return null;
};

export const getOwnedNFT = async (account: string) => {
  try {
    const nftId = await contract.getOwnedNFT(account);
    return parseInt(nftId);
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }

  return null;
};

export const burnNFT = async (account: string, id: number) => {
  try {
    const tx = await contract.burn(account, id, 1);
    const receipt: ContractReceipt = await tx.wait();

    if (receipt.status === 1) {
      showToast("success", "Successfully burned NFT!");
      return receipt.status;
    }
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }
};

export const addCandidate = async (
  name: string,
  program: string,
  image_url: string
) => {
  try {
    const tx = await contract.addCandidate(name, program, image_url);
    const receipt: ContractReceipt = await tx.wait();

    if (receipt.status === 1) {
      showToast("success", `Successfully added ${name} as a candidate!`);
      return receipt.status;
    }
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }
};

export const getAllCandidates = async () => {
  try {
    const tx = await contract.getAllCandidates();

    const candidates: Candidate[] = tx.map((candidate: any) => {
      return {
        name: candidate[0],
        program: candidate[1],
        image: candidate[2],
        votes: parseInt(candidate[3].toString()),
      };
    });

    return candidates;
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }
};

export const resetVoting = async () => {
  try {
    const tx = await contract.resetVoting();
    const receipt: ContractReceipt = await tx.wait();

    if (receipt.status === 1) {
      showToast("success", "Voting has been reset!");
    }
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }
};

export const endVoting = async () => {
  try {
    const tx = await contract.endVoting();
    const receipt: ContractReceipt = await tx.wait();

    console.log(tx);

    if (receipt.status === 1) {
      showToast("success", "Voting has ended!");
      return receipt.status;
    }
  } catch (error: unknown) {
    showToast("error", getEthersErrorMessage(error));
  }
};
