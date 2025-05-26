import React from 'react';
import Aside from '../../../components/Eksplorasi Diri/General/Aside';

const RekomendasiView = () => {
  // const sidebarMenu = [
  //   { src: "/icons/home.png", alt: "Home", path: "/" },
  //   { src: "/icons/catatan.png", alt: "Catatan", path: "/catatan" },
  //   { src: "/icons/jurnal.png", alt: "Jurnal", path: "/jurnal" },
  //   { src: "/icons/refleksi.png", alt: "Refleksi Diri", path: "/refleksi" },
  //   { src: "/icons/rekomendasi.png", alt: "Rekomendasi", path: "/rekomendasi" },
  // ];

  const rekomendasiList = [
    {
      kategori: 'ARTIKEL',
      judul: 'Mengapa Menulis Jurnal Membantu Kesehatan Mental',
      deskripsi:
        'Artikel berbasis penelitian yang menjelaskan dampak positif journaling terhadap kesehatan emosional.',
      bgColor: 'bg-red-100',
      icon: '/icons/artikel.png',
    },
    {
      kategori: 'MUSIK',
      judul: 'Calm Mind – Instrumental LoFi',
      deskripsi:
        'Musik LoFi berdurasi 1 jam untuk membantu menenangkan pikiran dan meningkatkan fokus saat mengalami kecemasan ringan.',
      bgColor: 'bg-blue-100',
      icon: '/icons/music.png',
    },
    {
      kategori: 'AKTIVITAS',
      judul: 'Latihan Pernapasan 4–7–8',
      deskripsi:
        'Teknik pernapasan terbukti secara klinis menurunkan stres dan detak jantung dalam 2 menit.',
      bgColor: 'bg-yellow-100 border border-yellow-400',
      icon: '/icons/aktivitas.png',
    },
    {
      kategori: 'VIDEO',
      judul: '5 Menit Meditasi Pagi – Guided Mindfulness',
      deskripsi:
        'Video meditasi terpandu pendek untuk memulai hari dengan kesadaran dan ketenangan batin.',
      bgColor: 'bg-green-100',
      icon: '/icons/video.png',
    },
    {
      kategori: 'ARTIKEL',
      judul: 'Efek Musik Terhadap Kesehatan Mental',
      deskripsi:
        'Ulasan dari jurnal psikologi tentang bagaimana musik tertentu dapat mengurangi gejala depresi dan kecemasan.',
      bgColor: 'bg-pink-100',
      icon: '/icons/artikel.png',
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {/* <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-6 rounded-xl m-4">
        {sidebarMenu.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className={`p-2 rounded-lg transition duration-200 cursor-pointer ${
              item.alt === "Rekomendasi"
                ? "bg-purple-300"
                : "hover:bg-purple-300"
            }`}>
            <img src={item.src} alt={item.alt} className="w-8 h-8" />
          </a>
        ))}
      </aside> */}

      <Aside />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f0f0ff] overflow-y-auto">
        {/* Header */}
        <header className="bg-purple-300 px-6 py-4 flex justify-between items-center rounded-xl mx-4 mt-4 shadow-md">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Rekomendasi</h1>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Cari rekomendasimu..."
              className="px-15 py-1 rounded-full text-sm border border-gray-300 focus:outline-none bg-amber-50"
            />
            <img
              src="/icons/search.png"
              alt="Search"
              className="w-4 h-4 -ml-8"
            />
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

        {/* Rekomendasi Content */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {rekomendasiList.map((item, idx) => (
              <div
                key={idx}
                className={`${item.bgColor} p-5 rounded-xl shadow-md flex items-start space-x-4`}
              >
                <img src={item.icon} alt="icon" className="w-8 h-8 mt-1" />
                <div>
                  <p className="text-xs font-bold">{item.kategori}</p>
                  <h2 className="font-semibold">{item.judul}</h2>
                  <p className="text-sm text-gray-700">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detail Placeholder */}
          <div className="bg-white p-5 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
            <img
              src="/emoji/happy.png"
              alt="emoji"
              className="w-10 h-10 mb-2"
            />
            <p className="text-sm text-gray-600">
              Yuk, pilih salah satu rekomendasi di sebelah kiri <br />
              untuk melihat detailnya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiView;
