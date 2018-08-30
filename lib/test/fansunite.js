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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var Web3 = require("web3");
var src_1 = require("../src");
var constants_1 = require("./utils/constants");
var LeagueRegistry = require("../src/artifacts/LeagueRegistry.json");
var League001 = require("../src/artifacts/League001.json");
var Vault = require("../src/artifacts/Vault.json");
var BetManager = require("../src/artifacts/BetManager.json");
var fansunite;
var TOKEN_DECIMALS = 18;
var leagueAddress;
var betManagerAddress;
var backerAddress;
var layerAddress;
var resolverAddress;
var tokenAddress = '0x0000000000000000000000000000000000000000';
var season = 2018;
var fixtureId = 1;
var layerTokenFillAmount = Math.pow(10, TOKEN_DECIMALS);
var className = 'soccer';
var fromAddress;
var league = {
    class: className,
    name: 'English Premiership',
    details: '0x0000'
};
var bet;
describe('FansUnite library', function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var web3, networkId, accounts, leagueRegistry, leagueRegInstance, owner, tx, league001, leagueInstance, betManager, vault, vaultInstance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
                    return [4 /*yield*/, web3.eth.net.getId()];
                case 1:
                    networkId = _a.sent();
                    return [4 /*yield*/, web3.eth.getAccounts()];
                case 2:
                    accounts = _a.sent();
                    leagueRegistry = LeagueRegistry;
                    leagueRegInstance = new web3.eth.Contract(leagueRegistry.abi, leagueRegistry.networks[networkId].address);
                    fromAddress = accounts[0];
                    backerAddress = accounts[1];
                    layerAddress = accounts[2];
                    resolverAddress = accounts[3];
                    owner = accounts[0];
                    fansunite = new src_1.FansUnite(web3, networkId);
                    // create class and league
                    return [4 /*yield*/, leagueRegInstance.methods.createClass(className).send({ from: owner })];
                case 3:
                    // create class and league
                    _a.sent();
                    return [4 /*yield*/, leagueRegInstance.methods.createLeague(league.class, league.name, '0x').send({ from: owner, gas: 6000000 })];
                case 4:
                    tx = _a.sent();
                    leagueAddress = tx.events.LogLeagueAdded.returnValues._league;
                    league001 = League001;
                    leagueInstance = new web3.eth.Contract(league001.abi, leagueAddress);
                    return [4 /*yield*/, leagueInstance.methods.addSeason(season).send({ from: owner })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, leagueInstance.methods.addParticipant('Leicester City', '0x').send({ from: owner, gas: 6000000 })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, leagueInstance.methods.addParticipant('Manchester United', '0x').send({ from: owner, gas: 6000000 })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, leagueInstance.methods.scheduleFixture(season, [1, 2], 1545437384).send({ from: owner, gas: 6000000 })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, leagueInstance.methods.registerResolver(resolverAddress).send({ from: owner })];
                case 9:
                    _a.sent();
                    betManager = BetManager;
                    betManagerAddress = betManager.networks[networkId].address;
                    vault = Vault;
                    vaultInstance = new web3.eth.Contract(vault.abi, vault.networks[networkId].address);
                    return [4 /*yield*/, vaultInstance.methods.addSpender(betManagerAddress).send({ from: owner })];
                case 10:
                    _a.sent();
                    bet = {
                        backerAddress: backerAddress,
                        layerAddress: constants_1.constants.NULL_ADDRESS,
                        backerTokenAddress: constants_1.constants.NULL_ADDRESS,
                        layerTokenAddress: constants_1.constants.NULL_ADDRESS,
                        feeRecipientAddress: accounts[2],
                        leagueAddress: leagueAddress,
                        resolverAddress: resolverAddress,
                        backerTokenStake: 2 * Math.pow(10, TOKEN_DECIMALS),
                        backerFee: 0,
                        layerFee: 0,
                        expirationTimeSeconds: 1545437384,
                        fixtureId: fixtureId,
                        backerOdds: 2 * Math.pow(10, 8),
                        betPayload: '0x4e5ef893',
                        salt: 2401286
                    };
                    return [2 /*return*/];
            }
        });
    }); });
    describe('LeagueRegistry', function () {
        it('should get a list of league addresses by class name', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.getLeaguesByClass('soccer')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a league by an address', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.getLeague(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a lst of populated leagues', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.getClassWithLeagues('soccer')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true if league is registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.isLeagueRegistered(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('League001', function () {
        it('should return the name of the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getName(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the class name of the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getClass(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the ipfs hash name of the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getDetails(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the list of seasons for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getSeasons(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the list of seasons for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getSeason(leagueAddress, season)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the list of participants for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); });
        it('should return the participant for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getParticipant(leagueAddress, 1)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a fixture by its id for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getFixture(leagueAddress, fixtureId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a list of fixtures populated for the season', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getSeasonWithFixtures(leagueAddress, season)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true if resolver is registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isResolverRegistered(leagueAddress, resolverAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return true if fixture is scheduled', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isFixtureScheduled(leagueAddress, fixtureId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Vault', function () {
        it('should approve the spender', function () { return __awaiter(_this, void 0, void 0, function () {
            var result1, result2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.approve(betManagerAddress, backerAddress)];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, fansunite.vault.approve(betManagerAddress, layerAddress)];
                    case 2:
                        result2 = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should deposit tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var result1, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.deposit(tokenAddress, 3 * Math.pow(10, TOKEN_DECIMALS), backerAddress)];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, fansunite.vault.deposit(tokenAddress, 3 * Math.pow(10, TOKEN_DECIMALS), layerAddress)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should withdraw tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.withdraw(tokenAddress, 1 * Math.pow(10, TOKEN_DECIMALS), backerAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retrieve the balance for token', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.balanceOf(tokenAddress, fromAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the balance true if address has approved spender', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.isApproved(backerAddress, betManagerAddress)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Registry', function () {
        it('should get the address for Vault', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.registry.getAddress('Vault')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('hashBet', function () {
        it('should hash the bet parameters', function () { return __awaiter(_this, void 0, void 0, function () {
            var betHash;
            return __generator(this, function (_a) {
                betHash = fansunite.hashBet(bet);
                return [2 /*return*/];
            });
        }); });
    });
    describe('signBet', function () {
        it('should sign the bet', function () { return __awaiter(_this, void 0, void 0, function () {
            var signedBet, betHash, fillBet, filled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.newSignedBet(bet, layerTokenFillAmount)];
                    case 1:
                        signedBet = _a.sent();
                        return [4 /*yield*/, fansunite.hashBet(bet)];
                    case 2:
                        betHash = _a.sent();
                        return [4 /*yield*/, fansunite.betManager.fillBet(signedBet, layerTokenFillAmount, layerAddress)];
                    case 3:
                        fillBet = _a.sent();
                        return [4 /*yield*/, fansunite.betManager.filled(betHash)];
                    case 4:
                        filled = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('generateSalt', function () {
        it('should generate random number', function () { return __awaiter(_this, void 0, void 0, function () {
            var salt;
            return __generator(this, function (_a) {
                salt = fansunite.generateSalt();
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=fansunite.js.map