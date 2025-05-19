import { useState } from "react";
import { Link } from "react-router-dom"; // ⬅️ Tambahkan ini

export default function LandingView() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#c9a7ff] text-gray-900">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 md:px-24 py-6">
        {/* Logo */}
        <img
          src="/logo.png"
          alt="Emojis"
          className="h-18 w-auto mb-4 object-contain"
        />

        {/* Menu + Auth */}
        <div className="flex items-center gap-6 ml-auto relative">
          {/* Nav Menu */}
          <ul className="flex items-center gap-6 text-base font-medium">
            <li>
              <a href="/" className="hover:text-purple-700">
                Beranda
              </a>
            </li>

            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-purple-700 focus:outline-none cursor-pointer">
                Eksplorasi Diri ▾
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white rounded-md shadow-md text-sm py-2 w-48 z-20">
                  <li>
                    <a
                      href="/catatan"
                      className="block px-4 py-2 hover:bg-purple-100">
                      Catatan Mood
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jurnal"
                      className="block px-4 py-2 hover:bg-purple-100">
                      Jurnal Harian
                    </a>
                  </li>
                  <li>
                    <a
                      href="/refleksi"
                      className="block px-4 py-2 hover:bg-purple-100">
                      Refleksi Diri
                    </a>
                  </li>
                  <li>
                    <a
                      href="/rekomendasi"
                      className="block px-4 py-2 hover:bg-purple-100">
                      Rekomendasi
                    </a>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <a href="/tentangkami" className="hover:text-purple-700">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="/testimoni" className="hover:text-purple-700">
                Testimoni
              </a>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            <Link
              to="/register"
              className="border border-purple-700 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-100 transition cursor-pointer">
              Daftar
            </Link>
            <Link
              to="/login"
              className="bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition cursor-pointer">
              Masuk
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-80 px-8 md:px-24 py-12">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Lagi Ngerasa Apa? Ceritain di Mamood!
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-800">
            Mamood siap jadi teman kamu buat pantau suasana hati setiap hari.
            Catat perasaanmu, refleksikan hari-harimu, dan temukan cara-cara
            kecil untuk bikin hidup lebih bahagia dan teratur. Dengan Mamood,
            kamu bisa kenal diri lebih dalam dan buat setiap hari lebih positif.
          </p>
        </div>

        <div className="relative mt-12 md:mt-0">
          <img
            src="/girl.png"
            alt="Meditating girl"
            className="w-[600px] md:w-[480px] mx-auto drop-shadow-xl pl-5"
          />
        </div>
      </div>{" "}
      {/* ⬅️ PENUTUP HERO SECTION */}
      {/* Footer Wave — ⬇️ letakkan di sini, DI LUAR hero section */}
      <div>
        <img
          src="/wave.png"
          alt="Gelombang Putih"
          className="w-full object-cover -mt-12"
        />
      </div>
    </div>
  );
}
