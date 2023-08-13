import React, { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS, TOKEN_ABI } from "../constants/contract";
import { bigNumberToNumber, bigNumberToString } from "../utils";
import { BigNumberish } from "ethers";
import { FormattedStakerInfoType, RawStakerInfoType } from "../types";
import { ethers } from "ethers";

type StakingContextType = {
  stakingToken: string;
  rewardFinishAt: number;
  rewardStartTime: number;
  rewardRate: number;
  totalStaked: number;
  stakingTokenSymbol: string;
  stakerInfo: FormattedStakerInfoType;
  pendingRewards: string;
  stakingTokenBalance: string;
  mintStakingTokenWrite: () => void;
  stake: () => void;
  amountToStake: string;
  setAmountToStake: React.Dispatch<React.SetStateAction<string>>;
  approve: () => void;
  getRewardsWrite: () => void;
  withdrawWrite: () => void;
};

export const StakingContext = createContext<StakingContextType | null>(null);

export const StakingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { address } = useAccount();

  const [amountToStake, setAmountToStake] = useState("1");

  const { data: stakingToken } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "token",
  });

  const { data: stakingTokenSymbol, refetch: fetchStakingTokenSymbol } = useContractRead({
    address: stakingToken as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "symbol",
    enabled: false,
  });

  const { data: stakingTokenBalance, refetch: fetchStakingTokenBalance } = useContractRead({
    address: stakingToken as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: [address],
    watch: true,
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
    watch: true,
  });

  const { data: stakerInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getStakerInfo",
    args: [address],
    watch: true,
  });

  const { data: pendingRewards } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "viewPendingRewards",
    args: [address],
    watch: true,
  });

  const { write: mintStakingTokenWrite } = useContractWrite({
    address: stakingToken as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "mint",
  });

  const { write: stakeWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "stake",
    args: [ethers.parseEther(amountToStake)],
  });

  const { write: approveWrite } = useContractWrite({
    address: stakingToken as `0x${string}`,
    abi: TOKEN_ABI,
    functionName: "approve",
    args: [CONTRACT_ADDRESS, ethers.parseUnits(amountToStake)],
  });

  const { write: getRewardsWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getRewards",
  });

  const { write: withdrawWrite } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "withdraw",
    args: [(stakerInfo as RawStakerInfoType)?.stakedAmount],
  });

  useEffect(() => {
    if (stakingToken) {
      fetchStakingTokenSymbol();
      fetchStakingTokenBalance();
    }
  }, [stakingToken]);

  const stake = () => {
    stakeWrite();
  };

  const approve = () => {
    approveWrite();
  };

  const value = {
    stakingToken: stakingToken as string,
    rewardFinishAt: Number((rewardFinishAt as BigNumberish)?.toString()),
    rewardStartTime: Number((rewardStartTime as BigNumberish)?.toString()),
    rewardRate: bigNumberToNumber(rewardRate as BigNumberish),
    totalStaked: bigNumberToNumber(totalStaked as BigNumberish),
    stakingTokenSymbol: stakingTokenSymbol as string,
    stakerInfo: {
      stakedAmount: bigNumberToString((stakerInfo as RawStakerInfoType)?.stakedAmount),
      rewardDebt: bigNumberToString((stakerInfo as RawStakerInfoType)?.rewardDebt),
      lastRewardTimestamp: Number((stakerInfo as RawStakerInfoType)?.lastRewardTimestamp?.toString()),
    },
    pendingRewards: bigNumberToString(pendingRewards as BigNumberish),
    stakingTokenBalance: bigNumberToString(stakingTokenBalance as BigNumberish),
    mintStakingTokenWrite,
    stake,
    amountToStake,
    setAmountToStake,
    approve,
    getRewardsWrite,
    withdrawWrite,
  };

  return <StakingContext.Provider value={value}>{children}</StakingContext.Provider>;
};
