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
