import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/login-page";
// import RegisterView from "../components/RegisterView";
// import ForgotPasswordView from "../components/ForgotPasswordView";
// import HomeView from "../components/HomeView";
// import WelcomeView from "../components/WelcomeView";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<WelcomeView />} /> */}
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterView />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/home" element={<HomeView />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
