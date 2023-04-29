import { Link } from "react-router-dom";

interface NavlinkProps {
  to: string;
  text: string;
}

const Navlink = (props: NavlinkProps) => {
  const { to, text } = props;

  return (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 mx-2">
      <li>
        <Link
          to={to}
          className="block py-2 pl-3 pr-4 text-black md:text-blue-700 md:p-0 transition hover:text-white"
        >
          {text}
        </Link>
      </li>
    </ul>
  );
};

export default Navlink;
