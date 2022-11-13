"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const models_1 = __importDefault(require("~src/modules/v1/controllers/auth/register/models"));
validator_1.default.validatePassword = async (passwordConfirmation, ctx) => {
    const { password, user_name: userName } = ctx.request.body;
    if (!passwordConfirmation || password !== passwordConfirmation) {
        return false;
    }
    const userModel = new models_1.default();
    try {
        const userExist = await userModel
            .getCollection()
            .findOne({ user_name: userName })
            .lean();
        if (userExist) {
            return false;
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
class Validation {
    getRegister() {
        return {
            'user_name:body': ['require', 'isLength', 'Invalid user_name'],
            'password:body': ['require', 'isLength', 'Invalid password'],
            'password_confirmation:body': [
                'validatePassword',
                'Invalid user name or password',
            ],
        };
    }
}
exports.default = Validation;
//# sourceMappingURL=register.js.map