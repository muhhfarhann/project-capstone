// presenters/rekomendasi-presenter.js
export default class RekomendasiPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  init() {
    this.view.render();
  }

  async ambilRekomendasi() {
    try {
      const data = await this.model.fetchRekomendasi();
      // proses data, misal update UI
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error);
    }
  }
}
