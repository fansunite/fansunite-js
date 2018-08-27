"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
function hashBet(bet) {
    var schema = [
        'address backerAddress',
        'address layerAddress',
        'address backerTokenAddress',
        'address layerTokenAddress',
        'address feeRecipientAddress',
        'address leagueAddress',
        'address resolverAddress',
        'uint256 backerTokenStake',
        'uint256 backerFee',
        'uint256 layerFee',
        'uint256 expirationTimeSeconds',
        'uint256 fixtureId',
        'uint256 backerOdds',
        'uint256 salt',
        'bytes betPayload'
    ];
    var newBet = {
        backerAddress: bet.backerAddress,
        layerAddress: bet.layerAddress,
        backerTokenAddress: bet.backerTokenAddress,
        layerTokenAddress: bet.layerTokenAddress,
        feeRecipientAddress: bet.feeRecipientAddress,
        leagueAddress: bet.leagueAddress,
        resolverAddress: bet.resolverAddress,
        backerTokenStake: bet.backerTokenStake,
        backerFee: bet.backerFee,
        layerFee: bet.layerFee,
        expirationTimeSeconds: bet.expirationTimeSeconds,
        fixtureId: bet.fixtureId,
        backerOdds: bet.backerOdds,
        salt: bet.salt,
        betPayload: bet.betPayload
    };
    var valuesHash = Web3.utils.soliditySha3.apply(null, Object.values(newBet));
    var schemaHash = Web3.utils.soliditySha3.apply(null, schema);
    return Web3.utils.soliditySha3.apply(null, [schemaHash, valuesHash]);
}
exports.hashBet = hashBet;
//# sourceMappingURL=hash-utils.js.map