import { Dispatch } from "react";
import { Candidate as CandidateType } from "../types/college";

interface WinnerModalProps {
  winner: CandidateType[] | null;
  setIsWinnerVisible: Dispatch<React.SetStateAction<boolean>>;
}

const WinnerModal = (props: WinnerModalProps) => {
  const { winner, setIsWinnerVisible } = props;

  const handleModalCloseClick = () => {
    setIsWinnerVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Election Winner
            </h3>
            <button
              onClick={handleModalCloseClick}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          {/* Body */}
          <div className="p-6">
            {winner &&
              winner.map((candidate, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    className="rounded-lg mb-3 max-h-72 h-72 object-cover w-full"
                    src={candidate.imageUrl}
                    alt="candidate"
                  />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {candidate.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 italic">
                    {candidate.program}
                  </p>
                  <p className="mb-3 font-normal text-gray-700">
                    Total Votes: {candidate.voteCount}
                  </p>
                </div>
              ))}
          </div>
          {/* Footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              onClick={handleModalCloseClick}
              type="button"
              className="text-white bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
