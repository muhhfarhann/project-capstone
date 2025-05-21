import React from "react";

const CatatanView = ({ onMoodSelect, selectedMood, onNextClick }) => {
  const calendarData = [
    { src: "/calendar/april.png", bulan: "April" },
    { src: "/calendar/maret.png", bulan: "Maret" },
    { src: "/calendar/februari.png", bulan: "Februari" },
    { src: "/calendar/januari.png", bulan: "Januari" },
  ];

  const moodOptions = [
    { src: "/emoji/very-sad.png", value: "very_sad" },
    { src: "/emoji/sad.png", value: "sad" },
    { src: "/emoji/happy.png", value: "happy" },
    { src: "/emoji/very-happy.png", value: "very_happy" },
    { src: "/emoji/angry.png", value: "angry" },
  ];

  const sidebarMenu = [
    { src: "/icons/home.png", alt: "Home" },
    { src: "/icons/catatan.png", alt: "Catatan" },
    { src: "/icons/jurnal.png", alt: "Jurnal" },
    { src: "/icons/refleksi.png", alt: "Refleksi Diri" },
    { src: "/icons/rekomendasi.png", alt: "Rekomendasi" },
  ];

  const bulanList = ["April", "Maret", "Februari", "Januari"];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-6 rounded-xl m-4">
        {sidebarMenu.map((item, index) => (
          <div
            key={index}
            className="p-2 rounded-lg hover:bg-purple-300 transition duration-200 cursor-pointer">
            <img src={item.src} alt={item.alt} className="w-8 h-8" />
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f0f0ff] overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-300 px-6 py-4 flex justify-between items-center rounded-xl mx-4 mt-4 shadow-md">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Catatan Mood</h1>
          </div>

          <div className="relative">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="font-semibold">Halo, Daniel!</span>
              <img
                src="/profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full border border-white"
              />
            </div>
          </div>
        </header>

        {/* Konten */}
        <div className="p-6 space-y-6">
          {/* Grid: Mood Hari Ini + Mingguan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Mood Hari Ini */}
            <section className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">Mood Hari Ini</h2>
              <p className="mb-2">Hari ini kamu merasa apa?</p>
              <div className="flex space-x-4 mb-4 ">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => onMoodSelect(mood.value)}
                    className={`p-1 rounded-full cursor-pointer ${
                      selectedMood === mood.value
                        ? "bg-purple-200 ring-2 ring-purple-400"
                        : "hover:bg-gray-100"
                    }`}>
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
                rows={3}></textarea>
              <div className="flex justify-end mt-3">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md cursor-pointer"
                  onClick={onNextClick}>
                  Selanjutnya
                </button>
              </div>
            </section>

            {/* Mood-ku Minggu Ini */}
            <section className="bg-purple-300 p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">Mood-ku Minggu Ini</h2>
              <img
                src="/chart-week.png"
                alt="Chart Mingguan"
                className="w-full h-64 object-contain"
              />
            </section>
          </div>

          {/* Mood-ku: 4 Bulan Terakhir */}
          <section className="bg-purple-300 p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">
              Mood-ku: 4 Bulan Terakhir
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {calendarData.map((item) => (
                <div
                  key={item.bulan}
                  className="bg-[#f9f9f9] border rounded-md p-2 text-center shadow">
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
