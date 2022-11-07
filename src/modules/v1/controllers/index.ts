import Api from '~src/helpers/lib/api'
export default abstract class Controller {
  protected _api:Api
  
  constructor() {
    this._api = new Api()
  }
}
