import { Bet } from '../types';
export declare function signBet(web3: any, bet: Bet, hash: string, sigMode: string): Promise<string>;
export declare function personalSignBet(web3: any, bet: Bet, hash: string, sigMode: string): Promise<string>;
