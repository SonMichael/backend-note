"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("~src/helpers/env"));
const mongoose_1 = __importDefault(require("mongoose"));
class ModelBase {
    constructor() {
        const env = new env_1.default();
        this.dbHost = env.getValue('DB_HOST');
        this.dbPort = env.getValue('DB_PORT');
        this.dbName = env.getValue('DB_NAME');
        this.dbUser = env.getValue('DB_NOTE_USERNAME');
        this.dbPass = env.getValue('DB_NOTE_PASSWORD');
        this.dbUri = `mongodb://${this.dbHost}:${this.dbPort}`;
    }
    connect() {
        mongoose_1.default.connect(this.dbUri, {
            user: this.dbUser,
            pass: this.dbPass,
            dbName: this.dbName,
            autoCreate: true,
            authSource: this.dbName,
        });
    }
}
exports.default = ModelBase;
//# sourceMappingURL=index.js.map