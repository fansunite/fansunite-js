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
var chai_1 = require("chai");
require("mocha");
var Web3 = require("web3");
var src_1 = require("../src");
var constants_1 = require("./utils/constants");
var migration_1 = require("./utils/migration");
var fansunite;
var className = 'soccer';
var leagueName = 'English Premiership';
var participants = [
    'Leicester City',
    'Manchester United'
];
var year = 2018;
var fixtureId = 1;
var participantId = 1;
var eventStartTime = 1545437384;
var layerTokenFillAmount = 1 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS);
var leagueAddress;
var resolverAddress;
var betManagerAddress;
var backerAddress;
var nonApprovedAddress;
var layerAddress;
var tokenAddress = constants_1.constants.NULL_ADDRESS; // ETH Token
var bet;
describe('FansUnite library', function () {
    before(function () { return __awaiter(_this, void 0, void 0, function () {
        var web3, networkId, accounts, migration;
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
                    migration = new migration_1.Migration(web3, networkId, accounts);
                    return [4 /*yield*/, migration.runMigration(className, leagueName, participants, year, eventStartTime)];
                case 3:
                    _a.sent();
                    leagueAddress = migration.getLeagueAddress();
                    resolverAddress = migration.getResolverAddress();
                    betManagerAddress = migration.getBetManagerAddress();
                    backerAddress = accounts[3];
                    layerAddress = accounts[4];
                    nonApprovedAddress = accounts[6];
                    fansunite = new src_1.FansUnite(web3, networkId);
                    bet = {
                        backerAddress: backerAddress,
                        layerAddress: constants_1.constants.NULL_ADDRESS,
                        backerTokenAddress: constants_1.constants.NULL_ADDRESS,
                        layerTokenAddress: constants_1.constants.NULL_ADDRESS,
                        feeRecipientAddress: accounts[2],
                        leagueAddress: leagueAddress,
                        resolverAddress: resolverAddress,
                        backerTokenStake: 2 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS),
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
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.getLeaguesByClass(className)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result[0]).to.be.equal(leagueAddress);
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
                        chai_1.expect(result.address).to.be.equal(leagueAddress);
                        chai_1.expect(result.name).to.be.equal(leagueName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a list of populated leagues', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.getClassWithLeagues(className)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result[0].address).to.be.equal(leagueAddress);
                        chai_1.expect(result[0].name).to.be.equal(leagueName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if league is registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.isLeagueRegistered(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if league is registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.isLeagueRegistered(constants_1.constants.NULL_ADDRESS)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if class is supported', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.isClassSupported(className)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if class is supported', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.leagueRegistry.isClassSupported('not supported class')];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
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
                        chai_1.expect(result).to.be.equal(leagueName);
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
                        chai_1.expect(result).to.be.equal(className);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return version of the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getVersion(leagueAddress)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal('0.0.1');
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
                        chai_1.expect(result).to.be.equal(constants_1.constants.NULL_HASH); // TODO fix
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
                        chai_1.expect(result).to.be.lengthOf(1);
                        chai_1.expect(Number(result[0])).to.be.equal(year);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return the list of fixtures for the season for the league', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getSeason(leagueAddress, year)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.lengthOf(1);
                        chai_1.expect(Number(result[0])).to.be.equal(fixtureId);
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
                    case 0: return [4 /*yield*/, fansunite.league001.getParticipant(leagueAddress, participantId)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result.id).to.be.equal(participantId);
                        chai_1.expect(result.name).to.be.equal(participants[0]);
                        chai_1.expect(result.details).to.be.equal(constants_1.constants.NULL_HASH); // TODO fix
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
                        chai_1.expect(result.id).to.be.equal(fixtureId);
                        chai_1.expect(result.participants).to.be.deep.equal([1, 2]);
                        chai_1.expect(result.start).to.be.deep.equal(eventStartTime);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return a list of fixtures populated for the season', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, fixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.getSeasonWithFixtures(leagueAddress, year)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.lengthOf(1);
                        fixture = result[0];
                        chai_1.expect(fixture.id).to.be.equal(fixtureId);
                        chai_1.expect(fixture.participants).to.be.deep.equal([1, 2]);
                        chai_1.expect(fixture.start).to.be.deep.equal(eventStartTime);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if resolver is registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isResolverRegistered(leagueAddress, resolverAddress)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if resolver is not registered', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isResolverRegistered(leagueAddress, constants_1.constants.NULL_ADDRESS)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if a participant exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isParticipant(leagueAddress, 1)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if a participant does not exists', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isParticipant(leagueAddress, 100)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if fixture is scheduled', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isFixtureScheduled(leagueAddress, fixtureId)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if fixture is not scheduled', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.league001.isFixtureScheduled(leagueAddress, 2)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Vault', function () {
        it('should approve the spender', function () { return __awaiter(_this, void 0, void 0, function () {
            var isBackerApproved, isLayerApproved, notApproved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.approve(betManagerAddress, backerAddress)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fansunite.vault.approve(betManagerAddress, layerAddress)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fansunite.vault.isApproved(backerAddress, betManagerAddress)];
                    case 3:
                        isBackerApproved = _a.sent();
                        return [4 /*yield*/, fansunite.vault.isApproved(layerAddress, betManagerAddress)];
                    case 4:
                        isLayerApproved = _a.sent();
                        return [4 /*yield*/, fansunite.vault.isApproved(nonApprovedAddress, betManagerAddress)];
                    case 5:
                        notApproved = _a.sent();
                        chai_1.expect(isBackerApproved).to.be.equal(true);
                        chai_1.expect(isLayerApproved).to.be.equal(true);
                        chai_1.expect(notApproved).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should deposit tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var backerBalance, layerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.deposit(tokenAddress, 3 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS), backerAddress)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fansunite.vault.deposit(tokenAddress, 2 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS), layerAddress)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fansunite.vault.balanceOf(tokenAddress, backerAddress)];
                    case 3:
                        backerBalance = _a.sent();
                        return [4 /*yield*/, fansunite.vault.balanceOf(tokenAddress, layerAddress)];
                    case 4:
                        layerBalance = _a.sent();
                        chai_1.expect(Number(backerBalance)).to.be.equal(3 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS));
                        chai_1.expect(Number(layerBalance)).to.be.equal(2 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should withdraw tokens', function () { return __awaiter(_this, void 0, void 0, function () {
            var backerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.withdraw(tokenAddress, 1 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS), backerAddress)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fansunite.vault.balanceOf(tokenAddress, backerAddress)];
                    case 2:
                        backerBalance = _a.sent();
                        chai_1.expect(Number(backerBalance)).to.be.equal(2 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should retrieve the balance for token', function () { return __awaiter(_this, void 0, void 0, function () {
            var backerBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.balanceOf(tokenAddress, backerAddress)];
                    case 1:
                        backerBalance = _a.sent();
                        chai_1.expect(Number(backerBalance)).to.be.equal(2 * Math.pow(10, constants_1.constants.TOKEN_DECIMALS));
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `true` if address has approved spender', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.isApproved(backerAddress, betManagerAddress)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should return `false` if address has approved spender', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.vault.isApproved(backerAddress, constants_1.constants.NULL_ADDRESS)];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result).to.be.equal(false);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Registry', function () {
        it('should get the correct address using the `nameKey` BetManager ', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.registry.getAddress('BetManager')];
                    case 1:
                        result = _a.sent();
                        chai_1.expect(result.toLowerCase()).to.be.equal(betManagerAddress.toLowerCase());
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
            var signedBet, betHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fansunite.newSignedBet(bet, layerTokenFillAmount)];
                    case 1:
                        signedBet = _a.sent();
                        return [4 /*yield*/, fansunite.hashBet(bet)];
                    case 2:
                        betHash = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('BetManager', function () {
        it('should fill a bet', function () { return __awaiter(_this, void 0, void 0, function () {
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
    describe('generateNonce', function () {
        // TODO change to generate nonce
        it('should generate random number', function () { return __awaiter(_this, void 0, void 0, function () {
            var nonce;
            return __generator(this, function (_a) {
                nonce = fansunite.generateNonce();
                return [2 /*return*/];
            });
        }); });
    });
});
//# sourceMappingURL=fansunite.js.map