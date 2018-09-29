import { ContractWrapper } from './contract-wrapper';
export declare class ResolverRegistry extends ContractWrapper {
    constructor(web3: any, networkId: number);
    addResolver(className: string, resolver: string, from: string): Promise<any>;
    getResolvers(className: string): Promise<any>;
    isResolverRegistered(className: string, resolver: string): Promise<number>;
    private _getResolverRegistryInstance;
}
