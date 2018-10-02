import { expect } from 'chai';
import 'mocha';
import Web3 = require('web3');

import { FansUnite } from '../src';
import { Bet } from '../src/types';
import { constants } from './utils/constants';

let fansunite: FansUnite;
const TOKEN_DECIMALS = 18;
const leagueAddress = '0xdFbAc1D7F602E7c9CA1B64c27541CE7A26CDE2BC';
const spenderAddress = '0xf22469f31527adc53284441bae1665a7b9214dba';
const tokenAddress = '0x0000000000000000000000000000000000000000';
const backerAddress = '0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb';
const layerAddress = '0x5409ED021D9299bf6814279A6A1411A7e866A631';
const resolverAddress = '0xf22469f31527adc53284441bae1665a7b9214dba';
const season = 2018;
const fixtureId = 1;
const layerTokenFillAmount = 10 ** TOKEN_DECIMALS;
let fromAddress: string;

let bet: Bet;

describe('FansUnite library', () => {
  before(async () => {
    // @ts-ignore
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    fromAddress = accounts[0];
    fansunite = new FansUnite(web3, networkId);

    bet = {
      backerAddress,
      layerAddress: constants.NULL_ADDRESS,
      backerTokenAddress: constants.NULL_ADDRESS,
      layerTokenAddress: constants.NULL_ADDRESS,
      feeRecipientAddress: accounts[2],
      leagueAddress,
      resolverAddress,
      backerTokenStake: 2 * 10 ** TOKEN_DECIMALS,
      backerFee: 0,
      layerFee: 0,
      expirationTimeSeconds: 1545437384,
      fixtureId,
      backerOdds: 2 * 10 ** 8,
      betPayload: '0x4e5ef893',
      salt: 2401286
    };
  });

  describe('LeagueRegistry', () => {
    it('should get a list of league addresses by class name', async () => {
      const result = await fansunite.leagueRegistry.getLeaguesByClass('soccer');
      // TODO
    });
    it('should return a league by an address', async () => {
      const result = await fansunite.leagueRegistry.getLeague(leagueAddress);
      // TODO
    });
    it('should return a lst of populated leagues', async () => {
      const result = await fansunite.leagueRegistry.getClassWithLeagues('soccer');
      // TODO
    });
    it('should return true if league is registered', async () => {
      const result = await fansunite.leagueRegistry.isLeagueRegistered(leagueAddress);
      // TODO
    });
  });

  describe('League001', () => {
    it('should return the name of the league', async () => {
      const result = await fansunite.league001.getName(leagueAddress);
      // TODO
    });
    it('should return the class name of the league', async () => {
      const result = await fansunite.league001.getClass(leagueAddress);
      // TODO
    });
    it('should return the ipfs hash name of the league', async () => {
      const result = await fansunite.league001.getDetails(leagueAddress);
      // TODO
    });
    it('should return the list of seasons for the league', async () => {
      const result = await fansunite.league001.getSeasons(leagueAddress);
      // TODO
    });
    it('should return the list of seasons for the league', async () => {
      const result = await fansunite.league001.getSeason(leagueAddress, season);
      // TODO
    });
    it('should return the list of participants for the league', async () => {
      // TODO: to implement in smart contract
      // const result = await fansunite.league001.getParticipants(leagueAddress);
      // console.log(result);
    });
    it('should return the participant for the league', async () => {
      const result = await fansunite.league001.getParticipant(leagueAddress, 1);
      // TODO
    });
    it('should return a fixture by its id for the league', async () => {
      const result = await fansunite.league001.getFixture(leagueAddress, fixtureId);
      // TODO
    });
    it('should return a list of fixtures populated for the season', async () => {
      const result = await fansunite.league001.getSeasonWithFixtures(leagueAddress, season);
      // TODO
    });
    it('should return true if resolver is registered', async () => {
      const result = await fansunite.league001.isResolverRegistered(leagueAddress, resolverAddress);
      // TODO
    });
    it('should return true if fixture is scheduled', async () => {
      const result = await fansunite.league001.isFixtureScheduled(leagueAddress, fixtureId);
      // TODO
    });
  });

  describe('Vault', () => {
    it('should approve the spender', async () => {
      const result1 = await fansunite.vault.approve(spenderAddress, backerAddress);
      const result2 = await fansunite.vault.approve(spenderAddress, layerAddress);
      // TODO
    });
    it('should deposit tokens', async () => {
      const result1 = await fansunite.vault.deposit(tokenAddress, 3 * 10 ** TOKEN_DECIMALS, backerAddress);
      const result = await fansunite.vault.deposit(tokenAddress, 3 * 10 ** TOKEN_DECIMALS, layerAddress);
      // TODO
    });
    it('should withdraw tokens', async () => {
      const result = await fansunite.vault.withdraw(tokenAddress, 1 * 10 ** TOKEN_DECIMALS, fromAddress);
      // TODO
    });
    it('should retrieve the balance for token', async () => {
      const result = await fansunite.vault.balanceOf(tokenAddress, fromAddress);
      // TODO
    });
    it('should return the balance true if address has approved spender', async () => {
      const result = await fansunite.vault.isApproved(backerAddress, spenderAddress);
      // TODO
    });
  });

  describe('Registry', () => {
    it('should get the address for Vault', async() => {
      const result = await fansunite.registry.getAddress('Vault');
      // TODO
    });
  });

  describe('hashBet', () => {
    it('should hash the bet parameters', async () => {
      const betHash = fansunite.hashBet(bet);
      // TODO
    });
  });

  describe('signBet', () => {
    it('should sign the bet', async () => {
      const signedBet = await fansunite.newSignedBet(bet, layerTokenFillAmount);
      const betHash = await fansunite.hashBet(bet);
      const fillBet = await fansunite.betManager.fillBet(signedBet, layerTokenFillAmount, layerAddress);
      const filled = await fansunite.betManager.filled(betHash);
      // TODO
    });
  });

  describe('generateSalt', () => {
    it('should generate random number', async () => {
      const salt = fansunite.generateSalt();
      // TODO
    });
  });


});
