import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class FanToken extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async balanceOf(user: string) {
    const instance = this._getFanTokenInstance();
    const result = await instance.methods.balanceOf(user).call();
    return result;
  }

  public async approve(spender: string, amount: number, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.approve(spender, amount).send({ from });
  }

  public async increaseAllowance(spender: string, amount: number, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.increaseAllowance(spender, amount).send({ from });
  }

  public async decreaseAllowance(spender: string, amount: number, from: string) {
    const instance = this._getFanTokenInstance();
    return instance.methods.decreaseAllowance(spender, amount).send({ from });
  }

  public getContractAddress() {
    return artifacts.FanToken.networks[this.networkId].address;
  }

  private _getFanTokenInstance() {
    return new this.web3.eth.Contract(
      artifacts.FanToken.abi,
      artifacts.FanToken.networks[this.networkId].address
    );
  }
}
