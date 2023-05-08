import { Dispatch, FormEvent, useState } from "react";
import { addCandidate } from "../queries/collegeContract";
import { Candidate as CandidateType } from "../types/college";

interface InputModalProps {
  setIsInputFormVisible: Dispatch<React.SetStateAction<boolean>>;
  setCandidates: Dispatch<React.SetStateAction<CandidateType[] | null>>;
}

const InputModal = (props: InputModalProps) => {
  const { setIsInputFormVisible, setCandidates } = props;

  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const status = await addCandidate(name, program, imageUrl);

    if (status) {
      setCandidates((prevCandidates) => {
        const newCandidate: CandidateType = {
          name,
          program,
          imageUrl,
          voteCount: 0,
        };

        return prevCandidates
          ? [...prevCandidates, newCandidate]
          : [newCandidate];
      });

      setIsInputFormVisible(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Add Candidate
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => setIsInputFormVisible(false)}
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
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-6 p-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="ex. Juan Dela Cruz"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Affiliation
                </label>
                <input
                  onChange={(e) => setProgram(e.target.value)}
                  value={program}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="ex. College of Information and Computing Sciences"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Image URL
                </label>
                <input
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="ex. https://i.imgur.com/Q528Lxd.jpg"
                  required
                />
              </div>
            </div>
            {/* Footer */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
              <button
                type="submit"
                className="text-white bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
