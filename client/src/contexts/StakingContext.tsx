import React, { createContext, PropsWithChildren } from "react";
import { useContractRead, useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants/contract";

type StakingContextType = {
  stakingToken: string;
};

export const StakingContext = createContext<StakingContextType | null>(null);

export const StakingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const { address } = useAccount();

  const { data: stakingToken } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "token",
  });

  const value = {
    stakingToken,
  };

  return <StakingContext.Provider value={value}>{children}</StakingContext.Provider>;
};
