"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = __importDefault(require("~src/models"));
class Note extends models_1.default {
    constructor() {
        super();
        const NotesSchema = new mongoose_1.Schema({
            title: { type: String, required: true },
            text: { type: String },
            content: { type: Object },
            created_at: { type: Date, default: Date.now, required: true },
            updated_at: { type: Date, default: Date.now },
        });
        this._collection = (0, mongoose_1.model)('notes', NotesSchema);
    }
    getCollection() {
        return this._collection;
    }
}
exports.default = Note;
//# sourceMappingURL=notes.js.map