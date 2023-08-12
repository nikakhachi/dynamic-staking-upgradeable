import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, localhost } from "wagmi/chains";
import { StakingProvider } from "./contexts/StakingContext.tsx";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// const { chains, publicClient } = configureChains(
//   [import.meta.env.DEV ? localhost : goerli],
//   [import.meta.env.DEV ? publicProvider() : alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY as string })]
// );

const { chains, publicClient } = configureChains([localhost], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "dynamic-staking-upgradeable",
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <StakingProvider>
          <App />
        </StakingProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
