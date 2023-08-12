import { useContext } from "react";
import { StakingContext } from "./contexts/StakingContext";
import { Header } from "./components/Header";

const App = () => {
  const stakingContext = useContext(StakingContext);

  if (!stakingContext) return null;

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {stakingContext.stakerInfo.stakedAmount === "0" && stakingContext.stakerInfo.rewardDebt === "0" ? (
        <div className="flex flex-col items-center mt-12">
          <p className="text-white text-2xl tracking-wider mt-3 text-center">
            You have not staked any {stakingContext.stakingTokenSymbol} yet
          </p>
          <button
            onClick={() => {}}
            className="text-white border-2 border-[#8247e5] rounded-lg text-xl px-8 py-1 hover:bg-[#8247e5] transition-colors mt-4"
          >
            Stake
          </button>
        </div>
      ) : (
        <p>Staked</p>
      )}
    </div>
  );
};

export default App;
