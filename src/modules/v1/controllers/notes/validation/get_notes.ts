export default class GetNotesValidation {
  public getNotes() {
    return {
      'id:params': ['require', 'isLength', 'Invalid id'],
    };
  }

  public getUpdateNote() {
    return {
      '_id:body': ['require', 'isLength', 'Invalid id'],
      'title:body': ['isLength', 'Invalid title'],
      'text:body': ['isLength', 'Invalid text'],
    };
  }

  public getCreateNote() {
    return {
      'title:body': ['isLength', 'Invalid title'],
      'text:body': ['isLength', 'Invalid text'],
    };
  }

  public getDeleteNote() {
    return {
      'id:params': ['require', 'isLength', 'Invalid id'],
    };
  }
}
