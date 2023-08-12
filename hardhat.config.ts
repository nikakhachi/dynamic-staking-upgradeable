import "@nomicfoundation/hardhat-foundry";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";

const config = {
  solidity: "0.8.19",
  // settings: {
  //   optimizer: {
  //     enabled: true,
  //     runs: 20,
  //   },
  // },
  networks: {
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
