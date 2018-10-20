import { artifacts } from '../artifacts';
import { Fixture, Participant } from '../types';
import { ContractWrapper } from './contract-wrapper';

export class League001 extends ContractWrapper {
  private leagueContracts: { [address: string]: any };

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
    this.leagueContracts = {};
  }

  public async getName(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getName().call();
  }

  public async getClass(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getClass().call();
  }

  public async getVersion(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getVersion().call();
  }

  public async getSeasons(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getSeasons().call();
  }

  public async getSeason(leagueAddress: string, year: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    const result = await instance.methods.getSeason(year).call();
    return result[1];
  }

  public async getFixture(leagueAddress: string, id: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    const result = await instance.methods.getFixture(id).call();
    const fixture: Fixture = {
      id: Number(result[0]),
      participants: result[1].map((p: string) => Number(p)),
      start: Number(result[2])
    };
    return fixture;
  }

  public async getFixtureStart(leagueAddress: string, id: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    const result = await instance.methods.getFixtureStart(id).call();
    return Number(result);
  }

  public async getSeasonWithFixtures(leagueAddress: string, year: number) {
    const fixtureIds = await this.getSeason(leagueAddress, year);
    const fixturePromises = fixtureIds.map(async (id: number) => this.getFixture(leagueAddress, id));
    const fixtures = await Promise.all(fixturePromises);
    return fixtures;
  }

  public async getParticipants(leagueAddress: string) {
    let participants = Array.apply(null, {length: await this.getParticipantCount(leagueAddress)}).map(Number.call, Number);
    const participantPromises = participants.map(async(n: number) => this.getParticipant(leagueAddress, n+1));
    participants = await Promise.all(participantPromises);
    return participants;
  }

  public async getParticipantCount(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    const count = await instance.methods.getParticipantCount().call();
    return Number(count);
  }

  public async getParticipant(leagueAddress: string, id: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    const result = await instance.methods.getParticipant(id).call();
    const participant: Participant = {
      id:  Number(result[0]),
      name: result[1],
      details: result[2]
    };
    return participant;
  }

  public async getResolution(leagueAddress: string, fixtureId: number, resolver: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getResolution(fixtureId, resolver).call();
  }

  public async isParticipant(leagueAddress: string, id: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.isParticipant(id).call();
  }

  public async isFixtureScheduled(leagueAddress: string, fixtureId: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.isFixtureScheduled(fixtureId).call();
  }

  private _getLeagueContractInstance(leagueAddress: string) {
    if (this.leagueContracts[leagueAddress]) {
      return this.leagueContracts[leagueAddress];
    }
    const leagueContract = new this.web3.eth.Contract(artifacts.League001.abi, leagueAddress);
    this.leagueContracts[leagueAddress] = leagueContract;
    return leagueContract;
  }
}
