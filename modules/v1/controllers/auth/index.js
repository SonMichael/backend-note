"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("~src/modules/v1/controllers"));
const models_1 = __importDefault(require("~src/modules/v1/controllers/auth/models"));
const config_1 = __importDefault(require("~src/config"));
const moment_1 = __importDefault(require("moment"));
const jwt_1 = __importDefault(require("~src/helpers/lib/jwt"));
class AuthController extends controllers_1.default {
    constructor() {
        super();
        this._usersModel = new models_1.default();
        this._jwtToken = new jwt_1.default();
    }
    async login(ctx) {
        const { user_name: userName, password } = ctx.request.body;
        const target = await this._usersModel
            .getCollection()
            .findOne({ user_name: userName, password })
            .lean();
        if (!target) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00002, '', 401);
        }
        const data = {
            token: this.generateJwtToken(target),
        };
        return this._api.pass(ctx, data);
    }
    generateJwtToken(info) {
        const { _id, user_name } = info;
        const expiredAt = (0, moment_1.default)().add(1, 'weeks').unix();
        const data = {
            expired_at: expiredAt,
            _id,
            user_name,
        };
        return this._jwtToken.encode(data);
    }
}
exports.default = AuthController;
//# sourceMappingURL=index.js.map