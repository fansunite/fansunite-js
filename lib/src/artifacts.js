"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BetManager = __importStar(require("./artifacts/BetManager.json"));
var ERC20 = __importStar(require("./artifacts/ERC20.json"));
var FanToken = __importStar(require("./artifacts/FanToken.json"));
var League001 = __importStar(require("./artifacts/League001.json"));
var LeagueRegistry = __importStar(require("./artifacts/LeagueRegistry.json"));
var Registry = __importStar(require("./artifacts/Registry.json"));
var Resolver = __importStar(require("./artifacts/Resolver.json"));
var ResolverRegistry = __importStar(require("./artifacts/ResolverRegistry.json"));
var Vault = __importStar(require("./artifacts/Vault.json"));
exports.artifacts = {
    BetManager: BetManager,
    ERC20: ERC20,
    FanToken: FanToken,
    League001: League001,
    LeagueRegistry: LeagueRegistry,
    Registry: Registry,
    Resolver: Resolver,
    ResolverRegistry: ResolverRegistry,
    Vault: Vault
};
//# sourceMappingURL=artifacts.js.map