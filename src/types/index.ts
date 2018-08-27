export interface League {
  address: string;
  name: string;
  details: string;
}

export interface Participant {
  id: number;
}

export interface Fixture {
  id: number;
  participants: number[];
  start: number;
}

export interface Bet {
  backerAddress: string;
  layerAddress: string;
  backerTokenAddress: string;
  layerTokenAddress: string;
  feeRecipientAddress: string;
  leagueAddress: string;
  resolverAddress: string;
  backerTokenStake: number;
  backerFee: number;
  layerFee: number;
  expirationTimeSeconds: number;
  fixtureId: number;
  backerOdds: number;
  salt: number;
  betPayload: string;
}

export interface NewSignedBet {
  betAddresses: string[];
  betValues: number[];
  layerTokenAmount: number;
  salt: number;
  betPayload: string;
  signature: string;
}
