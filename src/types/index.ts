import { BigNumber } from 'bignumber.js';

export interface Participant {
  id: BigNumber;
}

export interface Fixture {
  id: BigNumber;
  participants: BigNumber[];
  start: BigNumber;
}
