// testimoni-presenter.js

export class TestimoniPresenter {
  constructor(model) {
    this.model = model;
  }

  getApiKey() {
    return this.model.getApiKey();
  }
}
