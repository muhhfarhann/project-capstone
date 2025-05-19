import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/login/login-page';
import RegisterPage from '../pages/register/register-page';
import LandingPage from '../pages/landing page/landing-page';
import Testimoni from '../pages/testimoni/testimoni-page';
import CatatanPage from '../pages/Eksplorasi Diri/catatan/catatan-page';
import JurnalHarian from '../pages/Eksplorasi Diri/jurnal/jurnal-page';
import RefleksiDiri from '../pages/Eksplorasi Diri/refleksi/refleksi-page';
import Rekomendasi from '../pages/Eksplorasi Diri/rekomendasi/rekomendasi-page';
import TentangKamiPage from '../pages/tentangkami/tentangkami-page';
import HomePage from '../pages/home/home-page';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/testimoni" element={<Testimoni />} />
        <Route path="/catatan" element={<CatatanPage />} />
        <Route path="/jurnal" element={<JurnalHarian />} />
        <Route path="/refleksi" element={<RefleksiDiri />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />
        <Route path="/tentangkami" element={<TentangKamiPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
