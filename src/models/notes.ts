import { Schema, model, Model } from 'mongoose';
import ModelBase from '~src/models';

export default class Note extends ModelBase {
  private _collection: Model<any>;

  constructor() {
    super();
    const NotesSchema = new Schema({
      title: { type: String, required: true },
      text: { type: String },
      content: { type: Object },
      created_at: { type: Date, default: Date.now, required: true },
      updated_at: { type: Date, default: Date.now },
    });
    this._collection = model('notes', NotesSchema);
  }

  public getCollection() {
    return this._collection;
  }
}
