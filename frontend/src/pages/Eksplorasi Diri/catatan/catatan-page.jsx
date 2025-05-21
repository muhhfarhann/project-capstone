import React, { useState } from "react";
import CatatanPresenter from "./catatan-presenter";
import CatatanModel from "./catatan-model";
import CatatanView from "./catatan-view";

const CatatanPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  // Inisialisasi model
  const model = new CatatanModel();

  // Buat handler untuk mood yang dikirim ke presenter
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleNextClick = () => {
    alert(`Mood kamu hari ini: ${selectedMood}`);
    // Di sini bisa panggil model misalnya untuk simpan data
  };

  // Presenter hanya mengelola logic dan meneruskan ke View
  const presenter = new CatatanPresenter(model);

  return (
    <CatatanView
      selectedMood={selectedMood}
      onMoodSelect={handleMoodSelect}
      onNextClick={handleNextClick}
    />
  );
};

export default CatatanPage;
