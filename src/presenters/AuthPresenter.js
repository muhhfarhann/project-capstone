import AuthModel from "../models/AuthModel";

export default class AuthPresenter {
  static login(username, password, onSuccess, onError) {
    const user = AuthModel.login(username, password);
    user ? onSuccess(user) : onError("Login gagal!");
  }

  static register(user, onSuccess) {
    AuthModel.register(user);
    onSuccess();
  }

  static forgotPassword(email, onSuccess, onError) {
    const user = AuthModel.forgotPassword(email);
    user ? onSuccess() : onError("Email tidak ditemukan!");
  }

  static resetPassword(email, newPassword, onSuccess) {
    if (AuthModel.resetPassword(email, newPassword)) {
      onSuccess();
    }
  }
}
