import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterPresenter } from './register-presenter';
import { RegisterView } from './register-view';
import {
  googleProvider,
  facebookProvider,
  githubProvider,
  linkedinProvider,
} from '../../firebase';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [isRedirectHandled, setIsRedirectHandled] = useState(false);
  const navigate = useNavigate();

  const presenter = new RegisterPresenter({
    onRegisterSuccess: (user) => {
      alert('Berhasil daftar sebagai ' + user.username);
      navigate('/');
    },
    onRegisterError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const handleSubmit = () => {
    presenter.register(username, email, password, gender);
  };

  const handleSocialLogin = async (providerName) => {
    const providers = {
      google: googleProvider,
      facebook: facebookProvider,
      github: githubProvider,
      linkedin: linkedinProvider,
    };
    const provider = providers[providerName];
    if (provider) {
      try {
        const result = await presenter.handleSocialLogin(provider);
        if (result?.success) {
          presenter.view.onRegisterSuccess(result.user);
        } else if (result?.error) {
          setError(result.error);
        }
      } catch (error) {
        setError('Gagal login dengan sosial media');
      }
    } else {
      setError('Provider tidak valid');
    }
  };

  useEffect(() => {
    if (isRedirectHandled) {
      const handleRedirectEffect = async () => {
        try {
          console.log('Memeriksa hasil redirect...');
          const result = await presenter.handleRedirect();
          if (result?.success) {
            console.log('Registrasi sosial berhasil:', result.user);
            presenter.view.onRegisterSuccess(result.user);
          } else if (result?.error) {
            console.error('Error registrasi sosial:', result.error);
            presenter.view.onRegisterError(result.error);
          }
        } catch (error) {
          console.error('Error di handleRedirectEffect:', error);
          setError('Gagal memproses login sosial');
        } finally {
          setIsRedirectHandled(false);
        }
      };
      handleRedirectEffect();
    }
  }, [isRedirectHandled, presenter]);

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
