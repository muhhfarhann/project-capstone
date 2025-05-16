import React from "react";

export function TestimoniView() {
  return (
    <section
      style={{
        backgroundColor: "#efecff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 1rem",
        position: "relative",
        overflow: "hidden",
      }}>
      <div style={{ textAlign: "center", maxWidth: "700px", zIndex: 1 }}>
        <div
          style={{
            backgroundColor: "#e6e0ff",
            color: "#7f6bdc",
            fontWeight: "bold",
            fontSize: "0.75rem",
            display: "inline-block",
            padding: "6px 18px",
            borderRadius: "9999px",
            marginBottom: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}>
          Testimoni
        </div>

        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "800",
            color: "#1f1f1f",
            marginBottom: "1rem",
          }}>
          Apa Kata Mereka?
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#4f4f4f",
            marginBottom: "2rem",
            lineHeight: "1.7",
          }}>
          Temukan bagaimana Mamood telah membantu banyak pengguna memahami dan
          merawat kesehatan mental mereka. Dari cerita perubahan positif hingga
          pengalaman inspiratif, testimoni ini membuktikan bahwa kamu tidak
          sendiri dalam perjalanan ini.
        </p>

        <button
          style={{
            backgroundColor: "#7f6bdc",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "9999px",
            fontWeight: "bold",
            fontSize: "0.95rem",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
          Yuk, Kirim Testimoni! →
        </button>
      </div>

      {/* Avatar 1 */}
      <img
        src="/avatar/avatar1.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "40%",
          left: "76%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "6px solid #b983ff",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Testimoni bubble untuk Avatar 1 */}
      {/* Testimoni bubble dengan panah mengarah ke atas */}
      <div
        style={{
          position: "absolute",
          top: "53%",
          left: "82%",
          transform: "translateX(-50%)",
          backgroundColor: "#1f1f1f",
          color: "white",
          padding: "1rem 1.2rem",
          borderRadius: "1rem",
          maxWidth: "300px",
          fontSize: "0.95rem",
          lineHeight: "1.5",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
          zIndex: 2,
        }}>
        <div
          style={{
            content: "''",
            position: "absolute",
            top: "-12px",
            left: "30%",
            transform: "translateX(-50%)",
            width: "0",
            height: "0",
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "12px solid #1f1f1f", // arah panah ke atas
          }}></div>

        <p style={{ marginBottom: "0.8rem", fontStyle: "italic" }}>
          "Aku suka banget fitur rekomendasinya. Mamood kasih saran yang sesuai
          banget sama kondisi emosiku, kayak lagi ngobrol sama psikolog versi
          ringan tapi tetap meaningful."
        </p>

        <div style={{ textAlign: "right" }}>
          <strong
            style={{
              fontSize: "0.85rem",
              color: "#b983ff",
            }}>
            ANGEL NATASYA
          </strong>
          <br />
          <span style={{ fontSize: "0.8rem", color: "#ccc" }}>Mahasiswa</span>
        </div>
      </div>

      {/* Avatar 2 */}
      <img
        src="/avatar/avatar2.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "5%",
          left: "14%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 3 */}
      <img
        src="/avatar/avatar3.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "10%",
          left: "84%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 4 */}
      <img
        src="/avatar/avatar4.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "15%",
          left: "65%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 5 */}
      <img
        src="/avatar/avatar5.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "8%",
          left: "40%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 6 */}
      <img
        src="/avatar/avatar6.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 7 */}
      <img
        src="/avatar/avatar7.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "35%",
          left: "7%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Avatar 8 */}
      <img
        src="/avatar/avatar8.png"
        alt="avatar"
        style={{
          position: "absolute",
          top: "58%",
          left: "20%",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          boxShadow: "0 4px 12px rgba(185,131,255,0.3)",
          zIndex: 1,
        }}
      />

      {/* Footer */}
      <img
        src="/wave2.png"
        alt="footer wave"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          zIndex: 0,
        }}
      />
    </section>
  );
}
