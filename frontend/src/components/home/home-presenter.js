// home-presenter.js
import HomeModel from "./home-model";

export default class HomePresenter {
  constructor(view) {
    this.view = view;
    this.model = new HomeModel();
  }

  async loadContent() {
    const data = await this.model.fetchMoodData();
    this.view.renderContent(data);
  }
}
