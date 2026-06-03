/* ── DATA MAPPING ────────────────────────────────────────────── */
export const SIG_TO_ID = { BUY: "Naik", HOLD: "Sideways", SELL: "Turun" };
export const SIG_COLOR = { BUY: "#10b981", HOLD: "#f59e0b", SELL: "#ef4444" };
export const SENT_LABEL = {
  positive: "Bullish",
  neutral: "Netral",
  negative: "Bearish",
};
export const TAG_STYLE = {
  Positive: { bg: "#dcfce7", tc: "#15803d", dot: "#22c55e" },
  Negative: { bg: "#fee2e2", tc: "#dc2626", dot: "#ef4444" },
  Neutral: { bg: "#f1f5f9", tc: "#475569", dot: "#94a3b8" },
};
export const TAG_TO_ID = {
  Positive: "Positif",
  Negative: "Negatif",
  Neutral: "Netral",
};

export function mapApiToStocksArray(apiDict) {
  return Object.entries(apiDict).map(([ticker, d]) => ({
    ticker,
    name: d.name,
    price: (d.price || 0).toLocaleString("id-ID"),
    change: `${d.up ? "+" : "-"}${Math.abs(d.change || 0).toFixed(1)}%`,
    up: d.up,
    sentiment: Math.round(d.sentimentScore || 50),
    label: SENT_LABEL[d.sentiment] || "Netral",
    prediction: SIG_TO_ID[d.prediction] || "Sideways",
    predColor: SIG_COLOR[d.prediction] || "#f59e0b",
    sector: d.sector || "",
  }));
}

export function mapApiToPriceData(apiDict) {
  const result = {};
  Object.entries(apiDict).forEach(([ticker, d]) => {
    result[ticker] = (d.priceHistory || []).map((p) => ({
      date: p.date,
      price: p.price,
    }));
  });
  return result;
}

export function mapApiToNewsDict(apiList, tickers) {
  const dict = {};
  tickers.forEach((t) => {
    dict[t] = [];
  });
  (apiList || []).forEach((n) => {
    const t = (n.stock || n.ticker || "").toUpperCase();
    if (!dict[t]) return;
    const apiTag = n.tag || n.sentiment || "Neutral";
    const normalizedApiTag =
      apiTag === "Positif" ? "Positive" : apiTag === "Negatif" ? "Negative" : apiTag === "Netral" ? "Neutral" : apiTag;
    const s = TAG_STYLE[normalizedApiTag] || TAG_STYLE.Neutral;
    const content = n.content || n.summary || n.full_text || n.fullText || n.text || n.title || "";
    dict[t].push({
      title: n.title || content,
      content,
      tag: TAG_TO_ID[normalizedApiTag] || apiTag,
      source: n.source || "Backend FinSight",
      url: n.url || n.tweet_url || "",
      publishedAt: n.published_at || n.publishedAt || n.date || "",
      ...s,
    });
  });
  return dict;
}
