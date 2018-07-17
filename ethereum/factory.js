import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xce8469F927cd8F4d235059B7f4d6e0b4fca4B941'
);

export default instance;
