const { expect } = require("chai");
const { ethers } = require("hardhat");

// Helper function to deploy an ERC20 token
async function deployMockToken(name, symbol, deployer) {
  const MockERC20 = await ethers.getContractFactory("MockERC20", deployer);
  const token = await MockERC20.deploy(name, symbol);
  await token.waitForDeployment();

  // Mint initial supply to deployer
  const mintAmount = ethers.parseEther("1000000"); // 1M tokens as per docs example
  await token.mint(deployer.address, mintAmount);

  return token;
}

describe("YieldOptimizerHook", function () {
  this.timeout(120000); // Set timeout for this test suite

  // Unichain Sepolia deployed contract addresses
  const POOL_MANAGER_ADDRESS = "0xC81462Fec8B23319F288047f8A03A57682a35C1A";
  const POOL_SWAP_TEST_ADDRESS = "0xe437355299114d35ffcbc0c39e163b24a8e9cbf1";

  // Hook flags based on v4 documentation
  const BEFORE_SWAP_FLAG = 1n << 7n;
  const AFTER_SWAP_FLAG = 1n << 8n;
  let yieldOptimizer;
  let poolManager;
  let owner;
  let user1;
  let user2;
  let token1;
  let token2;

  beforeEach(async function () {
    try {
      [owner, user1, user2] = await ethers.getSigners();

      // Connect to existing PoolManager on Unichain Sepolia
      poolManager = await ethers.getContractAt(
        "IPoolManager",
        POOL_MANAGER_ADDRESS
      );
      console.log("Connected to PoolManager at:", POOL_MANAGER_ADDRESS);

      // Calculate hook flags and address
      const flags = BEFORE_SWAP_FLAG | AFTER_SWAP_FLAG;
      const salt = ethers.hexlify(ethers.randomBytes(32));
      const hookBitmap = BigInt(flags) | (BigInt(0x4444) << BigInt(144));

      // Create hook implementation bytecode
      const YieldOptimizerHook = await ethers.getContractFactory(
        "YieldOptimizerHook"
      );
      const initCode =
        YieldOptimizerHook.bytecode +
        YieldOptimizerHook.interface
          .encodeDeploy([POOL_MANAGER_ADDRESS])
          .slice(2);

      // Deploy CREATE2 factory
      console.log("Deploying Create2Factory...");
      const Create2Factory = await ethers.getContractFactory("Create2Factory");
      const factory = await Create2Factory.deploy();
      await factory.waitForDeployment();
      console.log("Create2Factory deployed to:", await factory.getAddress());

      // Calculate expected hook address
      const hookAddress = await factory.computeAddress(salt, initCode);
      console.log("Calculated hook address:", hookAddress);
      console.log("Hook bitmap:", hookBitmap.toString(16));

      // Deploy hook to calculated address
      await factory.deploy(salt, initCode);

      // Connect to deployed hook
      yieldOptimizer = await ethers.getContractAt(
        "YieldOptimizerHook",
        hookAddress
      );

      console.log("Hook deployed to:", hookAddress);
      console.log("Hook bitmap:", hookBitmap.toString(16));

      // Deploy tokens and setup pool
      token1 = await deployMockToken("Token1", "TK1", owner);
      token2 = await deployMockToken("Token2", "TK2", owner);

      // Create pool with calculated hook address
      const poolKey = {
        currency0: await token1.getAddress(),
        currency1: await token2.getAddress(),
        fee: 3000,
        tickSpacing: 60,
        hooks: hookAddress,
      };

      // Initialize pool
      const sqrtPriceX96 = "79228162514264337593543950336";
      await poolManager.initialize(poolKey, sqrtPriceX96);

      // Setup tokens
      const mintAmount = ethers.parseEther("1000");
      await token1.transfer(user1.address, mintAmount);
      await token1.transfer(user2.address, mintAmount);
      await token2.transfer(user1.address, mintAmount);
      await token2.transfer(user2.address, mintAmount);

      await token1.connect(user1).approve(hookAddress, mintAmount);
      await token2.connect(user1).approve(hookAddress, mintAmount);
      await token1.connect(user2).approve(hookAddress, mintAmount);
      await token2.connect(user2).approve(hookAddress, mintAmount);
    } catch (error) {
      console.error("Setup failed:", error);
      throw error;
    }
  });

  // Testing existing functionality
  describe("Core Functionality", () => {
    it("Should initialize with correct pool manager", async function () {
      expect(await yieldOptimizer.poolManager()).to.equal(poolManager.address);
    });

    it("Should track deposits correctly", async function () {
      const amount = ethers.utils.parseEther("100");
      await token1.connect(user1).approve(yieldOptimizer.address, amount);
      await yieldOptimizer.connect(user1).deposit(token1.address, amount);

      expect(
        await yieldOptimizer.userDeposits(user1.address, token1.address)
      ).to.equal(amount);
    });

    it("Should track total deposits correctly", async function () {
      const amount1 = ethers.utils.parseEther("100");
      const amount2 = ethers.utils.parseEther("50");

      await token1.connect(user1).approve(yieldOptimizer.address, amount1);
      await token1.connect(user2).approve(yieldOptimizer.address, amount2);

      await yieldOptimizer.connect(user1).deposit(token1.address, amount1);
      await yieldOptimizer.connect(user2).deposit(token1.address, amount2);

      expect(await yieldOptimizer.totalDeposits(token1.address)).to.equal(
        amount1.add(amount2)
      );
    });
  });

  // Empty tests for planned functionality
  describe("Yield Tracking", () => {
    it("Should calculate yields accurately", async function () {
      // TODO: Implement after YieldMath library
    });

    it("Should update yield metrics after swaps", async function () {
      // TODO: Implement after hook callbacks
    });
  });

  describe("Hook Callbacks", () => {
    it("Should execute beforeSwap callback", async function () {
      // TODO: Implement hook integration
    });

    it("Should execute afterSwap callback", async function () {
      // TODO: Implement hook integration
    });
  });

  describe("Rebalancing", () => {
    it("Should rebalance when conditions are met", async function () {
      // TODO: Implement rebalancing logic
    });

    it("Should optimize positions across pools", async function () {
      // TODO: Implement position optimization
    });
  });

  describe("Gas Optimization", () => {
    it("Should optimize gas usage in swaps", async function () {
      // TODO: Implement gas optimization
    });

    it("Should use flash accounting efficiently", async function () {
      // TODO: Implement flash accounting
    });
  });
});
