import { useEffect, useState, useContext } from "react";
import { getNftDetail } from "../queries/jsonServer";
import { mintNft, testContract } from "../queries/collegeContract";
import { AccountContext } from "../context/AccountContext";
import { ToastContainer } from "react-toastify";
import { showToast } from "../utils/toast";

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
      <p>{value}</p>
    </div>
  );
};

const Mint = () => {
  interface CollegeNft {
    id: number;
    name: string;
    symbol: string;
    image: string;
    description: string;
    attributes: Attribute[];
  }

  interface Attribute {
    trait_type: string;
    value: string;
  }

  const [allNft, setAllNft] = useState([]);
  const [collegeNft, setCollegeNft] = useState<Partial<CollegeNft>>({});

  const { currentAccount } = useContext(AccountContext);

  const getCollegeNft = async () => {
    const response = await getNftDetail(6);
    setCollegeNft(response);
    console.log(response);
  };

  const handleMintNft = async () => {
    if (currentAccount === null) {
      showToast("error", "Please connect your wallet first.");
      return;
    }

    mintNft(currentAccount, 6, 1, "0x");
  };

  useEffect(() => {
    getCollegeNft();
    console.log(import.meta.env.VITE_TEST_ENV);
  }, []);

  return (
    <div className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <ToastContainer />

      {/* College NFT Mint */}
      <div className="mx-auto grid grid-cols-1 place-items-center md:grid-cols-2">
        <div className="w-[512px] h-[512px] bg-black bg-opacity-60 backdrop-blur-xl rounded drop-shadow-2xl flex justify-center items-center">
          {collegeNft ? (
            <img src={collegeNft.image} alt="collegeNft" className="h-[80%]" />
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ust-voting-blockchain-web-app.appspot.com/o/College-of-Information-and-Computing-Sciences.png?alt=media&token=df218686-54f9-4095-9cf9-5f09e9d4b7c8"
              alt="collegeNft"
              className="h-[80%]"
            />
          )}
        </div>
        <div>
          {/* TODO: Add a loader while fetching NFT available for mint.  */}
          {collegeNft ? (
            <div>
              <h1 className="font-bold text-2xl">{collegeNft.name}</h1>
              <div className="flex items-center space-x-4">
                <h2 className="text-xl text-gray-400">{collegeNft.symbol}</h2>
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-200 rounded-lg text-gray-400 text-xs"
                  onClick={testContract}
                >
                  View on OpenSea
                </button>
              </div>
              <p className="mt-4">{collegeNft.description}.</p>
              <p className="mt-4">
                With this NFT, you are able to participate in {collegeNft.name}
                's local election and the University of Santo Tomas Central
                Student Council (UST CSC) election.
              </p>
              <div className="flex mt-4 gap-x-4">
                {collegeNft?.attributes?.map((attribute) => {
                  const { trait_type, value } = attribute;
                  return (
                    <Traits key={trait_type} trait={trait_type} value={value} />
                  );
                })}
              </div>
              <button
                type="button"
                className="p-4 bg-yellow rounded-lg mt-4 transition hover:bg-blue hover:text-white"
                onClick={handleMintNft}
              >
                Mint {collegeNft.symbol} NFT
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Mint;
