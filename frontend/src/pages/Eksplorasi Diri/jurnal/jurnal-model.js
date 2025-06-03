class JurnalModel {
  async submitJournal(text, emoji) {
    try {
      const response = await fetch('http://localhost:5001/predict-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          emoji: emoji.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengirim jurnal');
      }

      const data = await response.json();
      return {
        mood: data.mood,
        confidence: data.confidence,
        journalId: data.journal_id,
      };
    } catch (error) {
      console.error('Kesalahan mengirim jurnal:', error);
      throw error;
    }
  }
}

export default JurnalModel;