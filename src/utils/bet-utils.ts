import { BigNumber } from 'bignumber.js';
import { Bet, NewSignedBet } from '../types';

BigNumber.set({ DECIMAL_PLACES: 78 });

export async function newSignedBet(bet: Bet, layerTokenAmount: number, betPayload: string, signature: string) {
  const newBet: NewSignedBet = {
    betAddresses: [
      bet.backerAddress,
      bet.layerAddress,
      bet.backerTokenAddress,
      bet.layerTokenAddress,
      bet.feeRecipientAddress,
      bet.leagueAddress,
      bet.resolverAddress
    ],
    betValues: [
      bet.backerTokenStake,
      bet.backerFee,
      bet.layerFee,
      bet.expirationTimeSeconds,
      bet.fixtureId,
      bet.backerOdds
    ],
    layerTokenAmount,
    salt: bet.salt,
    betPayload,
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
