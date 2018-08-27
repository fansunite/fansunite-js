import { BetManager } from './contract-wrappers/bet-manager';
import { League001 } from './contract-wrappers/league-001';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';
import { Vault } from './contract-wrappers/vault';
import { Bet, NewSignedBet } from './types';
export declare class FansUnite {
    betManager: BetManager;
    leagueRegistry: LeagueRegistry;
    registry: Registry;
    league001: League001;
    vault: Vault;
    private web3;
    constructor(web3: any, networkId: number);
    hashBet(bet: Bet): any;
    signBet(bet: Bet): Promise<string>;
    newSignedBet(bet: Bet, layerTokenAmount: number): Promise<NewSignedBet>;
    generateSalt(): number;
}
