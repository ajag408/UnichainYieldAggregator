# Uniswap V4 Yield Optimizer

A yield optimization protocol built on Uniswap V4's hook system that provides automated yield tracking, dynamic rebalancing, and gas-optimized swapping mechanisms.

## Overview

This project implements a custom Uniswap V4 hook([1](https://docs.uniswap.org/contracts/v4/overview)) that:

- Tracks yields across liquidity pools
- Automatically rebalances positions based on yield differentials
- Implements a novel gas-optimized swapping mechanism
- Utilizes Uniswap V4's singleton architecture and flash accounting

## Key Features

### Uniswap V4 Integration

- Uses V4's singleton architecture for efficient pool management
- Implements hook callbacks for lifecycle events
- Utilizes flash accounting for gas optimization
- Supports native ETH operations

### Yield Optimization

- Automated yield tracking across pools
- Dynamic rebalancing based on yield differentials
- Gas-efficient position management
- Custom swap routing for optimal execution

## Project Structure

```
app/
├── contracts/
│ ├── hooks/
│ │ └── YieldOptimizerHook.sol // Main hook implementation
│ ├── libraries/
│ │ └── YieldMath.sol // Yield calculation utilities (TODO)
│ └── interfaces/
├── test/
└── scripts/
```

## Setup Instructions

1. **Clone the Repository**

```
git clone https://github.com/ajag408/UnichainYieldAggregator.git

```

2. **Install Dependencies**

```
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

//Clone Uniswap V4 dependencies (required as V4 still in dev)
git clone https://github.com/Uniswap/v4-core.git
git clone https://github.com/Uniswap/v4-periphery.git
```

3. **Configure Environment**

Add to .env:

```
PRIVATE_KEY=
```

## Current Implementation Status

### Completed Features

- Basic hook structure and callbacks
- Deposit/withdraw functionality
- Event tracking system
- Flash accounting integration

### TODO Implementation

```
// Core internal functions needed:
function _canDirectTransfer(address tokenIn, address tokenOut) internal view returns (bool);
function _hasInternalBalance(address tokenIn, address tokenOut) internal view returns (bool);
function _directTransfer(address tokenIn, address tokenOut, uint256 amountIn) internal returns (uint256);
function _internalBalanceSwap(address tokenIn, address tokenOut, uint256 amountIn) internal returns (uint256);
function _optimizedAMMSwap(address tokenIn, address tokenOut, uint256 amountIn) internal returns (uint256);
function _calculateCurrentYield(bytes32 poolId) internal view returns (uint256);
function _shouldRebalance(PoolKey calldata key) internal view returns (bool);
function _rebalance(PoolKey calldata key, BalanceDelta delta) internal;
```

## Key Components

1. YieldOptimizerHook
   Main contract implementing:

- Uniswap V4 hook callbacks
- Yield tracking and rebalancing
- Gas-optimized swapping

2. Novel Swapping Mechanism
   Three-tiered approach:

- Direct transfers when possible
- Internal balance utilization
- Optimized AMM routing

3. Yield Optimization

- Automated yield tracking
- Dynamic rebalancing
- Position optimization

## Testing

Create test cases for:

```
describe("YieldOptimizerHook", function() {
  it("Should track deposits correctly")
  it("Should calculate yields accurately")
  it("Should rebalance when conditions are met")
  it("Should optimize gas usage in swaps")
});
```

## Next Steps

1. Implement remaining internal functions
2. Add comprehensive test suite
3. Optimize gas usage
4. Add frontend interface

## References

[1] Uniswap V4 Documentation: https://docs.uniswap.org/contracts/v4/overview
[2] Uniswap V4 Core Repository: https://github.com/Uniswap/v4-core
[3] Uniswap V4 Periphery: https://github.com/Uniswap/v4-periphery
