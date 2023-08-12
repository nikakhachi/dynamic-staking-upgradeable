import { useContext, useState } from "react";
import { StakingContext } from "./contexts/StakingContext";
import { Header } from "./components/Header";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const App = () => {
  const { address } = useAccount();
  const stakingContext = useContext(StakingContext);

  if (!stakingContext) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {!address ? (
        <>
          <p className="text-white text-xl tracking-wider text-center mt-12 mb-4 ">Connect Wallet to Stake & Earn Rewards</p>
          <ConnectButton />
        </>
      ) : stakingContext.stakerInfo.stakedAmount === "0" && stakingContext.stakerInfo.rewardDebt === "0" ? (
        <div className="flex flex-col items-center mt-12">
          <p className="text-white text-xl tracking-wider text-center">You have not staked yet</p>
          <p className="text-white text-xl tracking-wider text-center mt-6">
            {stakingContext.stakingTokenSymbol} balance: {stakingContext.stakingTokenBalance}
          </p>
          <p className="text-white text-xl tracking-wider text-center">
            Get Funds from Faucet:{" "}
            <button
              onClick={() => stakingContext.mintStakingTokenWrite()}
              className="text-white border-2 border-[#8247e5] rounded-lg  px-2 hover:bg-[#8247e5] transition-colors "
            >
              Send Me {stakingContext.stakingTokenSymbol}
            </button>
          </p>
          <div className="w-full h-8 mt-12 text-white flex items-center justify-center">
            <p className="text-xl mr-3">Stake Amount: </p>
            <input
              className="h-full w-full md:w-96 px-2 rounded-md text-black outline-none text-white"
              type="number"
              placeholder={`Amount of ${stakingContext.stakingTokenSymbol} to stake`}
              value={stakingContext.amountToStake}
              onChange={(e) => stakingContext.setAmountToStake(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button
              onClick={() => stakingContext.approve()}
              className="text-white border-2 border-[#8247e5] rounded-lg text-md px-8 py-1 hover:bg-[#8247e5] transition-colors ml-2"
            >
              Approve
            </button>{" "}
            <button
              onClick={() => stakingContext.stake()}
              className="text-white border-2 border-[#8247e5] rounded-lg text-md px-8 py-1 hover:bg-[#8247e5] transition-colors ml-2"
            >
              Stake
            </button>
          </div>
        </div>
      ) : (
        <p>Staked</p>
      )}
    </div>
  );
};

export default App;
