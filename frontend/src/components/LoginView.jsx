import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPresenter from "../presenters/AuthPresenter";

export default function LoginView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    AuthPresenter.login(
      username,
      password,
      () => navigate("/home"),
      (err) => setError(err)
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <p>
        <a href="/forgot-password">Lupa password?</a>
      </p>
    </div>
  );
}
