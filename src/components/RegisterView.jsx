import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPresenter from "../presenters/AuthPresenter";

export default function RegisterView() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    AuthPresenter.register(form, () => navigate("/login"));
  };

  return (
    <div>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <select name="gender" onChange={handleChange}>
        <option value="">Pilih Jenis Kelamin</option>
        <option value="male">Laki-laki</option>
        <option value="female">Perempuan</option>
      </select>
      <button onClick={handleRegister}>Daftar</button>
    </div>
  );
}
