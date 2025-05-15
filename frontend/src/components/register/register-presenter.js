import { registerModel } from "./register-model";
import { loginModel } from "../login/login-model";

export class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async register(username, email, password, gender) {
    console.log('Memulai registrasi manual:', { username, email, gender });
    const result = await registerModel.register(username, email, password, gender);
    if (result.success) {
      this.view.onRegisterSuccess(result.user);
    } else {
      this.view.onRegisterError(result.error);
    }
  }

  async handleSocialLogin(provider) {
    try {
      console.log('Memulai autentikasi sosial dengan provider:', provider.providerId);
      const result = await loginModel.socialLogin(provider);
      return result;
    } catch (error) {
      console.error('Error di handleSocialLogin:', error);
      return { success: false, error: error.message || 'Gagal login dengan sosial media' };
    }
  }

  async handleRedirect() {
    console.log('Memulai penanganan redirect...');
    const result = await loginModel.handleRedirectResult();
    if (result?.success) {
      console.log('Registrasi sosial berhasil:', result.user);
      // Simpan data tambahan ke backend
      const updateResult = await registerModel.updateUserData(
        result.user.uid,
        result.user.displayName || 'User',
        result.user.gender || ''
      );
      if (updateResult.success) {
        return {
          success: true,
          user: {
            username: result.user.displayName || 'User',
            email: result.user.email,
            gender: result.user.gender || '',
          },
        };
      } else {
        return { success: false, error: updateResult.error };
      }
    } else if (result?.error) {
      console.error('Error saat registrasi sosial:', result.error);
      return { success: false, error: result.error };
    }
    return { success: false, error: 'Tidak ada hasil redirect' };
  }
}