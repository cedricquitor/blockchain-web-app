import { useContext, useState } from "react";
import { mintNft, testContract } from "../queries/collegeContract";
import { showToast } from "../utils/toast";
import { AccountContext } from "../context/AccountContext";
import { CollegeNft, Transaction } from "../types/college";
import TransactionModal from "./TransactionModal";
import Traits from "./Traits";

interface CollegesProp {
  college: CollegeNft;
}

const MintCollege = (props: CollegesProp) => {
  const { college } = props;

  const { currentAccount } = useContext(AccountContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transactionHash, setTransactionHash] = useState<Transaction | null>(
    null
  );

  const handleMintNft = async () => {
    if (!currentAccount) {
      showToast("error", "Please connect your wallet first.");
      return;
    }

    const tx = await mintNft(currentAccount, college.id, 1, "0x");

    if (tx) {
      setTransactionHash(tx);
      setIsModalVisible(true);
    }
  };

  const handleCloseModalClick = () => {
    setIsModalVisible(false);
    setTransactionHash(null);
  };

  return (
    <div className="mx-auto grid grid-cols-1 place-items-center md:grid-cols-2 mb-4">
      {isModalVisible && transactionHash && (
        <TransactionModal
          transaction={transactionHash}
          handleCloseModalClick={handleCloseModalClick}
        />
      )}

      <div className="w-11/12 h-11/12 md:w-[512px] md:h-[512px] bg-black bg-opacity-60 backdrop-blur-xl rounded drop-shadow-2xl flex justify-center items-center">
        <img src={college.image} alt="collegeNft" className="p-9 md:p-28" />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-11/12">
          <h1 className="mt-4 md:mt-0 font-bold text-2xl text-justify">
            {college.name}
          </h1>
          <div className="flex items-center space-x-4">
            <h2 className="text-xl text-gray-400">{college.symbol}</h2>
            <button
              type="button"
              className="py-2 px-4 bg-gray-200 rounded-lg text-gray-400 text-xs"
              onClick={testContract}
            >
              View on OpenSea
            </button>
          </div>
          <p className="mt-4 text-justify">{college.description}.</p>
          <p className="mt-4 text-justify">
            With this NFT, you are able to participate in {college.name}
            's local election and the University of Santo Tomas Central Student
            Council (UST CSC) election.
          </p>
          <div className="flex mt-4 gap-x-4">
            {college?.attributes?.map((attribute) => {
              const { trait_type, value } = attribute;
              return (
                <Traits key={trait_type} trait={trait_type} value={value} />
              );
            })}
          </div>
          <button
            type="button"
            className="p-4 bg-yellow-400 rounded-lg mt-4 transition hover:bg-blue hover:text-white"
            onClick={handleMintNft}
          >
            Mint {college.symbol} NFT
          </button>
        </div>
      </div>
    </div>
  );
};

export default MintCollege;
