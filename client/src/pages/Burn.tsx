import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountContext";
import { getOwnedNFT } from "../queries/collegeContract";
import { showToast } from "../utils/toast";
import { ToastContainer } from "react-toastify";
import { CollegeNft } from "../types/college";
import { getNftDetail } from "../queries/jsonServer";
import Colleges from "../components/Colleges";

const Burn = () => {
  const { currentAccount } = useContext(AccountContext);

  const [isLoading, setIsLoading] = useState(false);
  const [ownedNFT, setOwnedNFT] = useState<CollegeNft | null>(null);
  const [ownedId, setOwnedId] = useState<number | null>(null);

  const getUserOwnedNFT = async () => {
    if (currentAccount === null) {
      showToast("error", "Please connect your wallet first.");
      return;
    }

    const response = await getOwnedNFT(currentAccount);
    setOwnedId(response);
  };

  const getUserOwnedNFTData = async () => {
    if (ownedId === null || ownedId === 0) {
      return;
    }

    const response = await getNftDetail(ownedId);
    setOwnedNFT(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      await getUserOwnedNFT();
      await getUserOwnedNFTData();

      setIsLoading(false);
    };

    fetchData();
  }, [currentAccount, ownedId]);

  return (
    <>
      <ToastContainer />
      <div className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {currentAccount === null ? (
          <p>Connect your MetaMask wallet first!</p>
        ) : isLoading ? (
          <p>Fetching data...</p>
        ) : ownedNFT !== null && ownedId !== 0 ? (
          <Colleges college={ownedNFT} mint={false} />
        ) : (
          <p>You don't own any NFTs!</p>
        )}
      </div>
    </>
  );
};

export default Burn;
