export default class LoginValidation {
  public getLogin() {
    return {
      'user_name:body': ['require', 'isLength', 'Invalid user_name'],
      'password:body': ['require', 'isLength', 'Invalid password'],
    };
  }
}
