const hre = require('hardhat');
const fs = require('fs');
const { getHeapSnapshot } = require('v8');

async function main() {
  const Pack = await hre.ethers.getContractFactory('Pack');
  const pack = await Pack.deploy();
  await pack.deployed();

  const AdventureCards = await hre.ethers.getContractFactory('AdventureCards');
  const adventureCards = await AdventureCards.deploy();
  await adventureCards.deployed();

  const Snapshot = await hre.ethers.getContractFactory('Snapshot');
  const snapshot = await Snapshot.deploy();
  await snapshot.deployed();

  await pack.setAdventureCards(adventureCards.address); // where individual cards are stored
  await pack.setSnapshot(snapshot.address, true); // so only snapshot can update the pack
  await snapshot.setPack(pack.address); // needs to mint

  console.log('Deployed:', pack.address);

  const data = fs.readFileSync('../snapshot/snapshot.csv', 'utf8');
  const owners = data.split('\n');

  // let group = [];
  // for (let i = 0; i < owners.length; i++) {
  //   group.push(owners[i].pop());
  //   console.log(group);
  //   if (i % 20 == 0) {
  //     group = [];
  //   }
  // }

  // owners.forEach(async (line) => {
  //   console.log(line);
  //   const [cardId, ownerAddress] = line.split(';');

  //   await snapshot.setOwners([ownerAddress], [cardId]);
  //   console.log('done');
  // });

  // console.log('feezing!');
  // await snapshot.freeze();
  // console.log('minting!');
  // await snapshot.mint(1, 3);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
