import {
  EthersError,
  getParsedEthersError,
} from "../../node_modules/@enzoferey/ethers-error-parser";

export const getEthersErrorMessage = (error: unknown) => {
  const parsedEthersError = getParsedEthersError(error as EthersError);

  switch (parsedEthersError.errorCode) {
    case "TRANSACTION_RAN_OUT_OF_GAS":
      return parsedEthersError.context ?? "Transaction ran out of gas!";
    case "TRANSACTION_UNDERPRICED":
      return "Transaction underpriced!";
    case "REJECTED_TRANSACTION":
      return "Transaction rejected!";
    case "CALL_REVERTED":
      return parsedEthersError.context ?? "Call reverted!";
    case "EXECUTION_REVERTED":
      return parsedEthersError.context ?? "Execution reverted!";
    case "NONCE_TOO_LOW":
      return parsedEthersError.context ?? "Nonce too low!";
    case "INSUFFICIENT_FUNDS_FOR_GAS":
      return "Insufficient funds for gas!";
    case "MAX_PRIORITY_FEE_PER_GAS_HIGHER_THAN_MAX_FEE_PER_GAS":
      return "Max priority fee per gas higher than max fee per gas!";
    case "MAX_FEE_PER_GAS_LESS_THAN_BLOCK_BASE_FEE":
      return "Max fee per gas less than block base fee!";
    default:
      return "Unknown error occured: " + error;
  }
};
