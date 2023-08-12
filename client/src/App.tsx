import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { StakingContext } from "./contexts/StakingContext";
import { getTailwindWidthPercent } from "./utils";

const App = () => {
  const { address } = useAccount();
  const stakingContext = useContext(StakingContext);

  const currentStakeTimePercentage = 45;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center mt-12">
        <p className="text-[#8247e5] text-5xl font-bold text-center">Goerli ETH Staker</p>
        <p className="text-white text-2xl tracking-wider mt-3 text-center">Stake your ETH and earn rewards every second</p>
        <p className="text-gray-500 text-lg tracking-wider text-center">Total rewards generated: 69 ETH</p>
      </div>
      <div className="w-full md:w-[600px]">
        <div className="flex gap-2 md:gap-0 flex-col md:flex-row justify-between mb-1">
          <p className="text-white text-xl">Staked: 2 ETH</p>
          <p className="text-white text-xl">Rewards Per Day: 10 ETH</p>
        </div>
        <div className="mt-3 md:mt-0 mb-5 md:mb-0 text-white border-2 border-white w-full rounded-lg h-8 relative">
          <div className={`bg-[#8247e5] h-full rounded-lg ${getTailwindWidthPercent(currentStakeTimePercentage)}`}></div>
          <p className="absolute inset-0 flex justify-center items-center">{currentStakeTimePercentage.toFixed(2)}%</p>
        </div>
        <div className="fjustify-between mt-3 mb-7">
          <p className="text-white text-xl">Max Earnings: 60 ETH</p>
        </div>
        <div className="flex items-center justify-between mb-10 md:mb-3">
          <p className="text-white font-bold text-xl">Current Earnings: 1 ETH</p>
        </div>
        <button
          onClick={() => {}}
          className="text-white border-2 border-[#8247e5] rounded-lg text-xl px-8 py-1 hover:bg-[#8247e5] transition-colors	"
        >
          Withdraw
        </button>
      </div>
      <ConnectButton />
      <p>Your Address: {address}</p>
      <p>Reward Token Address: {stakingContext?.stakingToken}</p>
    </div>
  );
};

export default App;
