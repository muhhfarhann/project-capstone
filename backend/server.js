import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// Muat variabel lingkungan dari .env
dotenv.config();

// Inisialisasi Firebase Admin SDK menggunakan variabel lingkungan
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin SDK berhasil diinisialisasi');
} catch (error) {
    console.error('Gagal inisialisasi Firebase Admin SDK:', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Simulasi database sementara
const users = {};

// Rute dasar untuk testing
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Endpoint untuk registrasi manual
app.post("/api/auth/register", async (req, res) => {
    console.log('Menerima request registrasi:', req.body);
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
        console.log('Validasi gagal: Semua field wajib diisi');
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username,
        });
        console.log('Berhasil membuat pengguna di Firebase:', userRecord.uid);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { uid: userRecord.uid, username, email, gender, password: hashedPassword };
        users[userRecord.uid] = user;
        console.log("Data pengguna disimpan:", user);
        res.status(200).json({ user: { username, email, gender } });
    } catch (error) {
        console.error("Error di register:", error);
        let errorMessage = 'Gagal registrasi.';
        if (error.code === 'auth/email-already-exists') {
            errorMessage = 'Email sudah terdaftar.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Format email tidak valid.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Kata sandi terlalu lemah (minimal 6 karakter).';
        }
        res.status(400).json({ error: errorMessage });
    }
});

// Endpoint untuk login manual
app.post("/api/auth/login", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "Token diperlukan" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const user = users[uid] || { uid, username: 'User', gender: '' };
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error di login:", error);
        res.status(401).json({ error: "Token tidak valid" });
    }
});

// Endpoint untuk verifikasi token Firebase
app.post("/api/auth/verify-token", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "Token diperlukan" });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.status(200).json({ success: true, uid: decodedToken.uid });
    } catch (error) {
        console.error("Error di verify-token:", error);
        res.status(401).json({ error: "Token tidak valid" });
    }
});

// Endpoint untuk memperbarui atau menyimpan data pengguna
app.post("/api/auth/update-user", async (req, res) => {
    const { uid, username, gender } = req.body;
    if (!uid || !username) {
        return res.status(400).json({ error: "UID dan username diperlukan" });
    }
    try {
        const user = { uid, username, gender };
        users[uid] = user; // Simpan dengan uid sebagai kunci
        console.log("Memperbarui data pengguna:", user);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error di update-user:", error);
        res.status(500).json({ error: "Gagal memperbarui data pengguna" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});