"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("~src/config"));
class Api {
    pass(ctx, data, status = 200) {
        const json = {
            data,
            error: null,
        };
        ctx.status = status;
        ctx.body = json;
    }
    fail(ctx, code, message = '', data = null, status = 500) {
        if (!message) {
            message = config_1.default.err_msg[code] || '';
        }
        const json = {
            data: null,
            error: {
                code,
                data,
                message,
            },
        };
        ctx.status = status;
        ctx.body = json;
    }
    response(ctx, data = null, error = null, status = 200) {
        ctx.status = status;
        ctx.body = { data, error };
    }
}
exports.default = Api;
//# sourceMappingURL=api.js.map