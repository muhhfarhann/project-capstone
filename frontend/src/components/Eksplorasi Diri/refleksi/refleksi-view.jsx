import React from "react";

const RefleksiView = () => {
  return (
    <div className="bg-[#eeedfb] min-h-screen flex items-center justify-start px-8 md:px-32">
      <div className="max-w-xl">
        <p className="text-sm font-semibold tracking-wider text-purple-500 uppercase mb-2">
          Eksplorasi Diri
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Refleksi Diri</h1>
        <p className="text-gray-700 mb-6">
          Kenali dirimu lebih dalam lewat pertanyaan reflektif yang membantumu
          memahami pikiran dan perasaan. Refleksi Diri membantu kamu
          mengevaluasi kondisi mental secara berkala agar tetap sadar dan
          seimbang.
        </p>
        <a
          href="#"
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-md transition">
          Mulai Refleksi Diri
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default RefleksiView;
