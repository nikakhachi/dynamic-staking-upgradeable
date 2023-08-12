import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { StakingContext } from "../contexts/StakingContext";
import { getTailwindWidthPercent } from "../utils";
import { useAccount } from "wagmi";
import moment from "moment";

export const Header = () => {
  const { address } = useAccount();
  const stakingContext = useContext(StakingContext);

  if (!stakingContext) return null;

  const rewardDuration = stakingContext.rewardFinishAt - stakingContext.rewardStartTime;
  const currentTimestamp = Math.round(new Date().getTime() / 1000);

  const currentStakeTimePercentage = ((currentTimestamp - stakingContext.rewardStartTime) / rewardDuration) * 100;
  const totalRewards = rewardDuration * stakingContext.rewardRate;

  const hasStakingEnded = stakingContext.rewardFinishAt < moment().unix();

  return (
    <>
      {address && (
        <div className="absolute top-2 right-2">
          <ConnectButton />
        </div>
      )}
      <div className="flex flex-col items-center mt-12">
        <p className="text-[#8247e5] text-5xl font-bold text-center">Dynamic Staker Rewards</p>
        <p className="text-white text-2xl tracking-wider mt-3 text-center">
          Stake{" "}
          <a
            className="underline"
            href={`https://goerli.etherscan.io/token/${stakingContext.stakingToken}`}
            target="_blank"
            rel="noreferrer"
          >
            {stakingContext.stakingTokenSymbol}
          </a>{" "}
          and earn native tokens
        </p>
      </div>
      <div className="w-full md:w-[600px] mt-8">
        <p className="text-gray-500 text-lg tracking-wider text-center mb-4">
          Total rewards to be given out: {Math.round(totalRewards)} Native Tokens
        </p>
        <div className="flex gap-2 md:gap-0 flex-col md:flex-row justify-between mb-1">
          {!hasStakingEnded ? (
            <p className="text-white text-xl">
              Rewards End In {((stakingContext.rewardFinishAt - currentTimestamp) / 60 / 24).toFixed(1)} hours
            </p>
          ) : (
            <p className="text-white text-xl">Rewards Give Out Has Ended</p>
          )}

          {!hasStakingEnded && <p className="text-white text-xl">Total Staked: {stakingContext.totalStaked} Tokens</p>}
        </div>
        <div className="mt-3 md:mt-0 mb-5 md:mb-8 text-white w-full rounded-lg h-2 relative bg-white">
          <div className={`bg-[#8247e5] h-full rounded-lg ${getTailwindWidthPercent(currentStakeTimePercentage)}`}></div>
        </div>
      </div>
    </>
  );
};
