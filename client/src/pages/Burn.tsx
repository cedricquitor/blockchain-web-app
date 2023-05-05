import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { getOwnedNFT } from "../queries/collegeContract";
import { showToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { CollegeNft } from "../types/college";
import { getNftDetail } from "../queries/jsonServer";
import ConnectWallet from "../components/ConnectWallet";
import NoNFT from "../components/NoNFT";
import Loading from "../components/Loading";
import BurnCollege from "../components/BurnCollege";

const Burn = () => {
  const { currentAccount } = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(false);
  const [ownedNFT, setOwnedNFT] = useState<CollegeNft | null>(null);
  const [ownedId, setOwnedId] = useState<number | null>(null);

  const fetchOwnedNFTData = async () => {
    setIsLoading(true);

    if (!currentAccount) {
      showToast("error", "Please connect your wallet first.");
      return;
    }

    const response = await getOwnedNFT(currentAccount);
    setOwnedId(response);

    if (response) {
      const nftData = await getNftDetail(response);
      setOwnedNFT(nftData);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchOwnedNFTData();
  }, [currentAccount]);

  return (
    <>
      <ToastContainer />
      <div className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {!currentAccount ? (
          <ConnectWallet />
        ) : isLoading ? (
          <Loading />
        ) : ownedNFT && ownedId ? (
          <BurnCollege college={ownedNFT} setOwnedNFT={setOwnedNFT} />
        ) : (
          <NoNFT />
        )}
      </div>
    </>
  );
};

export default Burn;
