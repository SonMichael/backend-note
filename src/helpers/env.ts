export default class Env {
  public getValue(name: string) {
    try {
      return typeof process.env[name] !== 'undefined'
        ? process.env[name]
        : null;
    } catch (e) {
      return null;
    }
  }
}
