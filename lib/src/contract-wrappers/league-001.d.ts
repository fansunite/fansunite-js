import BN = require('bn.js');
import { Fixture, Participant } from '../types';
import { ContractWrapper } from './contract-wrapper';
export declare class League001 extends ContractWrapper {
    private leagueContracts;
    constructor(web3: any, networkId: number);
    getName(leagueAddress: string): Promise<any>;
    getClass(leagueAddress: string): Promise<any>;
    getVersion(leagueAddress: string): Promise<any>;
    getSeasons(leagueAddress: string): Promise<any>;
    getSeason(leagueAddress: string, year: BN): Promise<any>;
    getFixture(leagueAddress: string, id: BN): Promise<Fixture>;
    getFixtureStart(leagueAddress: string, id: BN): Promise<number>;
    getSeasonWithFixtures(leagueAddress: string, year: BN): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    getParticipants(leagueAddress: string): Promise<Participant[]>;
    getParticipantCount(leagueAddress: string): Promise<number>;
    getParticipant(leagueAddress: string, id: BN): Promise<Participant>;
    getResolution(leagueAddress: string, fixtureId: BN, resolver: string): Promise<any>;
    isParticipant(leagueAddress: string, id: BN): Promise<any>;
    isFixtureScheduled(leagueAddress: string, fixtureId: BN): Promise<any>;
    private _getLeagueContractInstance;
}
