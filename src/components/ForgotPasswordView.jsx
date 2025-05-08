import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPresenter from "../presenters/AuthPresenter";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = () => {
    AuthPresenter.forgotPassword(
      email,
      () => setStep(2),
      (err) => setError(err)
    );
  };

  const handleResetPassword = () => {
    AuthPresenter.resetPassword(email, newPassword, () => navigate("/login"));
  };

  return (
    <div>
      <h2>Lupa Password</h2>
      {step === 1 && (
        <>
          <input
            placeholder="Masukkan email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSubmit}>Kirim</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            type="password"
            placeholder="Password baru"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
