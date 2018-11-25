"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eth_sig_util_1 = require("eth-sig-util");
function hashBet(bet, networkId, betManagerAddress) {
    var eip712Domain = [
        { name: 'name', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
    ];
    var eip712Bet = [
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
    var domainData = {
        name: 'FansUnite Protocol',
        chainId: networkId,
        verifyingContract: betManagerAddress
    };
    var message = {
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
    var data = {
        types: {
            EIP712Domain: eip712Domain,
            Bet: eip712Bet
        },
        domain: domainData,
        primaryType: 'Bet',
        message: message
    };
    return '0x' + eth_sig_util_1.TypedDataUtils.sign(data).toString('hex');
}
exports.hashBet = hashBet;
//# sourceMappingURL=hash-utils.js.map