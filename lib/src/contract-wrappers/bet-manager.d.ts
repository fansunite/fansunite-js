import { NewSignedBet } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class BetManager extends ContractWrapper {
    constructor(web3: any, networkId: number);
    fillBet(newSignedBet: NewSignedBet, layerTokenFillAmount: number, from: string): Promise<any>;
    filled(betHash: string): Promise<any>;
    private _getBetManagerInstance;
}
