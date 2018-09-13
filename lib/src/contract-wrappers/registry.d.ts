import { ContractWrapper } from './contract-wrapper';
export declare class Registry extends ContractWrapper {
    constructor(web3: any, networkId: number);
    getAddress(nameKey: string): Promise<any>;
    private _getRegistryInstance;
}
