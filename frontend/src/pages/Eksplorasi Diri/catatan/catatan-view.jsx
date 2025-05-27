import React, { useState, useEffect } from 'react';
import Aside from '../../../components/Eksplorasi Diri/General/Aside';

const CatatanView = ({ onMoodSelect, selectedMood, onNextClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [journalText, setJournalText] = useState(''); // State untuk menyimpan teks dari textarea
  const [moodHistory, setMoodHistory] = useState([]); // State untuk menyimpan riwayat mood

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

  // Ambil riwayat mood dari backend saat komponen dimuat
  useEffect(() => {
    const fetchMoodHistory = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/mood/history');
        const data = await response.json();
        setMoodHistory(data);
      } catch (error) {
        console.error('Error fetching mood history:', error);
      }
    };
    fetchMoodHistory();
  }, []);

  // Fungsi untuk menyimpan data ke database
  const handleSaveToDatabase = async () => {
    if (!selectedMood || !journalText) {
      alert('Silakan pilih mood dan isi jurnal terlebih dahulu!');
      return false;
    }

    const currentDate = new Date().toISOString();
    const moodEntry = {
      date: currentDate,
      mood: selectedMood,
      journal: journalText,
    };

    try {
      const response = await fetch('http://localhost:5000/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moodEntry),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Data mood berhasil disimpan ke database!');
        // Update riwayat mood setelah menyimpan
        setMoodHistory([...moodHistory, moodEntry]);
        return true;
      } else {
        alert(`Gagal menyimpan data: ${result.error}`);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
      return false;
    }
  };

  // Fungsi untuk reset setelah klik "Selanjutnya"
  const handleNextClickWithReset = async () => {
    const success = await handleSaveToDatabase();
    if (success) {
      setJournalText(''); // Kosongkan textarea
      onMoodSelect(null); // Reset pilihan emoji
      onNextClick(); // Panggil fungsi onNextClick dari props
    }
  };

  // Fungsi untuk menentukan warna berdasarkan mood
  const getMoodColor = (mood) => {
    switch (mood) {
      case 'very_sad':
      case 'sad':
        return 'bg-red-200';
      case 'happy':
      case 'very_happy':
        return 'bg-green-200';
      case 'angry':
        return 'bg-yellow-200';
      default:
        return 'bg-gray-200';
    }
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
              {calendarData.map((item, index) => {
                // Filter mood history berdasarkan bulan
                const monthIndex = calendarData.length - 1 - index; // Januari = 0, Februari = 1, dst.
                const filteredMoodHistory = moodHistory.filter((entry) => {
                  const entryDate = new Date(entry.date);
                  return entryDate.getMonth() === monthIndex + 1; // Sesuaikan dengan bulan (1-4 untuk Jan-Apr 2025)
                });

                return (
                  <div
                    key={item.bulan}
                    className="bg-white rounded-md p-2 text-center shadow-lg"
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
                      {[...Array(35)].map((_, dayIndex) => {
                        const day = dayIndex + 1;
                        const date = new Date(2025, monthIndex + 1, day);
                        if (date.getMonth() !== monthIndex + 1)
                          return <div key={dayIndex}></div>;

                        const moodEntry = filteredMoodHistory.find((entry) => {
                          const entryDate = new Date(entry.date);
                          return (
                            entryDate.getDate() === day &&
                            entryDate.getMonth() === monthIndex + 1
                          );
                        });

                        return (
                          <div
                            key={dayIndex}
                            className={`p-1 ${
                              moodEntry
                                ? getMoodColor(moodEntry.mood)
                                : 'bg-gray-200'
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CatatanView;
