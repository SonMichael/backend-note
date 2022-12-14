import KoaRouter from 'koa-router';
import Validate from 'koa-req-validator';
import GetNotesValidation from '~src/modules/v1/controllers/notes/validation/get_notes';
import NotesController from '~src/modules/v1/controllers/notes';
import LoginController from '~src/modules/v1/controllers/auth/login';
import LoginValidation from '~src/modules/v1/controllers/auth/login/validation/login';
import Router from '~src/modules/router';
import RegisterValidation from '~src/modules/v1/controllers/auth/register/validation/register';
import RegisterController from '~src/modules/v1/controllers/auth/register';

export default class RouterV1 extends Router {
  private prefixV1 = `${this.prefix}/v1`;
  private router: KoaRouter;

  constructor() {
    super();
    this.router = new KoaRouter({ prefix: this.prefixV1 });
  }

  public initRouter() {
    this.initAuthRouter();
    this.initNoteRouter();
    return this.router;
  }

  private initAuthRouter() {
    const validation = new LoginValidation();
    const controller = new LoginController();
    this.router.post(
      '/login',
      Validate(validation.getLogin()),
      controller.login.bind(controller),
    );
    const registerValidation = new RegisterValidation();
    const registerController = new RegisterController();
    this.router.post(
      '/register',
      Validate(registerValidation.getRegister()),
      registerController.register.bind(registerController),
    );
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
    this.router.delete(
      '/notes/:id',
      Validate(getNotesValidation.getDeleteNote()),
      notesController.deleteNote.bind(notesController),
    );
  }
}
