import { Fixture, Participant } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class League001 extends ContractWrapper {
    private leagueContracts;
    constructor(web3: any, networkId: number);
    getName(leagueAddress: string): Promise<any>;
    getClass(leagueAddress: string): Promise<any>;
    getVersion(leagueAddress: string): Promise<any>;
    getSeasons(leagueAddress: string): Promise<any>;
    getSeason(leagueAddress: string, year: number): Promise<any>;
    getFixture(leagueAddress: string, id: number): Promise<Fixture>;
    getSeasonWithFixtures(leagueAddress: string, year: number): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    getParticipants(leagueAddress: string): Promise<void>;
    getParticipant(leagueAddress: string, id: number): Promise<Participant>;
    getResolvers(leagueAddress: string): Promise<any>;
    getResolution(leagueAddress: string, fixtureId: number, resolver: string): Promise<any>;
    isParticipant(leagueAddress: string, id: number): Promise<any>;
    isResolverRegistered(leagueAddress: string, resolverAddress: string): Promise<any>;
    isFixtureScheduled(leagueAddress: string, fixtureId: number): Promise<any>;
    private _getLeagueContractInstance;
}
