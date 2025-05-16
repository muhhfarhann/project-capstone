import { useEffect } from 'react';
import HomeView from './home-view';
import HomePresenter from './home-presenter';

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
