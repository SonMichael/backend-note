"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa2_cors_1 = __importDefault(require("koa2-cors"));
require("./bootstrap");
const env_1 = __importDefault(require("~src/helpers/env"));
const modules_1 = __importDefault(require("~src/modules"));
const koa_router_1 = __importDefault(require("koa-router"));
const models_1 = __importDefault(require("~src/models"));
const auth_1 = __importDefault(require("~src/middleware/auth"));
const authMiddleware = new auth_1.default();
const env = new env_1.default();
const modules = new modules_1.default();
const routes = modules.initRouters();
const koaRouter = new koa_router_1.default();
koaRouter.use(authMiddleware.verify());
koaRouter.use(routes.v1);
koaRouter.use(routes.v2);
const model = new models_1.default();
model.connect();
const app = new koa_1.default();
app.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        ctx.status = err.status || err.code || 500;
        ctx.body = {
            success: false,
            message: err.message,
        };
    }
});
app.use((0, koa2_cors_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_body_1.default)({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
}));
app.use(koaRouter.routes()).use(koaRouter.allowedMethods());
app.listen(env.getValue('APP_PORT'), () => {
    // console.info(`Koa started on port ${env.getValue('APP_PORT')}`);
});
//# sourceMappingURL=index.js.map