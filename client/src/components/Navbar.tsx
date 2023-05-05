import { useContext } from "react";
import { AccountContext } from "../context/AccountContext";
import UstLogo from "../assets/ust_logo.svg";
import Navlink from "./Navlink";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentAccount, setCurrentAccount } = useContext(AccountContext);

  const ethereum = window.ethereum;

  const connectToWallet = async () => {
    console.log(currentAccount);
    try {
      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts?.[0]) {
        setCurrentAccount(accounts[0]);
      }

      ethereum?.on("accountsChanged", (...accounts: string[]) => {
        if (accounts?.[0].length > 0) {
          setCurrentAccount(accounts[0].toString());
        } else {
          setCurrentAccount(null);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-yellow-400 low fixed w-full z-20 top-0 left-0 border-b border-gray-200 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="cursor-pointer">
          <div className="flex items-center">
            <img src={UstLogo} className="h-8 mr-3" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              BOTO
            </span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              masino
            </span>
          </div>
        </Link>
        <div className="flex md:order-2">
          <button
            onClick={connectToWallet}
            type="button"
            className="bg-black text-white inline-flex items-center font-medium justify-center px-4 py-2 text-sm rounded-lg cursor-pointer transition hover:bg-white hover:text-black"
          >
            {!currentAccount
              ? "Connect Wallet"
              : `Address: ${currentAccount.substring(
                  0,
                  4
                )}...${currentAccount.substring(currentAccount.length - 4)}`}
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <Navlink to="/" text="Home" />
          <Navlink to="/" text="About" />
          <Navlink to="/mint" text="Mint" />
          <Navlink to="/burn" text="Burn" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
