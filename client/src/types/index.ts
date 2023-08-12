import { BigNumberish } from "ethers";

export type RawStakerInfoType = {
  stakedAmount: BigNumberish;
  lastRewardTimestamp: BigNumberish;
  rewardDebt: BigNumberish;
};

export type FormattedStakerInfoType = {
  stakedAmount: string;
  lastRewardTimestamp: number;
  rewardDebt: string;
};
