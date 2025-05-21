import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/login-page";
import RegisterPage from "../pages/register/register-page";
import LandingPage from "../pages/landing page/landing-page";
import Testimoni from "../pages/testimoni/testimoni-page";
import CatatanPage from "../pages/Eksplorasi Diri/catatan/catatan-page";
import JurnalHarian from "../pages/Eksplorasi Diri/jurnal/jurnal-page";
import RefleksiDiri from "../pages/Eksplorasi Diri/refleksi/refleksi-page";
import Rekomendasi from "../pages/Eksplorasi Diri/rekomendasi/rekomendasi-page";
import TentangKamiPage from "../pages/tentangkami/tentangkami-page";
import HomePage from "../pages/home/home-page";
import PrivateRoute from "../utils/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* bentar ya ni gw nambahin route ini buat tes  */}
        <Route path="/catatan" element={<CatatanPage />} />
        <Route path="/jurnal" element={<JurnalHarian />} />
        {/* close */}

        <Route
          path="/testimoni"
          element={
            <PrivateRoute>
              <Testimoni />
            </PrivateRoute>
          }
        />
        <Route
          path="/catatan"
          element={
            <PrivateRoute>
              {" "}
              <CatatanPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/jurnal"
          element={
            <PrivateRoute>
              {" "}
              <JurnalHarian />
            </PrivateRoute>
          }
        />
        <Route
          path="/refleksi"
          element={
            <PrivateRoute>
              <RefleksiDiri />
            </PrivateRoute>
          }
        />
        <Route
          path="/rekomendasi"
          element={
            <PrivateRoute>
              <Rekomendasi />
            </PrivateRoute>
          }
        />
        <Route
          path="/tentangkami"
          element={
            <PrivateRoute>
              <TentangKamiPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
