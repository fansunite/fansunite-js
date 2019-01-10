import { TypedDataUtils } from 'eth-sig-util';

import { Bet } from '../types';

export function hashBet(bet: Bet, networkId: number, betManagerAddress: string) {
  const eip712Domain = [
    { name: 'name', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ];

  const eip712Bet = [
    { name: 'backer', type: 'address' },
    { name: 'layer', type: 'address' },
    { name: 'token', type: 'address' },
    { name: 'league', type: 'address' },
    { name: 'resolver', type: 'address' },
    { name: 'backerStake', type: 'uint256' },
    { name: 'fixture', type: 'uint256' },
    { name: 'odds', type: 'uint256' },
    { name: 'expiration', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'payload', type: 'bytes' }
  ];

  const domainData = {
    name: 'FansUnite Protocol',
    chainId: networkId,
    verifyingContract: betManagerAddress
  };

  const message = {
    backer: bet.backer,
    layer: bet.layer,
    token: bet.token,
    league: bet.league,
    resolver: bet.resolver,
    backerStake: bet.backerStake.toString(),
    fixture: bet.fixture.toString(),
    odds: bet.odds.toString(),
    expiration: bet.expiration.toString(),
    nonce: bet.nonce.toString(),
    payload: bet.payload
  };

  const data = {
    types: {
      EIP712Domain: eip712Domain,
      Bet: eip712Bet
    },
    domain: domainData,
    primaryType: 'Bet',
    message
  };

  return '0x' + TypedDataUtils.sign(data).toString('hex');
}
