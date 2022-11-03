"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
require("./bootstrap");
const env_1 = __importDefault(require("~src/helper/env"));
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use((0, koa2_cors_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_body_1.default)({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
}));
app.listen(env_1.default.getEnv('APP_PORT'), () => {
    console.info(`Koa started on port ${env_1.default.getEnv('APP_PORT')}`);
});
//# sourceMappingURL=index.js.map