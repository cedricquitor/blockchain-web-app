import dotenv from "dotenv";

dotenv.config();

let alchemyApiKey: string;
let sepoliaInfuraProjId: string;
let goerliInfuraProjId: string;
let privateKey: string;

if (process.env.ALCHEMY_API_KEY) {
  alchemyApiKey = process.env.ALCHEMY_API_KEY;
} else {
  throw new Error("ALCHEMY_API_KEY environment variable is not set");
}

if (process.env.SEPOLIA_INFURA_PROJECT_ID) {
  sepoliaInfuraProjId = process.env.SEPOLIA_INFURA_PROJECT_ID;
} else {
  throw new Error("INFURA_PROJECT_ID environment variable is not set");
}

if (process.env.GOERLI_INFURA_PROJECT_ID) {
  goerliInfuraProjId = process.env.GOERLI_INFURA_PROJECT_ID;
} else {
  throw new Error("INFURA_PROJECT_ID environment variable is not set");
}

if (process.env.PRIVATE_KEY) {
  privateKey = process.env.PRIVATE_KEY;
} else {
  throw new Error("PRIVATE_KEY environment variable is not set");
}

export const ALCHEMY_API_KEY = alchemyApiKey;
export const SEPOLIA_INFURA_PROJECT_ID = sepoliaInfuraProjId;
export const GOERLI_INFURA_PROJECT_ID = goerliInfuraProjId;
export const PRIVATE_KEY = privateKey;
