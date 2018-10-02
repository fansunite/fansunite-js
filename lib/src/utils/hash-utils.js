"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
function hashBet(bet, networkId) {
    var schema = [
        'Bet(',
        'address backer,',
        'address layer,',
        'address token,',
        'address league,',
        'address resolver,',
        'uint256 backerStake,',
        'uint256 fixture,',
        'uint256 odds,',
        'uint256 expiration,',
        'bytes payload',
        ')'
    ];
    var subjects = [
        bet.backer,
        bet.layer,
        bet.token,
        bet.league,
        bet.resolver
    ];
    var params = [
        bet.backerStake,
        bet.fixture,
        bet.odds,
        bet.expiration
    ];
    var payloadHash = Web3.utils.soliditySha3.apply(null, [bet.payload]);
    var schemaHash = Web3.utils.soliditySha3.apply(null, schema);
    var preHash = Web3.utils.soliditySha3.apply(null, [schemaHash].concat(subjects, params, [payloadHash]));
    return Web3.utils.soliditySha3.apply(null, [networkId, bet.nonce, preHash]);
}
exports.hashBet = hashBet;
//# sourceMappingURL=hash-utils.js.map