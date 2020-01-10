import BN = require('bn.js');
export declare function generateMoneylinePayload(participantId: BN): any;
export declare function generateSpreadPayload(participantId: BN, spread: BN): any;
export declare function generateTotalsPayload(participantId: BN, total: BN, over: boolean): any;
