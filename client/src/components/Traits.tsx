interface TraitsProps {
  trait: string;
  value: string;
}

const Traits = (props: TraitsProps) => {
  const { trait, value } = props;
  return (
    <div className="bg-gray-100 bg-opacity-70 border border-gray-400 p-4 w-[250px] rounded-md">
      <h1 className="text-sm text-gray-400 font-bold uppercase text-center">
        {trait}
      </h1>
      <p className="text-center">{value}</p>
    </div>
  );
};

export default Traits;
