const hre = require("hardhat");

async function main() {
  const Volume = await hre.ethers.getContractFactory("Volume");
  const volume = await Volume.deploy();
  await volume.deployed();
  console.log("Volume deployed to:", volume.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
