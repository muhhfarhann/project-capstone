import { useEffect, useState } from 'react';

export default function Aside() {
  const [urlSet, setUrlSet] = useState();
  const sidebarMenu = [
    { src: '/icons/home.png', alt: 'Home', path: '/home' },
    { src: '/icons/catatan.png', alt: 'Catatan', path: '/catatan' },
    { src: '/icons/jurnal.png', alt: 'Jurnal', path: '/jurnal' },
    { src: '/icons/refleksi.png', alt: 'Refleksi Diri', path: '/refleksi' },
    { src: '/icons/rekomendasi.png', alt: 'Rekomendasi', path: '/rekomendasi' },
  ];

  useEffect(() => {
    const url = window.location.href;

    console.log(url);
  }, []);

  return (
    <aside className="w-20 bg-black text-white flex flex-col items-center py-6 space-y-6 rounded-xl m-4">
      {sidebarMenu.map((item, index) => (
        <a
          key={index}
          href={item.path}
          className={`p-2 rounded-lg transition duration-200 cursor-pointer ${
            item.alt === 'Rekomendasi' ? 'bg-purple-300' : 'hover:bg-purple-300'
          }`}
        >
          <img src={item.src} alt={item.alt} className="w-8 h-8" />
        </a>
      ))}
    </aside>
  );
}
