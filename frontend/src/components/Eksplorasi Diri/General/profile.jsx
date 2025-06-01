import { useState } from "react";

const ProfileModalComponent = () => {
  // State to manage modal visibility
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Functions to open and close modal
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={openProfileModal}
          className="px-3 py-1 border rounded-full text-xs md:text-sm text-white bg-purple-500 cursor-pointer">
          Akun Saya
        </button>

        <button className="px-3 py-1 border rounded-full text-xs md:text-sm text-purple-500 cursor-pointer">
          Keluar
        </button>
      </div>

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-4 sm:p-6 rounded-xl w-11/12 sm:max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={closeProfileModal}>
              ✕
            </button>
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
              Detail Profil
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover"
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button className="bg-purple-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-purple-700 text-sm sm:text-base cursor-pointer">
                  Ganti foto
                </button>
                <button className="border border-purple-600 text-purple-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-purple-100 text-sm sm:text-base cursor-pointer">
                  Hapus
                </button>
              </div>
              <div className="w-full space-y-3 mt-4">
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 sm:px-4 sm:py-2">
                  <span className="flex-1 text-gray-800 text-sm sm:text-base">
                    Daniel
                  </span>
                  <span className="text-gray-500">👤</span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 sm:pxIPAddress:4 sm:py-2">
                  <span className="flex-1 text-gray-800 text-sm sm:text-base">
                    danielalexander@gmail.com
                  </span>
                  <span className="text-gray-500">✉️</span>
                </div>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full hover:bg-purple-700 text-sm sm:text-base cursor-pointer">
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileModalComponent;
