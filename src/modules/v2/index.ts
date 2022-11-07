import KoaRouter from 'koa-router';
import Router from '~src/modules/router'



export default class RouterV2 extends Router {
  private prefixV2 = `${this.prefix}/v2`
  private router: KoaRouter

  constructor() {
    super()
    this.router = new KoaRouter({prefix: this.prefixV2});
  }


  public initRouter()
  {
    return this.router
  }

}