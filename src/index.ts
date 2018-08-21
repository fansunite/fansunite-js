import { BetManager } from './contract-wrappers/bet-manager';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';

export class FansUnite {
  public betManager: BetManager;
  public leagueRegistry: LeagueRegistry;
  public registry: Registry;

  constructor(web3: any, networkId: number) {

    this.betManager = new BetManager(web3, networkId);
    this.leagueRegistry = new LeagueRegistry(web3, networkId);
    this.registry = new Registry(web3, networkId);
  }
}
