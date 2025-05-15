// testimoni-page.jsx

import React from "react";
import { TestimoniModel } from "./testimoni-model";
import { TestimoniPresenter } from "./testimoni-presenter";
import { TestimoniView } from "./testimoni-view";

const TestimoniPage = () => {
  const model = new TestimoniModel();
  const presenter = new TestimoniPresenter(model);
  const apiKey = presenter.getApiKey();

  // Kamu bisa gunakan apiKey ini nanti kalau ingin ambil data dari API
  console.log("API Key:", apiKey);

  return <TestimoniView />;
};

export default TestimoniPage;
