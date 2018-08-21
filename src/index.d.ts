import { BetManager } from './contract-wrappers/bet-manager';
import { Registry } from './contract-wrappers/registry';
import { LeagueRegistry } from './contract-wrappers/league-registry';
export declare class FansUnite {
    betManager: BetManager;
    leagueRegistry: LeagueRegistry;
    registry: Registry;
    constructor(web3: any);
}
