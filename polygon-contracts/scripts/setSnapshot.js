const HDWalletProvider = require('@truffle/hdwallet-provider');
const hre = require('hardhat');
const fs = require('fs');

const credentials = require('../credentials.json');

async function main() {
  console.log('start');

  const provider = new ethers.providers.JsonRpcProvider(credentials.rpc);
  await provider.ready;
  const signer = new ethers.Wallet(credentials.private_key, provider);

  // Deployed card: 0x0165878A594ca255338adfa4d48449f69242Eb8F
  // Deployed snapshot: 0x0165878A594ca255338adfa4d48449f69242Eb8F
  // Deployed pack: 0x0165878A594ca255338adfa4d48449f69242Eb8F

  const abi = require('../abi/Snapshot.json');
  const address = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
  const snapshot = new ethers.Contract(address, abi, signer);

  const data = fs.readFileSync('../snapshot/snapshot.csv', 'utf8');
  const owners = data.split('\n');
  let allOwners = [];
  let allCards = [];

  owners.forEach(async (line) => {
    const [cardId, ownerAddress] = line.split(';');
    allCards.push(cardId);
    allOwners.push(ownerAddress);

    if (allCards.length == 3) {
      await snapshot.setOwners(allOwners, allCards);

      console.log(allCards[0]);
      allOwners = [];
      allCards = [];
    }
  });
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
