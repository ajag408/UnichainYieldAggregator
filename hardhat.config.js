require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();
require("hardhat-preprocessor");
const fs = require("fs");

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean) // remove empty lines
    .map((line) => line.trim().split("="));
}

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          viaIR: true,
        },
      },
      {
        // Keep old compiler for compatibility
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  mocha: {
    timeout: 100000, // 100 seconds
  },
  networks: {
    unichainSepolia: {
      url: "https://sepolia.unichain.org",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1301,
      timeout: 60000,
      confirmations: 1,
    },
    hardhat: {
      forking: {
        url: "https://sepolia.unichain.org",
        blockNumber: 4780685,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  preprocess: {
    eachLine: (hre) => ({
      transform: (line) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
  // Add external sources to be compiled
  external: {
    contracts: [
      {
        artifacts: "node_modules/@uniswap/v4-core/artifacts",
        deploy: "node_modules/@uniswap/v4-core/deploy",
      },
    ],
    deployments: {
      unichainSepolia: {
        PoolManager: ["0xC81462Fec8B23319F288047f8A03A57682a35C1A"],
        PoolSwapTest: ["0xe437355299114d35ffcbc0c39e163b24a8e9cbf1"],
      },
    },
  },
};
