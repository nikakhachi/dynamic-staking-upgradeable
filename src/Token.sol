// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "openzeppelin/token/ERC20/ERC20.sol";

/**
 * @title Token Contract
 * @author Nika Khachiashvili
 * @dev A basic ERC20 token contract with faucet functionality.
 */
contract Token is ERC20 {
    error TooManyRequests();

    uint public withdrawableAmount; /// @dev Amount of tokens that can be withdrawn per request.
    uint public cooldown; /// @dev Cooldown period between two consecutive withdrawals for a user.

    mapping(address => uint) public withdrawalTimes; /// @dev Mapping to track the last withdrawal timestamp for each user.

    /**
     * @dev Contract constructor.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     * @param _initialSupply The initial supply of tokens.
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint _initialSupply,
        uint _withdrawableAmount,
        uint _cooldown
    ) ERC20(_name, _symbol) {
        withdrawableAmount = _withdrawableAmount;
        cooldown = _cooldown;
        _mint(msg.sender, _initialSupply);
    }

    /// @dev Function to withdraw tokens from the faucet.
    /// @notice Users can call this function to withdraw tokens from the faucet.
    function mint() external {
        /// @dev Make sure that user hasn't already withdrawn within the cooldown time
        if (withdrawalTimes[msg.sender] > block.timestamp)
            revert TooManyRequests();

        withdrawalTimes[msg.sender] = block.timestamp + cooldown; /// @dev Set the withdrawal timestamp for the user
        _mint(msg.sender, withdrawableAmount); // Mint tokens to the faucet
    }
}
