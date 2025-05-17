import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/login-page";
import RegisterPage from "../components/register/register-page";
import HomePage from "../components/home/home-page";
import Testimoni from "../components/testimoni/testimoni-page";
import CatatanPage from "../components/Eksplorasi Diri/catatan/catatan-page";
import JurnalHarian from "../components/Eksplorasi Diri/jurnal/jurnal-page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/catatan" element={<CatatanPage />} />
        <Route path="/jurnal" element={<JurnalHarian />} />
      </Routes>
    </BrowserRouter>
  );
}
