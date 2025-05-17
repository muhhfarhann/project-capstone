import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../components/login/login-page";
import RegisterPage from "../components/register/register-page";
import HomePage from "../components/home/home-page";
import Testimoni from "../components/testimoni/testimoni-page";
import CatatanPage from "../components/Eksplorasi Diri/catatan/catatan-page";
import JurnalHarian from "../components/Eksplorasi Diri/jurnal/jurnal-page";
import RefleksiDiri from "../components/Eksplorasi Diri/refleksi/refleksi-page";
import Rekomendasi from "../components/Eksplorasi Diri/rekomendasi/rekomendasi-page";
import TentangKamiPage from "../components/tentangkami/tentangkami-page";

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
        <Route path="/refleksi" element={<RefleksiDiri />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/tentangkami" element={<TentangKamiPage />} />
      </Routes>
    </BrowserRouter>
  );
}
