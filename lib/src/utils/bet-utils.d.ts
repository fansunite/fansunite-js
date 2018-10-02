import { Bet, NewSignedBet } from '../types';
export declare function newSignedBet(bet: Bet, signature: string): Promise<NewSignedBet>;
export declare function generateNonce(): number;
