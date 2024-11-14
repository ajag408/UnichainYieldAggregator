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
    // libs: ["./lib"],
    // libraries: {
    //   "lib/v4-core/contracts": ["contracts"],
    //   "lib/v4-periphery/contracts": ["contracts"],
    // },
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
  // Add path remappings
  //   overrides: {
  //     "@uniswap/v4-core/": {
  //       path: "./lib/v4-core",
  //     },
  //     "@uniswap/v4-periphery/": {
  //       path: "./lib/v4-periphery",
  //     },
  //   },
  //   // Add custom external source files
  //   external: {
  //     contracts: [
  //       {
  //         artifacts: "lib/v4-core/out",
  //       },
  //       {
  //         artifacts: "lib/v4-periphery/out",
  //       },
  //     ],
  //   },
};
