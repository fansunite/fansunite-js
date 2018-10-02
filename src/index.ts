import { BetManager } from './contract-wrappers/bet-manager';
import { League001 } from './contract-wrappers/league-001';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';
import { Vault } from './contract-wrappers/vault';

import { Bet, NewSignedBet } from './types';

import { generateSalt, newSignedBet } from './utils/bet-utils';
import { hashBet } from './utils/hash-utils';
import { signBet } from './utils/signature-utils';

export class FansUnite {
  public betManager: BetManager;
  public leagueRegistry: LeagueRegistry;
  public registry: Registry;
  public league001: League001;
  public vault: Vault;

  private web3: any;

  constructor(web3: any, networkId: number) {
    this.web3 = web3;

    this.betManager = new BetManager(web3, networkId);
    this.leagueRegistry = new LeagueRegistry(web3, networkId);
    this.registry = new Registry(web3, networkId);
    this.league001 = new League001(web3, networkId);
    this.vault = new Vault(web3, networkId);
  }

  public hashBet(bet: Bet) {
    return hashBet(bet);
  }

  public async signBet(bet: Bet) {
    return signBet(this.web3, bet, this.hashBet(bet));
  }

  public async newSignedBet(bet: Bet, layerTokenAmount: number) {
    bet.salt = this.generateSalt();
    const signature = await this.signBet(bet);
    return newSignedBet(bet, layerTokenAmount, bet.betPayload, signature);
  }

  public generateSalt() {
    return generateSalt();
  }
}
