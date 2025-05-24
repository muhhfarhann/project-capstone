// jurnal-view.jsx
import React, { useState } from "react";

const JurnalView = ({ jurnalHariIni, onInputChange, onSubmit }) => {
  const sidebarMenu = [
    { src: "/icons/home.png", alt: "Home", path: "/" },
    { src: "/icons/catatan.png", alt: "Catatan", path: "/catatan" },
    { src: "/icons/jurnal.png", alt: "Jurnal", path: "/jurnal" },
    { src: "/icons/refleksi.png", alt: "Refleksi Diri", path: "/refleksi" },
    { src: "/icons/rekomendasi.png", alt: "Rekomendasi", path: "/rekomendasi" },
  ];

  const emojiOptions = [
    { src: "/emoji/very-sad.png", value: "very_sad" },
    { src: "/emoji/sad.png", value: "sad" },
    { src: "/emoji/happy.png", value: "happy" },
    { src: "/emoji/very-happy.png", value: "very_happy" },
    { src: "/emoji/angry.png", value: "angry" },
  ];

  const [selectedEmoji, setSelectedEmoji] = useState(emojiOptions[2]); // default: happy
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2025-05-17");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-6 rounded-xl m-4">
        {sidebarMenu.map((item, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg transition duration-200 cursor-pointer ${
              item.alt === "Jurnal" ? "bg-purple-300" : "hover:bg-purple-300"
            }`}>
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
            <h1 className="text-xl font-bold">Jurnal Harian</h1>
          </div>

          <div className="flex items-center space-x-4 relative">
            <input
              type="text"
              placeholder="Cari jurnal harianmu..."
              className="px-4 py-2 rounded-md border focus:outline-none"
            />

            {/* Tanggal Dropdown (native calendar) */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md cursor-pointer"
            />

            {/* Emoji Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowEmojiDropdown(!showEmojiDropdown)}
                className="border rounded-md px-2 py-1 bg-white">
                <img
                  src={selectedEmoji.src}
                  alt="Selected emoji"
                  className="w-6 h-6"
                />
              </button>
              {showEmojiDropdown && (
                <div className="absolute top-10 right-0 bg-white border rounded shadow-md w-40 z-10 p-2 grid grid-cols-3 gap-2">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji.value}
                      onClick={() => {
                        setSelectedEmoji(emoji);
                        setShowEmojiDropdown(false);
                      }}
                      className="hover:bg-purple-100 p-1 rounded">
                      <img
                        src={emoji.src}
                        alt={emoji.value}
                        className="w-6 h-6"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profil */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Halo, Daniel!</span>
              <img
                src="/profile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full border"
              />
            </div>
          </div>
        </header>

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
                  className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md">
                  Selanjutnya
                </button>
              </div>
            </section>

            {/* Detail Jurnal */}
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
                      "Hari ini rasanya berat banget loh. Aku ngerasa gagal di presentasi tadi karena gugup dan jadi blank... lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      "Hari ini biasa aja. Nggak ada hal yang terlalu bikin senang atau sedih... lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                      "Hari ini rasanya luar biasa menyenangkan...lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
