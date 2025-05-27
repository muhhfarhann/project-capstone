from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Tambahkan CORS untuk mengizinkan frontend mengakses backend

# Inisialisasi database SQLite
def init_db():
    conn = sqlite3.connect('mood_data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS mood_entries
                 (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, mood TEXT, journal TEXT, prediction TEXT)''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/mood', methods=['POST'])
def save_mood():
    data = request.get_json()
    date = data.get('date')
    mood = data.get('mood')
    journal = data.get('journal')
    prediction = data.get('prediction', '')

    if not mood or not journal:
        return jsonify({"error": "Mood dan jurnal harus diisi!"}), 400

    # Simpan ke database
    conn = sqlite3.connect('mood_data.db')
    c = conn.cursor()
    c.execute("INSERT INTO mood_entries (date, mood, journal, prediction) VALUES (?, ?, ?, ?)",
              (date, mood, journal, prediction))
    conn.commit()
    conn.close()

    return jsonify({"message": "Data mood berhasil disimpan", "id": c.lastrowid}), 200

@app.route('/api/mood/history', methods=['GET'])
def get_mood_history():
    conn = sqlite3.connect('mood_data.db')
    c = conn.cursor()
    c.execute("SELECT date, mood, journal, prediction FROM mood_entries")
    rows = c.fetchall()
    conn.close()
    return jsonify([{"date": row[0], "mood": row[1], "journal": row[2], "prediction": row[3]} for row in rows])

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ubah port ke 5001