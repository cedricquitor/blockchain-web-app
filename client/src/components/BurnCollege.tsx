import { Dispatch, useContext } from "react";
import { burnNFT, testContract } from "../queries/collegeContract";
import { AccountContext } from "../context/AccountContext";
import { CollegeNft } from "../types/college";
import { showToast } from "../utils/toast";

interface CollegesProp {
  college: CollegeNft;
  setOwnedNFT: Dispatch<React.SetStateAction<CollegeNft | null>>;
}

const BurnCollege = (props: CollegesProp) => {
  const { college, setOwnedNFT } = props;

  const { currentAccount } = useContext(AccountContext);

  const handleBurnNft = async () => {
    if (!currentAccount) {
      showToast("error", "Please connect your wallet first.");
      return;
    }

    const status = await burnNFT(currentAccount, college.id);

    if (status) {
      setOwnedNFT(null);
    }
  };

  return (
    <div className="mx-auto grid grid-cols-1 place-items-center md:grid-cols-2 mb-4">
      <div className="w-[512px] h-[512px] bg-black bg-opacity-60 backdrop-blur-xl rounded drop-shadow-2xl flex justify-center items-center">
        <img src={college.image} alt="collegeNft" className="h-[80%]" />
      </div>
      <div>
        <div>
          <h1 className="font-bold text-2xl">{college.name}</h1>
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
          <p className="mt-4">{college.description}.</p>
          <p className="mt-4">
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
            onClick={handleBurnNft}
          >
            Burn {college.symbol} NFT
          </button>
        </div>
      </div>
    </div>
  );
};

interface TraitsProps {
  trait: string;
  value: string;
}

const Traits = (props: TraitsProps) => {
  const { trait, value } = props;

  return (
    <div className="bg-gray-100 bg-opacity-70 border border-gray-400 p-4 w-[250px] rounded-md">
      <h1 className="text-sm text-gray-400 font-bold uppercase text-center">
        {trait}
      </h1>
      <p className="text-center">{value}</p>
    </div>
  );
};

export default BurnCollege;
