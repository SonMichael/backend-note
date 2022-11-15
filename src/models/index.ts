import Env from '~src/helpers/env';
import mongoose from 'mongoose';

export default class ModelBase {
  private dbHost: string;
  private dbPort: string;
  private dbName: string;
  private dbUser: string;
  private dbPass: string;
  private dbUri: string;

  constructor() {
    const env = new Env();
    this.dbHost = env.getValue('DB_HOST');
    this.dbPort = env.getValue('DB_PORT');
    this.dbName = env.getValue('DB_NAME');
    this.dbUser = env.getValue('DB_NOTE_USERNAME');
    this.dbPass = env.getValue('DB_NOTE_PASSWORD');
    this.dbUri = `mongodb://${this.dbHost}:${this.dbPort}`;
  }

  public connect() {
    mongoose.connect(this.dbUri, {
      user: this.dbUser,
      pass: this.dbPass,
      dbName: this.dbName,
      autoCreate: true,
      authSource: this.dbName,
    });
    mongoose.set('debug', true);
  }
}
