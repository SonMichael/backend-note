import { Context } from 'koa';
import ControllerV1 from '~src/modules/v1/controllers';
import UserModel from '~src/modules/v1/controllers/auth/register/models';
import Config from '~src/config';

export default class AuthController extends ControllerV1 {
  private _usersModel: UserModel;

  constructor() {
    super();
    this._usersModel = new UserModel();
  }

  public async register(ctx: Context) {
    const { user_name: userName, password } = ctx.request.body;
    const createData = { user_name: userName, password };
    try {
      const data = await this._usersModel.getCollection().create(createData);
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }
}
