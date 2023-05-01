import { Transaction } from "../types/college";

interface TransactionModalProps {
  transaction: Transaction;
  handleCloseModalClick: () => void;
}

const TransactionModal = (props: TransactionModalProps) => {
  const { transaction, handleCloseModalClick } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          {/* Header */}
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">Transaction</h3>
            <button
              onClick={handleCloseModalClick}
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
            <p className="text-md font-bold">Polygon Scan Transaction:</p>
            <a
              href={transaction.polygonScanUrl}
              target="_blank"
              className="hover:underline text-blue-500 break-all"
            >
              {transaction.polygonScanUrl}
            </a>
            <p className="text-md font-bold mt-4">OpenSea Transaction:</p>
            <a
              href={transaction.openSeaUrl}
              target="_blank"
              className="hover:underline text-blue-500 break-all text-ellipsis"
            >
              {transaction.openSeaUrl}
            </a>
          </div>
          {/* Footer */}
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
            <button
              onClick={handleCloseModalClick}
              type="button"
              className="text-white bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
