import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import fs from "fs";

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
app.post("/api/auth/register", (req, res) => {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    const user = { username, email, gender };
    console.log("Data pengguna:", user);
    users[email] = user; // Simpan ke "database" sementara
    res.status(200).json({ user });
});

// Endpoint untuk login manual (opsional, untuk verifikasi token)
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
        users[uid] = user; // Simpan ke "database" sementara
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