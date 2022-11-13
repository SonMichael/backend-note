"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginValidation {
    getLogin() {
        return {
            'user_name:body': ['require', 'isLength', 'Invalid user_name'],
            'password:body': ['require', 'isLength', 'Invalid password'],
        };
    }
}
exports.default = LoginValidation;
//# sourceMappingURL=login.js.map