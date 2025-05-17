// pages/rekomendasi-page.jsx
import React, { useEffect, useState } from "react";
import RekomendasiView from "./rekomendasi-view";
import RekomendasiModel from "./rekomendasi-model";
import RekomendasiPresenter from "./rekomendasi-presenter";

const RekomendasiPage = () => {
  const [presenter, setPresenter] = useState(null);

  useEffect(() => {
    const model = new RekomendasiModel();

    const view = {
      render: () => {}, // placeholder, karena React sudah render manual
    };

    const newPresenter = new RekomendasiPresenter(view, model);
    newPresenter.init();
    setPresenter(newPresenter);
  }, []);

  const handleButtonClick = () => {
    console.log("Tombol rekomendasi diklik.");
    if (presenter) {
      presenter.ambilRekomendasi();
    }
  };

  return <RekomendasiView onButtonClick={handleButtonClick} />;
};

export default RekomendasiPage;
