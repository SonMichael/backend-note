"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("~src/modules/v1/controllers"));
const models_1 = __importDefault(require("~src/modules/v1/controllers/auth/register/models"));
const config_1 = __importDefault(require("~src/config"));
class AuthController extends controllers_1.default {
    constructor() {
        super();
        this._usersModel = new models_1.default();
    }
    async register(ctx) {
        const { user_name: userName, password } = ctx.request.body;
        const createData = { user_name: userName, password };
        try {
            const data = await this._usersModel.getCollection().create(createData);
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=index.js.map