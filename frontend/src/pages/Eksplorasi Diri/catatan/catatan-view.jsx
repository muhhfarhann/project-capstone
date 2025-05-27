import React, { useEffect, useState } from 'react';
import Aside from '../../../components/Eksplorasi Diri/General/Aside';

const CatatanView = ({ onMoodSelect, selectedMood, onNextClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [journalText, setJournalText] = useState(''); // State untuk menyimpan teks dari textarea

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

  useEffect(() => {
    localStorage.clear();
    console.log(JSON.parse(localStorage.getItem('moodEntries')));
    console.log(JSON.parse(localStorage.getItem('user')));
  }, []);

  // Fungsi untuk menyimpan data ke localStorage
  const handleSaveToLocalStorage = () => {
    if (!selectedMood || !journalText) {
      alert('Silakan pilih mood dan isi jurnal terlebih dahulu!');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const currentDate = new Date().toISOString(); // Timestamp untuk entri
    const moodEntry = {
      userId: user.uid,
      date: currentDate,
      emoji: selectedMood, // Nilai string dari emoji (very_sad, sad, dll.)
      journal: journalText, // Teks dari textarea
    };

    // Ambil data yang sudah ada di localStorage (jika ada)
    const existingEntries =
      JSON.parse(localStorage.getItem('moodEntries')) || [];
    // Tambahkan entri baru
    existingEntries.push(moodEntry);
    // Simpan kembali ke localStorage
    localStorage.setItem('moodEntries', JSON.stringify(existingEntries));
    alert('Data mood berhasil disimpan!');
  };

  // Fungsi untuk reset setelah klik "Selanjutnya"
  const handleNextClickWithReset = () => {
    handleSaveToLocalStorage();
    setJournalText(''); // Kosongkan textarea
    onMoodSelect(null); // Reset pilihan emoji
    onNextClick(); // Panggil fungsi onNextClick dari props
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Desktop */}
      <Aside className="hidden md:block" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f0f0ff] overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-300 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center rounded-xl mx-2 md:mx-4 mt-2 md:mt-4 shadow-md">
          <div className="flex items-center space-x-2 md:space-x-3">
            <img src="/logo.png" alt="Logo" className="w-6 h-6 md:w-8 md:h-8" />
            <h1 className="text-lg md:text-xl font-bold">Catatan Mood</h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <span className="font-semibold text-sm md:text-base">
                Halo, Daniel!
              </span>
              <img
                src="/profile.png"
                alt="Profile"
                className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white"
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
                className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
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
                className="absolute top-4 right-4 text-lg md:text-xl font-bold"
              >
                ×
              </button>

              {/* Profil User */}
              <div className="mt-10 mb-6 text-center">
                <img
                  src="/profile.png"
                  alt="Profile"
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full mx-auto border"
                />
                <h2 className="mt-2 font-semibold text-base md:text-lg">
                  Halo, Daniel!
                </h2>
                <div className="mt-3 flex justify-center gap-2">
                  <button className="px-3 py-1 border rounded-full text-xs md:text-sm text-white bg-purple-500">
                    Akun Saya
                  </button>
                  <button className="px-3 py-1 border rounded-full text-xs md:text-sm text-purple-500">
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
                    className="flex items-center space-x-3 text-gray-700 font-medium hover:text-purple-500 text-sm md:text-base"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-4 h-4 md:w-5 md:h-5"
                    />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Konten */}
        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-base md:text-lg font-semibold mb-3">
                Mood Hari Ini
              </h2>
              <p className="mb-2 text-sm md:text-base">
                Hari ini kamu merasa apa?
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                {/* Emoji image */}
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
                      className="w-8 h-8 md:w-10 md:h-10"
                    />
                  </button>
                ))}
              </div>
              {/* Text jurnal */}
              <textarea
                className="w-full p-2 md:p-3 border rounded-md text-sm md:text-base"
                placeholder="Tuliskan cerita singkat tentang harimu sebagai pembuka sebelum melanjutkan ke jurnal harian..."
                rows={3}
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-md cursor-pointer text-sm md:text-base"
                  onClick={handleNextClickWithReset}
                >
                  Selanjutnya
                </button>
              </div>
            </section>

            <section className="bg-purple-300 p-4 rounded-xl shadow-md">
              <h2 className="text-base md:text-lg font-semibold mb-3">
                Mood-ku Minggu Ini
              </h2>
              <img
                src="/chart-week.png"
                alt="Chart Mingguan"
                className="w-full h-48 md:h-64 object-contain"
              />
            </section>
          </div>

          <section className="bg-purple-300 p-4 rounded-xl shadow-md">
            <h2 className="text-base md:text-lg font-semibold mb-3">
              Mood-ku: 4 Bulan Terakhir
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {calendarData.map((item, index) => (
                <div
                  key={item.bulan}
                  className="bg-white rounded-md p-2 text-center shadow-xl"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-sm md:text-base">
                      {item.bulan} 2025
                    </h3>
                    <img
                      src={moodOptions[index].src}
                      alt="Sun"
                      className="w-5 h-5 md:w-6 md:h-6"
                    />
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs md:text-sm">
                    <div className="font-medium">Sen</div>
                    <div className="font-medium">Sel</div>
                    <div className="font-medium">Rab</div>
                    <div className="font-medium">Kam</div>
                    <div className="font-medium">Jum</div>
                    <div className="font-medium">Sab</div>
                    <div className="font-medium">Min</div>
                    {/* Minggu 1: Kuning */}
                    {index === 0 && (
                      <>
                        <div className="bg-yellow-200 p-1">1</div>
                        <div className="bg-yellow-200 p-1">2</div>
                        <div className="bg-yellow-200 p-1">3</div>
                        <div className="bg-yellow-200 p-1">4</div>
                        <div className="bg-yellow-200 p-1">5</div>
                        <div className="bg-yellow-200 p-1">6</div>
                        <div className="bg-yellow-200 p-1">7</div>
                      </>
                    )}
                    {/* Minggu 2: Biru */}
                    {index === 1 && (
                      <>
                        <div className="bg-blue-200 p-1">8</div>
                        <div className="bg-blue-200 p-1">9</div>
                        <div className="bg-blue-200 p-1">10</div>
                        <div className="bg-blue-200 p-1">11</div>
                        <div className="bg-blue-200 p-1">12</div>
                        <div className="bg-blue-200 p-1">13</div>
                        <div className="bg-blue-200 p-1">14</div>
                      </>
                    )}
                    {/* Minggu 3: Merah */}
                    {index === 2 && (
                      <>
                        <div className="bg-red-200 p-1">15</div>
                        <div className="bg-red-200 p-1">16</div>
                        <div className="bg-red-200 p-1">17</div>
                        <div className="bg-red-200 p-1">18</div>
                        <div className="bg-red-200 p-1">19</div>
                        <div className="bg-red-200 p-1">20</div>
                        <div className="bg-red-200 p-1">21</div>
                      </>
                    )}
                    {/* Minggu 4: Hijau */}
                    {index === 3 && (
                      <>
                        <div className="bg-green-200 p-1">22</div>
                        <div className="bg-green-200 p-1">23</div>
                        <div className="bg-green-200 p-1">24</div>
                        <div className="bg-green-200 p-1">25</div>
                        <div className="bg-green-200 p-1">26</div>
                        <div className="bg-green-200 p-1">27</div>
                        <div className="bg-green-200 p-1">28</div>
                      </>
                    )}
                    {/* Tambahan untuk bulan yang lebih pendek (opsional) */}
                    {index === 3 && (
                      <>
                        <div className="bg-green-200 p-1">29</div>
                        <div className="bg-green-200 p-1">30</div>
                        <div className="bg-green-200 p-1"></div>
                        <div className="bg-green-200 p-1"></div>
                        <div className="bg-green-200 p-1"></div>
                        <div className="bg-green-200 p-1"></div>
                        <div className="bg-green-200 p-1"></div>
                      </>
                    )}
                  </div>
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
