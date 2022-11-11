"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const env_1 = __importDefault(require("~src/helpers/env"));
class JwtToken {
    constructor() {
        const env = new env_1.default();
        this._key = env.getValue('APP_SALT');
    }
    encode(payload) {
        return jwt_simple_1.default.encode(payload, this._key);
    }
    decode(payload) {
        return jwt_simple_1.default.decode(payload, this._key);
    }
}
exports.default = JwtToken;
//# sourceMappingURL=jwt.js.map