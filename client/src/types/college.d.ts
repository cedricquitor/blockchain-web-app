export interface CollegeNft {
  id: number;
  name: string;
  symbol: string;
  image: string;
  description: string;
  attributes: Attribute[];
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export interface Transaction {
  polygonScanUrl: string;
  openSeaUrl: string;
}

export interface Candidate {
  name: string;
  program: string;
  image: string;
  votes: number;
}
