import React from "react";

const RefleksiView = ({ jawaban = [], onPilihJawaban, onSubmit }) => {
  const sidebarMenu = [
    { src: "/icons/home.png", alt: "Home", path: "/" },
    { src: "/icons/catatan.png", alt: "Catatan", path: "/catatan" },
    { src: "/icons/jurnal.png", alt: "Jurnal", path: "/jurnal" },
    { src: "/icons/refleksi.png", alt: "Refleksi Diri", path: "/refleksi" },
    { src: "/icons/rekomendasi.png", alt: "Rekomendasi", path: "/rekomendasi" },
  ];

  const pertanyaanList = [
    "Saya merasa dapat mengelola stres yang saya alami dengan cukup baik.",
    "Saya merasa bersemangat untuk menjalani aktivitas hari ini.",
    "Saya merasa cukup tidur dan memiliki energi yang cukup sepanjang hari.",
    "Saya merasa hubungan saya dengan orang-orang terdekat berjalan baik.",
    "Saya merasa nyaman mengekspresikan emosi saya dengan jujur.",
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-6 rounded-xl m-4">
        {sidebarMenu.map((item, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg transition duration-200 cursor-pointer ${
              item.alt === "Refleksi Diri"
                ? "bg-purple-300"
                : "hover:bg-purple-300"
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
            <h1 className="text-xl font-bold">Refleksi Diri</h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-semibold">Halo, Daniel!</span>
            <img
              src="/profile.png"
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>

        {/* Konten */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pertanyaan */}
          <div className="col-span-2 space-y-4">
            {pertanyaanList.map((text, index) => (
              <div
                key={index}
                className={`bg-white p-5 rounded-xl shadow-md border-l-8 ${
                  jawaban?.[index] ? "border-purple-400" : "border-gray-300"
                }`}>
                <p className="font-semibold mb-3">Pertanyaan {index + 1}</p>
                <p className="text-gray-700 mb-4">{text}</p>
                <div className="flex gap-4 justify-between text-sm text-gray-500">
                  <span>Tidak Setuju</span>
                  <span>Sangat Setuju</span>
                </div>
                <div className="flex gap-4 justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => onPilihJawaban(index, val)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        jawaban?.[index] === val
                          ? "bg-purple-400 border-purple-600"
                          : "border-gray-400"
                      }`}></button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hasil & Interpretasi */}
          <div className="bg-purple-200 rounded-xl p-5 h-fit space-y-4 shadow-md">
            <button
              onClick={onSubmit}
              className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md w-full">
              Lihat Hasil
            </button>

            <div className="bg-white p-5 rounded-xl text-center shadow space-y-2">
              <img
                src="/emoji/happy.png"
                alt="Result"
                className="w-10 h-10 mx-auto"
              />
              <p className="text-sm text-gray-600">
                Yuk isi semua pertanyaan terlebih dulu
                <br /> untuk melihat hasil refleksimu di sini!
              </p>
            </div>

            {/* Interpretasi Skor */}
            <div className="bg-white p-4 rounded-xl shadow space-y-2">
              <h3 className="text-sm font-semibold mb-2">
                📊 Interpretasi Skor
              </h3>
              {[
                { label: "Sangat Berat", range: "81-100" },
                { label: "Cukup Berat", range: "61-80" },
                { label: "Sedang", range: "41-60" },
                { label: "Ringan", range: "21-40" },
                { label: "Normal", range: "0-20" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center bg-yellow-100 px-3 py-1 rounded text-xs">
                  <span>{item.range}</span>
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefleksiView;
