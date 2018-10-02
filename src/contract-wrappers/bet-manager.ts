import { artifacts } from '../artifacts';
import { NewSignedBet } from '../types';
import { ContractWrapper } from './contract-wrapper';

export class BetManager extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async fillBet(newSignedBet: NewSignedBet, layerTokenFillAmount: number, from: string) {
    const instance = this._getBetManagerInstance();
    return instance.methods
      .fillBet(
        newSignedBet.betAddresses,
        newSignedBet.betValues,
        layerTokenFillAmount,
        newSignedBet.salt,
        newSignedBet.betPayload,
        newSignedBet.signature
      )
      .send({ from, gas: 6000000 });
  }

  public async filled(betHash: string) {
    const instance = this._getBetManagerInstance();
    return instance.methods.filled(betHash).call();
  }

  private _getBetManagerInstance() {
    return new this.web3.eth.Contract(artifacts.BetManager.abi, artifacts.BetManager.networks[this.networkId].address);
  }
}
