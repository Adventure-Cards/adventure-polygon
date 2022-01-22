const hre = require('hardhat');

async function main() {
  const Pack = await hre.ethers.getContractFactory('Pack');
  const pack = await Pack.deploy();
  await pack.deployed();

  console.log('Pack deployed to:', pack.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
