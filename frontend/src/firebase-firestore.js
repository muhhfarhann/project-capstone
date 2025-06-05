import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { auth } from './firebase';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

export const db = getFirestore();

export const saveMoodEntry = async (mood, journal) => {
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const moodEntry = {
        mood,
        journal,
        date: fromZonedTime(new Date(), 'Asia/Jakarta').toISOString(), // Ganti zonedTimeToUtc dengan fromZonedTime
    };

    await addDoc(collection(db, 'moods'), moodEntry);
};

export const fetchMoodHistory = async () => {
    const db = getFirestore();
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const querySnapshot = await getDocs(collection(db, 'moods'));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: toZonedTime(doc.data().date, 'Asia/Jakarta'), // Ganti utcToZonedTime dengan toZonedTime
    }));
};