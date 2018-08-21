"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bet_manager_1 = require("./contract-wrappers/bet-manager");
var registry_1 = require("./contract-wrappers/registry");
var league_registry_1 = require("./contract-wrappers/league-registry");
var FansUnite = /** @class */ (function () {
    function FansUnite(web3) {
        this.betManager = new bet_manager_1.BetManager(web3);
        this.leagueRegistry = new league_registry_1.LeagueRegistry(web3);
        this.registry = new registry_1.Registry(web3);
    }
    return FansUnite;
}());
exports.FansUnite = FansUnite;
//# sourceMappingURL=index.js.map