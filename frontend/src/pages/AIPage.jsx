import { useState, useEffect, useRef } from "react";
import { API_BASE, HAS_BACKEND } from "../services/apiClient";

/* ── AI CHAT PAGE ────────────────────────────────────────────── */
const AI_SYSTEM = `Kamu adalah FinSight AI, asisten cerdas untuk platform analisis sentimen saham FinSight.`;
const QUICK_CHIPS = [
  "Apa sentimen BBRI?",
  "Jelaskan Bullish",
  "Tips pemula",
  "Bagaimana prospek TLKM?",
];

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Halo! Saya **FinSight AI** 👋\n\nSaya siap bantu kamu memahami pasar saham. Mau tanya apa?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const chatUrl = HAS_BACKEND ? `${API_BASE}/chat` : null;
      if (!chatUrl) throw new Error("Backend tidak tersedia");

      const res = await fetch(chatUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          system: AI_SYSTEM,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Maaf, terjadi kesalahan.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `⚠️ Gagal terhubung ke AI. Pastikan backend berjalan.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatMsg = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 120px)",
      }}
    >
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "linear-gradient(135deg,#10b981,#0891b2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🤖
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#0f172a",
                margin: 0,
              }}
            >
              FinSight AI
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 2,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#10b981",
                  animation: "pulse-dot 1.5s infinite",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>
                {HAS_BACKEND ? "Online · Siap membantu" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fade-up-1"
        style={{
          flex: 1,
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 1px 4px rgba(0,0,0,.07)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #f1f5f9",
        }}
      >
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 12px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 20,
                flexDirection: m.role === "user" ? "row-reverse" : "row",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background:
                    m.role === "assistant"
                      ? "linear-gradient(135deg,#10b981,#0891b2)"
                      : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  marginTop: 2,
                }}
              >
                {m.role === "assistant" ? "🤖" : "👤"}
              </div>
              <div
                style={{
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius:
                    m.role === "user"
                      ? "18px 4px 18px 18px"
                      : "4px 18px 18px 18px",
                  background:
                    m.role === "user"
                      ? "linear-gradient(135deg,#0f172a,#1e3a5f)"
                      : "#f8fafc",
                  color: m.role === "user" ? "#fff" : "#334155",
                  fontSize: 13,
                  lineHeight: 1.7,
                  border: m.role === "assistant" ? "1px solid #f1f5f9" : "none",
                  boxShadow:
                    m.role === "user"
                      ? "0 4px 16px rgba(15,23,41,.2)"
                      : "0 1px 4px rgba(0,0,0,.04)",
                }}
                dangerouslySetInnerHTML={{ __html: formatMsg(m.content) }}
              />
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#10b981,#0891b2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                🤖
              </div>
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: "4px 18px 18px 18px",
                  background: "#f8fafc",
                  border: "1px solid #f1f5f9",
                  display: "flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <span
                  className="dot1"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
                <span
                  className="dot2"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
                <span
                  className="dot3"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#10b981",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        {messages.length <= 1 && (
          <div
            style={{
              padding: "0 24px 14px",
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {QUICK_CHIPS.map((c) => (
              <button
                key={c}
                className="chip"
                onClick={() => sendMessage(c)}
                style={{
                  background: "rgba(16,185,129,.08)",
                  border: "1px solid rgba(16,185,129,.25)",
                  color: "#0f172a",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 20,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        )}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            gap: 10,
            background: "#fff",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Tanya sesuatu..."
            disabled={loading}
            style={{
              flex: 1,
              border: "1.5px solid #e2e8f0",
              borderRadius: 12,
              padding: "11px 16px",
              fontSize: 13,
              outline: "none",
              background: "#f8fafc",
              color: "#0f172a",
              fontFamily: "inherit",
            }}
          />
          <button
            className="ai-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              background: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "11px 20px",
              fontWeight: 700,
              fontSize: 13,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading || !input.trim() ? 0.6 : 1,
            }}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
