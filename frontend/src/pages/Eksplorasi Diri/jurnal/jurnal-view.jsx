import React, { useState } from "react";
import Aside from "../../../components/Eksplorasi Diri/General/Aside";
import Profile from "../../../components/Eksplorasi Diri/General/profile";
import ProfileWeb from "../../../components/Eksplorasi Diri/General/profile-web";

const JurnalView = ({ jurnalHariIni, onInputChange, onSubmit }) => {
  const [selectedEmoji, setSelectedEmoji] = useState({
    src: "/emoji/happy.png",
    value: "happy",
  });
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2025-05-17");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const emojiOptions = [
    { src: "/emoji/very-sad.png", value: "very_sad" },
    { src: "/emoji/sad.png", value: "sad" },
    { src: "/emoji/happy.png", value: "happy" },
    { src: "/emoji/very-happy.png", value: "very_happy" },
    { src: "/emoji/angry.png", value: "angry" },
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
            <h1 className="text-xl font-bold">Jurnal Harian</h1>
          </div>

          <div className="flex items-center space-x-4">
            <ProfileWeb />

            <button
              className="md:hidden p-2"
              onClick={() => setIsSidebarOpen(true)}>
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
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-4 text-xl font-bold cursor-pointer">
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
              </div>

              <Profile />

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
                    className="flex items-center space-x-3 text-gray-700 font-medium hover:text-purple-500"
                    onClick={() => setIsSidebarOpen(false)}>
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Konten */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Kiri: Form Jurnal Hari Ini */}
          <div className="col-span-2 space-y-4">
            <section className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                📝 Jurnal Hari Ini
              </h2>
              <textarea
                placeholder="Hari ini belum ada cerita. Apa pun yang kamu rasakan, kamu bisa mulai menuliskannya di sini."
                className="w-full h-32 border rounded-md p-3"
                value={jurnalHariIni}
                onChange={onInputChange}></textarea>
              <div className="flex justify-end mt-3">
                <button
                  onClick={onSubmit}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md cursor-pointer">
                  Selanjutnya
                </button>
              </div>
            </section>

            <section className="bg-purple-300 p-4 rounded-xl shadow">
              <h2 className="text-md font-semibold mb-2">
                Detail Jurnal Tanggal{" "}
                {new Date(selectedDate).toLocaleDateString("id-ID")}
              </h2>
              <div className="bg-white p-4 rounded-md shadow space-y-2 text-sm">
                <p className="font-medium flex items-center gap-2">
                  📅 {new Date(selectedDate).toLocaleDateString("id-ID")}
                  <img src={selectedEmoji.src} alt="Mood" className="w-5 h-5" />
                </p>
                <p>
                  Hari ini rasanya berat banget. Aku ngerasa gagal di presentasi
                  tadi karena gugup dan jadi blank...
                </p>
                <p>
                  Tapi aku coba ingetin diri kalau semua orang pernah gagal...
                </p>
              </div>
            </section>
          </div>

          {/* Kanan: Jurnal Sebelumnya */}
          <section className="bg-purple-300 p-4 rounded-xl shadow h-fit space-y-4">
            <h2 className="text-md font-semibold">Jurnal Harian Sebelumnya</h2>
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg shadow space-y-1 text-sm">
                <p className="font-medium">
                  📅 17 Mei 2025
                  <img
                    src={emojiOptions[idx].src}
                    alt="Mood"
                    className="inline w-4 h-4 ml-2"
                  />
                </p>
                <p>
                  {
                    [
                      "Hari ini rasanya berat banget loh. Aku ngerasa gagal di presentasi tadi karena gugup dan jadi blank...",
                      "Hari ini biasa aja. Nggak ada hal yang terlalu bikin senang atau sedih...",
                      "Hari ini rasanya luar biasa menyenangkan...",
                    ][idx]
                  }
                </p>
                <div className="flex justify-between text-xs text-purple-500 mt-2">
                  <span className="cursor-pointer">Baca Selengkapnya →</span>
                  <div className="space-x-2 text-black">
                    <button>✏️</button>
                    <button>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default JurnalView;
