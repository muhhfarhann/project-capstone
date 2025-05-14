// register-presenter.js
import { registerModel } from "./register-model";

export class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async register(username, email, password, gender) {
    const result = await registerModel.register(
      username,
      email,
      password,
      gender
    );
    if (result.success) {
      this.view.onRegisterSuccess(result.user);
    } else {
      this.view.onRegisterError(result.error);
    }
  }
}
