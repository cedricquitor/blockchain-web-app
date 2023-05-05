import ether_img from "../assets/ether_img.svg";

const ConnectWallet = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-28">
      <img className="w-56 h-56 mb-4" src={ether_img} alt="ethers" />
      <p className="text-xl font-bold">Please connect your MetaMask wallet!</p>
    </div>
  );
};

export default ConnectWallet;
