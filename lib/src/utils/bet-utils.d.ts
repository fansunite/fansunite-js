import { Bet, NewSignedBet } from '../types';
export declare function newSignedBet(bet: Bet, layerTokenAmount: number, betPayload: string, signature: string): Promise<NewSignedBet>;
export declare function generateSalt(): number;
