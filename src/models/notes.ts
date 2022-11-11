import mongoose, { Schema, model, Model } from 'mongoose';
import ModelBase from '~src/models';
import { SchemaInterface } from '~src/models/Ischema';

export default class Note extends ModelBase implements SchemaInterface {
  public getCollection(): Model<any> {
    if (mongoose.models.notes) {
      return mongoose.models.notes;
    }
    return this.initSchema();
  }

  private initSchema() {
    const NotesSchema = new Schema({
      title: { type: String, required: true },
      text: { type: String },
      content: { type: Object },
      user_id: { type: String, required: true },
      created_at: { type: Date, default: Date.now, required: true },
      updated_at: { type: Date, default: Date.now },
    });
    NotesSchema.index({ user_id: 1, _id: 1 }, { unique: true });
    return model('notes', NotesSchema);
  }
}
