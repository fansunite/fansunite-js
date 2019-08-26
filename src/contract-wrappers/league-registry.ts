import { artifacts } from '../artifacts';
import { League } from '../types';
import { ContractWrapper } from './contract-wrapper';

export class LeagueRegistry extends ContractWrapper {
  private leagueRegistryInstance;

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

  public async isClassSupported(className: string) {
    const instance = this._getLeagueRegistryInstance();
    return instance.methods.isClassSupported(className).call();
  }

  public getContractAddress() {
    return artifacts.LeagueRegistry.networks[this.networkId].address
  }

  private _getLeagueRegistryInstance() {
    if(this.leagueRegistryInstance) {
      return this.leagueRegistryInstance;
    }
    this.leagueRegistryInstance = new this.web3.eth.Contract(
      artifacts.LeagueRegistry.abi,
      artifacts.LeagueRegistry.networks[this.networkId].address
    );
    return this.leagueRegistryInstance;
  }
}
