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
var Registry = /** @class */ (function (_super) {
    __extends(Registry, _super);
    function Registry(web3, networkId) {
        return _super.call(this, web3, networkId) || this;
    }
    return Registry;
}(contract_wrapper_1.ContractWrapper));
exports.Registry = Registry;
