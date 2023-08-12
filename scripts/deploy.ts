import { upgrades, ethers } from "hardhat";

const main = async () => {
  await ethers.provider.send("evm_setIntervalMining", [12000]);

  const TokenFactory = await ethers.getContractFactory("Token");
  const token = await TokenFactory.deploy("Test Token", "TST", ethers.parseEther("1000000"), ethers.parseUnits("100"), 60);

  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();

  console.log(`Token Deployed on Address: ${tokenAddress}`);

  const StakingFactory = await ethers.getContractFactory("Staking");
  const staking = await upgrades.deployProxy(StakingFactory, [tokenAddress], { kind: "uups" });

  await staking.waitForDeployment();

  const stakingAddress = await staking.getAddress();

  await staking.setRewards(ethers.parseUnits("1000"), 60 * 24);

  console.log(`Staking Proxy Deployed on Address: ${stakingAddress}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
