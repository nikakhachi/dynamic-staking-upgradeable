import React, { createContext, PropsWithChildren, useEffect } from "react";
import { useContractRead, useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS, ERC20_ABI } from "../constants/contract";
import { bigNumberToNumber, bigNumberToString } from "../utils";
import { BigNumberish } from "ethers";
import { FormattedStakerInfoType, RawStakerInfoType } from "../types";

type StakingContextType = {
  stakingToken: string;
  rewardFinishAt: number;
  rewardStartTime: number;
  rewardRate: number;
  totalStaked: number;
  stakingTokenSymbol: string;
  stakerInfo: FormattedStakerInfoType;
  pendingRewards: string;
};

export const StakingContext = createContext<StakingContextType | null>(null);

export const StakingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const { data: stakingToken } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "token",
  });

  const { data: stakingTokenSymbol, refetch: fetchStakingTokenSymbol } = useContractRead({
    address: stakingToken as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "symbol",
    enabled: false,
  });

  const { data: rewardFinishAt } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "rewardFinishAt",
  });

  const { data: rewardStartTime } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "rewardStartTime",
  });

  const { data: rewardRate } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "rewardRate",
  });

  const { data: totalStaked } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "totalStaked",
  });

  const { data: stakerInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getStakerInfo",
    args: [address],
  });

  const { data: pendingRewards } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "viewPendingRewards",
    args: [address],
    watch: true,
  });

  useEffect(() => {
    if (stakingToken) {
      fetchStakingTokenSymbol();
    }
  }, [stakingToken]);

  const value = {
    stakingToken: stakingToken as string,
    rewardFinishAt: Number((rewardFinishAt as BigNumberish).toString()),
    rewardStartTime: Number((rewardStartTime as BigNumberish).toString()),
    rewardRate: bigNumberToNumber(rewardRate as BigNumberish),
    totalStaked: bigNumberToNumber(totalStaked as BigNumberish),
    stakingTokenSymbol: stakingTokenSymbol as string,
    stakerInfo: {
      stakedAmount: bigNumberToString((stakerInfo as RawStakerInfoType)?.stakedAmount),
      rewardDebt: bigNumberToString((stakerInfo as RawStakerInfoType)?.rewardDebt),
      lastRewardTimestamp: Number((stakerInfo as RawStakerInfoType)?.lastRewardTimestamp.toString()),
    },
    pendingRewards: bigNumberToString(pendingRewards as BigNumberish),
  };

  return <StakingContext.Provider value={value}>{children}</StakingContext.Provider>;
};
