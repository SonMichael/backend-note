"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("~src/helpers/lib/api"));
class Controller {
    constructor() {
        this._api = new api_1.default();
    }
}
exports.default = Controller;
//# sourceMappingURL=index.js.map