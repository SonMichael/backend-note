"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = __importDefault(require("~src/modules/v1/controllers"));
const models_1 = __importDefault(require("~src/modules/v1/controllers/notes/models"));
const config_1 = __importDefault(require("~src/config"));
class NotesController extends controllers_1.default {
    constructor() {
        super();
        this._notesModel = new models_1.default();
    }
    async getNotes(ctx) {
        try {
            const data = await this._notesModel
                .getCollection()
                .find()
                .sort([['updated_at', -1]])
                .lean();
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
    async getNoteById(ctx) {
        const { id } = ctx.params;
        try {
            const data = await this._notesModel.getCollection().findById(id).lean();
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
    async updateNote(ctx) {
        const { _id } = ctx.request.body;
        const updateData = Object.assign({ updated_at: Date.now() }, ctx.request.body);
        try {
            const data = await this._notesModel
                .getCollection()
                .findOneAndUpdate({ _id }, updateData, { new: true });
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
    async createNote(ctx) {
        const { body } = ctx.request;
        try {
            const data = await this._notesModel.getCollection().create(body);
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
    async deleteNote(ctx) {
        const { id } = ctx.params;
        try {
            const data = await this._notesModel
                .getCollection()
                .deleteOne({ _id: id });
            return this._api.pass(ctx, data);
        }
        catch (err) {
            return this._api.fail(ctx, config_1.default.codes.ERR_00000, err.message);
        }
    }
}
exports.default = NotesController;
//# sourceMappingURL=index.js.map