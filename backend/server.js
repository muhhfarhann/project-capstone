import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Rute dasar untuk testing
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Endpoint untuk registrasi
app.post("/api/auth/register", (req, res) => {
    const { username, email, password, gender } = req.body;
    if (!username || !email || !password || !gender) {
        return res.status(400).json({ error: "Semua field wajib diisi" });
    }
    const user = { username, email, gender };
    console.log("Data pengguna:", user);
    res.status(200).json({ user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});