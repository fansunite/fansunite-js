import BN = require('bn.js');
import { Bet, NewSignedBet } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class BetManager extends ContractWrapper {
    private betManagerInstance;
    constructor(web3: any, networkId: number);
    submitBet(newSignedBet: NewSignedBet, from: string, gas: number): Promise<any>;
    claimBet(bet: Bet, from: string, gas: number): Promise<any>;
    claimPayout(league: string, resolver: string, token: string, fixture: BN, segment: string, from: string, gas: number): Promise<any>;
    getResult(league: string, resolver: string, fixture: number, payload: string): Promise<any>;
    getContractAddress(): any;
    private _getBetManagerInstance;
}
