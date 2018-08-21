import { ContractWrapper } from './contract-wrapper';

export class League001 extends ContractWrapper {
  constructor(web3: any, networkId: number) {
    super(web3, networkId);
  }
}
