import Koa from 'koa';
import BodyParser from 'koa-body';
import Json from 'koa-json';
import Router from 'koa-router';
import Cors from 'koa2-cors';
import './bootstrap';
import Env from '~src/helper/env'


const app = new Koa();

const router = new Router();

app.use(Cors());
app.use(Json());

app.use(
  BodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true,
  }),
);


app.listen(Env.getEnv('APP_PORT'), () => {
  console.info(`Koa started on port ${Env.getEnv('APP_PORT')}`);
});