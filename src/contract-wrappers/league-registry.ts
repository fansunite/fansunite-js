import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class LeagueRegistry extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async getLeaguesByClass(className: string): Promise<string[]> {
    const instance = this._getLeagueRegistryInstance();
    const result = await instance.methods.getClass(className).call();
    return result[1];
  }

  private _getLeagueRegistryInstance() {
    return new this.web3.eth.Contract(
      artifacts.LeagueRegistry.abi,
      artifacts.LeagueRegistry.networks[this.networkId].address
    );
  }
}
