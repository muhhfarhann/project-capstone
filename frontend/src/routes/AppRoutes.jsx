import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/login-page";
import RegisterPage from "../components/register/register-page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
