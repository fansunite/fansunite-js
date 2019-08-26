import BN = require('bn.js');
import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class FanToken extends ContractWrapper {
  private fanTokenInstance;

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async balanceOf(user: string) {
    const instance = this._getFanTokenInstance();
    const result = await instance.methods.balanceOf(user).call();
    return new BN(result);
  }

  public async allowance(user: string, spender: string) {
    const instance = this._getFanTokenInstance();
    const result = await instance.methods.allowance(user, spender).call();
    return new BN(result);
  }

  public async approve(spender: string, amount: BN, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.approve(spender, amount).send({ from });
  }

  public async increaseAllowance(spender: string, amount: BN, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.increaseAllowance(spender, amount).send({ from });
  }

  public async decreaseAllowance(spender: string, amount: BN, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.decreaseAllowance(spender, amount).send({ from });
  }

  public getContractAddress() {
    return artifacts.FanToken.networks[this.networkId].address;
  }

  private _getFanTokenInstance() {
    if(this.fanTokenInstance) {
      return this.fanTokenInstance;
    }
    this.fanTokenInstance = new this.web3.eth.Contract(
      artifacts.FanToken.abi,
      artifacts.FanToken.networks[this.networkId].address
    );
    return this.fanTokenInstance;
  }
}
