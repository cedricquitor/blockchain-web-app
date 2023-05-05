import loading_img from "../assets/loading_img.svg";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-28">
      <img className="w-56 h-56 mb-4" src={loading_img} alt="ethers" />
      <p className="text-xl font-bold">Fetching data, please wait!</p>
    </div>
  );
};

export default Loading;
