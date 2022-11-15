import { Context } from 'koa';
import Moment from 'moment';
import ConfigConstant from '~src/config';
import ExcludeLoginConstant from '~src/config/exclude_login';
import Api from '~src/helpers/lib/api';
import JwtToken from '~src/helpers/lib/jwt';
import UserModel from '~src/modules/v1/controllers/auth/login/models';
import _ from 'lodash';

type UserInfoType = {
  user_name: string;
  _id: string;
  expired_at: number;
};
export default class Auth {
  private _jwtToken: JwtToken;
  private _usersModel: UserModel;
  private _api: Api;

  constructor() {
    this._jwtToken = new JwtToken();
    this._usersModel = new UserModel();
    this._api = new Api();
  }

  public verify() {
    return async (ctx: Context, next: any) => {
      const {
        _matchedRoute: routeName,
        headers: { authorization = '' },
      } = ctx;

      if (ExcludeLoginConstant.routes.includes(routeName)) {
        return next();
      }

      if (!authorization) {
        return this._api.fail(ctx, ConfigConstant.codes.ERR_00002, '', 401);
      }

      const data = await this.getDataFromJwtToken(authorization);
      if (!data) {
        return this._api.fail(ctx, ConfigConstant.codes.ERR_00002, '', 401);
      }

      const { expired_at: expiredAt, _id, user_name } = data;

      if (expiredAt < Moment().unix()) {
        return this._api.fail(ctx, ConfigConstant.codes.ERR_00002, '', 401);
      }

      const result = await this._usersModel
        .getCollection()
        .findById(_id)
        .lean();

      if (!result) {
        return this._api.fail(ctx, ConfigConstant.codes.ERR_00002, '', 401);
      }

      ctx.state.auth = {
        _id,
        user_name,
      };
      return await next();
    };
  }

  private async getDataFromJwtToken(
    authorization: string,
  ): Promise<UserInfoType | null> {
    try {
      if (_.startsWith(authorization, 'Bearer')) {
        const token = _.trim(_.replace(authorization, 'Bearer', ''), ' ');
        return await this._jwtToken.decode(token);
      }
    } catch (e) {
      return null;
    }
    return null;
  }
}
