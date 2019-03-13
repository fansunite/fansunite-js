import BN = require('bn.js');
import { artifacts } from '../artifacts';
import { ContractWrapper } from './contract-wrapper';

export class Erc20Token extends ContractWrapper {

  private tokenContracts: { [address: string]: any };

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
    this.tokenContracts = {};
  }

  public async name(tokenAddress: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.name().call();
  }

  public async symbol(tokenAddress: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.symbol().call();
  }

  public async totalSupply(tokenAddress: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    const result = await instance.methods.totalSupply().call();
    return new BN(result);
  }

  public async decimals(tokenAddress: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    const result = await instance.methods.decimals().call();
    return new BN(result);
  }

  public async balanceOf(tokenAddress: string, user: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    const result = await instance.methods.balanceOf(user).call();
    return new BN(result);
  }

  public async allowance(tokenAddress: string, user: string, spender: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    const result = await instance.methods.allowance(user, spender).call();
    return new BN(result);
  }

  public async transfer(tokenAddress, to: string, value: BN, from: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.transfer(to, value).send({ from });
  }

  public async transferFrom(tokenAddress, from: string, to: string, value: BN) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.transferFrom(from, to, value).send({ from });
  }

  public async approve(tokenAddress: string, spender: string, amount: BN, from: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.approve(spender, amount).send({ from });
  }

  public async increaseAllowance(tokenAddress: string, spender: string, amount: BN, from: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.increaseAllowance(spender, amount).send({ from });
  }

  public async decreaseAllowance(tokenAddress: string, spender: string, amount: BN, from: string) {
    const instance = this._getTokenContractInstance(tokenAddress);
    return instance.methods.decreaseAllowance(spender, amount).send({ from });
  }

  private _getTokenContractInstance(tokenAddress: string) {
    if (this.tokenContracts[tokenAddress]) {
      return this.tokenContracts[tokenAddress]
    }
    const tokenContract = new this.web3.eth.Contract(artifacts.ERC20.abi, tokenAddress);
    this.tokenContracts[tokenAddress] = tokenContract;
    return tokenContract;
  }
}
