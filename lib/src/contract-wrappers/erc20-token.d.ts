import BN = require('bn.js');
import { ContractWrapper } from './contract-wrapper';
export declare class Erc20Token extends ContractWrapper {
    private tokenContracts;
    constructor(web3: any, networkId: number);
    name(tokenAddress: string): Promise<any>;
    symbol(tokenAddress: string): Promise<any>;
    totalSupply(tokenAddress: string): Promise<BN>;
    decimals(tokenAddress: string): Promise<BN>;
    balanceOf(tokenAddress: string, user: string): Promise<BN>;
    allowance(tokenAddress: string, user: string, spender: string): Promise<BN>;
    transfer(tokenAddress: any, to: string, value: BN, from: string): Promise<any>;
    transferFrom(tokenAddress: any, from: string, to: string, value: BN): Promise<any>;
    approve(tokenAddress: string, spender: string, amount: BN, from: string): Promise<any>;
    increaseAllowance(tokenAddress: string, spender: string, amount: BN, from: string): Promise<any>;
    decreaseAllowance(tokenAddress: string, spender: string, amount: BN, from: string): Promise<any>;
    private _getTokenContractInstance;
}
