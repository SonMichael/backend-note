"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const koa_req_validator_1 = __importDefault(require("koa-req-validator"));
const get_notes_1 = __importDefault(require("~src/modules/v1/controllers/notes/validation/get_notes"));
const notes_1 = __importDefault(require("~src/modules/v1/controllers/notes"));
const router_1 = __importDefault(require("~src/modules/router"));
class RouterV1 extends router_1.default {
    constructor() {
        super();
        this.prefixV1 = `${this.prefix}/v1`;
        this.router = new koa_router_1.default({ prefix: this.prefixV1 });
    }
    initRouter() {
        this.initNoteRouter();
        return this.router;
    }
    initNoteRouter() {
        const getNotesValidation = new get_notes_1.default();
        const notesController = new notes_1.default();
        this.router.get('/notes', notesController.getNotes.bind(notesController));
        this.router.get('/notes/:id', (0, koa_req_validator_1.default)(getNotesValidation.getNotes()), notesController.getNoteById.bind(notesController));
        this.router.put('/notes', (0, koa_req_validator_1.default)(getNotesValidation.getUpdateNote()), notesController.updateNote.bind(notesController));
        this.router.post('/notes', (0, koa_req_validator_1.default)(getNotesValidation.getCreateNote()), notesController.createNote.bind(notesController));
        this.router.delete('/notes/:id', (0, koa_req_validator_1.default)(getNotesValidation.getDeleteNote()), notesController.deleteNote.bind(notesController));
    }
}
exports.default = RouterV1;
//# sourceMappingURL=index.js.map