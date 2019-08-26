import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class Registry extends ContractWrapper {
  private registryInstance;

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async getAddress(nameKey: string) {
    const instance = this._getRegistryInstance();
    return instance.methods.getAddress(nameKey).call();
  }

  public getContractAddress() {
    return artifacts.Registry.networks[this.networkId].address;
  }

  private _getRegistryInstance() {
    if(this.registryInstance) {
      return this.registryInstance;
    }
    this.registryInstance = new this.web3.eth.Contract(
      artifacts.Registry.abi,
      artifacts.Registry.networks[this.networkId].address
    );
    return this.registryInstance;
  }
}
