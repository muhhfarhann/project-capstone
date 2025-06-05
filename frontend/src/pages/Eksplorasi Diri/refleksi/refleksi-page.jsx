import React, { useState } from 'react';
import RefleksiView from './refleksi-view';
import RefleksiPresenter from './refleksi-presnter';

const RefleksiPage = () => {
  const [jawaban, setJawaban] = useState(Array(20).fill(null));
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePilihJawaban = (index, nilai) => {
    const updated = [...jawaban];
    updated[index] = nilai;
    setJawaban(updated);
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    // Validasi: pastikan semua pertanyaan dijawab
    if (jawaban.includes(null)) {
      setError('Harap jawab semua pertanyaan sebelum submit.');
      setIsLoading(false);
      return;
    }

    try {
      // Konversi jawaban ke skor 0-4 (sesuai dokumen)
      const mappedAnswers = jawaban.map((val) => val - 1); // 1-5 menjadi 0-4
      const { reflectionId, rawScore, scaledScore, category } =
        await RefleksiPresenter.saveReflection(mappedAnswers);
      setResult({ reflectionId, rawScore, scaledScore, category });
      // Reset jawaban setelah submit
      setJawaban(Array(20).fill(null));
    } catch (error) {
      console.error('Error submitting reflection:', error);
      setError('Gagal menyimpan refleksi. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RefleksiView
      jawaban={jawaban}
      onPilihJawaban={handlePilihJawaban}
      onSubmit={handleSubmit}
      result={result}
      error={error}
      isLoading={isLoading}
      questions={RefleksiPresenter.questions}
    />
  );
};

export default RefleksiPage;
