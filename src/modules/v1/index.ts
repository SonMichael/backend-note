import KoaRouter from 'koa-router';
import Validate from 'koa-req-validator';
import GetNotesValidation from '~src/modules/v1/controllers/notes/validation/get_notes';
import NotesController from '~src/modules/v1/controllers/notes';
import Router from '~src/modules/router';

export default class RouterV1 extends Router {
  private prefixV1 = `${this.prefix}/v1`;
  private router: KoaRouter;

  constructor() {
    super();
    this.router = new KoaRouter({ prefix: this.prefixV1 });
  }

  public initRouter() {
    this.initNoteRouter();
    return this.router;
  }

  private initNoteRouter() {
    const getNotesValidation = new GetNotesValidation();
    const notesController = new NotesController();
    this.router.get('/notes', notesController.getNotes.bind(notesController));
    this.router.get(
      '/notes/:id',
      Validate(getNotesValidation.getNotes()),
      notesController.getNoteById.bind(notesController),
    );
    this.router.put(
      '/notes',
      Validate(getNotesValidation.getUpdateNote()),
      notesController.updateNote.bind(notesController),
    );
    this.router.post(
      '/notes',
      Validate(getNotesValidation.getCreateNote()),
      notesController.createNote.bind(notesController),
    );
  }
}
