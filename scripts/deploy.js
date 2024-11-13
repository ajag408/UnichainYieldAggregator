const hre = require("hardhat");

async function main() {
  const YieldOptimizerHook = await hre.ethers.getContractFactory(
    "YieldOptimizerHook"
  );
  const hook = await YieldOptimizerHook.deploy();
  await hook.deployed();

  console.log("YieldOptimizerHook deployed to:", hook.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
