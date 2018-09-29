import { BetManager } from './contract-wrappers/bet-manager';
import { League001 } from './contract-wrappers/league-001';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';
import { ResolverRegistry } from './contract-wrappers/resolver-registry';
import { Vault } from './contract-wrappers/vault';
import { Bet, NewSignedBet } from './types';
export declare class FansUnite {
    betManager: BetManager;
    league001: League001;
    leagueRegistry: LeagueRegistry;
    registry: Registry;
    resolverRegistry: ResolverRegistry;
    vault: Vault;
    private web3;
    constructor(web3: any, networkId: number);
    hashBet(bet: Bet): any;
    signBet(bet: Bet): Promise<string>;
    newSignedBet(bet: Bet, layerTokenAmount: number): Promise<NewSignedBet>;
    generateNonce(): number;
    awaitTxMined(txHash: string): Promise<{}>;
}
