import BN = require('bn.js');
import { ContractWrapper } from './contract-wrapper';
export declare class Resolver extends ContractWrapper {
    private resolverContracts;
    constructor(web3: any, networkId: number);
    getDescription(resolverAddress: string): Promise<any>;
    getType(resolverAddress: string): Promise<any>;
    getDetails(resolverAddress: string): Promise<any>;
    getInitSelector(resolverAddress: string): Promise<any>;
    getValidatorSelector(resolverAddress: string): Promise<any>;
    getSegmentSelector(resolverAddress: string): Promise<any>;
    getSegment(resolverAddress: string, leagueAddress: string, fixtureId: BN, payload: string): Promise<any>;
    private _getResolverContractInstance;
}
