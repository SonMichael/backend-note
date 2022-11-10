import { Context } from 'koa';
import ControllerV1 from '~src/modules/v1/controllers';
import NotesModel from '~src/modules/v1/controllers/notes/models';
import Config from '~src/config';
export default class NotesController extends ControllerV1 {
  private _notesModel: NotesModel;

  constructor() {
    super();
    this._notesModel = new NotesModel();
  }

  public async getNotes(ctx: Context) {
    try {
      const data = await this._notesModel
        .getCollection()
        .find()
        .sort([['updated_at', -1]])
        .lean();
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async getNoteById(ctx: Context) {
    const { id } = ctx.params;
    try {
      const data = await this._notesModel.getCollection().findById(id).lean();
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async updateNote(ctx: Context) {
    const { _id } = ctx.request.body;
    const updateData = Object.assign(
      { updated_at: Date.now() },
      ctx.request.body,
    );
    try {
      const data = await this._notesModel
        .getCollection()
        .findOneAndUpdate({ _id }, updateData, { new: true });
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async createNote(ctx: Context) {
    const { body } = ctx.request;
    try {
      const data = await this._notesModel.getCollection().create(body);
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async deleteNote(ctx: Context) {
    const { id } = ctx.params;
    try {
      const data = await this._notesModel
        .getCollection()
        .deleteOne({ _id: id });
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }
}
