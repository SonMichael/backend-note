import {Context} from 'koa'
import ControllerV1 from '~src/modules/v1/controllers'
import NotesModel from '~src/modules/v1/controllers/notes/models'
import Config from '~src/config'
export default class NotesController extends ControllerV1 {
  
  private _notesModel:NotesModel ;
  
  constructor() {
    super()
    this._notesModel = new NotesModel()
  }

  public async getNotes(ctx:Context) 
  {
    try {
      const data = await this._notesModel.getCollection().find().lean()
      return this._api.pass(ctx, data)
    } catch(err:any) {
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message)
    }    
  }

  public async getNoteById(ctx:Context) 
  {
    const queryId = '63697574c08420d2928e734c'
    try {
      const data = await this._notesModel.getCollection().find({_id: queryId}).lean()
      return this._api.pass(ctx, data)
    } catch(err:any){
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message)

    }    
  }

  public async updateNote(ctx:Context) 
  {
    const {id, title, text} = ctx.request.body
    try {
      const data = await this._notesModel.getCollection().updateOne({_id: id}, {title: title, text: text, updated_at: Date.now()})
      return this._api.pass(ctx, data)
    } catch(err: any){
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message)
    }    
  }

  public async createNote(ctx:Context) 
  {
    const {title, text} = ctx.request.body
    try {
      const data = await this._notesModel.getCollection().create({title: title, text: text})
      return this._api.pass(ctx, data)
    } catch(err: any){
      return this._api.fail(ctx, Config.codes.ERR_00000, err.message)
    }    
  }
}