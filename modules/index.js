"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("~src/modules/v1"));
const v2_1 = __importDefault(require("~src/modules/v2"));
class Modules {
    constructor() {
        this.routerV1 = new v1_1.default();
        this.routerV2 = new v2_1.default();
    }
    initRouters() {
        return {
            v1: this.routerV1.initRouter().routes(),
            v2: this.routerV2.initRouter().routes(),
        };
    }
}
exports.default = Modules;
//# sourceMappingURL=index.js.map