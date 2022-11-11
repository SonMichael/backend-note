import Jwt from 'jwt-simple';
import Env from '~src/helpers/env';

export default class JwtToken {
  private _key: string;

  constructor() {
    const env = new Env();
    this._key = env.getValue('APP_SALT');
  }

  public encode(payload: any[] | object) {
    return Jwt.encode(payload, this._key);
  }

  public decode(payload: string) {
    return Jwt.decode(payload, this._key);
  }
}
