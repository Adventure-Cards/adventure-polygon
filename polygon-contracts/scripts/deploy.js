const hre = require('hardhat');

async function main() {
  const Pack = await hre.ethers.getContractFactory('Pack');
  const pack = await Pack.deploy();
  await pack.deployed();

  const AdventureCards = await hre.ethers.getContractFactory('AdventureCards');
  const adventureCards = await AdventureCards.deploy();
  await adventureCards.deployed();

  const Snapshot = await hre.ethers.getContractFactory('Snapshot');
  const shapshot = await Snapshot.deploy();
  await shapshot.deployed();

  console.log('Deployed:', pack.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
