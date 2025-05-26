import React, { useState } from 'react';
import Aside from '../../../components/Eksplorasi Diri/General/Aside';

const CatatanView = ({ onMoodSelect, selectedMood, onNextClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const calendarData = [
    { src: '/calendar/april.png', bulan: 'April' },
    { src: '/calendar/maret.png', bulan: 'Maret' },
    { src: '/calendar/februari.png', bulan: 'Februari' },
    { src: '/calendar/januari.png', bulan: 'Januari' },
  ];

  const moodOptions = [
    { src: '/emoji/very-sad.png', value: 'very_sad' },
    { src: '/emoji/sad.png', value: 'sad' },
    { src: '/emoji/happy.png', value: 'happy' },
    { src: '/emoji/very-happy.png', value: 'very_happy' },
    { src: '/emoji/angry.png', value: 'angry' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar Desktop */}
      <Aside />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f0f0ff] overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-300 px-6 py-4 flex justify-between items-center rounded-xl mx-4 mt-4 shadow-md">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Catatan Mood</h1>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <span className="font-semibold">Halo, Daniel!</span>
              <img
                src="/profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full border border-white"
              />
            </div>

            {/* Tombol menu untuk mobile */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              <img
                src="/icons/menu.png"
                alt="Menu"
                className="w-6 h-6 cursor-pointer"
              />
            </button>
          </div>
        </header>

        {/* Sidebar Mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden">
            <div className="w-3/4 max-w-sm h-full bg-[#f0f0ff] p-4 shadow-lg relative">
              {/* Tombol Close */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-xl font-bold"
              >
                ×
              </button>

              {/* Profil User */}
              <div className="mt-10 mb-6 text-center">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="w-16 h-16 rounded-full mx-auto border"
                />
                <h2 className="mt-2 font-semibold text-lg">Halo, Daniel!</h2>
                <div className="mt-3 flex justify-center gap-2">
                  <button className="px-3 py-1 border rounded-full text-sm text-white bg-purple-500">
                    Akun Saya
                  </button>
                  <button className="px-3 py-1 border rounded-full text-sm text-purple-500">
                    Keluar
                  </button>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Menu Navigasi */}
              <nav className="space-y-4 px-2">
                {[
                  {
                    label: 'Beranda',
                    path: '/',
                    icon: '/icons/home-mobile.png',
                  },
                  {
                    label: 'Catatan Mood',
                    path: '/catatan',
                    icon: '/icons/catatan-mobile.png',
                  },
                  {
                    label: 'Jurnal Harian',
                    path: '/jurnal',
                    icon: '/icons/jurnal-mobile.png',
                  },
                  {
                    label: 'Refleksi Diri',
                    path: '/refleksi',
                    icon: '/icons/refleksi-mobile.png',
                  },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center space-x-3 text-gray-700 font-medium hover:text-purple-500"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Konten */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">Mood Hari Ini</h2>
              <p className="mb-2">Hari ini kamu merasa apa?</p>
              <div className="flex flex-wrap gap-3 mb-4">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => onMoodSelect(mood.value)}
                    className={`p-1 rounded-full cursor-pointer ${
                      selectedMood === mood.value
                        ? 'bg-purple-200 ring-2 ring-purple-400'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={mood.src}
                      alt={mood.value}
                      className="w-10 h-10"
                    />
                  </button>
                ))}
              </div>
              <textarea
                className="w-full p-3 border rounded-md"
                placeholder="Tuliskan cerita singkat tentang harimu sebagai pembuka sebelum melanjutkan ke jurnal harian..."
                rows={3}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md cursor-pointer"
                  onClick={onNextClick}
                >
                  Selanjutnya
                </button>
              </div>
            </section>

            <section className="bg-purple-300 p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">Mood-ku Minggu Ini</h2>
              <img
                src="/chart-week.png"
                alt="Chart Mingguan"
                className="w-full h-64 object-contain"
              />
            </section>
          </div>

          <section className="bg-purple-300 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">
              Mood-ku: 4 Bulan Terakhir
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {calendarData.map((item) => (
                <div
                  key={item.bulan}
                  className="bg-[#f9f9f9] border rounded-md p-2 text-center shadow"
                >
                  <h3 className="font-semibold mb-1">{item.bulan} 2025</h3>
                  <img
                    src={item.src}
                    alt={`Kalender ${item.bulan}`}
                    className="w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CatatanView;
