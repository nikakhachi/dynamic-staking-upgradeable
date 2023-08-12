import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { StakingContext } from "./contexts/StakingContext";

const App = () => {
  const { address } = useAccount();
  const stakingContext = useContext(StakingContext);

  return (
    <>
      <ConnectButton />
      <p>Your Address: {address}</p>
      <p>Reward Token Address: {stakingContext?.stakingToken}</p>
    </>
  );
};

export default App;
