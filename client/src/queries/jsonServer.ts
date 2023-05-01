export const getNftDetail = async (id: number) => {
  const response = await fetch(
    `https://my-json-server.typicode.com/cedricquitor/blockchain-web-app/colleges/${id}`
  );

  const data = response.json();

  return data;
};

export const getAllNftDetail = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/cedricquitor/blockchain-web-app/colleges/"
  );

  const data = response.json();

  return data;
};
