import React from "react";

export const LoginView = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  error,
}) => {
  return (
    <div className="flex h-screen bg-[#EEE9FF]">
      <div className="flex-1 flex flex-col justify-center items-center bg-[#BFA5FF] text-white p-12 rounded-r-full">
        <div className="text-3xl font-bold mb-4">😡 😢 😊 😄 😠</div>
        <h1 className="text-2xl font-bold">Halo, Siap Jelajahi Mamood?</h1>
        <p className="mt-2 text-center max-w-md">
          Senang banget kamu mau mulai perjalanan baru bareng Mamood! Yuk, buat
          akun sekarang dan mulai kenali suasana hatimu setiap hari, biar kamu
          makin dekat dengan dirimu sendiri.
        </p>
        <button className="mt-6 bg-[#8854D0] px-6 py-2 rounded-full text-white font-semibold shadow">
          Yuk, daftar dulu!
        </button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Yuk, <span className="text-purple-600">Masuk!</span>
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Biar kamu bisa lanjut nge-track mood kamu hari ini.
        </p>
        <div className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Nama Pengguna"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-full border focus:outline-none"
          />
          <input
            type="password"
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="w-full mb-2 px-4 py-2 rounded-full border focus:outline-none"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex justify-between items-center mb-4">
            <label className="text-sm">
              <input type="checkbox" /> Tampilkan kata sandi
            </label>
            <a href="/forgot-password" className="text-sm text-purple-600">
              Lupa sandi?
            </a>
          </div>
          <button
            onClick={onSubmit}
            className="w-full bg-purple-600 text-white rounded-full py-2 shadow-md">
            Masuk
          </button>
          <div className="text-center my-4 text-sm text-gray-500">
            atau masuk dengan akun sosial media
          </div>
          <div className="flex justify-center gap-4">
            <img
              src="/google.svg"
              alt="Google"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src="/facebook.svg"
              alt="Facebook"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src="/github.svg"
              alt="GitHub"
              className="w-6 h-6 cursor-pointer"
            />
            <img
              src="/linkedin.svg"
              alt="LinkedIn"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
