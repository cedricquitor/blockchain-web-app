import { Candidate } from "../types/college";

interface CandidateProps {
  id: number;
  candidate: Candidate;
}

const Candidate = (props: CandidateProps) => {
  const { id, candidate } = props;

  // TODO: Add remove candidate button + functionality
  // TODO: Hide remove button if address != contract deployer address

  // TODO: Connect vote button to smart contract
  const handleVoteClick = async () => {
    console.log("TODO: Connect vote button to smart contract - " + id);
  };

  return (
    <div className="w-11/12 bg-white border border-gray-200 rounded-lg shadow md:max-w-[18rem] mb-4 md:m-2">
      <img
        className="rounded-t-lg max-h-72 object-cover w-full"
        src={candidate.imageUrl}
        alt="candidate"
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {candidate.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{candidate.program}</p>
        <button
          onClick={handleVoteClick}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300"
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default Candidate;
