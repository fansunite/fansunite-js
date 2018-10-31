import BN = require('bn.js');
import { Bet, NewSignedBet } from '../types';

export async function newSignedBet(bet: Bet, signature: string) {
  const newBet: NewSignedBet = {
    subjects: [
      bet.backer,
      bet.layer,
      bet.token,
      bet.league,
      bet.resolver
    ],
    params: [
      bet.backerStake,
      bet.fixture,
      bet.odds,
      bet.expiration
    ],
    payload: bet.payload,
    nonce: bet.nonce,
    signature
  };
  return newBet;
}

export function generateNonce() {
  const randomNumber = Math.floor((Math.random() * 10 **  9) + 1);
  const nonce = new BN(randomNumber);
  return nonce;
}
