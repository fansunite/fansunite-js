"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BetManager = require("../../src/artifacts/BetManager.json");
var League001 = require("../../src/artifacts/League001.json");
var LeagueRegistry = require("../../src/artifacts/LeagueRegistry.json");
var Vault = require("../../src/artifacts/Vault.json");
var constants_1 = require("./constants");
var Migration = /** @class */ (function () {
    function Migration(web3, networkId, accounts) {
        this.web3 = web3;
        this.networkId = networkId;
        this.accounts = accounts;
        this.owner = accounts[0];
        this.resolverAddress = accounts[5];
        this.leagueAddress = constants_1.constants.NULL_ADDRESS;
        var leagueRegistry = LeagueRegistry;
        this.leagueRegInstance = new this.web3.eth.Contract(leagueRegistry.abi, leagueRegistry.networks[this.networkId].address);
        var vault = Vault;
        this.vaultInstance = new web3.eth.Contract(vault.abi, vault.networks[networkId].address);
        var betManager = BetManager;
        this.betManagerAddress = betManager.networks[this.networkId].address;
    }
    Migration.prototype.runMigration = function (className, leagueName, participants, year, eventStartTime) {
        return __awaiter(this, void 0, void 0, function () {
            var league001;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createClass(className)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.createLeague(className, leagueName)];
                    case 2:
                        _a.sent();
                        league001 = League001;
                        this.leagueInstance = new this.web3.eth.Contract(league001.abi, this.leagueAddress);
                        return [4 /*yield*/, this.addSeason(year)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.addParticipant(participants[0])];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.addParticipant(participants[1])];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.scheduleFixture(year, [1, 2], eventStartTime)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.registerResolver(this.resolverAddress)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.addSpender(this.betManagerAddress)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.getLeagueAddress = function () {
        return this.leagueAddress;
    };
    Migration.prototype.getResolverAddress = function () {
        return this.resolverAddress;
    };
    Migration.prototype.getBetManagerAddress = function () {
        return this.betManagerAddress;
    };
    Migration.prototype.createLeague = function (className, leagueName) {
        return __awaiter(this, void 0, void 0, function () {
            var tx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueRegInstance.methods.createLeague(className, leagueName, constants_1.constants.NULL_HASH).send({ from: this.owner, gas: 6000000 })];
                    case 1:
                        tx = _a.sent();
                        this.leagueAddress = tx.events.LogLeagueAdded.returnValues._league;
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.createClass = function (className) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueRegInstance.methods.createClass(className).send({ from: this.owner })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.addSeason = function (year) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueInstance.methods.addSeason(year).send({ from: this.owner })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.addParticipant = function (participantName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueInstance.methods.addParticipant(participantName, constants_1.constants.NULL_HASH).send({ from: this.owner, gas: 6000000 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.scheduleFixture = function (season, participants, startTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueInstance.methods.scheduleFixture(season, participants, startTime).send({ from: this.owner, gas: 6000000 })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.registerResolver = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.leagueInstance.methods.registerResolver(resolverAddress).send({ from: this.owner })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Migration.prototype.addSpender = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.vaultInstance.methods.addSpender(address).send({ from: this.owner })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Migration;
}());
exports.Migration = Migration;
//# sourceMappingURL=migration.js.map