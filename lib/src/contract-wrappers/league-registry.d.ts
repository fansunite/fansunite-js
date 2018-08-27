import { League } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class LeagueRegistry extends ContractWrapper {
    constructor(web3: any, networkId: number);
    getLeaguesByClass(className: string): Promise<any>;
    getLeague(leagueAddress: string): Promise<League>;
    getClassWithLeagues(className: string): Promise<League[]>;
    isLeagueRegistered(leagueAddress: string): Promise<any>;
    private _getLeagueRegistryInstance;
}
