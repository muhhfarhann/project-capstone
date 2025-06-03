import LandingSudahModel from "./landing-sudah-model";

export default class LandingSudahPresenter {
  constructor(view) {
    this.view = view;
    this.model = new LandingSudahModel();
  }

  async loadContent() {
    const user = JSON.parse(localStorage.getItem('user'));
    let userData = user;
    let moodData = [];

    if (user && user.uid) {
      // Ambil data pengguna dari backend untuk memastikan data terbaru
      const userResult = await this.model.fetchUserData(user.uid);
      if (userResult.success) {
        userData = userResult.user;
        localStorage.setItem('user', JSON.stringify(userData)); // Perbarui localStorage
      }

      // Ambil data mood
      moodData = await this.model.fetchMoodData();
    }

    this.view.renderContent({ user: userData, moodData });
  }
}