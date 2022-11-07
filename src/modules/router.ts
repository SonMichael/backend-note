
import KoaRouter from 'koa-router';

export default abstract class Router {
  protected prefix = '/api'
  public abstract initRouter():KoaRouter
}