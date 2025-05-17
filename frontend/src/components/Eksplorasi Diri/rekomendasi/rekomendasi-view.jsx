// views/rekomendasi-view.jsx
import React from "react";
import { Link } from "react-router-dom";

const RekomendasiView = ({ onButtonClick }) => {
  return (
    <div className="bg-[#e8e7f3] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center translate-x-25">
        <div></div> {/* sisi kiri dibiarkan kosong */}
        <div className="text-right">
          <p className="uppercase text-purple-600 font-semibold tracking-widest mb-2">
            Eksplorasi Diri
          </p>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Rekomendasi</h2>
          <p className="text-gray-800 mb-6 leading-relaxed">
            Berdasarkan mood dan catatanmu, Mamood akan memberikan rekomendasi
            positif seperti afirmasi harian, aktivitas ringan, atau konten yang
            bisa membantumu merasa lebih baik. Semua dibuat untuk mendukung
            kesejahteraanmu.
          </p>
          <button
            onClick={onButtonClick}
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition">
            Lihat Rekomendasi-ku ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiView;
