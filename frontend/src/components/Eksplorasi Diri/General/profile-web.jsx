import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../firebase';

const WebProfileComponent = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsProfileOpen(false);
  };

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      alert('Berhasil logout');
      navigate('/login');
    } else {
      alert('Gagal logout: ' + result.error);
    }
  };

  if (!user) return null; // Jangan render jika tidak ada data pengguna

  return (
    <div className="relative flex gap-3">
      <div
        className="hidden md:flex items-center space-x-2 cursor-pointer"
        onClick={toggleProfile}
      >
        <span className="font-semibold text-sm md:text-base">
          Halo, {user.username || 'User'}!
        </span>
        <img
          src="/profile.png"
          alt="Profile"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-white cursor-pointer"
        />
      </div>

      {isProfileOpen && (
        <ul className="absolute right-0 mt-12 bg-white rounded-md shadow-md text-sm py-2 w-48 z-20">
          <li>
            <button
              onClick={openProfileModal}
              className="w-full text-left block px-4 py-2 hover:bg-purple-100 cursor-pointer"
            >
              Profil Saya
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 hover:bg-purple-100 cursor-pointer"
            >
              Keluar
            </button>
          </li>
        </ul>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={closeProfileModal}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              Detail Profil
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex gap-4">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 cursor-pointer">
                  Ganti foto
                </button>
                <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-100 cursor-pointer">
                  Hapus
                </button>
              </div>
              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <span className="flex-1 text-gray-800">
                    {user.username || 'User'}
                  </span>
                  <span className="text-gray-500">👤</span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                  <span className="flex-1 text-gray-800">{user.email}</span>
                  <span className="text-gray-500">✉️</span>
                </div>
                {user.gender && (
                  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <span className="flex-1 text-gray-800">{user.gender}</span>
                    <span className="text-gray-500">⚥</span>
                  </div>
                )}
              </div>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 cursor-pointer">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebProfileComponent;
