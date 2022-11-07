import RouterV1 from '~src/modules/v1';
import RouterV2 from '~src/modules/v2';

export default class Modules {
  private routerV1: RouterV1;
  private routerV2: RouterV2;

  constructor() {
    this.routerV1 = new RouterV1();
    this.routerV2 = new RouterV2();
  }

  public initRouters() {
    return {
      v1: this.routerV1.initRouter().routes(),
      v2: this.routerV2.initRouter().routes(),
    };
  }
}
