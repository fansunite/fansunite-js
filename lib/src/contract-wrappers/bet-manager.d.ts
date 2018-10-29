import { NewSignedBet, Bet } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class BetManager extends ContractWrapper {
    constructor(web3: any, networkId: number);
    submitBet(newSignedBet: NewSignedBet, from: string, gas: number): Promise<any>;
    claimBet(bet: Bet, from: string, gas: number): Promise<any>;
    getResult(league: string, resolver: string, fixture: number, payload: string): Promise<any>;
    getBetsBySubject(subject: string): Promise<any>;
    getContractAddress(): any;
    private _getBetManagerInstance;
}
