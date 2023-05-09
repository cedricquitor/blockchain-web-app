import { Dispatch, useState } from "react";
import { removeCandidate, voteCandidate } from "../queries/collegeContract";
import { Candidate as CandidateType } from "../types/college";
import remove_icon from "../assets/remove_icon.svg";

interface CandidateProps {
  id: number;
  candidate: CandidateType;
  candidates: CandidateType[] | null;
  setCandidates: Dispatch<React.SetStateAction<CandidateType[] | null>>;
}

const Candidate = (props: CandidateProps) => {
  const { id, candidate, candidates, setCandidates } = props;

  const [voteCount, setVoteCount] = useState(candidate.voteCount);

  // TODO: Hide remove button if address != contract deployer address
  const handleRemoveCandidateClick = async (_id: number) => {
    const status = await removeCandidate(_id + 1);

    if (status && candidates) {
      setCandidates(candidates.filter((_, index) => index !== _id));
    }
  };

  const handleVoteClick = async (id: number) => {
    const status = await voteCandidate(id);

    if (status) {
      setVoteCount(voteCount + 1);
    }
  };

  return (
    <div className="flex flex-col w-11/12 max-h-[30rem] border border-gray-200 rounded-lg shadow md:max-w-[18rem] mb-4 md:m-2">
      <img
        className="rounded-t-lg max-h-72 h-72 object-cover w-full"
        src={candidate.imageUrl}
        alt="candidate"
      />
      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {candidate.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 italic">
          {candidate.program}
        </p>
        <p className="mb-3 font-normal text-gray-700">Votes: {voteCount}</p>
        <div className="flex justify-between">
          <button
            onClick={() => handleVoteClick(id + 1)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300"
          >
            Vote
          </button>
          <button onClick={() => handleRemoveCandidateClick(id)}>
            <img src={remove_icon} className="h-6 w-6" alt="remove" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
