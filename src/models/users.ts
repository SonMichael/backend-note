import mongoose, { Schema, model, Model } from 'mongoose';
import ModelBase from '~src/models';
import { SchemaInterface } from '~src/models/Ischema';

export default class UserModel extends ModelBase implements SchemaInterface {
  public getCollection(): Model<any> {
    if (mongoose.models.users) {
      return mongoose.models.users;
    }
    return this.initSchema();
  }

  private initSchema() {
    const schema = new Schema({
      user_name: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    return model('users', schema);
  }
}
