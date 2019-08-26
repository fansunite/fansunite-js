import { ContractWrapper } from './contract-wrapper';
export declare class ResolverRegistry extends ContractWrapper {
    private resolverRegistryInstance;
    constructor(web3: any, networkId: number);
    addResolver(className: string, resolver: string, from: string): Promise<any>;
    getResolvers(className: string): Promise<any>;
    isResolverRegistered(className: string, resolver: string): Promise<number>;
    isResolverUsed(league: string, resolver: string): Promise<any>;
    getContractAddress(): any;
    private _getResolverRegistryInstance;
}
