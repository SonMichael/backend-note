export default class Env {
  public static getEnv(name: string) {
    try {
      return typeof process.env[name] !== 'undefined' ? process.env[name] : null;
    } catch (e) {
      return null;
    }
  }
}