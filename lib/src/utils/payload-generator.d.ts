import BN = require('bn.js');
export declare function generateMoneylinePayload(web3: any, participantId: any): any;
export declare function generateSpreadPayload(web3: any, participantId: BN, spread: BN): any;
export declare function generateTotalsPayload(web3: any, participantId: BN, total: BN, over: boolean): any;
