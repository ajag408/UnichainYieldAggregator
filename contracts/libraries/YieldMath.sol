// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library YieldMath {
    function calculateYield(
        uint256 initialLiquidity,
        uint256 currentLiquidity,
        uint256 timeElapsed
    ) internal pure returns (uint256) {
        if (timeElapsed == 0 || initialLiquidity == 0) return 0;
        
        uint256 yieldBps = ((currentLiquidity - initialLiquidity) * 10000) / initialLiquidity;
        return yieldBps / timeElapsed; // Yield per second in basis points
    }

    function calculateOptimalRatio(
        uint256 yield0,
        uint256 yield1,
        uint256 price0,
        uint256 price1
    ) internal pure returns (uint256) {
        // TODO: Implement optimal ratio calculation based on yields and prices
        return 0;
    }
}