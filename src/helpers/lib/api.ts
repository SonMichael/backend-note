import { Context } from 'koa';
import Config from '~src/config';

export default class Api {
  public pass(ctx: Context, data: any, status = 200) {
    const json = {
      data,
      error: null,
    };

    ctx.status = status;
    ctx.body = json;
  }

  public fail(
    ctx: Context,
    code: string,
    message = '',
    data: any = null,
    status = 500,
  ) {
    if (!message) {
      message = Config.err_msg[code] || '';
    }
    const json = {
      data: null,
      error: {
        code,
        data,
        message,
      },
    };
    ctx.status = status;
    ctx.body = json;
  }

  public response(
    ctx: Context,
    data: any = null,
    error: any = null,
    status = 200,
  ) {
    ctx.status = status;
    ctx.body = { data, error };
  }
}
