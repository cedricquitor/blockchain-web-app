import { ToastContainer } from "react-toastify";
import {
  addCandidate,
  endVoting,
  getAllCandidates,
  resetVoting,
} from "../queries/collegeContract";
import { useEffect, useState } from "react";
import { Candidate as CandidateType } from "../types/college";
import Candidate from "../components/Candidate";

const Vote = () => {
  const [candidates, setCandidates] = useState<CandidateType[] | null>(null);

  const handleAddCandidateClick = async (
    name: string,
    program: string,
    image_url: string
  ) => {
    const status = await addCandidate(name, program, image_url);

    if (status) {
      setCandidates((prevCandidates) => {
        const newCandidate: CandidateType = {
          name,
          program,
          image: image_url,
          votes: 0,
        };

        return prevCandidates
          ? [...prevCandidates, newCandidate]
          : [newCandidate];
      });
    }
  };

  const handleGetAllCandidatesClick = async () => {
    const candidates = await getAllCandidates();

    if (candidates) {
      setCandidates(candidates);
    }
  };

  const handleResetVotingClick = async () => {
    await resetVoting();
    setCandidates(null);
  };

  const handleEndVotingClick = async () => {
    const status = await endVoting();

    if (status) {
      setCandidates(null);
    }
  };

  useEffect(() => {
    handleGetAllCandidatesClick();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="mt-24 max-w-screen-xl flex flex-col flex-wrap justify-between mx-auto">
        <div className="flex gap-2">
          {/* TODO: Hide buttons if address != contract deployer address */}
          {/* TODO: Input form for add candidate */}
          <button
            type="button"
            className="mb-4 bg-black text-white inline-flex items-center font-medium justify-center px-4 py-2 text-sm rounded-lg cursor-pointer transition hover:bg-yellow-400 hover:text-black"
            onClick={() =>
              handleAddCandidateClick(
                "Jane Doe",
                "CICS",
                "https://this-person-does-not-exist.com/img/avatar-gen11792fc8282653a19763e6e736e8b2c8.jpg"
              )
            }
          >
            Add Candidate
          </button>
          <button
            type="button"
            className="mb-4 bg-black text-white inline-flex items-center font-medium justify-center px-4 py-2 text-sm rounded-lg cursor-pointer transition hover:bg-yellow-400 hover:text-black"
            onClick={handleResetVotingClick}
          >
            Reset Voting
          </button>

          <button
            type="button"
            className="mb-4 bg-black text-white inline-flex items-center font-medium justify-center px-4 py-2 text-sm rounded-lg cursor-pointer transition hover:bg-yellow-400 hover:text-black"
            onClick={handleEndVotingClick}
          >
            End Voting
          </button>
        </div>

        <div className="flex flex-wrap justify-center">
          {candidates &&
            candidates.map((candidate, index) => (
              <Candidate key={index} id={index} candidate={candidate} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Vote;
