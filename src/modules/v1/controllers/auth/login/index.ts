import { Context } from 'koa';
import ControllerV1 from '~src/modules/v1/controllers';
import UserModel from '~src/modules/v1/controllers/auth/login/models';
import Config from '~src/config';
import Moment from 'moment';
import JwtToken from '~src/helpers/lib/jwt';

export default class AuthController extends ControllerV1 {
  private _usersModel: UserModel;
  private _jwtToken: JwtToken;

  constructor() {
    super();
    this._usersModel = new UserModel();
    this._jwtToken = new JwtToken();
  }

  public async login(ctx: Context) {
    const { user_name: userName, password } = ctx.request.body;
    try {
      const target = await this._usersModel
        .getCollection()
        .findOne({ user_name: userName, password })
        .lean();
      if (!target) {
        return this._api.fail(ctx, Config.codes.ERR_00002, '', 401);
      }

      const data = {
        token: this.generateJwtToken(target),
      };
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00002, '', 401);
    }
  }

  private generateJwtToken(info: { user_name: string; _id: string }) {
    const { _id, user_name } = info;
    const expiredAt = Moment().add(1, 'weeks').unix();
    const data = {
      expired_at: expiredAt,
      _id,
      user_name,
    };
    return this._jwtToken.encode(data);
  }
}
