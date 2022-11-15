import Lib from 'crypto';
import Env from '~src/helpers/env';

export default class Crypto {
  private _key: string;

  constructor() {
    const env = new Env();
    this._key = env.getValue('APP_SALT');
  }

  public hash(str: string) {
    const hash = Lib.pbkdf2Sync(str, this._key, 2048, 32, 'sha512').toString(
      'hex',
    );
    return `${hash}`;
  }
}
