// src/data/stocks.js
// Data statis sebagai fallback / mock sebelum backend tersedia

export const STOCKS_DATA = {
  BBRI: {
    name: 'Bank BRI',
    price: 5100,
    change: 2.3,
    up: true,
    sentiment: 'positive',
    sentimentScore: 78,
    sector: 'Perbankan',
    priceHistory: [
      { date: 'Jan', price: 4200 },
      { date: 'Feb', price: 4050 },
      { date: 'Mar', price: 4400 },
      { date: 'Apr', price: 4320 },
      { date: 'Mei', price: 4680 },
      { date: 'Jun', price: 4550 },
      { date: 'Jul', price: 4900 },
      { date: 'Agu', price: 5100 },
    ],
    prediction: 'BUY',
    predictedChange: '+2.4%',
    confidence: 78,
    insight:
      'Sentimen publik meningkat setelah laporan laba kuartal yang melampaui ekspektasi. Volume beli asing meningkat signifikan.',
    reasons: ['Positive Earnings', 'Bullish News', 'High Volume', 'Strong Sentiment'],
  },
  TLKM: {
    name: 'Telkom Indonesia',
    price: 3870,
    change: 0.8,
    up: true,
    sentiment: 'neutral',
    sentimentScore: 55,
    sector: 'Telekomunikasi',
    priceHistory: [
      { date: 'Jan', price: 3600 },
      { date: 'Feb', price: 3550 },
      { date: 'Mar', price: 3700 },
      { date: 'Apr', price: 3680 },
      { date: 'Mei', price: 3750 },
      { date: 'Jun', price: 3800 },
      { date: 'Jul', price: 3820 },
      { date: 'Agu', price: 3870 },
    ],
    prediction: 'HOLD',
    predictedChange: '+0.5%',
    confidence: 62,
    insight:
      'Ekspansi 5G di 12 kota baru memberikan momentum positif jangka menengah. Pasar masih menunggu kepastian tarif regulasi.',
    reasons: ['5G Expansion', 'Stable Revenue', 'Neutral News', 'Moderate Volume'],
  },
  GOTO: {
    name: 'GoTo Group',
    price: 68,
    change: 1.4,
    up: false,
    sentiment: 'negative',
    sentimentScore: 32,
    sector: 'Teknologi',
    priceHistory: [
      { date: 'Jan', price: 82 },
      { date: 'Feb', price: 79 },
      { date: 'Mar', price: 76 },
      { date: 'Apr', price: 74 },
      { date: 'Mei', price: 72 },
      { date: 'Jun', price: 71 },
      { date: 'Jul', price: 70 },
      { date: 'Agu', price: 68 },
    ],
    prediction: 'SELL',
    predictedChange: '-1.8%',
    confidence: 71,
    insight:
      'Tekanan jual asing masih berlanjut. Profitabilitas jangka pendek menjadi pertanyaan besar di kalangan analis.',
    reasons: ['Foreign Selling', 'Negative News', 'Low Profit', 'Weak Sentiment'],
  },
  ASII: {
    name: 'Astra International',
    price: 4450,
    change: 0.5,
    up: true,
    sentiment: 'positive',
    sentimentScore: 61,
    sector: 'Otomotif',
    priceHistory: [
      { date: 'Jan', price: 4100 },
      { date: 'Feb', price: 4200 },
      { date: 'Mar', price: 4150 },
      { date: 'Apr', price: 4300 },
      { date: 'Mei', price: 4250 },
      { date: 'Jun', price: 4400 },
      { date: 'Jul', price: 4380 },
      { date: 'Agu', price: 4450 },
    ],
    prediction: 'BUY',
    predictedChange: '+1.2%',
    confidence: 65,
    insight:
      'Penjualan kendaraan semester ini melampaui proyeksi. Kinerja divisi alat berat solid seiring meningkatnya proyek infrastruktur.',
    reasons: ['Strong Sales', 'Infrastructure Boost', 'Positive Earnings', 'Stable Dividend'],
  },
}

export const SENTIMENT_HISTORY = [
  { day: 'Sen', score: 58 },
  { day: 'Sel', score: 64 },
  { day: 'Rab', score: 52 },
  { day: 'Kam', score: 71 },
  { day: 'Jum', score: 68 },
  { day: 'Sab', score: 75 },
  { day: 'Min', score: 72 },
]

export const NEWS_DATA = [
  { title: 'BBRI catat laba bersih Rp 12,7T, melampaui ekspektasi analis', tag: 'Positive', stock: 'BBRI' },
  { title: 'GOTO masih dalam tekanan jual asing minggu ini', tag: 'Negative', stock: 'GOTO' },
  { title: 'Pasar konsolidasi jelang keputusan suku bunga The Fed', tag: 'Neutral', stock: 'IHSG' },
  { title: 'TLKM ekspansi layanan 5G di 12 kota baru di Sumatra', tag: 'Positive', stock: 'TLKM' },
  { title: 'ASII: penjualan kendaraan semester I tumbuh 8% YoY', tag: 'Positive', stock: 'ASII' },
]

export const KEYWORDS = [
  { word: 'bullish', size: 22, weight: 800, color: '#10b981' },
  { word: 'profit', size: 15, weight: 600, color: '#0891b2' },
  { word: 'growth', size: 20, weight: 800, color: '#7c3aed' },
  { word: 'risk', size: 13, weight: 500, color: '#ef4444' },
  { word: 'buy signal', size: 16, weight: 700, color: '#10b981' },
  { word: 'rebound', size: 19, weight: 800, color: '#0891b2' },
  { word: 'earnings', size: 14, weight: 600, color: '#f59e0b' },
  { word: 'dividen', size: 13, weight: 500, color: '#64748b' },
  { word: 'konsolidasi', size: 12, weight: 500, color: '#94a3b8' },
]

export const TAG_STYLE = {
  Positive: { bg: '#d1fae5', color: '#065f46' },
  Negative: { bg: '#fee2e2', color: '#991b1b' },
  Neutral:  { bg: '#f1f5f9', color: '#475569' },
}

export const PREDICTION_STYLE = {
  BUY:  { bg: '#d1fae5', color: '#065f46', icon: '▲' },
  HOLD: { bg: '#fef9c3', color: '#713f12', icon: '●' },
  SELL: { bg: '#fee2e2', color: '#991b1b', icon: '▼' },
}

export const SENTIMENT_COLOR = {
  positive: '#10b981',
  neutral:  '#f59e0b',
  negative: '#ef4444',
}
