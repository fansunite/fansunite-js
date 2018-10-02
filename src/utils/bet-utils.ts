import { BigNumber } from 'bignumber.js';
import { Bet, NewSignedBet } from '../types';

BigNumber.set({ DECIMAL_PLACES: 78 });

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
  const randomNumber = BigNumber.random(9);
  const factor = new BigNumber(10).pow(9 - 1);
  const salt = randomNumber
    .times(factor)
    .decimalPlaces(0)
    .toNumber();
  return salt;
}
