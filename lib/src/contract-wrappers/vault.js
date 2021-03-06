"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var BN = require("bn.js");
var artifacts_1 = require("../artifacts");
var contract_wrapper_1 = require("./contract-wrapper");
var Vault = /** @class */ (function (_super) {
    __extends(Vault, _super);
    function Vault(web3, networkId) {
        return _super.call(this, web3, networkId) || this;
    }
    Vault.prototype.approve = function (spender, from) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.approve(spender).send({ from: from })];
            });
        });
    };
    Vault.prototype.deposit = function (token, amount, from) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.deposit(token, token === '0x0000000000000000000000000000000000000000' ? 0 : amount).send({
                        from: from,
                        value: token === '0x0000000000000000000000000000000000000000' ? amount : undefined
                    })];
            });
        });
    };
    Vault.prototype.withdraw = function (token, amount, from) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.withdraw(token, amount).send({ from: from })];
            });
        });
    };
    Vault.prototype.transfer = function (token, to, amount, from) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.transfer(token, to, amount).send({ from: from })];
            });
        });
    };
    Vault.prototype.balanceOf = function (token, user) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this._getVaultInstance();
                        return [4 /*yield*/, instance.methods.balanceOf(token, user).call()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, new BN(result)];
                }
            });
        });
    };
    Vault.prototype.isApproved = function (user, spender) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.isApproved(user, spender).call()];
            });
        });
    };
    Vault.prototype.isSpender = function (spender) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this._getVaultInstance();
                return [2 /*return*/, instance.methods.isSpender(spender).call()];
            });
        });
    };
    Vault.prototype.getContractAddress = function () {
        return artifacts_1.artifacts.Vault.networks[this.networkId].address;
    };
    Vault.prototype._getVaultInstance = function () {
        if (this.vaultInstance) {
            return this.vaultInstance;
        }
        this.vaultInstance = new this.web3.eth.Contract(artifacts_1.artifacts.Vault.abi, artifacts_1.artifacts.Vault.networks[this.networkId].address);
        return this.vaultInstance;
    };
    return Vault;
}(contract_wrapper_1.ContractWrapper));
exports.Vault = Vault;
//# sourceMappingURL=vault.js.map