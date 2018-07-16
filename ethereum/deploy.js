const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'buzz fitness other letter wagon ecology differ wire museum lesson zoo wrestle',
  'https://rinkeby.infura.io/Lg7hkEvt6hSHGObb1LDk'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode }) // '0x': Support for UnhandledPromiseRejectionWarning: Error: The contract code couldn't be stored, please check your gas limit.
    .send({
      from: accounts[0],
      gas: '1000000'
    });

    console.log('Contract deployed to ', result.options.address);
};

deploy();