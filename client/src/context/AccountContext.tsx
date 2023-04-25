import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface AccountContextType {
  currentAccount: string | null;
  setCurrentAccount: Dispatch<SetStateAction<string | null>>;
}

export const AccountContext = createContext<AccountContextType>({
  currentAccount: null,
  setCurrentAccount: () => undefined,
});

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  return (
    <AccountContext.Provider value={{ currentAccount, setCurrentAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
