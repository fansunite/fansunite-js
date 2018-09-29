import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class ResolverRegistry extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async addResolver(className: string, resolver: string, from: string) {
    const instance = this._getResolverRegistryInstance();
    return instance.methods.addResolver(className, resolver).send({ from });
  }

  public async getResolvers(className: string) {
    const instance = this._getResolverRegistryInstance();
    return instance.methods.getResolvers(className).call();
  }

  public async isResolverRegistered(className: string, resolver: string) {
    const instance = this._getResolverRegistryInstance();
    const isResolverRegistered = await instance.methods.isResolverRegistered(className, resolver).call();
    return Number(isResolverRegistered);
  }

  private _getResolverRegistryInstance() {
    return new this.web3.eth.Contract(artifacts.ResolverRegistry.abi, artifacts.ResolverRegistry.networks[this.networkId].address);
  }

}