const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const Pack = await hre.ethers.getContractFactory('Pack');
  const pack = await Pack.deploy();
  await pack.deployed();
  console.log('Deployed pack:', pack.address);

  const AdventureCards = await hre.ethers.getContractFactory('AdventureCards');
  const adventureCards = await AdventureCards.deploy();
  await adventureCards.deployed();
  console.log('Deployed card:', adventureCards.address);

  const Snapshot = await hre.ethers.getContractFactory('Snapshot');
  const snapshot = await Snapshot.deploy();
  await snapshot.deployed();
  console.log('Deployed snapshot:', snapshot.address);

  await pack.setAdventureCards(adventureCards.address); // where individual cards are stored
  await pack.setSnapshot(snapshot.address, true); // so only snapshot can update the pack
  await snapshot.setPack(pack.address); // needs to mint
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
