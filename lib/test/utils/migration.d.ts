import Web3 = require('web3');
export declare class Migration {
    private leagueRegInstance;
    private leagueInstance;
    private vaultInstance;
    private web3;
    private networkId;
    private accounts;
    private owner;
    private leagueAddress;
    private resolverAddress;
    private betManagerAddress;
    constructor(web3: Web3, networkId: number, accounts: string[]);
    runMigration(className: string, leagueName: string, participants: string[], year: number, eventStartTime: number): Promise<void>;
    getLeagueAddress(): string;
    getResolverAddress(): string;
    getBetManagerAddress(): string;
    private createLeague;
    private createClass;
    private addSeason;
    private addParticipant;
    private scheduleFixture;
    private registerResolver;
    private addSpender;
}
