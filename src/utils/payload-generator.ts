import BN = require('bn.js');
import Web3 from 'web3';

const web3 = new Web3();

export function generateMoneylinePayload(participantId: BN) {
  return web3.eth.abi.encodeParameters(['uint256'], [participantId]);
}

export function generateSpreadPayload(participantId: BN, spread: BN) {
  return web3.eth.abi.encodeParameters(['uint256', 'uint256'], [participantId, spread]);
}

export function generateTotalsPayload(participantId: BN, total: BN, over: boolean) {
  return web3.eth.abi.encodeParameters(['uint256', 'uint256', 'bool'], [participantId, total, over]);
}