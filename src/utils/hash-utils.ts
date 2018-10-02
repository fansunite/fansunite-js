import Web3 = require('web3');

import { Bet } from '../types';

export function hashBet(bet: Bet, networkId: number) {
  const schema = [
    'Bet(',
    'address backer,',
    'address layer,',
    'address token,',
    'address league,',
    'address resolver,',
    'uint256 backerStake,',
    'uint256 fixture,',
    'uint256 odds,',
    'uint256 expiration,',
    'bytes payload',
    ')'
  ];

  const subjects = [
    bet.backer,
    bet.layer,
    bet.token,
    bet.league,
    bet.resolver
  ];

  const params = [
    bet.backerStake,
    bet.fixture,
    bet.odds,
    bet.expiration
  ];

  const payloadHash = Web3.utils.soliditySha3.apply(null, [ bet.payload ]);
  const schemaHash = Web3.utils.soliditySha3.apply(null, schema);
  const preHash = Web3.utils.soliditySha3.apply(null, [ schemaHash, ...subjects, ...params, payloadHash ]);
  return Web3.utils.soliditySha3.apply(null, [ networkId, bet.nonce, preHash ]);
}
