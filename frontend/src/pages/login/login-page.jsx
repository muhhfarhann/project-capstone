import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginPresenter } from './login-presenter';
import { LoginView } from './login-view';
import {
  googleProvider,
  facebookProvider,
  githubProvider,
  linkedinProvider,
} from '../../firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading
  const navigate = useNavigate();

  const presenter = new LoginPresenter({
    onLoginSuccess: (user) => {
      alert('Berhasil login sebagai ' + user.email);
      if (localStorage) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      navigate('/home');
    },
    onLoginError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const handleSubmit = () => {
    presenter.login(email, password);
  };

  const handleSocialLogin = async (providerName) => {
    if (isLoading) return;
    setIsLoading(true);
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
          presenter.view.onLoginSuccess(result.user);
        } else if (result?.error) {
          setError(result.error);
        }
      } catch (error) {
        setError('Gagal login dengan sosial media');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Provider tidak valid');
      setIsLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <LoginView
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
      onSocialLogin={handleSocialLogin}
      onGoToRegister={handleGoToRegister} // Teruskan prop onGoToRegister
    />
  );
};

export default LoginPage;
