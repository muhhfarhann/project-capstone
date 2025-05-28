import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Gunakan konfigurasi yang sama dari firebase.js
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Fungsi untuk menyimpan catatan mood (terkait dengan pengguna yang login)
export const saveMoodEntry = async (mood, journal) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const currentDate = new Date().toISOString();
        const moodEntry = {
            userId: user.uid, // Menyimpan berdasarkan UID pengguna
            date: currentDate,
            mood: mood,
            journal: journal.trim(),
        };

        const docRef = await addDoc(collection(db, 'mood_entries'), moodEntry);
        console.log('Mood entry saved with ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error saving mood entry: ', error);
        throw error;
    }
};

// Fungsi untuk mengambil riwayat catatan mood berdasarkan pengguna
export const fetchMoodHistory = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        const q = query(collection(db, 'mood_entries'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        return history;
    } catch (error) {
        console.error('Error fetching mood history: ', error);
        throw error;
    }
};