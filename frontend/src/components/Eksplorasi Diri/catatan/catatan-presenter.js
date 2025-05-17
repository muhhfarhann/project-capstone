// catatan-presenter.js
import CatatanModel from "./catatan-model";

export default class CatatanPresenter {
  constructor(view) {
    this.view = view;
    this.model = new CatatanModel();
  }

  async loadContent() {
    const data = await this.model.fetchMoodData();
    this.view.renderContent(data); // meskipun tidak dipakai sekarang
  }
}
