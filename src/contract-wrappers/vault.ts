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

    return new Promise(async (resolve, reject) => {
      try{
        return instance.methods.deposit(token, amount)
          .send({ from, value: amount })
          .on('receipt', (receipt: any) => {
            console.log(receipt);
            return resolve(receipt.transactionHash);
          })
          .catch((err: any) => reject(err));
      } catch (err) {
        return reject(err);
      }
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
