"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = require("web3");
var web3 = new web3_1.default();
function generateMoneylinePayload(participantId) {
    return web3.eth.abi.encodeParameters(['uint256'], [participantId]);
}
exports.generateMoneylinePayload = generateMoneylinePayload;
function generateSpreadPayload(participantId, spread) {
    return web3.eth.abi.encodeParameters(['uint256', 'uint256'], [participantId, spread]);
}
exports.generateSpreadPayload = generateSpreadPayload;
function generateTotalsPayload(participantId, total, over) {
    return web3.eth.abi.encodeParameters(['uint256', 'uint256', 'bool'], [participantId, total, over]);
}
exports.generateTotalsPayload = generateTotalsPayload;
//# sourceMappingURL=payload-generator.js.map