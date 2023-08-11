import { upgrades, ethers } from "hardhat";

const PROXY = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

const main = async () => {
  const StakingV2Factory = await ethers.getContractFactory("StakingV2");
  const stakingV2 = await upgrades.upgradeProxy(PROXY, StakingV2Factory);

  await stakingV2.waitForDeployment();

  console.log(`The Implementation has been upgraded to version: ${await stakingV2.version()}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
