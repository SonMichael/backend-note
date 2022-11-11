export default class Env {
  public getValue(name: string): string {
    return process.env[name] || '';
  }
}
