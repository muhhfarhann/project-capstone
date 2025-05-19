// catatan-page.jsx
import { useEffect } from "react";
import CatatanView from "./catatan-view";
import CatatanPresenter from "./catatan-presenter";

export default function CatatanPage() {
  useEffect(() => {
    const presenter = new CatatanPresenter({
      renderContent: () => {
        // Saat ini belum pakai data, tapi struktur sudah siap
      },
    });

    presenter.loadContent();
  }, []);

  return <CatatanView />;
}
