import Env from '~src/helpers/env';
import mongoose from 'mongoose';

export default class ModelBase {
  private dbHost;
  private dbPort;
  private dbName;
  private dbUser;
  private dbPass;
  private dbUri;

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
  }
}
