require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-truffle5');
require('solidity-coverage');

require('hardhat-contract-sizer');
require('hardhat-gas-reporter');
require('hardhat-abi-exporter');

const credentials = require('./credentials.json');

module.exports = {
  solidity: {
    version: '0.8.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  abiExporter: {
    runOnCompile: true,
    path: './abi',
    clear: true,
    flat: true,
    spacing: 2,
    pretty: true,
    except: ['Ownable', 'IERC165', 'ERC165', 'Address', 'Base64', 'Strings'],
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    currency: 'USD',
    coinmarketcap: process.env.COIN_MARKET_CAP,
    onlyCalledMethods: true,
  },

  networks: {
    localhost: { accounts: [`${credentials.private_key}`] },
    // hardhat: {
    //   forking: {
    //     url: credentials.rpc,
    //   },
    // },
  },
  mocha: {
    timeout: 200000,
  },
};
