import React, { useState } from "react";
import RefleksiView from "./refleksi-view";

const RefleksiPage = () => {
  const [jawaban, setJawaban] = useState(Array(5).fill(null));

  const handlePilihJawaban = (index, nilai) => {
    const updated = [...jawaban];
    updated[index] = nilai;
    setJawaban(updated);
  };

  const handleSubmit = () => {
    console.log("Jawaban dikirim:", jawaban);
  };

  return (
    <RefleksiView
      jawaban={jawaban}
      onPilihJawaban={handlePilihJawaban}
      onSubmit={handleSubmit}
    />
  );
};

export default RefleksiPage;
