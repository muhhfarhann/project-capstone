import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginView } from "./login-view.jsx";
import { LoginPresenter } from "./login-presenter";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const presenter = new LoginPresenter({
    onLoginSuccess: (user) => {
      alert("Berhasil masuk sebagai " + user.username);
      navigate("/home");
    },
    onLoginError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const handleSubmit = () => {
    presenter.login(username, password);
  };

  return (
    <LoginView
      username={username}
      password={password}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginPage;
