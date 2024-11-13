require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    unichainSepolia: {
      url: "https://sepolia.unichain.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1301,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    libraries: {
      "lib/v4-core/contracts": ["contracts"],
      "lib/v4-periphery/contracts": ["contracts"],
    },
  },
};
