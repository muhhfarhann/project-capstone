import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Tentukan jalur ke .env di root proyek
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Inisialisasi Firebase Admin SDK menggunakan variabel lingkungan
const serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_URL,
};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK berhasil diinisialisasi");
  // Uji koneksi ke Firebase
  admin.auth().listUsers(1).then(() => {
    console.log("Koneksi ke Firebase Authentication berhasil");
  }).catch(error => {
    console.error("Gagal terhubung ke Firebase Authentication:", error.message, error.stack);
  });
} catch (error) {
  console.error("Gagal inisialisasi Firebase Admin SDK:", error.message, error.stack);
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:5176", "http://localhost:5173", "http://localhost:5174"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("CORS error: Origin tidak diizinkan:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// Simulasi database sementara
const users = {};

// Rute dasar untuk testing
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Endpoint untuk registrasi manual
app.post("/api/register", async (req, res) => {
  console.log("Registrasi diterima:", JSON.stringify(req.body, null, 2));
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email dan password diperlukan" });
  }
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    console.log("Berhasil membuat pengguna:", userRecord.uid);
    res.status(201).json({ message: "Pengguna berhasil dibuat", uid: userRecord.uid });
  } catch (error) {
    console.error("Error saat registrasi:", error.message, error.stack);
    let errorMessage = "Gagal registrasi";
    if (error.code === "auth/email-already-exists") {
      errorMessage = "Email sudah terdaftar";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Kata sandi terlalu lemah (minimal 6 karakter)";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Kredensial Firebase tidak valid";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage = "Operasi tidak diizinkan di Firebase Authentication";
    }
    res.status(400).json({ error: errorMessage, details: error.message });
  }
});

// Endpoint untuk registrasi dengan semua field
app.post("/api/auth/register", async (req, res) => {
  console.log("Registrasi diterima (raw body):", JSON.stringify(req.body, null, 2));
  const { username, email, password, gender } = req.body;

  console.log("Field yang diparsing:", JSON.stringify({ username, email, password, gender }, null, 2));

  if (
    !username ||
    !email ||
    !password ||
    !gender ||
    username.trim() === "" ||
    email.trim() === "" ||
    password.trim() === "" ||
    gender.trim() === ""
  ) {
    console.log("Validasi gagal: Ada field yang hilang atau kosong");
    return res.status(400).json({ error: "Semua field wajib diisi dan tidak boleh kosong" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });
    console.log("Berhasil membuat pengguna:", userRecord.uid);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      uid: userRecord.uid,
      username,
      email,
      gender,
      password: hashedPassword,
    };
    users[userRecord.uid] = user;
    res.status(201).json({
      message: "Pengguna berhasil dibuat",
      user: { username, email, gender },
    });
  } catch (error) {
    console.error("Error saat registrasi:", error.message, error.stack);
    let errorMessage = "Gagal registrasi";
    if (error.code === "auth/email-already-exists") {
      errorMessage = "Email sudah terdaftar";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Format email tidak valid";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Kata sandi terlalu lemah (minimal 6 karakter)";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Kredensial Firebase tidak valid";
    } else if (error.code === "auth/operation-not-allowed") {
      errorMessage = "Operasi tidak diizinkan di Firebase Authentication";
    }
    res.status(400).json({ error: errorMessage, details: error.message });
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
    const user = users[uid] || { uid, username: "User", gender: "" };
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error di login:", error.message, error.stack);
    res.status(401).json({ error: "Token tidak valid", details: error.message });
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
    console.error("Error di verify-token:", error.message, error.stack);
    res.status(401).json({ error: "Token tidak valid", details: error.message });
  }
});

// Endpoint untuk memperbarui atau menyimpan data pengguna
app.post("/api/auth/update-user", async (req, res) => {
  console.log("Menerima permintaan update-user:", JSON.stringify(req.body, null, 2));
  const { uid, username, gender } = req.body;
  if (!uid || !username) {
    console.log("Validasi gagal: UID dan username diperlukan");
    return res.status(400).json({ error: "UID dan username diperlukan" });
  }
  try {
    const user = { uid, username, gender: gender || "" };
    users[uid] = user;
    console.log("Memperbarui data pengguna:", user);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error di update-user:", error.message, error.stack);
    res.status(500).json({ error: "Gagal memperbarui data pengguna", details: error.message });
  }
});

// Endpoint sementara untuk uji Firebase
app.post("/api/auth/test-firebase", async (req, res) => {
  try {
    const userRecord = await admin.auth().createUser({
      email: "test@example.com",
      password: "12345678",
      displayName: "TestUser",
    });
    console.log("Berhasil membuat pengguna test:", userRecord.uid);
    res.status(201).json({ message: "Test user created", uid: userRecord.uid });
  } catch (error) {
    console.error("Firebase test error:", error.message, error.stack);
    res.status(400).json({ error: "Gagal membuat pengguna test", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});