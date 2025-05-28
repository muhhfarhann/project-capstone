import React, { useState, useEffect, useRef } from 'react';
import Aside from '../../../components/Eksplorasi Diri/General/Aside';
import Chart from 'chart.js/auto';

const CatatanView = ({
  selectedMood,
  onMoodSelect,
  onNextClick,
  updateMoodHistory,
  showSuccess,
  showError,
  resetForm,
  setAuthenticated,
  isAuthenticated,
  moodHistory,
  journalText,
  setJournalText,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Deklarasi userTimezoneOffset untuk WIB (UTC+7)
  const userTimezoneOffset = 7 * 60; // Offset dalam menit

  // Dinamisasi calendarData untuk 4 bulan ke belakang dari tanggal saat ini
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11, Mei = 4
  const currentYear = currentDate.getFullYear(); // 2025

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Buat array untuk 4 bulan ke belakang (Februari 2025 - Mei 2025)
  const calendarData = Array.from({ length: 4 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12; // Mundur dari bulan saat ini
    const yearAdjustment = currentMonth - i < 0 ? -1 : 0; // Kurangi tahun jika bulan < 0
    return {
      bulan: months[monthIndex],
      src: `/calendar/${months[monthIndex].toLowerCase()}.png`,
      year: currentYear + yearAdjustment,
      monthIndex: monthIndex,
    };
  }).reverse(); // Balik urutan agar Februari ke Mei

  const moodOptions = [
    { src: '/emoji/very-sad.png', value: 'very-sad' },
    { src: '/emoji/sad.png', value: 'sad' },
    { src: '/emoji/happy.png', value: 'happy' },
    { src: '/emoji/very-happy.png', value: 'very-happy' },
    { src: '/emoji/angry.png', value: 'angry' },
  ];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'very-sad':
        return '#FF6098';
      case 'sad':
        return '#28B4FF';
      case 'happy':
      case 'joy':
        return '#FAD967';
      case 'very-happy':
        return '#39EF21';
      case 'angry':
        return '#FF3D3D';
      default:
        return '#D1D5DB';
    }
  };

  // Fungsi untuk mendapatkan emoji berdasarkan entri terbaru di bulan tertentu
  const getMostFrequentMoodEmoji = (filteredMoodHistory) => {
    console.log('Full moodHistory:', moodHistory);
    if (!filteredMoodHistory || filteredMoodHistory.length === 0) {
      console.log('No entries in filteredMoodHistory:', filteredMoodHistory);
      return '/logo.png';
    }

    const sortedEntries = filteredMoodHistory.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    const latestEntry = sortedEntries[0];
    let mostFrequentMood = latestEntry.mood;

    if (mostFrequentMood === 'joy') mostFrequentMood = 'happy';

    console.log(
      'Latest Entry:',
      latestEntry,
      'Most Frequent Mood:',
      mostFrequentMood,
    );

    const matchingOption = moodOptions.find(
      (option) => option.value === mostFrequentMood,
    );
    if (matchingOption) {
      console.log('Matching Emoji:', matchingOption.src);
      return matchingOption.src;
    }

    console.log('Falling back to default /logo.png');
    return '/logo.png';
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const weeklyLabels = [];
    const weeklyMoodData = [];
    const emojiImages = [];

    const moodToValue = (mood) => {
      switch (mood) {
        case 'very-sad':
          return 1;
        case 'sad':
          return 1.5;
        case 'angry':
          return 2;
        case 'happy':
        case 'joy':
          return 2.5;
        case 'very-happy':
          return 3;
        default:
          return 0;
      }
    };

    const getEmojiForMood = (mood) => {
      let adjustedMood = mood;
      if (mood === 'joy') adjustedMood = 'happy';
      const matchingOption = moodOptions.find(
        (option) => option.value === adjustedMood,
      );
      return matchingOption ? matchingOption.src : null;
    };

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weeklyLabels.push(date.toLocaleDateString('id-ID', { weekday: 'short' }));

      const entriesForDay = moodHistory.filter((m) => {
        const entryDate = new Date(m.date);
        return entryDate.toDateString() === date.toDateString();
      });

      const entry =
        entriesForDay.length > 0
          ? entriesForDay.reduce((latest, current) =>
              new Date(latest.date) > new Date(current.date) ? latest : current,
            )
          : null;
      const moodValue = entry ? moodToValue(entry.mood) : 0;
      weeklyMoodData.push(moodValue);

      if (entry) {
        const emojiSrc = getEmojiForMood(entry.mood);
        if (emojiSrc) {
          const img = new Image();
          img.src = emojiSrc;
          img.width = 20;
          img.height = 20;
          emojiImages.push(img);
        } else {
          emojiImages.push(null);
        }
      } else {
        emojiImages.push(null);
      }
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: weeklyLabels,
        datasets: [
          {
            label: 'Mood Mingguan',
            data: weeklyMoodData,
            borderColor: '#8B5CF6',
            pointStyle: emojiImages,
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 10,
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                let moodLabel = 'Tidak ada mood';
                if (value === 1) moodLabel = 'Very Sad';
                else if (value === 1.5) moodLabel = 'Sad';
                else if (value === 2) moodLabel = 'Angry';
                else if (value === 2.5) moodLabel = 'Happy';
                else if (value === 3) moodLabel = 'Very Happy';
                return `Mood: ${moodLabel}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 3.5,
            ticks: {
              stepSize: 0.5,
              callback: (value) => {
                if (value === 1) return 'Very Sad';
                if (value === 1.5) return 'Sad';
                if (value === 2) return 'Angry';
                if (value === 2.5) return 'Happy';
                if (value === 3) return 'Very Happy';
                return '';
              },
              color: '#4B5563',
            },
            grid: { display: false },
          },
          x: {
            ticks: { color: '#4B5563' },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [moodHistory]);

  return (
    <div className="flex min-h-screen">
      <Aside className="hidden md:block" />
      <div className="flex-1 flex flex-col bg-[#f0f0ff] overflow-y-auto">
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
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 md:hidden">
            <div className="w-3/4 max-w-sm h-full bg-[#f0f0ff] p-4 shadow-lg relative">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-lg md:text-xl font-bold"
              >
                ×
              </button>
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
                {moodOptions.map((mood, index) => (
                  <button
                    key={index}
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
                  onClick={onNextClick}
                  disabled={!journalText.trim() || !isAuthenticated}
                >
                  Selanjutnya
                </button>
              </div>
            </section>
            <section className="bg-purple-300 p-4 rounded-xl shadow-md">
              <h2 className="text-base md:text-lg font-semibold mb-3">
                Mood-ku Minggu Ini
              </h2>
              <div className="w-full h-48 md:h-64">
                <canvas ref={chartRef} id="moodChart"></canvas>
              </div>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  Grafik ini menunjukkan tren mood harian Anda selama seminggu.
                  Emoji pada grafik mewakili mood terakhir yang Anda catat pada
                  hari tersebut (misalnya, "Very Sad", "Happy"). Jika tidak ada
                  emoji, berarti Anda belum mencatat mood pada hari tersebut.
                </p>
              </div>
            </section>
          </div>
          <section className="bg-purple-300 p-4 rounded-xl shadow-md">
            <h2 className="text-base md:text-lg font-semibold mb-3">
              Mood-ku: 4 Bulan Terakhir
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {calendarData.map((item) => {
                // Hitung hari pertama bulan dan jumlah hari dalam bulan
                const firstDayOfMonth = new Date(
                  item.year,
                  item.monthIndex,
                  1,
                ).getDay();
                const daysInMonth = new Date(
                  item.year,
                  item.monthIndex + 1,
                  0,
                ).getDate();
                const totalSlots =
                  Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

                return (
                  <div
                    key={item.bulan}
                    className="bg-white border rounded-md p-2 text-center shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-sm md:text-base">
                        {item.bulan} {item.year}
                      </h3>
                      <img
                        src={getMostFrequentMoodEmoji(
                          moodHistory.filter((entry) => {
                            const entryDate = new Date(entry.date);
                            entryDate.setMinutes(
                              entryDate.getMinutes() + userTimezoneOffset,
                            );
                            return (
                              entryDate.getMonth() === item.monthIndex &&
                              entryDate.getFullYear() === item.year
                            );
                          }),
                        )}
                        alt="Most Frequent Mood"
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
                      {[...Array(totalSlots)].map((_, slotIndex) => {
                        const dayPosition =
                          slotIndex -
                          (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
                        const day =
                          dayPosition > 0 && dayPosition <= daysInMonth
                            ? dayPosition
                            : null;

                        if (!day) return <div key={slotIndex}></div>;

                        // Ambil entri terbaru untuk tanggal spesifik dari seluruh moodHistory
                        const entriesForDay = moodHistory
                          .filter((entry) => {
                            const entryDate = new Date(entry.date);
                            entryDate.setMinutes(
                              entryDate.getMinutes() + userTimezoneOffset,
                            );
                            const entryDay = entryDate.getDate();
                            const entryMonth = entryDate.getMonth();
                            const entryYear = entryDate.getFullYear();
                            console.log(
                              `Checking day ${day}: Entry Date: ${entryDate}, Day: ${entryDay}, Month: ${entryMonth}, Year: ${entryYear}`,
                            );
                            return (
                              entryDay === day &&
                              entryMonth === item.monthIndex &&
                              entryYear === item.year
                            );
                          })
                          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Urutkan terbaru

                        const moodEntry =
                          entriesForDay.length > 0 ? entriesForDay[0] : null;
                        const moodColor = moodEntry
                          ? getMoodColor(moodEntry.mood)
                          : '#D1D5DB';

                        return (
                          <div
                            key={slotIndex}
                            className="p-1"
                            style={{ backgroundColor: moodColor }}
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
