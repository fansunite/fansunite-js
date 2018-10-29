import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class Registry extends ContractWrapper {
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
    return new this.web3.eth.Contract(
      artifacts.Registry.abi,
      artifacts.Registry.networks[this.networkId].address
    );
  }
}
