import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class ResolverRegistry extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public addResolver(className: string, resolver: string, from: string) {
    const instance = this._getResolverRegistryInstance();
    return instance.methods.addResolver(className, resolver, { from });
  }

  public getResolvers(className: string) {
    const instance = this._getResolverRegistryInstance();
    return instance.methods.getResolvers(className).call();
  }

  public isResolverRegistered(className: string, resolver: string) {
    const instance = this._getResolverRegistryInstance();
    return instance.methods.isResolverRegistered(className, resolver).call();
  }

  private _getResolverRegistryInstance() {
    return new this.web3.eth.Contract(artifacts.ResolverRegistry.abi, artifacts.ResolverRegistry.networks[this.networkId].address);
  }

}