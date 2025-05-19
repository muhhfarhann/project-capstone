import { Link } from "react-router-dom";

export default function CatatanView() {
  return (
    <div className="relative bg-[#eeedfb]">
      {/* Konten atas */}
      <div className="text-center py-16 px-6">
        <p className="uppercase text-purple-600 font-semibold tracking-widest mb-2">
          Eksplorasi Diri
        </p>
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Catatan Mood</h2>
        <p className="max-w-xl mx-auto text-gray-800 mb-8">
          Pantau suasana hatimu setiap hari melalui fitur Catatan Mood. Pilih
          emoji yang sesuai dengan perasaanmu, tambahkan catatan singkat, dan
          lihat pola mood-mu dari waktu ke waktu. Dengan mengenali emosi, kamu
          bisa lebih memahami dirimu sendiri.
        </p>

        <Link
          to="/catatan"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition">
          Catat Mood-ku Hari Ini ↗
        </Link>
      </div>

      {/* Gambar bawah */}
      <div className="absolute bottom-0 left-0 w-full">
        <img
          src="/emoji2.png"
          alt="Emoji Mood"
          className="w-full object-cover"
        />
      </div>

      {/* Spacer untuk gambar agar tidak nutupi konten */}
      <div className="h-[525px]" />
    </div>
  );
}
