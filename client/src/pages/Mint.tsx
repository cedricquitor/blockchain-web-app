import { useEffect, useState } from "react";
import { getAllNftDetail } from "../queries/jsonServer";
import { ToastContainer } from "react-toastify";
import { CollegeNft } from "../types/college";
import Loading from "../components/Loading";
import MintCollege from "../components/MintCollege";

const Mint = () => {
  const [collegeNft, setCollegeNft] = useState<CollegeNft[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCollegeNft = async () => {
    setIsLoading(true);

    const response = await getAllNftDetail();

    setCollegeNft(response);
    setIsLoading(false);

    console.log(response);
  };

  useEffect(() => {
    getCollegeNft();
    console.log(import.meta.env.VITE_TEST_ENV);
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="mt-24 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {isLoading ? (
          <Loading />
        ) : (
          collegeNft &&
          collegeNft.map((college: CollegeNft) => (
            <MintCollege key={college.id} college={college} />
          ))
        )}
      </div>
    </>
  );
};

export default Mint;
