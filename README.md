# Upgradeble Dynamic Staking Contract

This smart contract implements an upgradeable (UUPS Proxy pattern) dynamic staking contract, where users can deposit their assets and earn rewards.

The development tool used is the Foundry where the contracts and the tests are written, and then there's hardhat integrated which is used for writing the deployment and upgrade scripts.

## Table of Contents

- [Features](#features)
- [Testing](#testing)
- [Deploying](#deploying)

## Features

- **_stake_** - Users can stake their assets to start earning rewards by calling this function. This function will automatically calculate any previous pending rewards of the user and the event _Staked_ will be fired. This function can't be called if the contract is paused. NOTE that there's no check if the giving of the rewards has finished or not (`rewardFinishAt`). That's because by avoiding that check we save gas. So before staking, the staker has to manually check if the rewards giving has finished or not.

- **_withdraw_** - Users can call this function to withdraw any amount of the staked asset. This function will automatically calculate any previous pending rewards of the user and the event _Withdrawn_ will be fired. This function can't be called if the contract is paused.

- **_viewPendingRewards_** - By passing the address to this function, everyone can see the pending rewards of the any address. The rewards returned by this function is the amount of the rewards to be given out based on the staked amount and the timestamp of the last given reward to that address.

- **_getRewards_** - By calling this function, users can withdraw the rewards. There is no specific check for the amount requested, but if the amount requested exceedes the rewards amount that should be given out to user, the transaction will revert due to underflow.

- **_getStakerInfo_** - Get the info of any staker by providing the address.

- **_setRewards_** - Owners function to set the amount of the rewards and the duration when the rewards will be given out. Calling this function is only possible if the previous reward giving has ended and the reward amount specified is more than 0.

- **_pause_** - Owners function to pause the contract

- **_unpause_** - Owners function to unpause the contract

## Testing

Tests are written to cover as many scenarios as possible, but still, it's not enough for production. This should never happen in production-ready code!

To run the tests, you will have to do the following

1. Clone this repository to your local machine.
2. Run `forge install`.
3. Run `forge build`.
4. Run `forge test`.

OR, you can just run `forge test`, which will automatically install dependencies and compile the contracts.

## Deploying

To deploy the contract, you will have to do the following

1. Clone this repository to your local machine.
2. Run `forge install && npm install`.
3. Create the `.env` file based on the `.env.example`.
4. Modify network options in `hardhat.config.ts`.
5. Deploy the smart contract with ` npx hardhat run script/deploy.ts --network {network name}`

If you would like to deploy it locally, make sure to run `npx hardhat node` before the 3rd step, and deploy the smart contract with `localhost` as the "network name"
