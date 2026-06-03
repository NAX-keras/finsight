// src/data/stocks.js
// Data statis dari dataset upload: harga saham 2 tahun + sentimen tweet top 15.

export const STOCKS_DATA = {
  "BBCA": {
    "name": "Bank Central Asia Tbk.",
    "price": 5975,
    "change": 0.4,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 48,
    "sector": "Perbankan",
    "marketCapMillionIdr": 787172832,
    "marketCapShare": 6.34,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 8114
      },
      {
        "date": "Nov",
        "price": 7876
      },
      {
        "date": "Des",
        "price": 7736
      },
      {
        "date": "Jan",
        "price": 7090
      },
      {
        "date": "Feb",
        "price": 6874
      },
      {
        "date": "Mar",
        "price": 6450
      },
      {
        "date": "Apr",
        "price": 5850
      },
      {
        "date": "Mei",
        "price": 5975
      }
    ],
    "prediction": "HOLD",
    "predictedChange": "+0.4%",
    "confidence": 63,
    "insight": "Data BBCA menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 509 tweet. Harga terakhir Rp 5.975 dengan perubahan harian +0.4%.",
    "reasons": [
      "RSI 38.5",
      "Return harian +0.4%",
      "Sentimen Netral",
      "Volume 194.874.600"
    ]
  },
  "BREN": {
    "name": "Barito Renewables Energy Tbk.",
    "price": 2790,
    "change": 7.6,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 44,
    "sector": "Energi Terbarukan",
    "marketCapMillionIdr": 702377655,
    "marketCapShare": 5.65,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 8675
      },
      {
        "date": "Nov",
        "price": 9575
      },
      {
        "date": "Des",
        "price": 9700
      },
      {
        "date": "Jan",
        "price": 8525
      },
      {
        "date": "Feb",
        "price": 8225
      },
      {
        "date": "Mar",
        "price": 5250
      },
      {
        "date": "Apr",
        "price": 4460
      },
      {
        "date": "Mei",
        "price": 2790
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-3.8%",
    "confidence": 90,
    "insight": "Data BREN menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 256 tweet. Harga terakhir Rp 2.790 dengan perubahan harian -7.6%.",
    "reasons": [
      "RSI 20.7",
      "Return harian -7.6%",
      "Sentimen Netral",
      "Volume 62.098.900"
    ]
  },
  "DSSA": {
    "name": "Dian Swastatika Sentosa Tbk.",
    "price": 710,
    "change": 5.3,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 48,
    "sector": "Energi",
    "marketCapMillionIdr": 508564531,
    "marketCapShare": 4.09,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 3383
      },
      {
        "date": "Nov",
        "price": 4398
      },
      {
        "date": "Des",
        "price": 4040
      },
      {
        "date": "Jan",
        "price": 3960
      },
      {
        "date": "Feb",
        "price": 3157
      },
      {
        "date": "Mar",
        "price": 2640
      },
      {
        "date": "Apr",
        "price": 1615
      },
      {
        "date": "Mei",
        "price": 710
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-2.7%",
    "confidence": 87,
    "insight": "Data DSSA menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 167 tweet. Harga terakhir Rp 710 dengan perubahan harian -5.3%.",
    "reasons": [
      "RSI 14.8",
      "Return harian -5.3%",
      "Sentimen Netral",
      "Volume 459.574.800"
    ]
  },
  "DCII": {
    "name": "DCI Indonesia Tbk.",
    "price": 190000,
    "change": 3.8,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 48,
    "sector": "Teknologi",
    "marketCapMillionIdr": 499931109,
    "marketCapShare": 4.02,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 260150
      },
      {
        "date": "Nov",
        "price": 236500
      },
      {
        "date": "Des",
        "price": 200000
      },
      {
        "date": "Jan",
        "price": 200000
      },
      {
        "date": "Feb",
        "price": 215775
      },
      {
        "date": "Mar",
        "price": 209725
      },
      {
        "date": "Apr",
        "price": 198250
      },
      {
        "date": "Mei",
        "price": 190000
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-1.9%",
    "confidence": 76,
    "insight": "Data DCII menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 54 tweet. Harga terakhir Rp 190.000 dengan perubahan harian -3.8%.",
    "reasons": [
      "RSI 28.6",
      "Return harian -3.8%",
      "Sentimen Netral",
      "Volume 2.400"
    ]
  },
  "BBRI": {
    "name": "Bank Rakyat Indonesia (Persero) Tbk.",
    "price": 3040,
    "change": 0.0,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 56,
    "sector": "Perbankan",
    "marketCapMillionIdr": 499644561,
    "marketCapShare": 4.02,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 3603
      },
      {
        "date": "Nov",
        "price": 3331
      },
      {
        "date": "Des",
        "price": 3438
      },
      {
        "date": "Jan",
        "price": 3579
      },
      {
        "date": "Feb",
        "price": 3672
      },
      {
        "date": "Mar",
        "price": 3128
      },
      {
        "date": "Apr",
        "price": 2990
      },
      {
        "date": "Mei",
        "price": 3040
      }
    ],
    "prediction": "HOLD",
    "predictedChange": "+0.0%",
    "confidence": 63,
    "insight": "Data BBRI menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 379 tweet. Harga terakhir Rp 3.040 dengan perubahan harian +0.0%.",
    "reasons": [
      "RSI 40.1",
      "Return harian +0.0%",
      "Sentimen Netral",
      "Volume 273.484.000"
    ]
  },
  "BMRI": {
    "name": "Bank Mandiri (Persero) Tbk.",
    "price": 4230,
    "change": 2.4,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 49,
    "sector": "Perbankan",
    "marketCapMillionIdr": 436128000,
    "marketCapShare": 3.51,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 4250
      },
      {
        "date": "Nov",
        "price": 4349
      },
      {
        "date": "Des",
        "price": 4592
      },
      {
        "date": "Jan",
        "price": 4428
      },
      {
        "date": "Feb",
        "price": 4846
      },
      {
        "date": "Mar",
        "price": 4336
      },
      {
        "date": "Apr",
        "price": 4033
      },
      {
        "date": "Mei",
        "price": 4230
      }
    ],
    "prediction": "BUY",
    "predictedChange": "+1.5%",
    "confidence": 61,
    "insight": "Data BMRI menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 66 tweet. Harga terakhir Rp 4.230 dengan perubahan harian +2.4%.",
    "reasons": [
      "RSI 51.2",
      "Return harian +2.4%",
      "Sentimen Netral",
      "Volume 308.309.400"
    ]
  },
  "TPIA": {
    "name": "Chandra Asri Pacific Tbk.",
    "price": 2660,
    "change": 14.7,
    "up": false,
    "sentiment": "positive",
    "sentimentScore": 60,
    "sector": "Petrokimia",
    "marketCapMillionIdr": 410929839,
    "marketCapShare": 3.31,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 6946
      },
      {
        "date": "Nov",
        "price": 7400
      },
      {
        "date": "Des",
        "price": 7000
      },
      {
        "date": "Jan",
        "price": 6450
      },
      {
        "date": "Feb",
        "price": 6700
      },
      {
        "date": "Mar",
        "price": 4750
      },
      {
        "date": "Apr",
        "price": 5300
      },
      {
        "date": "Mei",
        "price": 2660
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-7.4%",
    "confidence": 90,
    "insight": "Data TPIA menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 31 tweet. Harga terakhir Rp 2.660 dengan perubahan harian -14.7%.",
    "reasons": [
      "RSI 23.1",
      "Return harian -14.7%",
      "Sentimen Bullish",
      "Volume 217.308.100"
    ]
  },
  "BYAN": {
    "name": "Bayan Resources Tbk.",
    "price": 11200,
    "change": 2.2,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 51,
    "sector": "Energi",
    "marketCapMillionIdr": 384166686,
    "marketCapShare": 3.09,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 18150
      },
      {
        "date": "Nov",
        "price": 17625
      },
      {
        "date": "Des",
        "price": 15700
      },
      {
        "date": "Jan",
        "price": 15750
      },
      {
        "date": "Feb",
        "price": 14000
      },
      {
        "date": "Mar",
        "price": 11525
      },
      {
        "date": "Apr",
        "price": 11400
      },
      {
        "date": "Mei",
        "price": 11200
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-1.1%",
    "confidence": 64,
    "insight": "Data BYAN menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 78 tweet. Harga terakhir Rp 11.200 dengan perubahan harian -2.2%.",
    "reasons": [
      "RSI 43.1",
      "Return harian -2.2%",
      "Sentimen Netral",
      "Volume 18.900"
    ]
  },
  "AMMN": {
    "name": "Amman Mineral Internasional Tbk.",
    "price": 2970,
    "change": 6.3,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 51,
    "sector": "Pertambangan",
    "marketCapMillionIdr": 356789631,
    "marketCapShare": 2.87,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 7100
      },
      {
        "date": "Nov",
        "price": 6600
      },
      {
        "date": "Des",
        "price": 6425
      },
      {
        "date": "Jan",
        "price": 7600
      },
      {
        "date": "Feb",
        "price": 7650
      },
      {
        "date": "Mar",
        "price": 4920
      },
      {
        "date": "Apr",
        "price": 5100
      },
      {
        "date": "Mei",
        "price": 2970
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-3.2%",
    "confidence": 86,
    "insight": "Data AMMN menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 51 tweet. Harga terakhir Rp 2.970 dengan perubahan harian -6.3%.",
    "reasons": [
      "RSI 20.0",
      "Return harian -6.3%",
      "Sentimen Netral",
      "Volume 135.628.400"
    ]
  },
  "TLKM": {
    "name": "Telkom Indonesia (Persero) Tbk.",
    "price": 3100,
    "change": 0.6,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 50,
    "sector": "Telekomunikasi",
    "marketCapMillionIdr": 303130383,
    "marketCapShare": 2.44,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 3210
      },
      {
        "date": "Nov",
        "price": 3510
      },
      {
        "date": "Des",
        "price": 3480
      },
      {
        "date": "Jan",
        "price": 3600
      },
      {
        "date": "Feb",
        "price": 3540
      },
      {
        "date": "Mar",
        "price": 3060
      },
      {
        "date": "Apr",
        "price": 2810
      },
      {
        "date": "Mei",
        "price": 3100
      }
    ],
    "prediction": "BUY",
    "predictedChange": "+0.4%",
    "confidence": 63,
    "insight": "Data TLKM menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 81 tweet. Harga terakhir Rp 3.100 dengan perubahan harian +0.6%.",
    "reasons": [
      "RSI 60.4",
      "Return harian +0.6%",
      "Sentimen Netral",
      "Volume 191.184.300"
    ]
  },
  "ASII": {
    "name": "Astra International Tbk.",
    "price": 5975,
    "change": 0.4,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 49,
    "sector": "Konglomerasi",
    "marketCapMillionIdr": 253022207,
    "marketCapShare": 2.04,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 5854
      },
      {
        "date": "Nov",
        "price": 6235
      },
      {
        "date": "Des",
        "price": 6378
      },
      {
        "date": "Jan",
        "price": 6045
      },
      {
        "date": "Feb",
        "price": 6354
      },
      {
        "date": "Mar",
        "price": 5950
      },
      {
        "date": "Apr",
        "price": 5688
      },
      {
        "date": "Mei",
        "price": 5975
      }
    ],
    "prediction": "BUY",
    "predictedChange": "+0.4%",
    "confidence": 58,
    "insight": "Data ASII menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 127 tweet. Harga terakhir Rp 5.975 dengan perubahan harian +0.4%.",
    "reasons": [
      "RSI 53.2",
      "Return harian +0.4%",
      "Sentimen Netral",
      "Volume 36.879.900"
    ]
  },
  "SRAJ": {
    "name": "Sejahteraraya Anugrahjaya Tbk.",
    "price": 14150,
    "change": 2.2,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 45,
    "sector": "Kesehatan",
    "marketCapMillionIdr": 183890374,
    "marketCapShare": 1.48,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 11750
      },
      {
        "date": "Nov",
        "price": 16750
      },
      {
        "date": "Des",
        "price": 16500
      },
      {
        "date": "Jan",
        "price": 16050
      },
      {
        "date": "Feb",
        "price": 16000
      },
      {
        "date": "Mar",
        "price": 15025
      },
      {
        "date": "Apr",
        "price": 15050
      },
      {
        "date": "Mei",
        "price": 14150
      }
    ],
    "prediction": "BUY",
    "predictedChange": "+1.3%",
    "confidence": 61,
    "insight": "Data SRAJ menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 89 tweet. Harga terakhir Rp 14.150 dengan perubahan harian +2.2%.",
    "reasons": [
      "RSI 49.4",
      "Return harian +2.2%",
      "Sentimen Netral",
      "Volume 1.800"
    ]
  },
  "BBNI": {
    "name": "Bank Negara Indonesia (Persero) Tbk.",
    "price": 3800,
    "change": 0.3,
    "up": false,
    "sentiment": "negative",
    "sentimentScore": 38,
    "sector": "Perbankan",
    "marketCapMillionIdr": 138835518,
    "marketCapShare": 1.12,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 4031
      },
      {
        "date": "Nov",
        "price": 3921
      },
      {
        "date": "Des",
        "price": 4022
      },
      {
        "date": "Jan",
        "price": 4133
      },
      {
        "date": "Feb",
        "price": 4050
      },
      {
        "date": "Mar",
        "price": 3760
      },
      {
        "date": "Apr",
        "price": 3720
      },
      {
        "date": "Mei",
        "price": 3800
      }
    ],
    "prediction": "HOLD",
    "predictedChange": "-0.3%",
    "confidence": 61,
    "insight": "Data BBNI menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 162 tweet. Harga terakhir Rp 3.800 dengan perubahan harian -0.3%.",
    "reasons": [
      "RSI 48.0",
      "Return harian -0.3%",
      "Sentimen Bearish",
      "Volume 54.482.400"
    ]
  },
  "PANI": {
    "name": "Pantai Indah Kapuk Dua Tbk.",
    "price": 7550,
    "change": 2.6,
    "up": false,
    "sentiment": "neutral",
    "sentimentScore": 49,
    "sector": "Properti",
    "marketCapMillionIdr": 136330618,
    "marketCapShare": 1.1,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 14050
      },
      {
        "date": "Nov",
        "price": 14025
      },
      {
        "date": "Des",
        "price": 12600
      },
      {
        "date": "Jan",
        "price": 9300
      },
      {
        "date": "Feb",
        "price": 9525
      },
      {
        "date": "Mar",
        "price": 7525
      },
      {
        "date": "Apr",
        "price": 8450
      },
      {
        "date": "Mei",
        "price": 7550
      }
    ],
    "prediction": "SELL",
    "predictedChange": "-1.3%",
    "confidence": 70,
    "insight": "Data PANI menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 129 tweet. Harga terakhir Rp 7.550 dengan perubahan harian -2.6%.",
    "reasons": [
      "RSI 34.1",
      "Return harian -2.6%",
      "Sentimen Netral",
      "Volume 4.494.500"
    ]
  },
  "DNET": {
    "name": "Indoritel Makmur Internasional Tbk.",
    "price": 9475,
    "change": 0.0,
    "up": true,
    "sentiment": "neutral",
    "sentimentScore": 46,
    "sector": "Investasi",
    "marketCapMillionIdr": 130492800,
    "marketCapShare": 1.05,
    "priceHistory": [
      {
        "date": "Okt",
        "price": 9100
      },
      {
        "date": "Nov",
        "price": 9250
      },
      {
        "date": "Des",
        "price": 9075
      },
      {
        "date": "Jan",
        "price": 8975
      },
      {
        "date": "Feb",
        "price": 8975
      },
      {
        "date": "Mar",
        "price": 9200
      },
      {
        "date": "Apr",
        "price": 9475
      },
      {
        "date": "Mei",
        "price": 9475
      }
    ],
    "prediction": "HOLD",
    "predictedChange": "+0.0%",
    "confidence": 64,
    "insight": "Data DNET menggunakan dataset harga 2 tahun sampai 20 May 2026 dan ringkasan sentimen 33 tweet. Harga terakhir Rp 9.475 dengan perubahan harian +0.0%.",
    "reasons": [
      "RSI 62.1",
      "Return harian +0.0%",
      "Sentimen Netral",
      "Volume 5.100"
    ]
  }
};

export const SENTIMENT_HISTORY = [
  {
    "day": "Sen",
    "score": 49
  },
  {
    "day": "Sel",
    "score": 48
  },
  {
    "day": "Rab",
    "score": 55
  },
  {
    "day": "Kam",
    "score": 49
  },
  {
    "day": "Jum",
    "score": 46
  },
  {
    "day": "Sab",
    "score": 45
  },
  {
    "day": "Min",
    "score": 48
  }
];

export const NEWS_DATA = [
  {
    "title": "buat yang belum tahu saham bbca selama ini jadi cerminan kepercayaan investor asing terhadap kondisi ekonomi dan...",
    "tag": "Negative",
    "stock": "BBCA"
  },
  {
    "title": "orang yang nabung saham bbca sejak 2021 sampe sekarang blm dapet profit sama sekali kecuali cuma dari dividen be...",
    "tag": "Neutral",
    "stock": "BBCA"
  },
  {
    "title": "timoty pernah spill kepemilikan saham bbca waktu itu harganya masih harga 8325 doi punya 112 076 lot anggap harg...",
    "tag": "Neutral",
    "stock": "BBCA"
  },
  {
    "title": "harga wajar barito renewables bren kalo pake standar pe 12x itu cuma rp200 dan klo kalian pikir bren gak bisa tu...",
    "tag": "Negative",
    "stock": "BREN"
  },
  {
    "title": "gw mau share analisis amp prediksi gw soal apa yang bakal terjadi ke ihsg amp 18 saham msci indonesia pasca pass...",
    "tag": "Neutral",
    "stock": "BREN"
  },
  {
    "title": "sejauh ini saham terkonsentrasi tinggi rock 99 85 sots 98 35 agii 97 75 bren 97 31 mglv 95 94 dssa 95 76 rlco 95 35",
    "tag": "Neutral",
    "stock": "BREN"
  },
  {
    "title": "setelah free float dibenerin juga dibenerin sih cara ngitung indexnya market ijo digendong dssa trus kita tau ga...",
    "tag": "Positive",
    "stock": "DSSA"
  },
  {
    "title": "daftar saham ftse di indonesia large cap pt dian swastatika sentosa tbk dssa small cap pt adaro andalan indonesi...",
    "tag": "Neutral",
    "stock": "DSSA"
  },
  {
    "title": "berapa estimasi bobot dssa dan bren dssa 13 x 1720 x 192 638 080 000 rp 43 07 t usd 2 49 miliar bobot 2 49 10 20...",
    "tag": "Neutral",
    "stock": "DSSA"
  },
  {
    "title": "⠀⠀⠀⣿⣦⡀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀⠀⣿⡿⠻⢶⣤⣶⣾⣿⠁⠀⠀⣆⡀⢀⣴⠀⠀ ⠀⠀⣀⣽⠉⠀⠀⠀⣠⣿⠃⠀⠀⢀⣿⣿⣿⣿⡀⠀ ⠴⣾⣿⣀⣀⠀⠀⠈⠉⢻⣦⡀⠚⠻⠿⣿⣿⠟⠛⠂ ⠀⠀⠀⠉⢻⣇⠀⣾⣿⣿⣿⣿⣦⡀⠀⣿⠁⠀⠀⠀ ⠀⠀⠀⠀⠸⣿⣷...",
    "tag": "Neutral",
    "stock": "DCII"
  },
  {
    "title": "dia mungkin akan seperti ini kalo liat dcii",
    "tag": "Neutral",
    "stock": "DCII"
  },
  {
    "title": "🌌 * . 🌠 ✨ * 🪐 . ☄️ * . 🚀 🌕 *⭐️ . 🌟 * 🛰️ . ✨• 🌌 . 🌠 * . 🌍 * 🌟 🚀 . * ⭐️ 🌟 🛰️ . 🌑 * ✨ 🌌 * .🌠 * . ☄️ * 🚀",
    "tag": "Neutral",
    "stock": "DCII"
  },
  {
    "title": "welcome bbca kelapa 5xxx soon bbri kepala 2xxx buat yang belum tahu harga saham bbca 30 april 2021 6 425 30 apri...",
    "tag": "Negative",
    "stock": "BBRI"
  },
  {
    "title": "guys bennix berpendapat market lagi masuk fase seru bukan kiamat tapi banyak orang salah nangkep menurut benix t...",
    "tag": "Neutral",
    "stock": "BBRI"
  },
  {
    "title": "saham bank terbesar di indonesia lagi hujan duit bank rakyat indonesia bbri bagi bagi dividen gila besar tapi ya...",
    "tag": "Neutral",
    "stock": "BBRI"
  },
  {
    "title": "bmri resmi berikan dividen rp377 lembar saham",
    "tag": "Neutral",
    "stock": "BMRI"
  },
  {
    "title": "bmri walau turun masih belum terendah 5 tahun ini yg terkuat dari trio bank gede yg dijualin asing",
    "tag": "Negative",
    "stock": "BMRI"
  },
  {
    "title": "bmri gw mines 10 terus gw tanya ai mending average down hold atau jual dan ini jawabannya aman ga gaes shm",
    "tag": "Negative",
    "stock": "BMRI"
  },
  {
    "title": "dari 10 top constituents dssa bren ammn tpia kena saham terkonsentrasi tinggi high shareholding concentration ba...",
    "tag": "Neutral",
    "stock": "TPIA"
  },
  {
    "title": "yang ketinggalan tpia bisa pantau saham ini masih murah dan blm gc tapi kalau di grup saya udh pada nyolong star...",
    "tag": "Positive",
    "stock": "TPIA"
  },
  {
    "title": "market dalam kondisi apapun tetap saya cuma pakai 1 indikator yaitu stoch gc oversold kebetulan dari semua saham...",
    "tag": "Positive",
    "stock": "TPIA"
  },
  {
    "title": "tahun ajaran baru sman berandal 2026",
    "tag": "Neutral",
    "stock": "BYAN"
  },
  {
    "title": "😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭",
    "tag": "Neutral",
    "stock": "BYAN"
  },
  {
    "title": "🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️🌧️...",
    "tag": "Neutral",
    "stock": "BYAN"
  },
  {
    "title": "🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺 🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺 🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺 🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺 🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥️🥺♥...",
    "tag": "Neutral",
    "stock": "AMMN"
  },
  {
    "title": "😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭",
    "tag": "Neutral",
    "stock": "AMMN"
  },
  {
    "title": "앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙...",
    "tag": "Neutral",
    "stock": "AMMN"
  },
  {
    "title": "evaluasi indeks lq45 idx30 idx80 bisnis 27 mnc36 sminfra18 idxesgl periode efektif 04 mei 2026 31 juli 2026 inde...",
    "tag": "Positive",
    "stock": "TLKM"
  },
  {
    "title": "lompat jangan lompat jangan lompat jangan lompat jangan lompat jangan lompat jangan lompat jangan lompat jangan...",
    "tag": "Neutral",
    "stock": "TLKM"
  },
  {
    "title": "jika dilihat dari etf terhadap total lembar secara rata rata etf membeli 1 14 dari total lembar beredar jika mel...",
    "tag": "Positive",
    "stock": "TLKM"
  },
  {
    "title": "hari ini kamis 30 april 2026 adalah hari terakhir perdagangan saham di minggu ini besok hari jumat 1 mei mei bur...",
    "tag": "Neutral",
    "stock": "ASII"
  },
  {
    "title": "pt bursa efek indonesia bei melaporkan kinerja indeks harga saham gabungan ihsg pada periode 27 30 april 2026 di...",
    "tag": "Negative",
    "stock": "ASII"
  },
  {
    "title": "pt bursa efek indonesia melaporkan kinerja indeks harga saham gabungan ihsg selama periode 20 24 april 2026 mele...",
    "tag": "Negative",
    "stock": "ASII"
  },
  {
    "title": "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
    "tag": "Neutral",
    "stock": "SRAJ"
  },
  {
    "title": "happy birthday my ajith sir have a great year sir sjs",
    "tag": "Neutral",
    "stock": "SRAJ"
  },
  {
    "title": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍوَّعَلَى آلِ مُحَمَّدٍكَمَاصَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ...",
    "tag": "Neutral",
    "stock": "SRAJ"
  },
  {
    "title": "guys update terbaru nih bank negara indonesia bbni buka suara perihal kasus dugaan penggelapan dana jemaat gerej...",
    "tag": "Neutral",
    "stock": "BBNI"
  },
  {
    "title": "andry hakim ada saham bbni jumlah saham 12 000 000 lembar harga rp 3 630 modal 12 000 000 3 630 rp 43 560 000 00...",
    "tag": "Positive",
    "stock": "BBNI"
  },
  {
    "title": "membayangkan umat katolik dan yayasan2 dari sekolah rumah sakit hingga kelompok2 menarik semua tabungan rush dan...",
    "tag": "Positive",
    "stock": "BBNI"
  },
  {
    "title": "dulu gajian skg gajian",
    "tag": "Neutral",
    "stock": "PANI"
  },
  {
    "title": "guys andry hakim orang yang pernah pegang pani dari puluhan miliar jadi ratusan miliar hampir 2 000 return baru...",
    "tag": "Negative",
    "stock": "PANI"
  },
  {
    "title": "guys andry hakim baru bahas dua saham yang lagi banyak dibicarakan di komunitas investor cbdk dan pani dan penje...",
    "tag": "Positive",
    "stock": "PANI"
  },
  {
    "title": "pembersihan tl 2",
    "tag": "Neutral",
    "stock": "DNET"
  },
  {
    "title": "pembersihan tl 3",
    "tag": "Neutral",
    "stock": "DNET"
  },
  {
    "title": "ㅤㅤㅤ 𝐑𝐚𝐛𝐮, 𝟐𝟗 𝐀𝐩𝐫𝐢𝐥 𝟐𝟎𝟐𝟔 𝟎𝟕:𝟎𝟎 - 𝟐𝟏:𝟎𝟎 𝐖𝐈𝐁. ㅤ",
    "tag": "Neutral",
    "stock": "DNET"
  }
];
