import { BetManager } from './contract-wrappers/bet-manager';
import { Registry } from './contract-wrappers/registry';
import { LeagueRegistry } from './contract-wrappers/league-registry';


export class FansUnite {
  public betManager: BetManager;
  public leagueRegistry: LeagueRegistry;
  public registry: Registry;

  constructor(web3: any) {
    this.betManager = new BetManager(web3);
    this.leagueRegistry = new LeagueRegistry(web3);
    this.registry = new Registry(web3);
  }
}
