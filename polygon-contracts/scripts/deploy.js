const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Pack = await hre.ethers.getContractFactory('Pack');
  const pack = await Pack.deploy();
  await pack.deployed();

  const AdventureCards = await hre.ethers.getContractFactory('AdventureCards');
  const adventureCards = await AdventureCards.deploy();
  await adventureCards.deployed();
  console.log('Deployed card:', pack.address);

  const Snapshot = await hre.ethers.getContractFactory('Snapshot');
  const snapshot = await Snapshot.deploy();
  await snapshot.deployed();
  console.log('Deployed snapshot:', pack.address);

  await pack.setAdventureCards(adventureCards.address); // where individual cards are stored
  await pack.setSnapshot(snapshot.address, true); // so only snapshot can update the pack
  await snapshot.setPack(pack.address); // needs to mint
  console.log('Deployed pack:', pack.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
