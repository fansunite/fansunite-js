import { ContractWrapper } from './contract-wrapper';
export declare class LeagueRegistry extends ContractWrapper {
  constructor(web3: any);
  getClass(className: string): Promise<[string, string[]]>;
  private _getLeagueRegistryInstance;
}
