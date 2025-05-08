export default class AuthModel {
  static users = [];

  static register(user) {
    AuthModel.users.push(user);
    return true;
  }

  static login(username, password) {
    return AuthModel.users.find(
      (u) => u.username === username && u.password === password
    );
  }

  static forgotPassword(email) {
    return AuthModel.users.find((u) => u.email === email);
  }

  static resetPassword(email, newPassword) {
    const user = AuthModel.users.find((u) => u.email === email);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }
}
