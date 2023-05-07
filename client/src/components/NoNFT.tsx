import { Link } from "react-router-dom";
import empty_img from "../assets/empty_img.svg";

const NoNFT = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-28">
      <img className="w-56 h-56 mb-4" src={empty_img} alt="ethers" />
      <p className="text-xl font-bold mb-4">
        No NFTs yet, you may click the button below to mint an NFT!
      </p>
      <Link to="/mint">
        <button
          type="button"
          className="text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Mint NFT
        </button>
      </Link>
    </div>
  );
};

export default NoNFT;
