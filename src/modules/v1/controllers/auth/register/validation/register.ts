import validator from 'validator';
import { Context } from 'koa';
import UserModel from '~src/modules/v1/controllers/auth/register/models';

validator.validatePassword = async (
  passwordConfirmation: string,
  ctx: Context,
) => {
  const { password, user_name: userName } = ctx.request.body;
  if (!passwordConfirmation || password !== passwordConfirmation) {
    return false;
  }
  const userModel = new UserModel();
  try {
    const userExist = await userModel
      .getCollection()
      .findOne({ user_name: userName })
      .lean();
    if (userExist) {
      return false;
    }
    return true;
  } catch (err: any) {
    return false;
  }
};
export default class Validation {
  public getRegister() {
    return {
      'user_name:body': ['require', 'isLength', 'Invalid user_name'],
      'password:body': ['require', 'isLength', 'Invalid password'],
      'password_confirmation:body': [
        'validatePassword',
        'Invalid user name or password',
      ],
    };
  }
}
