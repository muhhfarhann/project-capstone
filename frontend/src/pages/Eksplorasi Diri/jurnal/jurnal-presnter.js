class JurnalPresenter {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async handleSubmit(text, emoji) {
    try {
      const result = await this.model.submitJournal(text, emoji);
      this.view.updateMood(result.mood, result.confidence);
      this.view.clearInput();
      this.view.showSuccess('Jurnal berhasil dikirim!');
    } catch (error) {
      this.view.showError('Gagal mengirim jurnal. Coba lagi.');
    }
  }
}

export default JurnalPresenter;