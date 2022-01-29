const hre = require('hardhat');
const fs = require('fs');

async function main() {
  // const Pack = await hre.ethers.getContractFactory('Pack');
  // const pack = await Pack.deploy();
  // await pack.deployed();

  // const AdventureCards = await hre.ethers.getContractFactory('AdventureCards');
  // const adventureCards = await AdventureCards.deploy();
  // await adventureCards.deployed();

  // const Snapshot = await hre.ethers.getContractFactory('Snapshot');
  // const shapshot = await Snapshot.deploy();
  // await shapshot.deployed();

  // await pack.setAdventureCards(adventureCards.address); // where individual cards are stored
  // await pack.setSnapshot(shapshot.address, true); // so only snapshot can update the pack
  // await shapshot.setPack(pack.address); // needs to mint

  console.log('Deployed:', pack.address);

  try {
    const data = fs.readFileSync('../snapshot/snapshot.csv', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
