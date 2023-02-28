import { createContext, useContext, useState } from "react";
import { type SetStateAction, type Dispatch } from "react";

interface Props {
  children: React.ReactNode;
}

interface TokenContextType {
  remainingTokens: number;
  setRemainingTokens: Dispatch<SetStateAction<number>>;
}

const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children }: Props) => {
  const [remainingTokens, setRemainingTokens] = useState(0);

  return (
    <TokenContext.Provider value={{ remainingTokens, setRemainingTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);

  if (!context) {
    throw new Error(
      "useTokenContext has to be used within <TokenContext.Provider>"
    );
  }

  return context;
};
