import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeView() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Tombol di klik bro');

    if (confirm('Anda ingin logout?')) {
      localStorage.removeItem('user');
      navigate('/login'); // atau aksi logout lain
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setProfileDropdown(false); // Tutup profile dropdown saat membuka eksplorasi
  };

  const toggleDropdownProfile = () => {
    setProfileDropdown((prev) => !prev);
    setDropdownOpen(false); // Tutup eksplorasi dropdown saat membuka profile
  };

  // Kode untuk cek di console browser user siapa yang login
  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     console.log(storedUser);
  //   }
  // }, []);

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
              <Link to="/home" className="hover:text-purple-700">
                Beranda
              </Link>
            </li>

            <li
              onBlur={() => setDropdownOpen(false)}
              className="relative"
              ref={dropdownRef}
            >
              <button
                onClick={toggleDropdown}
                className="hover:text-purple-700 focus:outline-none cursor-pointer"
              >
                Eksplorasi Diri ▾
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white rounded-md shadow-md text-sm py-2 w-48 z-20">
                  <li>
                    <Link
                      onMouseDown={(e) => e.preventDefault()}
                      to="/catatan"
                      className="block px-4 py-2 hover:bg-purple-100"
                    >
                      Catatan Mood
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseDown={(e) => e.preventDefault()}
                      to="/jurnal"
                      className="block px-4 py-2 hover:bg-purple-100"
                    >
                      Jurnal Harian
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseDown={(e) => e.preventDefault()}
                      to="/refleksi"
                      className="block px-4 py-2 hover:bg-purple-100"
                    >
                      Refleksi Diri
                    </Link>
                  </li>
                  <li>
                    <Link
                      onMouseDown={(e) => e.preventDefault()}
                      to="/rekomendasi"
                      className="block px-4 py-2 hover:bg-purple-100"
                    >
                      Rekomendasi
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/tentangkami" className="hover:text-purple-700">
                Tentang Kami
              </Link>
            </li>

            <li>
              <Link to="/testimoni" className="hover:text-purple-700">
                Testimoni
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div
            className="relative"
            ref={profileRef}
            tabIndex={0}
            onBlur={() => setProfileDropdown(false)}
          >
            <div
              className="icon flex gap-1 items-center cursor-pointer"
              onClick={toggleDropdownProfile}
            >
              <img
                src="/profile.png"
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-purple-700 hover:border-purple-500 transition"
              />
              ▾
            </div>
            {profileDropdown && (
              <ul className="absolute right-0 top-10 mt-2 bg-white rounded-md shadow-md text-sm w-auto py-2 z-20">
                <li>
                  <Link
                    onMouseDown={(e) => e.preventDefault()}
                    to="/home"
                    className="block px-4 py-2 hover:bg-purple-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    onMouseDown={(e) => e.preventDefault()}
                    to="/home"
                    className="block px-4 py-2 hover:bg-purple-100"
                  >
                    Akun Saya
                  </Link>
                </li>
                <li>
                  <button
                    onMouseDown={(e) => e.preventDefault()} // cegah blur
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-purple-100 w-full text-left"
                  >
                    Keluar
                  </button>
                </li>
              </ul>
            )}
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
      </div>
      {/* Footer Wave */}
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
