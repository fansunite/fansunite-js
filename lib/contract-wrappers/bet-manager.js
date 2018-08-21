"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var contract_wrapper_1 = require("./contract-wrapper");
var BetManager = /** @class */ (function (_super) {
    __extends(BetManager, _super);
    function BetManager(web3) {
        return _super.call(this, web3) || this;
    }
    return BetManager;
}(contract_wrapper_1.ContractWrapper));
exports.BetManager = BetManager;
//# sourceMappingURL=bet-manager.js.map