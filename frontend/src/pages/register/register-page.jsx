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
      localStorage.setItem('user', JSON.stringify(user)); // Simpan data pengguna
      alert('Berhasil daftar sebagai ' + user.username);
      navigate('/');
    },
    onRegisterError: (errorMessage) => {
      setError(errorMessage);
      if (errorMessage === 'Silahkan login, akun sudah ada.') {
        alert('Silahkan login, akun sudah ada.');
        navigate('/login');
      }
    },
  });

  const handleSubmit = () => {
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedGender = gender.trim();

    if (
      !trimmedUsername ||
      !trimmedEmail ||
      !trimmedPassword ||
      !trimmedGender
    ) {
      setError('Semua field wajib diisi');
      return;
    }
    if (trimmedPassword.length < 6) {
      setError('Kata sandi harus minimal 6 karakter');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Format email tidak valid');
      return;
    }
    const validGenders = [
      'male',
      'female',
      'laki-laki',
      'perempuan',
      'laki',
      'cowo',
      'cewe',
    ];
    if (!validGenders.includes(trimmedGender.toLowerCase())) {
      setError(
        'Jenis kelamin harus salah satu dari: male, female, laki-laki, perempuan, laki, cowo, cewe',
      );
      return;
    }
    presenter.register(
      trimmedUsername,
      trimmedEmail,
      trimmedPassword,
      trimmedGender,
    );
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
      } catch (error) {
        setError('Gagal login dengan sosial media');
        if (error === 'Silahkan login, akun sudah ada.') {
          alert('Silahkan login, akun sudah ada.');
          navigate('/login');
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
