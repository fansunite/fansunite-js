import BN = require('bn.js');

export function generateMoneylinePayload(web3, participantId) {
  return web3.eth.abi.encodeParameters(['uint256'], participantId);
}

export function generateSpreadPayload(web3, participantId: BN, spread: BN) {
  return web3.eth.abi.encodeParameters(['uint256', 'uint256'], [participantId, spread]);
}

export function generateTotalsPayload(web3, participantId: BN, total: BN, over: boolean) {
  return web3.eth.abi.encodeParameters(['uint256', 'uint256', 'bool'], [participantId, total, over]);
}