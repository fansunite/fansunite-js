import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class Vault extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async approve(spender: string, from: string) {
    const instance = this._getVaultInstance();
    return instance.methods.approve(spender).send({ from });
  }

  public async deposit(token: string, amount: number, from: string) {
    const instance = this._getVaultInstance();
    return instance.methods.deposit(
      token,
      token === '0x0000000000000000000000000000000000000000' ? 0 : amount
    ).send({
      from,
      value: token === '0x0000000000000000000000000000000000000000' ? amount : undefined
    });
  }

  public async withdraw(token: string, amount: number, from: string) {
    const instance = this._getVaultInstance();
    return instance.methods.withdraw(token, amount).send({ from });
  }

  public async balanceOf(token: string, user: string) {
    const instance = this._getVaultInstance();
    return instance.methods.balanceOf(token, user).call();
  }

  public async isApproved(user: string, spender: string) {
    const instance = this._getVaultInstance();
    return instance.methods.isApproved(user, spender).call();
  }

  private _getVaultInstance() {
    return new this.web3.eth.Contract(artifacts.Vault.abi, artifacts.Vault.networks[this.networkId].address);
  }
}
