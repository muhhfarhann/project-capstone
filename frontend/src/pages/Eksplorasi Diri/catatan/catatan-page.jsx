import React, { useState, useEffect } from 'react';
import CatatanPresenter from './catatan-presenter';
import CatatanModel from './catatan-model';
import CatatanView from './catatan-view';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase'; // Sesuaikan path

const CatatanPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [journalText, setJournalText] = useState('');
  const [moodHistory, setMoodHistory] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const model = new CatatanModel();

  const view = {
    updateMoodHistory: (history) => setMoodHistory(history),
    showSuccess: (message) => alert(message),
    showError: (message) => alert(message),
    resetForm: () => {
      setJournalText('');
      setSelectedMood(null);
    },
    onNextClick: () => alert(`Mood kamu hari ini: ${selectedMood}`),
    setAuthenticated: (authStatus) => setIsAuthenticated(authStatus),
    isAuthenticated,
    moodHistory,
    setJournalText,
    journalText,
  };

  const presenter = new CatatanPresenter(model, view);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const authStatus = !!user;
      setIsAuthenticated(authStatus);
      presenter.setAuthenticated(authStatus);
      if (authStatus) {
        presenter.loadMoodHistory();
      } else {
        // Redirect ke halaman login jika belum login
        window.location.href = '/login';
      }
    });
    return unsubscribe;
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleNextClick = () => {
    if (!isAuthenticated) {
      alert('Silakan login terlebih dahulu!');
      return;
    }
    if (!selectedMood || !journalText.trim()) {
      alert('Silakan pilih mood dan isi jurnal terlebih dahulu!');
      return;
    }
    presenter.saveMood(selectedMood, journalText);
  };

  return (
    <CatatanView
      selectedMood={selectedMood}
      onMoodSelect={handleMoodSelect}
      onNextClick={handleNextClick}
      updateMoodHistory={view.updateMoodHistory}
      showSuccess={view.showSuccess}
      showError={view.showError}
      resetForm={view.resetForm}
      setAuthenticated={view.setAuthenticated}
      isAuthenticated={isAuthenticated}
      moodHistory={moodHistory}
      setJournalText={setJournalText}
      journalText={journalText}
    />
  );
};

export default CatatanPage;
