import { ContractWrapper } from './contract-wrapper';
export declare class Vault extends ContractWrapper {
    constructor(web3: any, networkId: number);
    approve(spender: string, from: string): Promise<any>;
    deposit(token: string, amount: number, from: string): Promise<any>;
    withdraw(token: string, amount: number, from: string): Promise<any>;
    balanceOf(token: string, user: string): Promise<any>;
    isApproved(user: string, spender: string): Promise<any>;
    private _getVaultInstance;
}
