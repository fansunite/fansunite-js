import { artifacts } from '../artifacts';
import { League } from '../types';
import { ContractWrapper } from './contract-wrapper';

export class LeagueRegistry extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async getLeaguesByClass(className: string) {
    const instance = this._getLeagueRegistryInstance();
    const result = await instance.methods.getClass(className).call();
    return result[1];
  }

  public async getLeague(leagueAddress: string) {
    const instance = this._getLeagueRegistryInstance();
    const result = await instance.methods.getLeague(leagueAddress).call();
    const league: League = {
      address: result[0],
      name: result[1],
      details: result[2]
    };
    return league;
  }

  public async getClassWithLeagues(className: string) {
    const leagueAddresses = await this.getLeaguesByClass(className);
    const leaguePromises: Array<Promise<League | undefined>> = leagueAddresses.map(async (address: string) =>
      this.getLeague(address)
    );
    const leagues = await Promise.all(leaguePromises);
    return leagues as League[];
  }

  public async isLeagueRegistered(leagueAddress: string) {
    const instance = this._getLeagueRegistryInstance();
    return instance.methods.isLeagueRegistered(leagueAddress).call();
  }

  private _getLeagueRegistryInstance() {
    return new this.web3.eth.Contract(
      artifacts.LeagueRegistry.abi,
      artifacts.LeagueRegistry.networks[this.networkId].address
    );
  }
}
