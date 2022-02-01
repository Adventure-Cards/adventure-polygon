const HDWalletProvider = require('@truffle/hdwallet-provider');
const hre = require('hardhat');
const fs = require('fs');

const credentials = require('../credentials.json');

async function main() {
  console.log('start');

  const provider = new hre.ethers.providers.JsonRpcProvider(credentials.rpc);
  await provider.ready;
  const signer = new hre.ethers.Wallet(credentials.private_key, provider);

  // Deployed pack: 0x391342f5acAcaaC9DE1dC4eC3E03f2678f7c78F1
  // Deployed card: 0x6d925938Edb8A16B3035A4cF34FAA090f490202a
  // Deployed snapshot: 0xED8CAB8a931A4C0489ad3E3FB5BdEA84f74fD23E

  const abi = require('../abi/Snapshot.json');
  const address = '0xED8CAB8a931A4C0489ad3E3FB5BdEA84f74fD23E';
  const snapshot = new hre.ethers.Contract(address, abi, signer);

  const data = fs.readFileSync('../snapshot/snapshot.csv', 'utf8');
  const owners = data.split('\n');
  let allOwners = [];
  let allCards = [];

  for (let i = 0; i < owners.length; i++) {
    // console.log('---', owners[i]);
    const [cardId, ownerAddress] = owners[i].split(',');
    allCards.push(cardId);
    allOwners.push(ownerAddress);

    if (allCards.length >= 3) {
      console.log('set owners', i, allCards.length);
      await snapshot.setOwners(allOwners, allCards);
      allOwners = [];
      allCards = [];
    }
  }

  console.log('done');

  // console.log('feezing!');
  // await snapshot.freeze();
  // console.log('minting!');
  // await snapshot.mint(1, 3);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
