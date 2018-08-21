import { expect } from 'chai';
import 'mocha';
import Web3 = require('web3');


import { FansUnite } from '../src';
let fansunite: FansUnite;

describe('FansUnite library',  async () => {

  before(async () => {
    // @ts-ignore
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const networkId = await web3.eth.net.getId();

    fansunite = new FansUnite(web3, networkId);
  });

  describe('LeagueRegistry', () => {
    it('should get a list of league addresses by class name', async () => {
      const result = await fansunite.leagueRegistry.getLeaguesByClass('soccer');
      // console.log(result);
    });
  });
});
