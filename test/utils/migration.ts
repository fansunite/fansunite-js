import Web3 = require('web3');
import * as BetManager from '../../src/artifacts/BetManager.json';
import * as League001 from '../../src/artifacts/League001.json';
import * as LeagueRegistry from '../../src/artifacts/LeagueRegistry.json';
import * as ResolverRegistry from '../../src/artifacts/ResolverRegistry.json';
import * as RMoneyLine2 from '../../src/artifacts/RMoneyLine2.json';
import * as Vault from '../../src/artifacts/Vault.json';
import { constants } from './constants';

export class Migration {

  private leagueRegInstance: any;
  private leagueInstance: any;
  private vaultInstance: any;
  private resolverRegistryInstance: any;
  private web3: Web3;
  private networkId: number;
  private accounts: string[];
  private owner: string;
  private leagueAddress: string;
  private resolverAddress: string;
  private betManagerAddress: string;
  private gas: number;
  private resolutionPayload: string;

  public constructor (web3: Web3, networkId: number, accounts: string[]) {

    this.web3 = web3;
    this.networkId = networkId;
    this.accounts = accounts;
    this.owner = accounts[0];
    this.resolverAddress = accounts[5];
    this.leagueAddress = constants.NULL_ADDRESS;
    this.gas = 6000000;
    this.resolutionPayload = '0x0123';

    const leagueRegistry = LeagueRegistry as any;
    this.leagueRegInstance = new this.web3.eth.Contract(
      leagueRegistry.abi,
      leagueRegistry.networks[this.networkId].address
    );

    const vault = Vault as any;
    this.vaultInstance = new web3.eth.Contract(
      vault.abi,
      vault.networks[networkId].address
    );

    const resolverRegistry = ResolverRegistry as any;
    this.resolverRegistryInstance = new web3.eth.Contract(
      resolverRegistry.abi,
      resolverRegistry.networks[networkId].address
    );

    const betManager = BetManager as any;
    this.betManagerAddress = betManager.networks[this.networkId].address;
  }

  public async runMigration(
    className: string,
    participantsPerFixture: number,
    leagueName: string,
    participants: string[],
    year: number,
    eventStartTime: number
  ) {
    await this.createClass(className, participantsPerFixture);
    await this.createLeague(className, leagueName);

    const league001 = League001 as any;
    this.leagueInstance = new this.web3.eth.Contract(
      league001.abi,
      this.leagueAddress
    );

    await this.addSeason(year);
    await this.addParticipant(participants[0]);
    await this.addParticipant(participants[1]);
    await this.scheduleFixture(year, [1,2], eventStartTime);
    await this.createResolver();
    await this.registerResolver(className, this.resolverAddress);

    await this.pushResolution(1, this.resolverAddress, this.resolutionPayload);
    await this.addSpender(this.betManagerAddress);
  }

  public getLeagueAddress(){
    return this.leagueAddress;
  }

  public getResolverAddress(){
    return this.resolverAddress;
  }

  public getBetManagerAddress(){
    return this.betManagerAddress;
  }

  public getResolutionPayload(){
    return this.resolutionPayload;
  }

  private async createLeague(className: string, leagueName: string) {
    const tx = await this.leagueRegInstance.methods.createLeague(className, leagueName).send({from: this.owner, gas: this.gas});
    this.leagueAddress = tx.events.LogLeagueAdded.returnValues._league;
  }

  private async createClass(className: string, participantsPerFixture: number) {
    await this.leagueRegInstance.methods.createClass(className, participantsPerFixture).send({from: this.owner, gas: this.gas});
  }

  private async addSeason(year: number) {
    await this.leagueInstance.methods.addSeason(year).send( {from: this.owner});
  }

  private async addParticipant(participantName: string) {
    await this.leagueInstance.methods.addParticipant(participantName, constants.NULL_HASH).send( {from: this.owner, gas: this.gas});
  }

  private async scheduleFixture(season: number, participants: number[], startTime: number) {
    await this.leagueInstance.methods.scheduleFixture(season, participants, startTime).send( {from: this.owner, gas: this.gas});
  }

  private async registerResolver(className: string, resolverAddress: string) {
    await this.resolverRegistryInstance.methods.addResolver(className, resolverAddress).send({from: this.owner});
    await this.resolverRegistryInstance.methods.registerResolver(className, resolverAddress).send({from: this.owner, gas: this.gas});
    await this.leagueInstance.methods.registerResolver(resolverAddress).send({from: this.owner, gas: this.gas});
  }

  private async pushResolution(fixtureId: number, resolverAddress: string, resolutionPayload: string) {
    await this.leagueInstance.methods.pushResolution(fixtureId, resolverAddress, resolutionPayload).send({from: this.owner, gas: this.gas});
  }

  private async addSpender(address: string) {
    await this.vaultInstance.methods.addSpender(address).send({from: this.owner});
  }

  private async createResolver() {
    const rMoneyLine2 = RMoneyLine2 as any;
    const rMoneyline2Contract = new this.web3.eth.Contract(rMoneyLine2.abi);
    await new Promise( resolve => {
      rMoneyline2Contract
        .deploy({data: rMoneyLine2.bytecode, arguments: ['0.0.1']})
        .send({from: this.owner, gas: this.gas})
        .on('receipt', receipt => {
          this.resolverAddress = receipt.contractAddress;
          resolve();
        });
    });
  }

}