import Web3 from 'web3';

let web3;

if ( typeof window !== 'undefined' && typeof window.web3 !== 'undefined' ) {
  // We are in browser and running Metamask
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the Server or Metamask is not running
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/Lg7hkEvt6hSHGObb1LDk'
  )
  web3 = new Web3(provider);
}

export default web3;