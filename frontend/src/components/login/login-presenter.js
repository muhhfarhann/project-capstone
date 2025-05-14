import { loginModel } from "./login-model";

export class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async login(username, password) {
    const result = await loginModel.login(username, password);
    if (result.success) {
      this.view.onLoginSuccess(result.user);
    } else {
      this.view.onLoginError(result.error);
    }
  }
}
