"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const env_1 = __importDefault(require("~src/helpers/env"));
class Crypto {
    constructor() {
        const env = new env_1.default();
        this._key = env.getValue('APP_SALT');
    }
    hash(str) {
        const hash = crypto_1.default.pbkdf2Sync(str, this._key, 2048, 32, 'sha512').toString('hex');
        return `${hash}`;
    }
}
exports.default = Crypto;
//# sourceMappingURL=crypto.js.map