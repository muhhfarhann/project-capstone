// register-page.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterPresenter } from "./register-presenter";
import { RegisterView } from "./register-view";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const presenter = new RegisterPresenter({
    onRegisterSuccess: (user) => {
      alert("Berhasil daftar sebagai " + user.username);
      navigate("/");
    },
    onRegisterError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  const handleSubmit = () => {
    presenter.register(username, email, password, gender);
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
    />
  );
};

export default RegisterPage;
