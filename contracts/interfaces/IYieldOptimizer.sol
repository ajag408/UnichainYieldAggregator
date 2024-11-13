// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IYieldOptimizer {
    event YieldTracked(
        address indexed pool,
        uint256 timestamp,
        uint256 currentYield
    );
    
    event RebalanceTriggered(
        address indexed pool,
        uint256 timestamp,
        uint256 yieldDifference
    );

    function getYield(address pool) external view returns (uint256);
    function shouldRebalance(address pool) external view returns (bool);
    function rebalance(address pool) external;
}