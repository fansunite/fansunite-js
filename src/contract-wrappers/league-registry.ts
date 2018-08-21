import { ContractWrapper } from './contract-wrapper';
import { artifacts } from 'src/artifacts';

export class LeagueRegistry extends ContractWrapper {

  constructor(web3: any) {
    super(web3);
  }

  public async getClass(className: string): Promise<[string, string[]]> {
    const instance = this._getLeagueRegistryInstance();
    return await instance.methods.getClass(className);
  }

  private _getLeagueRegistryInstance() {
    return new this._web3.eth.Contract(
      artifacts.LeagueRegistry.abi,
      artifacts.LeagueRegistry.networks[this._web3.eth.net.getId()].address
    );
  }

}