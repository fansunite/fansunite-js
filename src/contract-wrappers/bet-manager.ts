import BN = require('bn.js');
import { artifacts } from '../artifacts';
import { Bet, NewSignedBet } from '../types';
import { ContractWrapper } from './contract-wrapper';

export class BetManager extends ContractWrapper {
  private betManagerInstance;

  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }

  public async submitBet(newSignedBet: NewSignedBet, from: string, gas: number) {
    const instance = this._getBetManagerInstance();
    return instance.methods
      .submitBet(
        newSignedBet.subjects,
        newSignedBet.params,
        newSignedBet.nonce,
        newSignedBet.payload,
        newSignedBet.signature
      )
      .send({ from, gas });
  }

  public async claimBet(bet: Bet, from: string, gas: number) {
    const instance = this._getBetManagerInstance();
    return instance.methods
      .claimBet(
        [ bet.backer, bet.layer, bet.token, bet.league, bet.resolver ],
        [ bet.backerStake, bet.fixture, bet.odds, bet.expiration ],
        bet.nonce,
        bet.payload
      )
      .send({ from, gas });
  }

  public async claimPayout(
    league: string,
    resolver: string,
    token: string,
    fixture: BN,
    segment: string,
    from: string,
    gas: number
  ) {
    const instance = this._getBetManagerInstance();
    return instance.methods.claimPayout(league, resolver, token, fixture, segment).send({from, gas})
  }

  public async getResult(league: string, resolver: string, fixture: number, payload: string) {
    const instance = this._getBetManagerInstance();
    return instance.methods.getResult(league, resolver, fixture, payload).call();
  }

  public getContractAddress() {
    return artifacts.BetManager.networks[this.networkId].address;
  }

  private _getBetManagerInstance() {
    if(this.betManagerInstance) {
      return this.betManagerInstance;
    }
    this.betManagerInstance = new this.web3.eth.Contract(artifacts.BetManager.abi, artifacts.BetManager.networks[this.networkId].address);
    return this.betManagerInstance;
  }
}
