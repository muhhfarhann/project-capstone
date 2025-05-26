import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterPresenter } from './register-presenter';
import { RegisterView } from './register-view';
import {
  googleProvider,
  facebookProvider,
  githubProvider,
} from '../../firebase';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const presenter = new RegisterPresenter({
    onRegisterSuccess: (user) => {
      alert('Berhasil daftar sebagai ' + user.username);
      navigate('/');
    },
    onRegisterError: (errorMessage) => {
      setError(errorMessage);
      if (errorMessage === 'Silahkan login, akun sudah ada.') {
        alert('Silahkan login, akun sudah ada.');
        navigate('/login'); // Opsional: arahkan ke halaman login
      }
    },
  });

  const handleSubmit = () => {
    if (!username || !email || !password || !gender) {
      setError('Semua field wajib diisi');
      return;
    }
    if (password.length < 6) {
      setError('Kata sandi harus minimal 6 karakter');
      return;
    }
    presenter.register(username, email, password, gender);
  };

  const handleSocialLogin = async (providerName) => {
    const providers = {
      google: googleProvider,
      facebook: facebookProvider,
      github: githubProvider,
    };
    const provider = providers[providerName];
    if (provider) {
      try {
        const result = await presenter.handleSocialLogin(provider);
        // Tidak perlu memanggil onRegisterSuccess di sini karena sudah ditangani di presenter
      } catch (error) {
        setError('Gagal login dengan sosial media');
        if (error === 'Silahkan login, akun sudah ada.') {
          alert('Silahkan login, akun sudah ada.');
          navigate('/login'); // Opsional: arahkan ke halaman login
        }
      }
    } else {
      setError('Provider tidak valid');
    }
  };

  return (
    <RegisterView
      username={username}
      email={email}
      password={password}
      gender={gender}
      onUsernameChange={setUsername}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onGenderChange={setGender}
      onSubmit={handleSubmit}
      error={error}
      onSocialLogin={handleSocialLogin}
    />
  );
};

export default RegisterPage;
