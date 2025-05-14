// register-model.js
export const registerModel = {
  register: async (username, email, password, gender) => {
    // Simulasi logika backend
    if (username && email && password && gender) {
      return { success: true, user: { username, email, gender } };
    } else {
      return { success: false, error: "Semua field harus diisi" };
    }
  },
};
