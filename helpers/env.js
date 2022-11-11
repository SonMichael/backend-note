"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Env {
    getValue(name) {
        return process.env[name] || '';
    }
}
exports.default = Env;
//# sourceMappingURL=env.js.map