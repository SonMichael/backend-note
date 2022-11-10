"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Env {
    getValue(name) {
        try {
            return typeof process.env[name] !== 'undefined'
                ? process.env[name]
                : null;
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = Env;
//# sourceMappingURL=env.js.map