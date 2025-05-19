import { Link } from "react-router-dom";

export default function JurnalView() {
  return (
    <div className="bg-[#eeedfb] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center translate-x-25">
        <div></div> {/* sisi kiri dibiarkan kosong */}
        <div className="text-right">
          <p className="uppercase text-purple-600 font-semibold tracking-widest mb-2">
            Eksplorasi Diri
          </p>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Jurnal Harian
          </h2>
          <p className="text-gray-800 mb-6">
            Luapkan perasaanmu lewat tulisan. Di Jurnal Harian, kamu bebas
            mencatat apapun yang kamu rasakan, alami, dan pikirkan setiap hari.
            Ini tempat pribadi yang aman untuk mengekspresikan diri dan
            menyimpan momen bermakna.
          </p>
          <Link
            to="/jurnal"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition">
            Tulis Jurnal Sekarang ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
