export const loginModel = {
  login: async (username, password) => {
    // Simulasikan login API (ganti dengan real API nantinya)
    if (username === "admin" && password === "admin") {
      return { success: true, user: { username: "admin" } };
    } else {
      return { success: false, error: "Nama pengguna atau kata sandi salah" };
    }
  },
};
