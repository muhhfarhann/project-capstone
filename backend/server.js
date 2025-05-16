import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import fs from "fs";
import bcrypt from "bcrypt";

// Baca file serviceAccountKey.json
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Simulasi database sementara
const users = {};

// Rute dasar untuk testing
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Endpoint untuk registrasi manual
app.post("/api/auth/register", async (req, res) => {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    try {
        // Buat pengguna di Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: username,
        });
        // Hash password untuk penyimpanan lokal (opsional)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { uid: userRecord.uid, username, email, gender, password: hashedPassword };
        users[userRecord.uid] = user; // Simpan dengan uid sebagai kunci
        console.log("Data pengguna:", user);
        res.status(200).json({ user: { username, email, gender } });
    } catch (error) {
        console.error("Error di register:", error);
        let errorMessage = 'Gagal registrasi.';
        if (error.code === 'auth/email-already-exists') {
            errorMessage = 'Email sudah terdaftar.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Format email tidak valid.';
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