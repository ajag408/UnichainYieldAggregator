# YieldOptimizer Hook for Uniswap v4

## Overview

A Uniswap v4 hook implementation that optimizes yield across liquidity pools by tracking deposits, calculating yields, and automatically rebalancing positions based on performance metrics.

## Architecture

### Core Components

1. **YieldOptimizerHook Contract**

   - Extends BaseHook from v4-periphery
   - Implements beforeSwap and afterSwap hooks
   - Tracks user deposits and yields
   - Manages rebalancing logic

2. **Test Infrastructure**
   - Uses Hardhat for testing
   - Connects to Unichain Sepolia PoolManager
   - Implements CREATE2 deployment for deterministic hook addresses

### Key Features

- Deposit tracking
- Yield calculation
- Automated rebalancing
- Gas-optimized swaps

## Current Status

### Completed

1. Basic contract structure
2. Hook interface implementation
3. State variable setup
4. Basic deposit tracking
5. Initial test setup with Sepolia integration

### In Progress

1. Hook deployment validation
2. Pool initialization testing
3. Swap functionality implementation
4. Yield calculation logic

### Blockers

1. CREATE2 factory deployment issues
2. Hook validation against v4-core requirements
3. Hardhat vs Foundry testing patterns

## Development

### Setup

```bash
npm install
npx hardhat compile
```

### Running Tests

```bash
npx hardhat test
```

### Test Structure

```javascript
describe("YieldOptimizerHook", function () {
  // Core functionality
  it("Should initialize with correct pool manager");
  it("Should track deposits correctly");
  it("Should calculate yields accurately");
  it("Should rebalance when conditions are met");
  it("Should optimize gas usage in swaps");
});
```

## Integration Details

### Unichain Sepolia

- PoolManager Address: `0xC81462Fec8B23319F288047f8A03A57682a35C1A`
- Network: Sepolia testnet

### Hook Deployment

- Uses CREATE2 for deterministic addresses
- Requires proper hook validation bitmap
- Must implement v4-core hook interfaces

## Development Roadmap

### Immediate Tasks

1. Fix CREATE2 factory deployment
2. Implement proper hook validation
3. Complete swap functionality tests
4. Add yield calculation tests

### Future Enhancements

1. Gas optimization
2. Advanced rebalancing strategies
3. Frontend integration
4. Additional pool types support

## Technical Notes

### Hook Implementation

```solidity
contract YieldOptimizerHook is BaseHook {
    // Core state variables
    mapping(address => mapping(address => uint256)) public userDeposits;
    mapping(address => uint256) public totalDeposits;
    mapping(address => uint256) public lastYieldUpdate;
    mapping(address => uint256) public poolYields;

    uint256 public constant REBALANCE_THRESHOLD = 500; // 5% in bps
}
```

### Architecture Notes

- Follows v4-core singleton architecture
- Uses hook callbacks for custom logic
- Implements proper pool initialization
- Handles token approvals and transfers

## References

1. [Uniswap v4 Documentation](https://docs.uniswap.org/contracts/v4/overview)
2. [v4-core Repository](https://github.com/Uniswap/v4-core)
3. [v4-periphery](https://github.com/Uniswap/v4-periphery)

## License

MIT
