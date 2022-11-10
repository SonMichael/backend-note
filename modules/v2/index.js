"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router_1 = __importDefault(require("~src/modules/router"));
class RouterV2 extends router_1.default {
    constructor() {
        super();
        this.prefixV2 = `${this.prefix}/v2`;
        this.router = new koa_router_1.default({ prefix: this.prefixV2 });
    }
    initRouter() {
        return this.router;
    }
}
exports.default = RouterV2;
//# sourceMappingURL=index.js.map