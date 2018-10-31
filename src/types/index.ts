import BN = require('bn.js');

export interface League {
  address: string;
  name: string;
  details: string;
}

export interface Participant {
  id: BN;
  name: string;
  details: string;
}

export interface Fixture {
  id: BN;
  participants: number[];
  start: number;
}

export interface Bet {
  backer: string;
  layer: string;
  token: string;
  league: string;
  resolver: string;
  backerStake: BN;
  fixture: BN;
  odds: BN;
  expiration: BN;
  nonce: BN;
  payload: string;
}

export interface NewSignedBet {
  subjects: string[];
  params: BN[];
  nonce: BN;
  payload: string;
  signature: string;
}
