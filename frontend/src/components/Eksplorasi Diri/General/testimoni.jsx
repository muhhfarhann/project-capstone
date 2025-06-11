import { useState } from "react";

export default function TestimoniModal({ onClose }) {
  const [rating, setRating] = useState(4);
  const [status, setStatus] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [tampilkan, setTampilkan] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      rating,
      status,
      ulasan,
      tampilkan,
    });
    // Tambahkan logic kirim ke API atau state global di sini
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10 backdrop-blur-sm">
      <div className="bg-[#f3f0ff] p-6 rounded-lg w-[90%] max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-500 text-xl font-bold cursor-pointer"
          onClick={onClose}>
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Testimoni</h2>

        {/* Bintang yang bisa diklik */}
        <div className="flex items-center mb-4 cursor-pointer">
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              onClick={() => setRating(i)}
              className={`text-3xl ${
                i <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:scale-110 transition`}>
              ★
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md py-2 px-3 appearance-none cursor-pointer"
              required>
              <option value="">Status</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Pekerja">Pekerja</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <span className="absolute top-2.5 right-3 text-gray-500 pointer-events-none">
              ▼
            </span>
          </div>

          <div className="mb-4">
            <textarea
              value={ulasan}
              onChange={(e) => setUlasan(e.target.value)}
              className="w-full border rounded-md p-3 text-sm"
              rows="3"
              placeholder="Kamu merasa terbantu? Ceritain dong!"
              required></textarea>
          </div>

          <div className="mb-4 text-sm">
            <p className="mb-2">
              Mau testimoni kamu kami tampilkan di halaman Mamood?
            </p>
            <label className="block">
              <input
                type="radio"
                name="tampilkan"
                value="ya"
                checked={tampilkan === "ya"}
                onChange={(e) => setTampilkan(e.target.value)}
                className="mr-2"
                required
              />
              Boleh banget!
            </label>
            <label className="block">
              <input
                type="radio"
                name="tampilkan"
                value="tidak"
                checked={tampilkan === "tidak"}
                onChange={(e) => setTampilkan(e.target.value)}
                className="mr-2"
              />
              Jangan dulu ya, cukup tim Mamood aja
            </label>
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-6 rounded-full hover:bg-purple-700 transition font-medium w-full">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
