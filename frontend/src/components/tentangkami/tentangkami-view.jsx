// views/tentangkami-view.jsx
import React from "react";

const TentangKamiView = () => {
  return (
    <div className="relative min-h-screen bg-[#eeedfb] flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* Gambar Wave Background */}
      <img
        src="/wave3.png"
        alt="Wave background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
      />

      {/* Konten Utama */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-xl max-w-6xl w-full overflow-hidden">
        <div className="p-10 text-gray-800 space-y-6">
          <p className="uppercase text-purple-600 font-semibold tracking-widest">
            Tentang Kami
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Cerita di Balik <span className="text-purple-600">Mamood</span>
          </h2>
          <p>
            <span className="text-purple-600 font-semibold">Mamood</span> adalah
            platform pemantauan suasana hati dan stres harian yang dirancang
            untuk membantu individu lebih sadar terhadap kondisi emosionalnya.
            Kami hadir sebagai solusi atas kesulitan banyak orang dalam memahami
            perubahan mood dan stres yang sering terabaikan.
          </p>
          <p>
            Dengan fitur seperti{" "}
            <span className="text-purple-600 font-semibold">
              pencatatan mood
            </span>
            ,{" "}
            <span className="text-purple-600 font-semibold">refleksi diri</span>
            ,{" "}
            <span className="text-purple-600 font-semibold">jurnal harian</span>
            , dan{" "}
            <span className="text-purple-600 font-semibold">rekomendasi</span>{" "}
            berbasis data, Mamood bukan alat diagnosis, melainkan sahabat
            digital untuk eksplorasi diri dan peningkatan kesejahteraan mental.
          </p>
          <blockquote className="border-l-4 pl-4 italic text-gray-700 border-gray-300">
            Proyek ini dikembangkan oleh{" "}
            <span className="font-bold">Tim CC25-CF094</span> dalam tema Inovasi
            Kesehatan, dengan pendekatan design thinking dan semangat
            kolaboratif lintas bidang.
          </blockquote>
        </div>
        <div className="relative bg-[#ffffff] overflow-hidden">
          <img
            src="/logo-miring.png"
            alt="Mamood logo stack"
            className="absolute -top-18 -right-25 w-full max-w-md md:max-w-lg object-contain"
          />

          <div className="invisible">placeholder</div>
        </div>
      </div>
    </div>
  );
};

export default TentangKamiView;
