// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../src/Staking.sol";
import "../src/Token.sol";

/**
 * @title FaucetTest Contract
 * @author Nika Khachiashvili
 * @dev Test cases for mint function of tokens acting as a faucet.
 */
contract FaucetTest is Test {
    uint constant _INITIAL_SUPPLY = 0;
    uint constant _WITHDRAWABLE_AMOUNT = 10 * 10 ** 18;
    uint constant _COOLDOWN = 10;

    Token public token;

    function setUp() public {
        token = new Token(
            "Test Token",
            "TTK",
            _INITIAL_SUPPLY,
            _WITHDRAWABLE_AMOUNT,
            _COOLDOWN
        );
    }

    /// @dev test the withdrawal function
    function testWithdraw() public {
        assertEq(token.balanceOf(address(this)), 0);
        token.mint();
        assertEq(token.balanceOf(address(this)), _WITHDRAWABLE_AMOUNT);
    }

    /// @dev test the withdrawal function after cooldown is off
    function testWithdrawAfterCooldown() public {
        token.mint();
        skip(_COOLDOWN);
        token.mint();
    }

    /// @dev test if it reverts if trying to withdraw twice within the cooldown
    function testCooldown() public {
        token.mint();
        vm.expectRevert(Token.TooManyRequests.selector);
        token.mint();
    }
}
