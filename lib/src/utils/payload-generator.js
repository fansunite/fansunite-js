"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateMoneylinePayload(web3, participantId) {
    return web3.eth.abi.encodeParameters(['uint256'], participantId);
}
exports.generateMoneylinePayload = generateMoneylinePayload;
function generateSpreadPayload(web3, participantId, spread) {
    return web3.eth.abi.encodeParameters(['uint256', 'uint256'], [participantId, spread]);
}
exports.generateSpreadPayload = generateSpreadPayload;
function generateTotalsPayload(web3, participantId, total, over) {
    return web3.eth.abi.encodeParameters(['uint256', 'uint256', 'bool'], [participantId, total, over]);
}
exports.generateTotalsPayload = generateTotalsPayload;
//# sourceMappingURL=payload-generator.js.map