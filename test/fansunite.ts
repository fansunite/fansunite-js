import { expect } from 'chai';
import 'mocha';
import Web3 = require('web3');

import { FansUnite } from '../src';
import { Bet, Fixture } from '../src/types';
import { constants } from './utils/constants';
import { Migration } from './utils/migration'

let fansunite: FansUnite;
let accounts = [];

const className = 'soccer';
const participantsPerFixture = 2;
const leagueName = 'English Premiership';
const participants = [
  'Leicester City',
  'Manchester United'
];
const year = 2018;
const fixtureId = 1;
const participantId = 1;
const eventStartTime = 1545437384;

let leagueAddress: string;
let resolvedResolverAddress: string;
let unresolvedResolverAddress: string;
let betManagerAddress: string;
let backerAddress: string;
let nonApprovedAddress: string;
let pendingResolverAddress: string;
let layerAddress: string;
const tokenAddress = constants.NULL_ADDRESS; // ETH Token
const odds = 2;

let resolutionPayload: string;

let bet: Bet;
let migration: Migration;

describe('FansUnite library', () => {
  before(async () => {

    // @ts-ignore
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const networkId = await web3.eth.net.getId();
    accounts = await web3.eth.getAccounts();

    migration = new Migration(web3, networkId, accounts);
    await migration.runMigration(
      className,
      participantsPerFixture,
      leagueName,
      participants,
      year,
      eventStartTime
    );
    leagueAddress = migration.getLeagueAddress();
    resolvedResolverAddress = migration.getResolvedResolverAddress();
    unresolvedResolverAddress = migration.getUnresolvedResolverAddress();
    betManagerAddress = migration.getBetManagerAddress();
    backerAddress = accounts[3];
    layerAddress = accounts[4];
    nonApprovedAddress = accounts[6];
    pendingResolverAddress = accounts[6];

    resolutionPayload = migration.getResolutionPayload();

    fansunite = new FansUnite(web3, networkId);

    bet = {
      backer: backerAddress,
      layer: layerAddress,
      token: constants.NULL_ADDRESS,
      league: leagueAddress,
      resolver: unresolvedResolverAddress,
      backerStake: 2 * 10 ** constants.TOKEN_DECIMALS,
      fixture: fixtureId,
      odds: odds * 10 ** constants.ODDS_DECIMALS,
      expiration: 1893456000,
      payload: '0x4e5ef893',
      nonce: 1
    };
  });

  describe('LeagueRegistry', () => {
    it('should get a list of league addresses by class name', async () => {
      const result = await fansunite.leagueRegistry.getLeaguesByClass(className);
      expect(result[0]).to.be.equal(leagueAddress);
    });
    it('should return a league by an address', async () => {
      const result = await fansunite.leagueRegistry.getLeague(leagueAddress);
      expect(result.address).to.be.equal(leagueAddress);
      expect(result.name).to.be.equal(leagueName);
    });
    it('should return a list of populated leagues', async () => {
      const result = await fansunite.leagueRegistry.getClassWithLeagues(className);
      expect(result[0].address).to.be.equal(leagueAddress);
      expect(result[0].name).to.be.equal(leagueName);
    });
    it('should return `true` if league is registered', async () => {
      const result = await fansunite.leagueRegistry.isLeagueRegistered(leagueAddress);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if league is registered', async () => {
      const result = await fansunite.leagueRegistry.isLeagueRegistered(constants.NULL_ADDRESS);
      expect(result).to.be.equal(false);
    });
    it('should return `true` if class is supported', async () => {
      const result = await fansunite.leagueRegistry.isClassSupported(className);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if class is supported', async () => {
      const result = await fansunite.leagueRegistry.isClassSupported('not supported class');
      expect(result).to.be.equal(false);
    });
  });

  describe('League001', () => {
    it('should return the name of the league', async () => {
      const result = await fansunite.league001.getName(leagueAddress);
      expect(result).to.be.equal(leagueName);
    });
    it('should return the class name of the league', async () => {
      const result = await fansunite.league001.getClass(leagueAddress);
      expect(result).to.be.equal(className);
    });
    it('should return version of the league', async () => {
      const result = await fansunite.league001.getVersion(leagueAddress);
      expect(result).to.be.equal('0.0.1');
    });
    it('should return the list of seasons for the league', async () => {
      const result = await fansunite.league001.getSeasons(leagueAddress);
      expect(result).to.be.lengthOf(1);
      expect(Number(result[0])).to.be.equal(year);
    });
    it('should return the list of fixtures for the season for the league', async () => {
      const result = await fansunite.league001.getSeason(leagueAddress, year);
      expect(result).to.be.lengthOf(1);
      expect(Number(result[0])).to.be.equal(fixtureId);
    });
    it('should return the number of participants for the league', async () => {
      const result = await fansunite.league001.getParticipantCount(leagueAddress);
      expect(result).to.be.equal(2);
    });
    it('should return the participant for the league', async () => {
      const result = await fansunite.league001.getParticipant(leagueAddress, participantId);
      expect(result.id).to.be.equal(participantId);
      expect(result.name).to.be.equal(participants[0]);
      expect(result.details).to.be.equal(constants.NULL_HASH);
    });
    it('should return the list of participants for the league', async () => {
      const result = await fansunite.league001.getParticipants(leagueAddress);
      expect(result).to.be.lengthOf(2);
      expect(result[0].id).to.be.equal(1);
      expect(result[0].name).to.be.equal(participants[0]);
      expect(result[0].details).to.be.equal(constants.NULL_HASH);
      expect(result[1].id).to.be.equal(2);
      expect(result[1].name).to.be.equal(participants[1]);
      expect(result[1].details).to.be.equal(constants.NULL_HASH);
    });
    it('should return a fixture by its id for the league', async () => {
      const result = await fansunite.league001.getFixture(leagueAddress, fixtureId);
      expect(result.id).to.be.equal(fixtureId);
      expect(result.participants).to.be.deep.equal([1,2]);
      expect(result.start).to.be.deep.equal(eventStartTime);
    });
    it('should return a list of fixtures populated for the season', async () => {
      const result = await fansunite.league001.getSeasonWithFixtures(leagueAddress, year);
      expect(result).to.be.lengthOf(1);
      const fixture: Fixture = result[0] as Fixture;
      expect(fixture.id).to.be.equal(fixtureId);
      expect(fixture.participants).to.be.deep.equal([1,2]);
      expect(fixture.start).to.be.deep.equal(eventStartTime);
    });
    it('should return a list of registered resolvers', async () => {
      const result = await fansunite.league001.getResolvers(leagueAddress);
      expect(result).to.be.lengthOf(2);
      expect(result).to.be.deep.equal([resolvedResolverAddress, unresolvedResolverAddress]);
    });
    it('should return the resolution for a given fixture id and resolver', async () => {
      const result = await fansunite.league001.getResolution(leagueAddress, fixtureId, resolvedResolverAddress);
      expect(result).to.be.equal(resolutionPayload);
    });
    it('should return the fixture start time', async () => {
      const result = await fansunite.league001.getFixtureStart(leagueAddress, fixtureId);
      expect(result).to.be.equal(eventStartTime);
    });
    it('should return `true` if resolver is registered', async () => {
      const result = await fansunite.league001.isResolverRegistered(leagueAddress, resolvedResolverAddress);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if resolver is not registered', async () => {
      const result = await fansunite.league001.isResolverRegistered(leagueAddress, constants.NULL_ADDRESS);
      expect(result).to.be.equal(false);
    });
    it('should return `true` if a participant exists', async () => {
      const result = await fansunite.league001.isParticipant(leagueAddress, 1);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if a participant does not exists', async () => {
      const result = await fansunite.league001.isParticipant(leagueAddress, 100);
      expect(result).to.be.equal(false);
    });
    it('should return `true` if fixture is scheduled', async () => {
      const result = await fansunite.league001.isFixtureScheduled(leagueAddress, fixtureId);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if fixture is not scheduled', async () => {
      const result = await fansunite.league001.isFixtureScheduled(leagueAddress, 2);
      expect(result).to.be.equal(false);
    });
  });

  describe('Vault', () => {
    it('should approve the spender', async () => {
      await fansunite.vault.approve(betManagerAddress, backerAddress);
      await fansunite.vault.approve(betManagerAddress, layerAddress);

      const isBackerApproved = await fansunite.vault.isApproved(backerAddress, betManagerAddress);
      const isLayerApproved = await fansunite.vault.isApproved(layerAddress, betManagerAddress);
      const notApproved = await fansunite.vault.isApproved(nonApprovedAddress, betManagerAddress);

      expect(isBackerApproved).to.be.equal(true);
      expect(isLayerApproved).to.be.equal(true);
      expect(notApproved).to.be.equal(false);
    });
    it('should deposit tokens', async () => {
      await fansunite.vault.deposit(tokenAddress, 3 * 10 ** constants.TOKEN_DECIMALS, backerAddress);
      await fansunite.vault.deposit(tokenAddress, 2 * 10 ** constants.TOKEN_DECIMALS, layerAddress);

      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);
      const layerBalance = await fansunite.vault.balanceOf(tokenAddress, layerAddress);

      expect(Number(backerBalance)).to.be.equal(3 * 10 ** constants.TOKEN_DECIMALS);
      expect(Number(layerBalance)).to.be.equal(2 * 10 ** constants.TOKEN_DECIMALS);
    });
    it('should withdraw tokens', async () => {
      await fansunite.vault.withdraw(tokenAddress, 1 * 10 ** constants.TOKEN_DECIMALS, backerAddress);
      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);

      expect(Number(backerBalance)).to.be.equal(2 * 10 ** constants.TOKEN_DECIMALS);
    });
    it('should retrieve the balance for token', async () => {
      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);
      expect(Number(backerBalance)).to.be.equal(2 * 10 ** constants.TOKEN_DECIMALS);
    });
    it('should return `true` if address has approved spender', async () => {
      const result = await fansunite.vault.isApproved(backerAddress, betManagerAddress);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if address has approved spender', async () => {
      const result = await fansunite.vault.isApproved(backerAddress, constants.NULL_ADDRESS);
      expect(result).to.be.equal(false);
    });
  });

  describe('Registry', () => {
    it('should get the correct address using the `nameKey` BetManager ', async() => {
      const result = await fansunite.registry.getAddress('BetManager');
      expect(result.toLowerCase()).to.be.equal(betManagerAddress.toLowerCase());
    });
  });

  describe('ResolverRegistry', () => {
    it('should successfully add a resolver', async () => {
      await fansunite.resolverRegistry.addResolver(className, pendingResolverAddress, accounts[0]);
      const result = await fansunite.resolverRegistry.isResolverRegistered(className, pendingResolverAddress);
      expect(result).to.be.equal(1);
    });

    it('should successfully get the list of resolvers', async () => {
      const result = await fansunite.resolverRegistry.getResolvers(className);
      expect(result).to.be.deep.equal([resolvedResolverAddress, unresolvedResolverAddress]);
    });

    it('should return `true` if resolver is registered', async () => {
      const result = await fansunite.resolverRegistry.isResolverRegistered(className, resolvedResolverAddress);
      expect(result).to.be.equal(2);
    });
  });

  describe('BetManager', () => {
    before('initialize bettors', async () => {
      await fansunite.vault.deposit(bet.token, bet.backerStake, backerAddress);
      await fansunite.vault.deposit(bet.token, (bet.backerStake * odds) - bet.backerStake, layerAddress);
      await fansunite.vault.approve(betManagerAddress, backerAddress);
      await fansunite.vault.approve(betManagerAddress, layerAddress);
    });

    it('should submit a bet', async () => {
      await fansunite.vault.balanceOf(constants.NULL_ADDRESS, layerAddress);
      const signedBet = await fansunite.newSignedBet(bet);
      await fansunite.betManager.submitBet(signedBet, layerAddress, 6000000);
      const result = await fansunite.betManager.getBetsBySubject(layerAddress);
      expect(result).to.be.lengthOf(1);

      const betHash = fansunite.hashBet(bet);
      expect(result).to.be.deep.equal([betHash]);
    });

    it('should claim a bet', async () => {
      await migration.pushResolution(1, bet.resolver, '0x0001');
      // await fansunite.betManager.claimBet(bet, backerAddress, 6000000);
    });
  });

  describe('hashBet', () => {
    it('should hash the bet parameters', async () => {
      const betHash = fansunite.hashBet(bet);
    });
  });

  describe('signBet', () => {
    it('should sign the bet', async () => {
      const signedBet = await fansunite.newSignedBet(bet);
      const betHash = await fansunite.hashBet(bet);
      // TODO
    });
  });


  describe('generateNonce', () => {
    // TODO change to generate nonce
    it('should generate random number', async () => {
      const nonce = fansunite.generateNonce();
      // TODO
    });
  });

});
