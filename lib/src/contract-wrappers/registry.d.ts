import { ContractWrapper } from './contract-wrapper';
export declare class Registry extends ContractWrapper {
    private registryInstance;
    constructor(web3: any, networkId: number);
    getAddress(nameKey: string): Promise<any>;
    getContractAddress(): any;
    private _getRegistryInstance;
}
