import BN = require('bn.js');
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
const year = new BN(2018);
const fixtureId = new BN(1);
const participantId = new BN(1);
const eventStartTime = new BN(Math.round(Date.now() / 1000) + 3600);

let leagueAddress: string;
let moneylineResolverAddress: string;
let resolvedResolverAddress: string;
let unresolvedResolverAddress: string;
let betManagerAddress: string;
let backerAddress: string;
let nonApprovedAddress: string;
let pendingResolverAddress: string;
let layerAddress: string;
let fanTokenAddress: string;
let mintAmount: BN;
const tokenAddress = constants.NULL_ADDRESS; // ETH Token
const odds = new BN(2);

const tokenMultiple = new BN(10).pow(new BN(constants.TOKEN_DECIMALS));

let resolutionPayload: string;

let bet: Bet;
let migration: Migration;
let web3: Web3;

describe('FansUnite library', () => {
  before(async () => {

    // @ts-ignore
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    const networkId = await web3.eth.net.getId();
    accounts = await web3.eth.getAccounts();

    migration = new Migration(web3, networkId, accounts);
    backerAddress = accounts[3];
    mintAmount = new BN(100000);
    await migration.runMigration(
      className,
      participantsPerFixture,
      leagueName,
      participants,
      year,
      eventStartTime,
      backerAddress,
      mintAmount
    );
    leagueAddress = migration.getLeagueAddress();
    moneylineResolverAddress = migration.getResolvedResolverAddress();
    resolvedResolverAddress = migration.getResolvedResolverAddress();
    unresolvedResolverAddress = migration.getUnresolvedResolverAddress();
    betManagerAddress = migration.getBetManagerAddress();
    fanTokenAddress = migration.getFanTokenAddress();
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
      backerStake: new BN(2).mul(new BN(10).pow(new BN(constants.TOKEN_DECIMALS))),
      fixture: fixtureId,
      odds: odds.mul(new BN(10).pow(new BN(constants.ODDS_DECIMALS))),
      expiration: new BN(1893456000),
      payload: web3.eth.abi.encodeParameters(['uint256'],[1]),
      nonce: new BN(1)
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
      expect(Number(result[0])).to.be.equal(year.toNumber());
    });
    it('should return the list of fixtures for the season for the league', async () => {
      const result = await fansunite.league001.getSeason(leagueAddress, year);
      expect(result).to.be.lengthOf(1);
      expect(Number(result[0])).to.be.equal(fixtureId.toNumber());
    });
    it('should return the number of participants for the league', async () => {
      const result = await fansunite.league001.getParticipantCount(leagueAddress);
      expect(result).to.be.equal(2);
    });
    it('should return the participant for the league', async () => {
      const result = await fansunite.league001.getParticipant(leagueAddress, participantId);
      expect(Number(result.id)).to.be.equal(participantId.toNumber());
      expect(result.name).to.be.equal(participants[0]);
      expect(result.details).to.be.equal(constants.NULL_HASH);
    });
    it('should return the list of participants for the league', async () => {
      const result = await fansunite.league001.getParticipants(leagueAddress);
      expect(result).to.be.lengthOf(2);
      expect(result[0].id.toNumber()).to.be.equal(1);
      expect(result[0].name).to.be.equal(participants[0]);
      expect(result[0].details).to.be.equal(constants.NULL_HASH);
      expect(result[1].id.toNumber()).to.be.equal(2);
      expect(result[1].name).to.be.equal(participants[1]);
      expect(result[1].details).to.be.equal(constants.NULL_HASH);
    });
    it('should return a fixture by its id for the league', async () => {
      const result = await fansunite.league001.getFixture(leagueAddress, fixtureId);
      expect(result.id.toNumber()).to.be.equal(fixtureId.toNumber());
      expect(result.participants).to.be.deep.equal([1,2]);
      expect(result.start).to.be.deep.equal(eventStartTime.toNumber());
    });
    it('should return a list of fixtures populated for the season', async () => {
      const result = await fansunite.league001.getSeasonWithFixtures(leagueAddress, year);
      expect(result).to.be.lengthOf(1);
      const fixture: Fixture = result[0] as Fixture;
      expect(fixture.id.toNumber()).to.be.equal(fixtureId.toNumber());
      expect(fixture.participants).to.be.deep.equal([1,2]);
      expect(fixture.start).to.be.deep.equal(eventStartTime.toNumber());
    });
    it('should return the resolution for a given fixture id and resolver', async () => {
      const result = await fansunite.league001.getResolution(leagueAddress, fixtureId, resolvedResolverAddress);
      expect(result).to.be.equal(resolutionPayload);
    });
    it('should return the fixture start time', async () => {
      const result = await fansunite.league001.getFixtureStart(leagueAddress, fixtureId);
      expect(result).to.be.equal(eventStartTime.toNumber());
    });
    it('should return `true` if a participant exists', async () => {
      const result = await fansunite.league001.isParticipant(leagueAddress, new BN(1));
      expect(result).to.be.equal(true);
    });
    it('should return `false` if a participant does not exists', async () => {
      const result = await fansunite.league001.isParticipant(leagueAddress, new BN(100));
      expect(result).to.be.equal(false);
    });
    it('should return `true` if fixture is scheduled', async () => {
      const result = await fansunite.league001.isFixtureScheduled(leagueAddress, fixtureId);
      expect(result).to.be.equal(true);
    });
    it('should return `false` if fixture is not scheduled', async () => {
      const result = await fansunite.league001.isFixtureScheduled(leagueAddress, new BN(2));
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
      await fansunite.vault.deposit(tokenAddress, new BN(3).mul(tokenMultiple), backerAddress);
      await fansunite.vault.deposit(tokenAddress, new BN(2).mul(tokenMultiple), layerAddress);

      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);
      const layerBalance = await fansunite.vault.balanceOf(tokenAddress, layerAddress);

      expect(backerBalance.toString()).to.be.equal(new BN(3).mul(tokenMultiple).toString());
      expect(layerBalance.toString()).to.be.equal(new BN(2).mul(tokenMultiple).toString());
    });
    it('should withdraw tokens', async () => {
      await fansunite.vault.withdraw(tokenAddress, new BN(1).mul(tokenMultiple), backerAddress);
      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);

      expect(backerBalance.toString()).to.be.equal(new BN(2).mul(tokenMultiple).toString());
    });
    it('should transfer tokens from within vault', async () => {
      const backerBalanceBefore = await fansunite.vault.balanceOf(tokenAddress, backerAddress);
      const layerBalanceBefore = await fansunite.vault.balanceOf(tokenAddress, layerAddress);

      await fansunite.vault.transfer(tokenAddress, layerAddress, new BN(1).mul(tokenMultiple), backerAddress);

      const backerBalance = await fansunite.vault.balanceOf(tokenAddress, backerAddress);
      const layerBalance = await fansunite.vault.balanceOf(tokenAddress, layerAddress);

      expect(backerBalance.toString()).to.be.equal(backerBalanceBefore.sub(new BN(1).mul(tokenMultiple)).toString());
      expect(layerBalance.toString()).to.be.equal(layerBalanceBefore.add(new BN(1).mul(tokenMultiple)).toString());
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

    it('should return `true` if resolver is used', async () => {
      const result = await fansunite.resolverRegistry.isResolverUsed(leagueAddress, resolvedResolverAddress);
      expect(result).to.be.equal(true);
    });
  });

  describe('Resolver', () => {
    it('should get the description for a resolver', async() => {
      const result = await fansunite.resolver.getDescription(moneylineResolverAddress);
      expect(result).to.be.equal('Common MoneyLine Resolver for two participant leagues: Bet on who wins the fixture');
    });

    it('should get the type of a resolver', async() => {
      const result = await fansunite.resolver.getType(moneylineResolverAddress);
      expect(result).to.be.equal('Moneyline2 (Win/Lose/Draw)');
    });

    it('should get the details for a resolver', async() => {
      const result = await fansunite.resolver.getDetails(moneylineResolverAddress);
      expect(result).to.be.equal(null);
    });

    it('should get init selector for a resolver', async() => {
      const result = await fansunite.resolver.getInitSelector(moneylineResolverAddress);
      expect(result).to.be.equal('0xde84791d');
    });

    it('should get validator selector for a resolver', async() => {
      const result = await fansunite.resolver.getValidatorSelector(moneylineResolverAddress);
      expect(result).to.be.equal('0xd71fbd7f');
    });

    it('should get segment selector for a resolver', async() => {
      const result = await fansunite.resolver.getSegmentSelector(moneylineResolverAddress);
      expect(result).to.be.equal('0xe7937993');
    });

    it('should get validator selector details for a resolver', async() => {
      const result = await fansunite.resolver.getSegment(moneylineResolverAddress, leagueAddress, fixtureId, bet.payload);
      expect(result).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001');
    });
  });

  describe('BetManager', () => {
    before('initialize bettors', async () => {
      await fansunite.vault.deposit(bet.token, bet.backerStake, backerAddress);
      await fansunite.vault.deposit(bet.token, bet.backerStake.mul(odds).sub(bet.backerStake), layerAddress);
      await fansunite.vault.approve(betManagerAddress, backerAddress);
      await fansunite.vault.approve(betManagerAddress, layerAddress);
    });

    it('should submit a bet', async () => {
      await fansunite.vault.balanceOf(constants.NULL_ADDRESS, layerAddress);
      const signedBet = await fansunite.newTypedDataSignBet(bet, false);
      await fansunite.betManager.submitBet(signedBet, layerAddress, 6000000);
      // expect(result).to.be.lengthOf(1);
      // TODO

      const betHash = fansunite.hashBet(bet);
      // expect(result).to.be.deep.equal([betHash]);
      // TODO
    });

    it('should claim a bet', async () => {
      await migration.pushResolution(1, bet.resolver, web3.eth.abi.encodeParameter('uint256', 1));
      await fansunite.betManager.claimBet(bet, backerAddress, 6000000);
      // TODO
    });

    it('should claim a payout', async () => {
      const segment = await fansunite.resolver.getSegment(unresolvedResolverAddress, leagueAddress, fixtureId, bet.payload);
      await migration.pushResolution(1, bet.resolver, web3.eth.abi.encodeParameter('uint256', 1));
      await fansunite.betManager.claimPayout(leagueAddress, unresolvedResolverAddress, tokenAddress, fixtureId, segment, layerAddress, 6000000);
      // TODO
    });
  });

  describe('ERC20Token', () => {

    it('should return the name of a token', async() => {
      const result = await fansunite.erc20Token.name(fanTokenAddress);
      expect(result).to.be.equal('FansUnite Token');
    });

    it('should return the symbol supply for the token', async() => {
      const result = await fansunite.erc20Token.symbol(fanTokenAddress);
      expect(result).to.be.equal('FAN');
    });

    it('should return the total supply for the token', async() => {
      const result = await fansunite.erc20Token.totalSupply(fanTokenAddress);
      expect(result.toString()).to.be.equal(mintAmount.toString());
    });

    it('should return the decimals for the token', async() => {
      const result = await fansunite.erc20Token.decimals(fanTokenAddress);
      expect(result.toString()).to.be.equal('18');
    });

    it('should return balance of a token holder', async() => {
      const result = await fansunite.erc20Token.balanceOf(fanTokenAddress, backerAddress);
      expect(result.toString()).to.be.equal(mintAmount.toString());
    });

    it('should return the spender allowance of a token holder', async() => {
      const result = await fansunite.erc20Token.allowance(fanTokenAddress, backerAddress, layerAddress);
      expect(result.toString()).to.be.equal('0');
    });

    it('should transfer a token to an address', async() => {
      const transferAmount = new BN(100);
      await fansunite.erc20Token.transfer(fanTokenAddress, layerAddress, transferAmount, backerAddress);
      const backerBalance = await fansunite.erc20Token.balanceOf(fanTokenAddress, backerAddress);
      expect(backerBalance.toString()).to.be.equal(mintAmount.sub(transferAmount).toString());
      const layerBalance = await fansunite.erc20Token.balanceOf(fanTokenAddress, layerAddress);
      expect(layerBalance.toString()).to.be.equal(transferAmount.toString());
    });

    it('should approve a spender a specific amount', async() => {
      const allowance = new BN(100);
      const allowanceBefore = await fansunite.erc20Token.allowance(fanTokenAddress, backerAddress, layerAddress);
      await fansunite.erc20Token.approve(fanTokenAddress, layerAddress, allowance, backerAddress);
      const allowanceAfter = await fansunite.erc20Token.allowance(fanTokenAddress, backerAddress, layerAddress);
      expect(allowanceAfter.toString()).to.be.equal(allowanceBefore.add(allowance).toString());
    });

  });

  describe('hashBet', () => {
    it('should hash the bet parameters', async () => {
      // const betHash = fansunite.hashBet(bet);
      // TODO
    });
  });

  describe('signBet', () => {
    it('should sign the bet', async () => {
      // const signedBet = await fansunite.newTypedDataSignBet(bet);
      // const betHash = await fansunite.hashBet(bet);
      // TODO
    });
  });


  describe('generateNonce', () => {
    it('should generate random number', async () => {
      // const nonce = fansunite.generateNonce();
      // TODO
    });
  });

});
