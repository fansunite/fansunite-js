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
function typedDataSignBet(web3, bet, betManagerAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var name, eip712Domain, eip712Bet, domainData, _a, message, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    name = 'FansUnite Protocol';
                    eip712Domain = [
                        { name: 'name', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' }
                    ];
                    eip712Bet = [
                        { name: 'backer', type: 'address' },
                        { name: 'layer', type: 'address' },
                        { name: 'token', type: 'address' },
                        { name: 'league', type: 'address' },
                        { name: 'resolver', type: 'address' },
                        { name: 'backerStake', type: 'uint256' },
                        { name: 'fixture', type: 'uint256' },
                        { name: 'odds', type: 'uint256' },
                        { name: 'expiration', type: 'uint256' },
                        { name: 'nonce', type: 'uint256' },
                        { name: 'payload', type: 'bytes' }
                    ];
                    _a = {
                        name: name
                    };
                    return [4 /*yield*/, web3.eth.net.getId()];
                case 1:
                    domainData = (_a.chainId = _b.sent(),
                        _a.verifyingContract = betManagerAddress,
                        _a);
                    message = {
                        backer: bet.backer,
                        layer: bet.layer,
                        token: bet.token,
                        league: bet.league,
                        resolver: bet.resolver,
                        backerStake: bet.backerStake.toString(),
                        fixture: bet.fixture.toString(),
                        odds: bet.odds.toString(),
                        expiration: bet.expiration.toString(),
                        nonce: bet.nonce.toString(),
                        payload: bet.payload
                    };
                    data = {
                        types: {
                            EIP712Domain: eip712Domain,
                            Bet: eip712Bet
                        },
                        domain: domainData,
                        primaryType: 'Bet',
                        message: message
                    };
                    return [2 /*return*/, signTypedDataV3(web3, bet, data)];
            }
        });
    });
}
exports.typedDataSignBet = typedDataSignBet;
function signTypedDataV3(web3, bet, data) {
    return __awaiter(this, void 0, void 0, function () {
        var sigResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                        web3.currentProvider.send({
                            method: 'eth_signTypedData',
                            params: [bet.backer, data],
                            from: bet.backer
                        }, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            if (!result.result) {
                                return reject(result);
                            }
                            var sig = result.result.substring(2);
                            var r = Buffer.from(sig.substring(0, 64), 'hex');
                            var s = Buffer.from(sig.substring(64, 128), 'hex');
                            var vInt = parseInt(sig.substring(128, 130), 16);
                            if (vInt < 27) {
                                vInt += 27;
                            }
                            var v = Buffer.from(vInt.toString(16), 'hex');
                            var mode = Buffer.from('00', 'hex');
                            var signature = '0x' + Buffer.concat([mode, v, r, s]).toString('hex');
                            resolve(signature);
                        });
                    })];
                case 1:
                    sigResult = _a.sent();
                    return [2 /*return*/, sigResult];
            }
        });
    });
}
//# sourceMappingURL=signature-utils.js.map