import dotenv from "dotenv";

dotenv.config();

let alchemyApiKey: string;
let privateKey: string;

if (process.env.ALCHEMY_API_KEY) {
  alchemyApiKey = process.env.ALCHEMY_API_KEY;
} else {
  throw new Error("ALCHEMY_API_KEY environment variable is not set");
}

if (process.env.PRIVATE_KEY) {
  privateKey = process.env.PRIVATE_KEY;
} else {
  throw new Error("PRIVATE_KEY environment variable is not set");
}

export const ALCHEMY_API_KEY = alchemyApiKey;
export const PRIVATE_KEY = privateKey;
