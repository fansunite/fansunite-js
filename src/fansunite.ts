import BN = require('bn.js');
import { BetManager } from './contract-wrappers/bet-manager';
import { League001 } from './contract-wrappers/league-001';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';
import { ResolverRegistry } from './contract-wrappers/resolver-registry';
import { Vault } from './contract-wrappers/vault';

import { Bet, NewSignedBet } from './types';

import { generateNonce, newSignedBet } from './utils/bet-utils';
import { hashBet } from './utils/hash-utils';
import { personalSignBet, signBet, typedDataSignBet } from './utils/signature-utils';
import { awaitTxMined } from './utils/tx-utils';

export class FansUnite {
  public betManager: BetManager;
  public league001: League001;
  public leagueRegistry: LeagueRegistry;
  public registry: Registry;
  public resolverRegistry: ResolverRegistry;
  public vault: Vault;

  private web3: any;
  private networkId: number;

  constructor(web3: any, networkId: number) {
    this.web3 = web3;
    this.networkId = networkId;

    this.betManager = new BetManager(web3, networkId);
    this.league001 = new League001(web3, networkId);
    this.leagueRegistry = new LeagueRegistry(web3, networkId);
    this.registry = new Registry(web3, networkId);
    this.resolverRegistry = new ResolverRegistry(web3, networkId);
    this.vault = new Vault(web3, networkId);
  }

  public hashBet(bet: Bet) {
    return hashBet(bet, this.networkId);
  }


  public async signBet(bet: Bet, sigMode: string) {
    return signBet(this.web3, bet, this.hashBet(bet), sigMode);
  }

  public async personalSignBet(bet: Bet, sigMode: string) {
    return personalSignBet(this.web3, bet, this.hashBet(bet), sigMode);
  }

  public async typedDataSignBet(bet: Bet, domainName: string, domainVersion: string) {
    return typedDataSignBet(this.web3, bet, domainName, domainVersion, this.betManager.getContractAddress());
  }


  public async newSignedBet(bet: Bet, sigMode: string) {
    bet.nonce = this.generateNonce();
    const signature = await this.signBet(bet, sigMode);
    return newSignedBet(bet, signature);
  }

  public async newPersonalSignedBet(bet: Bet, sigMode: string) {
    bet.nonce = this.generateNonce();
    const signature = await this.personalSignBet(bet, sigMode);
    return newSignedBet(bet, signature);
  }

  public async newTypedDataSignBet(bet: Bet, domainName: string, domainVersion: string) {
    bet.nonce = this.generateNonce();
    const signature = await this.typedDataSignBet(bet, domainName, domainVersion);
    return newSignedBet(bet, signature);
  }

  public generateNonce() {
    return generateNonce();
  }

  public async awaitTxMined(txHash: string) {
    return awaitTxMined(this.web3, txHash, 1000);
  }
}
