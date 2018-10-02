import { artifacts } from '../artifacts';
import { Fixture } from '../types';
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

  public async getDetails(leagueAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getDetails().call();
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
      id: result[0],
      participants: result[1],
      start: result[2]
    };
    return fixture;
  }

  public async getSeasonWithFixtures(leagueAddress: string, year: number) {
    const fixtureIds = await this.getSeason(leagueAddress, year);
    const fixturePromises = fixtureIds.map(async (id: number) => this.getFixture(leagueAddress, id));
    const fixtures = await Promise.all(fixturePromises);
    return fixtures;
  }

  public async getParticipants(leagueAddress: string) {
    // TODO implement in smart contract
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getParticipants.call();
  }

  public async getParticipant(leagueAddress: string, id: number) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.getParticipant(id).call();
  }

  public async isResolverRegistered(leagueAddress: string, resolverAddress: string) {
    const instance = this._getLeagueContractInstance(leagueAddress);
    return instance.methods.isResolverRegistered(resolverAddress).call();
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
