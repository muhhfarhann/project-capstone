// import { auth, signInWithRedirect, getRedirectResult } from '../../firebase';

// export const loginModel = {
//   socialLogin: async (provider) => {
//     try {
//       console.log('Memulai signInWithRedirect untuk provider:', provider.providerId);
//       await signInWithRedirect(auth, provider);
//       console.log('signInWithRedirect dipanggil');
//     } catch (error) {
//       console.error('Error di socialLogin:', error);
//       throw error;
//     }
//   },

//   handleRedirectResult: async () => {
//     try {
//       console.log('Memeriksa hasil redirect...');
//       const result = await getRedirectResult(auth);
//       if (result) {
//         const user = result.user;
//         console.log('Hasil redirect berhasil:', user);
//         return {
//           success: true,
//           user: {
//             uid: user.uid,
//             email: user.email,
//             displayName: user.displayName,
//             gender: '', // Gender tidak tersedia dari OAuth, bisa diisi via form
//           },
//         };
//       }
//       console.log('Tidak ada hasil redirect');
//       return null;
//     } catch (error) {
//       console.error('Error di handleRedirectResult:', error);
//       return { success: false, error: error.message };
//     }
//   },
// };

import { auth, signInWithPopup } from '../../firebase';

export const loginModel = {
  socialLogin: async (provider) => {
    try {
      console.log('Memulai signInWithPopup untuk provider:', provider.providerId);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Login sosial berhasil:', user);
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          gender: '',
        },
      };
    } catch (error) {
      console.error('Error di socialLogin:', error);
      return { success: false, error: error.message };
    }
  },

  handleRedirectResult: async () => {
    console.log('handleRedirectResult tidak digunakan untuk popup');
    return null;
  },
};