"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("~src/config"));
const exclude_login_1 = __importDefault(require("~src/config/exclude_login"));
const api_1 = __importDefault(require("~src/helpers/lib/api"));
const jwt_1 = __importDefault(require("~src/helpers/lib/jwt"));
const models_1 = __importDefault(require("~src/modules/v1/controllers/auth/models"));
const lodash_1 = __importDefault(require("lodash"));
class Auth {
    constructor() {
        this._jwtToken = new jwt_1.default();
        this._usersModel = new models_1.default();
        this._api = new api_1.default();
    }
    verify() {
        return async (ctx, next) => {
            const { _matchedRoute: routeName, headers: { authorization = '' }, } = ctx;
            if (exclude_login_1.default.routes.includes(routeName)) {
                return next();
            }
            if (!authorization) {
                return this._api.fail(ctx, config_1.default.codes.ERR_00002, '', 401);
            }
            const data = await this.getDataFromJwtToken(authorization);
            if (!data) {
                return this._api.fail(ctx, config_1.default.codes.ERR_00002, '', 401);
            }
            const { expired_at: expiredAt, _id, user_name } = data;
            if (expiredAt < (0, moment_1.default)().unix()) {
                return this._api.fail(ctx, config_1.default.codes.ERR_00002, '', 401);
            }
            const result = await this._usersModel
                .getCollection()
                .findById(_id)
                .lean();
            if (!result) {
                return this._api.fail(ctx, config_1.default.codes.ERR_00002, '', 401);
            }
            ctx.state.auth = {
                _id,
                user_name,
            };
            return await next();
        };
    }
    async getDataFromJwtToken(authorization) {
        try {
            if (lodash_1.default.startsWith(authorization, 'Bearer')) {
                const token = lodash_1.default.trim(lodash_1.default.replace(authorization, 'Bearer', ''), ' ');
                return await this._jwtToken.decode(token);
            }
        }
        catch (e) {
            return null;
        }
        return null;
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map