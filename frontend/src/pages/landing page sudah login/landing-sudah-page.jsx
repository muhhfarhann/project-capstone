import { useEffect } from "react";
import LandingSudahView from "./landing-sudah-view";
import LandingSudahPresenter from "./landing-sudah-presenter";

export default function LandingSudahPage() {
  useEffect(() => {
    const presenter = new LandingSudahPresenter({
      renderContent: () => {
        // Belum ada data yang perlu di-pass ke view karena view pakai teks statis
      },
    });

    presenter.loadContent();
  }, []);

  return <LandingSudahView />;
}
