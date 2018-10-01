"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var artifacts_1 = require("../artifacts");
var contract_wrapper_1 = require("./contract-wrapper");
var League001 = /** @class */ (function (_super) {
    __extends(League001, _super);
    function League001(web3, networkId) {
        var _this = _super.call(this, web3, networkId) || this;
        _this.leagueContracts = {};
        return _this;
    }
    League001.prototype.getName = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getName().call()];
            });
        });
    };
    League001.prototype.getClass = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getClass().call()];
            });
        });
    };
    League001.prototype.getVersion = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getVersion().call()];
            });
        });
    };
    League001.prototype.getSeasons = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getSeasons().call()];
            });
        });
    };
    League001.prototype.getSeason = function (leagueAddress, year) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this._getLeagueContractInstance(leagueAddress);
                        return [4 /*yield*/, instance.methods.getSeason(year).call()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result[1]];
                }
            });
        });
    };
    League001.prototype.getFixture = function (leagueAddress, id) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, result, fixture;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this._getLeagueContractInstance(leagueAddress);
                        return [4 /*yield*/, instance.methods.getFixture(id).call()];
                    case 1:
                        result = _a.sent();
                        fixture = {
                            id: Number(result[0]),
                            participants: result[1].map(function (p) { return Number(p); }),
                            start: Number(result[2])
                        };
                        return [2 /*return*/, fixture];
                }
            });
        });
    };
    League001.prototype.getSeasonWithFixtures = function (leagueAddress, year) {
        return __awaiter(this, void 0, void 0, function () {
            var fixtureIds, fixturePromises, fixtures;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSeason(leagueAddress, year)];
                    case 1:
                        fixtureIds = _a.sent();
                        fixturePromises = fixtureIds.map(function (id) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, this.getFixture(leagueAddress, id)];
                        }); }); });
                        return [4 /*yield*/, Promise.all(fixturePromises)];
                    case 2:
                        fixtures = _a.sent();
                        return [2 /*return*/, fixtures];
                }
            });
        });
    };
    League001.prototype.getParticipants = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    League001.prototype.getParticipant = function (leagueAddress, id) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, result, participant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this._getLeagueContractInstance(leagueAddress);
                        return [4 /*yield*/, instance.methods.getParticipant(id).call()];
                    case 1:
                        result = _a.sent();
                        participant = {
                            id: Number(result[0]),
                            name: result[1],
                            details: result[2]
                        };
                        return [2 /*return*/, participant];
                }
            });
        });
    };
    League001.prototype.getResolvers = function (leagueAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getResolvers().call()];
            });
        });
    };
    League001.prototype.getResolution = function (leagueAddress, fixtureId, resolver) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.getResolution(fixtureId, resolver).call()];
            });
        });
    };
    League001.prototype.isParticipant = function (leagueAddress, id) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.isParticipant(id).call()];
            });
        });
    };
    League001.prototype.isResolverRegistered = function (leagueAddress, resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.isResolverRegistered(resolverAddress).call()];
            });
        });
    };
    League001.prototype.isFixtureScheduled = function (leagueAddress, fixtureId) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getLeagueContractInstance(leagueAddress);
                return [2 /*return*/, instance.methods.isFixtureScheduled(fixtureId).call()];
            });
        });
    };
    League001.prototype._getLeagueContractInstance = function (leagueAddress) {
        if (this.leagueContracts[leagueAddress]) {
            return this.leagueContracts[leagueAddress];
        }
        var leagueContract = new this.web3.eth.Contract(artifacts_1.artifacts.League001.abi, leagueAddress);
        this.leagueContracts[leagueAddress] = leagueContract;
        return leagueContract;
    };
    return League001;
}(contract_wrapper_1.ContractWrapper));
exports.League001 = League001;
//# sourceMappingURL=league-001.js.map