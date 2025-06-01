import React, { useState, useEffect, useRef } from "react";
import Aside from "../../../components/Eksplorasi Diri/General/Aside";
import Profile from "../../../components/Eksplorasi Diri/General/profile";
import ProfileWeb from "../../../components/Eksplorasi Diri/General/profile-web";
import Chart from "chart.js/auto";

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
  journalText, // Add journalText prop
  setJournalText, // Add setJournalText prop
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Add missing state

  const calendarData = [
    { src: "/calendar/april.png", bulan: "April" },
    { src: "/calendar/maret.png", bulan: "Maret" },
    { src: "/calendar/februari.png", bulan: "Februari" },
    { src: "/calendar/januari.png", bulan: "Januari" },
  ];

  const moodOptions = [
    { src: "/emoji/very-sad.png", value: "sadness" },
    { src: "/emoji/sad.png", value: "sadness" },
    { src: "/emoji/happy.png", value: "joy" },
    { src: "/emoji/very-happy.png", value: "joy" },
    { src: "/emoji/angry.png", value: "anger" },
  ];

  const getMoodColor = (mood) => {
    switch (mood) {
      case "sadness":
        return "bg-red-200";
      case "joy":
        return "bg-green-200";
      case "anger":
        return "bg-yellow-200";
      case "fear":
        return "bg-purple-200";
      case "love":
        return "bg-pink-200";
      default:
        return "bg-gray-200";
    }
  };

  // Inisialisasi atau perbarui grafik saat moodHistory berubah
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Mulai dari Senin

    const weeklyMoodData = [];
    const weeklyLabels = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weeklyLabels.push(date.toLocaleDateString("id-ID", { weekday: "short" }));
      const entry = moodHistory.find((m) => {
        const entryDate = new Date(m.date);
        return entryDate.toDateString() === date.toDateString();
      });
      weeklyMoodData.push(entry ? 1 : 0); // 1 untuk ada mood, 0 untuk tidak ada
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weeklyLabels,
        datasets: [
          {
            label: "Mood Tercatat",
            data: weeklyMoodData,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 1,
            ticks: {
              callback: (value) => (value === 1 ? "Ya" : "Tidak"),
            },
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
            <ProfileWeb />
            <button
              className="md:hidden p-2"
              onClick={() => setIsSidebarOpen(true)}>
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
                className="absolute top-4 right-4 text-lg md:text-xl font-bold cursor-pointer">
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
                <Profile />
              </div>
              <hr className="my-4 border-gray-300" />
              <nav className="space-y-4 px-2">
                {[
                  {
                    label: "Beranda",
                    path: "/",
                    icon: "/icons/home-mobile.png",
                  },
                  {
                    label: "Catatan Mood",
                    path: "/catatan",
                    icon: "/icons/catatan-mobile.png",
                  },
                  {
                    label: "Jurnal Harian",
                    path: "/jurnal",
                    icon: "/icons/jurnal-mobile.png",
                  },
                  {
                    label: "Refleksi Diri",
                    path: "/refleksi",
                    icon: "/icons/refleksi-mobile.png",
                  },
                ].map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="flex items-center space-x-3 text-gray-700 font-medium hover:text-purple-500 text-sm md:text-base"
                    onClick={() => setIsSidebarOpen(false)}>
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
                        ? "bg-purple-200 ring-2 ring-purple-400"
                        : "hover:bg-gray-100"
                    }`}
                    disabled={selectedMood && selectedMood !== mood.value}>
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
                value={journalText} // Use journalText prop
                onChange={(e) => setJournalText(e.target.value)} // Use setJournalText prop
              ></textarea>
              <div className="flex justify-end mt-3">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-md cursor-pointer text-sm md:text-base"
                  onClick={onNextClick}
                  disabled={
                    !selectedMood || !journalText.trim() || !isAuthenticated
                  }>
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
            </section>
          </div>
          <section className="bg-purple-300 p-4 rounded-xl shadow-md">
            <h2 className="text-base md:text-lg font-semibold mb-3">
              Mood-ku: 4 Bulan Terakhir
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {calendarData.map((item, index) => {
                const monthIndex = calendarData.length - 1 - index;
                const currentDate = new Date();
                const filteredMoodHistory = moodHistory.filter((entry) => {
                  const entryDate = new Date(entry.date);
                  return (
                    entryDate.getMonth() === monthIndex + 1 &&
                    entryDate.getFullYear() === currentDate.getFullYear()
                  );
                });

                return (
                  <div
                    key={item.bulan}
                    className="bg-white border rounded-md p-2 text-center shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-sm md:text-base">
                        {item.bulan} {currentDate.getFullYear()}
                      </h3>
                      <img
                        src="/sun-icon.png"
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
                        const date = new Date(
                          currentDate.getFullYear(),
                          monthIndex + 1,
                          day
                        );
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
                                : "bg-gray-200"
                            }`}>
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
