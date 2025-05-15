export const registerModel = {
  async register(username, email, password, gender) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, gender }),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, user: data.user };
      }
      console.error('Error dari server di register:', data.error);
      return { success: false, error: data.error || 'Registrasi gagal' };
    } catch (error) {
      console.error('Error di register:', error);
      return { success: false, error: 'Gagal terhubung ke server' };
    }
  },

  async verifyToken(token) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, uid: data.uid };
      }
      console.error('Error dari server di verifyToken:', data.error);
      return { success: false, error: data.error || 'Verifikasi token gagal' };
    } catch (error) {
      console.error('Error di verifyToken:', error);
      return { success: false, error: 'Gagal memverifikasi token' };
    }
  },

  async updateUserData(uid, username, gender) {
    try {
      console.log('Mengirim data ke update-user:', { uid, username, gender });
      const response = await fetch('http://localhost:5000/api/auth/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, username, gender }),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true };
      }
      console.error('Error dari server di updateUserData:', data.error);
      return { success: false, error: data.error || 'Gagal memperbarui data pengguna' };
    } catch (error) {
      console.error('Error di updateUserData:', error);
      return { success: false, error: 'Gagal terhubung ke server' };
    }
  },
};