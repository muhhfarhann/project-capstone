import LandingSudahModel from "./landing-sudah-model";

export default class landingSudahPresenter {
  constructor(view) {
    this.view = view;
    this.model = new LandingSudahModel();
  }

  async loadContent() {
    const data = await this.model.fetchMoodData();
    this.view.renderContent(data);
  }
}
