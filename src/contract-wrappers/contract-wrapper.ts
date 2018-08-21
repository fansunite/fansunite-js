export class ContractWrapper {
  protected web3: any;
  protected networkId: number;

  constructor(web3: any, networkId: number) {
    this.web3 = web3;
    this.networkId = networkId;
  }
}
