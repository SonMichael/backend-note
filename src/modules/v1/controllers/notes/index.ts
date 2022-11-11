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
    const { _id } = ctx.state.auth;
    try {
      const data = await this._notesModel
        .getCollection()
        .find({ user_id: _id })
        .sort([['updated_at', -1]])
        .lean();
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async getNoteById(ctx: Context) {
    const { id } = ctx.params;
    const { _id: userId } = ctx.state.auth;

    try {
      const data = await this._notesModel
        .getCollection()
        .findOne({ _id: id, user_id: userId })
        .lean();
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async updateNote(ctx: Context) {
    const { _id } = ctx.request.body;
    const { _id: userId } = ctx.state.auth;
    const updateData = Object.assign(
      { updated_at: Date.now(), user_id: userId },
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
    const { _id: userId } = ctx.state.auth;
    const createData = Object.assign({ user_id: userId }, body);
    try {
      const data = await this._notesModel.getCollection().create(createData);
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }

  public async deleteNote(ctx: Context) {
    const { id } = ctx.params;
    const { _id: userId } = ctx.state.auth;
    try {
      const data = await this._notesModel
        .getCollection()
        .deleteOne({ _id: id, user_id: userId });
      return this._api.pass(ctx, data);
    } catch (err: any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message);
    }
  }
}
