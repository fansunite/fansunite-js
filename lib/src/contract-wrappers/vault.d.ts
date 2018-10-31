import BN = require('bn.js');
import { ContractWrapper } from './contract-wrapper';
export declare class Vault extends ContractWrapper {
    constructor(web3: any, networkId: number);
    approve(spender: string, from: string): Promise<any>;
    deposit(token: string, amount: BN, from: string): Promise<any>;
    withdraw(token: string, amount: BN, from: string): Promise<any>;
    transfer(token: string, to: string, amount: BN, from: string): Promise<any>;
    balanceOf(token: string, user: string): Promise<BN>;
    isApproved(user: string, spender: string): Promise<any>;
    isSpender(spender: string): Promise<any>;
    getContractAddress(): any;
    private _getVaultInstance;
}
