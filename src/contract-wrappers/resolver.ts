import BN = require('bn.js');
import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class Resolver extends ContractWrapper {
  private resolverContracts: { [address: string]: any };

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
    this.resolverContracts = {};
  }

  public async getDescription(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getDescription().call();
  }

  public async getType(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getType().call();
  }

  public async getDetails(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getDetails().call();
  }

  public async getInitSelector(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getInitSelector().call();
  }

  public async getValidatorSelector(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getValidatorSelector().call();
  }

  public async getSegmentSelector(resolverAddress: string) {
    const instance = this._getResolverContractInstance(resolverAddress);
    return instance.methods.getSegmentSelector().call();
  }

  public async getSegment(
    resolverAddress: string,
    leagueAddress: string,
    fixtureId: BN,
    payload: string
  ) {
    const segmentSelector = await this.getSegmentSelector(resolverAddress);
    const encodedLeagueFixture = await this.web3.eth.abi.encodeParameters(['address', 'uint256'], [leagueAddress, fixtureId]);
    const data = `${segmentSelector}${encodedLeagueFixture.replace('0x', '')}${payload.replace('0x','')}`;
    return this.web3.eth.call({ to: resolverAddress, data});
  }
  
  private _getResolverContractInstance(resolverAddress: string) {
    if (this.resolverContracts[resolverAddress]) {
      return this.resolverContracts[resolverAddress];
    }
    const resolverContract = new this.web3.eth.Contract(artifacts.Resolver.abi, resolverAddress);
    this.resolverContracts[resolverAddress] = resolverContract;
    return resolverContract;
  }
}
