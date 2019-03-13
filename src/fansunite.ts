import BN = require('bn.js');
import { BetManager } from './contract-wrappers/bet-manager';
import { Erc20Token } from './contract-wrappers/erc20-token';
import { FanToken } from './contract-wrappers/fan-token';
import { League001 } from './contract-wrappers/league-001';
import { LeagueRegistry } from './contract-wrappers/league-registry';
import { Registry } from './contract-wrappers/registry';
import { Resolver } from './contract-wrappers/resolver';
import { ResolverRegistry } from './contract-wrappers/resolver-registry';
import { Vault } from './contract-wrappers/vault';

import { Bet, NewSignedBet } from './types';

import { generateNonce, newSignedBet } from './utils/bet-utils';
import { hashBet } from './utils/hash-utils';
import { generateMoneylinePayload, generateSpreadPayload, generateTotalsPayload } from './utils/payload-generator';
import { typedDataSignBet } from './utils/signature-utils';
import { awaitTxMined } from './utils/tx-utils';

export class FansUnite {
  public betManager: BetManager;
  public fanToken: FanToken;
  public league001: League001;
  public leagueRegistry: LeagueRegistry;
  public registry: Registry;
  public resolver: Resolver;
  public resolverRegistry: ResolverRegistry;
  public vault: Vault;
  public erc20Token: Erc20Token;

  private web3: any;
  private networkId: number;

  constructor(web3: any, networkId: number) {
    this.web3 = web3;
    this.networkId = networkId;

    this.betManager = new BetManager(web3, networkId);
    this.fanToken = new FanToken(web3, networkId);
    this.league001 = new League001(web3, networkId);
    this.leagueRegistry = new LeagueRegistry(web3, networkId);
    this.registry = new Registry(web3, networkId);
    this.resolver = new Resolver(web3, networkId);
    this.resolverRegistry = new ResolverRegistry(web3, networkId);
    this.vault = new Vault(web3, networkId);
    this.erc20Token = new Erc20Token(web3, networkId);
  }

  public hashBet(bet: Bet) {
    return hashBet(bet, this.networkId, this.betManager.getContractAddress());
  }

  public async typedDataSignBet(bet: Bet, v3: boolean) {
    return typedDataSignBet(this.web3, bet, this.betManager.getContractAddress(), v3);
  }

  public async newTypedDataSignBet(bet: Bet, v3: boolean) {
    bet.nonce = this.generateNonce();
    const signature = await this.typedDataSignBet(bet, v3);
    return newSignedBet(bet, signature);
  }

  public generateNonce() {
    return generateNonce();
  }

  public async awaitTxMined(txHash: string) {
    return awaitTxMined(this.web3, txHash, 1000);
  }

  public generateMoneylinePayload(participantId: BN) {
    return generateMoneylinePayload(this.web3, participantId);
  }

  public generateSpreadPayload(participantId: BN, spread: BN) {
    return generateSpreadPayload(this.web3, participantId, spread);
  }

  public generateTotalsPayload(participantId: BN, total: BN, over: boolean) {
    return generateTotalsPayload(this.web3, participantId, total, over);
  }
}
