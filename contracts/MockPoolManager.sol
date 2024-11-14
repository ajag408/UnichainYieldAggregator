// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";

contract MockPoolManager is IPoolManager {
    function validateHookAddress(address _hookAddress) external pure returns (bool) {
        return uint160(_hookAddress) & uint160(type(uint96).max) == 0;
    }

    function lock(bytes calldata _data) external pure returns (bytes memory) {
        return "";
    }

    function unlock(bytes calldata data) external returns (bytes memory) {
        return "";
    }

    function modifyLiquidity(
        PoolKey memory key,
        IPoolManager.ModifyLiquidityParams memory params,
        bytes calldata hookData
    ) external override returns (BalanceDelta, BalanceDelta) {
        return (BalanceDelta.wrap(0), BalanceDelta.wrap(0));
    }

    function swap(
        PoolKey memory key,
        IPoolManager.SwapParams memory params,
        bytes calldata hookData
    ) external override returns (BalanceDelta) {
        return BalanceDelta.wrap(0);
    }

    function donate(
        PoolKey memory key,
        uint256 amount0,
        uint256 amount1,
        bytes calldata hookData
    ) external override returns (BalanceDelta) {
        return BalanceDelta.wrap(0);
    }

    // Rest of the interface implementations...
    function take(Currency currency, address to, uint256 amount) external override {}
    function settle() external payable override returns (uint256) { return 0; }
    function mint(address to, uint256 id, uint256 amount) external override {}
    function burn(address from, uint256 id, uint256 amount) external override {}
    function setProtocolFee(PoolKey memory key, uint24 newProtocolFee) external override {}
    function initialize(PoolKey memory key, uint160 sqrtPriceX96) external override returns (int24) { return 0; }
    
    // IERC6909Claims implementations
    function allowance(address owner, address spender, uint256 id) external pure override returns (uint256) { return 0; }
    function approve(address spender, uint256 id, uint256 amount) external pure override returns (bool) { return true; }
    function balanceOf(address account, uint256 id) external pure override returns (uint256) { return 0; }
    function isOperator(address owner, address operator) external pure override returns (bool) { return false; }
    function transfer(address to, uint256 id, uint256 amount) external pure override returns (bool) { return true; }
    function transferFrom(address from, address to, uint256 id, uint256 amount) external pure override returns (bool) { return true; }
    function setOperator(address operator, bool approved) external pure override returns (bool) { return true; }

    // IProtocolFees implementations
    function protocolFeeController() external pure override returns (address) { return address(0); }
    function protocolFeesAccrued(Currency currency) external pure override returns (uint256) { return 0; }
    function setProtocolFeeController(address controller) external override {}
    function collectProtocolFees(address recipient, Currency currency, uint256 amount) external pure override returns (uint256) { return 0; }

    // Additional required functions
    function clear(Currency currency, uint256 amount) external override {}
    function settleFor(address recipient) external payable override returns (uint256) { return 0; }
    function sync(Currency currency) external override {}
    function updateDynamicLPFee(PoolKey memory key, uint24 newDynamicLPFee) external override {}

    // IExtsload & IExttload implementations
    function extsload(bytes32 slot) external pure override returns (bytes32) { return bytes32(0); }
    function extsload(bytes32 startSlot, uint256 nSlots) external pure override returns (bytes32[] memory) { return new bytes32[](0); }
    function extsload(bytes32[] calldata slots) external pure override returns (bytes32[] memory) { return new bytes32[](0); }
    function exttload(bytes32 slot) external pure override returns (bytes32) { return bytes32(0); }
    function exttload(bytes32[] calldata slots) external pure override returns (bytes32[] memory) { return new bytes32[](0); }
}