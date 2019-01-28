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
var Resolver = /** @class */ (function (_super) {
    __extends(Resolver, _super);
    function Resolver(web3, networkId) {
        var _this = _super.call(this, web3, networkId) || this;
        _this.resolverContracts = {};
        return _this;
    }
    Resolver.prototype.getDescription = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getDescription().call()];
            });
        });
    };
    Resolver.prototype.getType = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getType().call()];
            });
        });
    };
    Resolver.prototype.getDetails = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getDetails().call()];
            });
        });
    };
    Resolver.prototype.getInitSelector = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getInitSelector().call()];
            });
        });
    };
    Resolver.prototype.getValidatorSelector = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getValidatorSelector().call()];
            });
        });
    };
    Resolver.prototype.getSegmentSelector = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getResolverContractInstance(resolverAddress);
                return [2 /*return*/, instance.methods.getSegmentSelector().call()];
            });
        });
    };
    Resolver.prototype.getSegment = function (resolverAddress, leagueAddress, fixtureId, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var segmentSelector, encodedLeagueFixture, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSegmentSelector(resolverAddress)];
                    case 1:
                        segmentSelector = _a.sent();
                        return [4 /*yield*/, this.web3.eth.abi.encodeParameters(['address', 'uint256'], [leagueAddress, fixtureId])];
                    case 2:
                        encodedLeagueFixture = _a.sent();
                        data = "" + segmentSelector + encodedLeagueFixture.replace('0x', '') + payload.replace('0x', '');
                        return [2 /*return*/, this.web3.eth.call({ to: resolverAddress, data: data })];
                }
            });
        });
    };
    Resolver.prototype._getResolverContractInstance = function (resolverAddress) {
        if (this.resolverContracts[resolverAddress]) {
            return this.resolverContracts[resolverAddress];
        }
        var resolverContract = new this.web3.eth.Contract(artifacts_1.artifacts.Resolver.abi, resolverAddress);
        this.resolverContracts[resolverAddress] = resolverContract;
        return resolverContract;
    };
    return Resolver;
}(contract_wrapper_1.ContractWrapper));
exports.Resolver = Resolver;
//# sourceMappingURL=resolver.js.map