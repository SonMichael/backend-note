"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetNotesValidation {
    getNotes() {
        return {
            'id:params': ['require', 'isLength', 'Invalid id'],
        };
    }
    getUpdateNote() {
        return {
            '_id:body': ['require', 'isLength', 'Invalid id'],
            'title:body': ['isLength', 'Invalid title'],
            'text:body': ['isLength', 'Invalid text'],
        };
    }
    getCreateNote() {
        return {
            'title:body': ['isLength', 'Invalid title'],
            'text:body': ['isLength', 'Invalid text'],
        };
    }
    getDeleteNote() {
        return {
            'id:params': ['require', 'isLength', 'Invalid id'],
        };
    }
}
exports.default = GetNotesValidation;
//# sourceMappingURL=get_notes.js.map