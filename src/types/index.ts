export interface League {
  address: string;
  name: string;
  details: string;
}

export interface Participant {
  id: number;
  name: string;
  details: string;
}

export interface Fixture {
  id: number;
  participants: number[];
  start: number;
}

export interface Bet {
  backer: string;
  layer: string;
  token: string;
  league: string;
  resolver: string;
  backerStake: number;
  fixture: number;
  odds: number;
  expiration: number;
  nonce: number;
  payload: string;
}

export interface NewSignedBet {
  subjects: string[];
  params: number[];
  nonce: number;
  payload: string;
  signature: string;
}
