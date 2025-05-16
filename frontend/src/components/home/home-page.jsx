// home-page.jsx
<<<<<<< HEAD
import { useEffect } from 'react';
import HomeView from './home-view';
import HomePresenter from './home-presenter';
=======
import { useEffect } from "react";
import HomeView from "./home-view";
import HomePresenter from "./home-presenter";
>>>>>>> c3ab16610dadbb716cb27d182308b9c4dbbc4f61

export default function HomePage() {
  useEffect(() => {
    const presenter = new HomePresenter({
      renderContent: () => {
        // Belum ada data yang perlu di-pass ke view karena view pakai teks statis
      },
    });

    presenter.loadContent();
  }, []);

  return <HomeView />;
}
