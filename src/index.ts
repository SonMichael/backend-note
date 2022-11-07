import Koa from 'koa';
import BodyParser from 'koa-body';
import Json from 'koa-json';
import Cors from 'koa2-cors';
import './bootstrap';
import Env from '~src/helpers/env';
import Modules from '~src/modules';
import KoaRouter from 'koa-router';
import Model from '~src/models';

const env = new Env();

const modules = new Modules();
const routes = modules.initRouters();
const koaRouter = new KoaRouter();
koaRouter.use(routes.v1);
koaRouter.use(routes.v2);
const model = new Model();
model.connect();

const app = new Koa();
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || err.code || 500;
    ctx.body = {
      success: false,
      message: err.message,
    };
  }
});
app.use(Cors());
app.use(Json());
app.use(
  BodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
  }),
);
app.use(koaRouter.routes()).use(koaRouter.allowedMethods());
app.listen(env.getValue('APP_PORT'), () => {
  // console.info(`Koa started on port ${env.getValue('APP_PORT')}`);
});
