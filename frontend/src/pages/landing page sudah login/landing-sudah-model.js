import { API_BASE_URL } from '../../firebase';
import { fetchMoodHistory } from '../../firebase-firestore';

export default class LandingSudahModel {
  async fetchMoodData() {
    try {
      const history = await fetchMoodHistory();
      return history;
    } catch (error) {
      console.error('Error fetching mood data:', error);
      return [];
    }
  }

  async fetchUserData(uid) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/${uid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return { success: false, error: 'Failed to fetch user data' };
    }
  }
}