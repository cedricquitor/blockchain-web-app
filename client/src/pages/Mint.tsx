import { useEffect, useState } from "react";
import { getAllNftDetail } from "../queries/jsonServer";
import { ToastContainer } from "react-toastify";
import Colleges from "../components/Colleges";
import { CollegeNft } from "../types/college";

const Mint = () => {
  const [collegeNft, setCollegeNft] = useState<CollegeNft[] | null>(null);

  const getCollegeNft = async () => {
    const response = await getAllNftDetail();
    setCollegeNft(response);
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
        {collegeNft &&
          collegeNft.map((college: CollegeNft) => (
            <Colleges key={college.id} college={college} mint />
          ))}
      </div>
    </>
  );
};

export default Mint;
