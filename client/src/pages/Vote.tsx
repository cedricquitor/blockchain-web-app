import { ToastContainer } from "react-toastify";
import {
  addCandidate,
  endVoting,
  getAllCandidates,
  getContractOwnerAddress,
  resetVoting,
} from "../queries/collegeContract";
import { useContext, useEffect, useState } from "react";
import { Candidate as CandidateType } from "../types/college";
import Candidate from "../components/Candidate";
import { AccountContext } from "../context/AccountContext";
import { showToast } from "../utils/toast";
import ConnectWallet from "../components/ConnectWallet";

const Vote = () => {
  const [candidates, setCandidates] = useState<CandidateType[] | null>(null);
  const [contractOwner, setContractOwner] = useState<string | null>(null);

  const { currentAccount } = useContext(AccountContext);

  const handleAddCandidateClick = async (
    name: string,
    program: string,
    imageUrl: string
  ) => {
    const status = await addCandidate(name, program, imageUrl);

    if (status) {
      setCandidates((prevCandidates) => {
        const newCandidate: CandidateType = {
          name,
          program,
          imageUrl,
          votes: 0,
        };

        return prevCandidates
          ? [...prevCandidates, newCandidate]
          : [newCandidate];
      });
    }
  };

  const fetchAllCandidates = async () => {
    const candidates = await getAllCandidates();

    if (candidates) {
      setCandidates(candidates);
    }
  };

  const fetchContractOwnerAddress = async () => {
    const contractOwnerAddress = await getContractOwnerAddress();

    setContractOwner(contractOwnerAddress);
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

    // TODO: Show election winner
  };

  useEffect(() => {
    if (currentAccount) {
      fetchAllCandidates();
      fetchContractOwnerAddress();
    }
  }, [currentAccount]);

  return (
    <>
      <ToastContainer />
      <div className="mt-24 max-w-screen-xl flex flex-col flex-wrap justify-between mx-auto">
        {currentAccount ? (
          contractOwner && currentAccount === contractOwner ? (
            <>
              <h2 className="mx-4 text-2xl font-extrabold md:mx-0">Actions</h2>
              <p className="text-justify mx-4 mb-2 text-md text-gray-500 md:mx-0">
                Here is a list of the available admin actions for the voting
                page. Please note that this section is only visible to you as an
                administrator, and not to other users.
              </p>
              <div className="mx-4 flex gap-2 md:mx-0">
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
            </>
          ) : null
        ) : (
          <ConnectWallet />
        )}

        {candidates && (
          <>
            <h2 className="mx-4 text-2xl font-extrabold md:mx-0">Candidates</h2>
            <p className="text-justify mx-4 mb-2 text-md text-gray-500 md:mx-0">
              Here is the list of candidates for the current election. To be
              eligible to vote, you must own an NFT. Also, please note that you
              can only vote for one person.
            </p>
            <div className="flex flex-wrap justify-center mb-4 md:justify-evenly">
              {candidates.map((candidate, index) => (
                <Candidate key={index} id={index} candidate={candidate} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Vote;
