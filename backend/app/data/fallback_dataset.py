"""
app/data/fallback_dataset.py
Static fallback dataset generated from uploaded Data Saham 2y + FinSight Sentimen Saham.
This dataset is used when yfinance, Gemini, or DB seed sources are unavailable.
"""
from __future__ import annotations

TOP15_TICKERS = ['BBCA', 'BREN', 'DSSA', 'DCII', 'BBRI', 'BMRI', 'TPIA', 'BYAN', 'AMMN', 'TLKM', 'ASII', 'SRAJ', 'BBNI', 'PANI', 'DNET']
STOCK_DATA = {'BBCA': {'ticker': 'BBCA', 'company_name': 'Bank Central Asia Tbk.', 'sector': 'Perbankan', 'current_price': 5975.0, 'change_percent': 0.42, 'is_up': True, 'sentiment_label': 'neutral', 'sentiment_score': 58.5, 'prediction_signal': 'HOLD', 'predicted_change': '+0.4%', 'confidence': 61.8, 'insight': 'Data BBCA memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 5.975 dengan perubahan harian +0.42% dan sentimen neutral.', 'reasons': ['RSI 38.5', 'Return harian +0.42%', 'Sentimen neutral', 'Volume 194.874.600'], 'price_history': [{'date': 'Okt', 'price': 8113.82}, {'date': 'Nov', 'price': 7875.88}, {'date': 'Des', 'price': 7736.33}, {'date': 'Jan', 'price': 7089.64}, {'date': 'Feb', 'price': 6874.08}, {'date': 'Mar', 'price': 6450.0}, {'date': 'Apr', 'price': 5850.0}, {'date': 'Mei', 'price': 5975.0}]}, 'BREN': {'ticker': 'BREN', 'company_name': 'Barito Renewables Energy Tbk.', 'sector': 'Energi Terbarukan', 'current_price': 2790.0, 'change_percent': -7.62, 'is_up': False, 'sentiment_label': 'neutral', 'sentiment_score': 50.4, 'prediction_signal': 'SELL', 'predicted_change': '-3.8%', 'confidence': 70.5, 'insight': 'Data BREN memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 2.790 dengan perubahan harian -7.62% dan sentimen neutral.', 'reasons': ['RSI 20.7', 'Return harian -7.62%', 'Sentimen neutral', 'Volume 62.098.900'], 'price_history': [{'date': 'Okt', 'price': 8675.0}, {'date': 'Nov', 'price': 9575.0}, {'date': 'Des', 'price': 9700.0}, {'date': 'Jan', 'price': 8525.0}, {'date': 'Feb', 'price': 8225.0}, {'date': 'Mar', 'price': 5250.0}, {'date': 'Apr', 'price': 4460.0}, {'date': 'Mei', 'price': 2790.0}]}, 'DSSA': {'ticker': 'DSSA', 'company_name': 'Dian Swastatika Sentosa Tbk.', 'sector': 'Energi', 'current_price': 710.0, 'change_percent': -5.33, 'is_up': False, 'sentiment_label': 'neutral', 'sentiment_score': 57.8, 'prediction_signal': 'SELL', 'predicted_change': '-2.7%', 'confidence': 71.1, 'insight': 'Data DSSA memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 710 dengan perubahan harian -5.33% dan sentimen neutral.', 'reasons': ['RSI 14.8', 'Return harian -5.33%', 'Sentimen neutral', 'Volume 459.574.800'], 'price_history': [{'date': 'Okt', 'price': 3383.0}, {'date': 'Nov', 'price': 4398.0}, {'date': 'Des', 'price': 4040.0}, {'date': 'Jan', 'price': 3960.0}, {'date': 'Feb', 'price': 3157.0}, {'date': 'Mar', 'price': 2640.0}, {'date': 'Apr', 'price': 1615.0}, {'date': 'Mei', 'price': 710.0}]}, 'DCII': {'ticker': 'DCII', 'company_name': 'DCI Indonesia Tbk.', 'sector': 'Teknologi', 'current_price': 190000.0, 'change_percent': -3.8, 'is_up': False, 'sentiment_label': 'neutral', 'sentiment_score': 55.6, 'prediction_signal': 'SELL', 'predicted_change': '-1.9%', 'confidence': 66.5, 'insight': 'Data DCII memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 190.000 dengan perubahan harian -3.80% dan sentimen neutral.', 'reasons': ['RSI 28.6', 'Return harian -3.80%', 'Sentimen neutral', 'Volume 2.400'], 'price_history': [{'date': 'Okt', 'price': 260150.0}, {'date': 'Nov', 'price': 236500.0}, {'date': 'Des', 'price': 200000.0}, {'date': 'Jan', 'price': 200000.0}, {'date': 'Feb', 'price': 215775.0}, {'date': 'Mar', 'price': 209725.0}, {'date': 'Apr', 'price': 198250.0}, {'date': 'Mei', 'price': 190000.0}]}, 'BBRI': {'ticker': 'BBRI', 'company_name': 'Bank Rakyat Indonesia (Persero) Tbk.', 'sector': 'Perbankan', 'current_price': 3040.0, 'change_percent': 0.0, 'is_up': True, 'sentiment_label': 'positive', 'sentiment_score': 72.2, 'prediction_signal': 'HOLD', 'predicted_change': '+0.0%', 'confidence': 70.5, 'insight': 'Data BBRI memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 3.040 dengan perubahan harian +0.00% dan sentimen positive.', 'reasons': ['RSI 40.1', 'Return harian +0.00%', 'Sentimen positive', 'Volume 273.484.000'], 'price_history': [{'date': 'Okt', 'price': 3602.71}, {'date': 'Nov', 'price': 3331.15}, {'date': 'Des', 'price': 3437.63}, {'date': 'Jan', 'price': 3578.52}, {'date': 'Feb', 'price': 3672.44}, {'date': 'Mar', 'price': 3127.68}, {'date': 'Apr', 'price': 2990.0}, {'date': 'Mei', 'price': 3040.0}]}, 'BMRI': {'ticker': 'BMRI', 'company_name': 'Bank Mandiri (Persero) Tbk.', 'sector': 'Perbankan', 'current_price': 4230.0, 'change_percent': 2.42, 'is_up': True, 'sentiment_label': 'neutral', 'sentiment_score': 59.1, 'prediction_signal': 'BUY', 'predicted_change': '+1.2%', 'confidence': 66.2, 'insight': 'Data BMRI memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 4.230 dengan perubahan harian +2.42% dan sentimen neutral.', 'reasons': ['RSI 51.2', 'Return harian +2.42%', 'Sentimen neutral', 'Volume 308.309.400'], 'price_history': [{'date': 'Okt', 'price': 4249.86}, {'date': 'Nov', 'price': 4348.9}, {'date': 'Des', 'price': 4592.01}, {'date': 'Jan', 'price': 4427.57}, {'date': 'Feb', 'price': 4845.53}, {'date': 'Mar', 'price': 4335.72}, {'date': 'Apr', 'price': 4032.58}, {'date': 'Mei', 'price': 4230.0}]}, 'TPIA': {'ticker': 'TPIA', 'company_name': 'Chandra Asri Pacific Tbk.', 'sector': 'Petrokimia', 'current_price': 2660.0, 'change_percent': -14.74, 'is_up': False, 'sentiment_label': 'positive', 'sentiment_score': 79.0, 'prediction_signal': 'SELL', 'predicted_change': '-7.4%', 'confidence': 95, 'insight': 'Data TPIA memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 2.660 dengan perubahan harian -14.74% dan sentimen positive.', 'reasons': ['RSI 23.1', 'Return harian -14.74%', 'Sentimen positive', 'Volume 217.308.100'], 'price_history': [{'date': 'Okt', 'price': 6946.2}, {'date': 'Nov', 'price': 7400.0}, {'date': 'Des', 'price': 7000.0}, {'date': 'Jan', 'price': 6450.0}, {'date': 'Feb', 'price': 6700.0}, {'date': 'Mar', 'price': 4750.0}, {'date': 'Apr', 'price': 5300.0}, {'date': 'Mei', 'price': 2660.0}]}, 'BYAN': {'ticker': 'BYAN', 'company_name': 'Bayan Resources Tbk.', 'sector': 'Energi', 'current_price': 11200.0, 'change_percent': -2.2, 'is_up': False, 'sentiment_label': 'positive', 'sentiment_score': 61.5, 'prediction_signal': 'HOLD', 'predicted_change': '-2.2%', 'confidence': 67.5, 'insight': 'Data BYAN memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 11.200 dengan perubahan harian -2.20% dan sentimen positive.', 'reasons': ['RSI 50', 'Return harian -2.20%', 'Sentimen positive', 'Volume 0'], 'price_history': [{'date': 'Okt', 'price': 18150}, {'date': 'Nov', 'price': 17625}, {'date': 'Des', 'price': 15700}, {'date': 'Jan', 'price': 15750}, {'date': 'Feb', 'price': 14000}, {'date': 'Mar', 'price': 11525}, {'date': 'Apr', 'price': 11400}, {'date': 'Mei', 'price': 11200}]}, 'AMMN': {'ticker': 'AMMN', 'company_name': 'Amman Mineral Internasional Tbk.', 'sector': 'Pertambangan', 'current_price': 2970.0, 'change_percent': -6.31, 'is_up': False, 'sentiment_label': 'positive', 'sentiment_score': 61.8, 'prediction_signal': 'SELL', 'predicted_change': '-3.2%', 'confidence': 75.9, 'insight': 'Data AMMN memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 2.970 dengan perubahan harian -6.31% dan sentimen positive.', 'reasons': ['RSI 20.0', 'Return harian -6.31%', 'Sentimen positive', 'Volume 135.628.400'], 'price_history': [{'date': 'Okt', 'price': 7100.0}, {'date': 'Nov', 'price': 6600.0}, {'date': 'Des', 'price': 6425.0}, {'date': 'Jan', 'price': 7600.0}, {'date': 'Feb', 'price': 7650.0}, {'date': 'Mar', 'price': 4920.0}, {'date': 'Apr', 'price': 5100.0}, {'date': 'Mei', 'price': 2970.0}]}, 'TLKM': {'ticker': 'TLKM', 'company_name': 'Telkom Indonesia (Persero) Tbk.', 'sector': 'Telekomunikasi', 'current_price': 3100.0, 'change_percent': 0.65, 'is_up': True, 'sentiment_label': 'positive', 'sentiment_score': 61.1, 'prediction_signal': 'BUY', 'predicted_change': '+0.5%', 'confidence': 64.1, 'insight': 'Data TLKM memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 3.100 dengan perubahan harian +0.65% dan sentimen positive.', 'reasons': ['RSI 60.4', 'Return harian +0.65%', 'Sentimen positive', 'Volume 191.184.300'], 'price_history': [{'date': 'Okt', 'price': 3210.0}, {'date': 'Nov', 'price': 3510.0}, {'date': 'Des', 'price': 3480.0}, {'date': 'Jan', 'price': 3600.0}, {'date': 'Feb', 'price': 3540.0}, {'date': 'Mar', 'price': 3060.0}, {'date': 'Apr', 'price': 2810.0}, {'date': 'Mei', 'price': 3100.0}]}, 'ASII': {'ticker': 'ASII', 'company_name': 'Astra International Tbk.', 'sector': 'Konglomerasi', 'current_price': 5975.0, 'change_percent': 0.42, 'is_up': True, 'sentiment_label': 'neutral', 'sentiment_score': 57.9, 'prediction_signal': 'HOLD', 'predicted_change': '+0.4%', 'confidence': 61.4, 'insight': 'Data ASII memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 5.975 dengan perubahan harian +0.42% dan sentimen neutral.', 'reasons': ['RSI 53.2', 'Return harian +0.42%', 'Sentimen neutral', 'Volume 36.879.900'], 'price_history': [{'date': 'Okt', 'price': 5854.4}, {'date': 'Nov', 'price': 6235.17}, {'date': 'Des', 'price': 6377.96}, {'date': 'Jan', 'price': 6044.78}, {'date': 'Feb', 'price': 6354.16}, {'date': 'Mar', 'price': 5949.59}, {'date': 'Apr', 'price': 5687.81}, {'date': 'Mei', 'price': 5975.0}]}, 'SRAJ': {'ticker': 'SRAJ', 'company_name': 'Sejahteraraya Anugrahjaya Tbk.', 'sector': 'Kesehatan', 'current_price': 14150.0, 'change_percent': 2.17, 'is_up': True, 'sentiment_label': 'neutral', 'sentiment_score': 50.0, 'prediction_signal': 'HOLD', 'predicted_change': '+2.2%', 'confidence': 59.3, 'insight': 'Data SRAJ memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 14.150 dengan perubahan harian +2.17% dan sentimen neutral.', 'reasons': ['RSI 49.4', 'Return harian +2.17%', 'Sentimen neutral', 'Volume 1.800'], 'price_history': [{'date': 'Okt', 'price': 11750.0}, {'date': 'Nov', 'price': 16750.0}, {'date': 'Des', 'price': 16500.0}, {'date': 'Jan', 'price': 16050.0}, {'date': 'Feb', 'price': 16000.0}, {'date': 'Mar', 'price': 15025.0}, {'date': 'Apr', 'price': 15050.0}, {'date': 'Mei', 'price': 14150.0}]}, 'BBNI': {'ticker': 'BBNI', 'company_name': 'Bank Negara Indonesia (Persero) Tbk.', 'sector': 'Perbankan', 'current_price': 3800.0, 'change_percent': -0.26, 'is_up': False, 'sentiment_label': 'neutral', 'sentiment_score': 41.4, 'prediction_signal': 'HOLD', 'predicted_change': '-0.3%', 'confidence': 61.5, 'insight': 'Data BBNI memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 3.800 dengan perubahan harian -0.26% dan sentimen neutral.', 'reasons': ['RSI 48.0', 'Return harian -0.26%', 'Sentimen neutral', 'Volume 54.482.400'], 'price_history': [{'date': 'Okt', 'price': 4031.38}, {'date': 'Nov', 'price': 3920.93}, {'date': 'Des', 'price': 4022.18}, {'date': 'Jan', 'price': 4132.63}, {'date': 'Feb', 'price': 4049.79}, {'date': 'Mar', 'price': 3760.0}, {'date': 'Apr', 'price': 3720.0}, {'date': 'Mei', 'price': 3800.0}]}, 'PANI': {'ticker': 'PANI', 'company_name': 'Pantai Indah Kapuk Dua Tbk.', 'sector': 'Properti', 'current_price': 7550.0, 'change_percent': -2.58, 'is_up': False, 'sentiment_label': 'neutral', 'sentiment_score': 57.0, 'prediction_signal': 'HOLD', 'predicted_change': '-2.6%', 'confidence': 65.1, 'insight': 'Data PANI memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 7.550 dengan perubahan harian -2.58% dan sentimen neutral.', 'reasons': ['RSI 34.1', 'Return harian -2.58%', 'Sentimen neutral', 'Volume 4.494.500'], 'price_history': [{'date': 'Okt', 'price': 14050.0}, {'date': 'Nov', 'price': 14025.0}, {'date': 'Des', 'price': 12600.0}, {'date': 'Jan', 'price': 9300.0}, {'date': 'Feb', 'price': 9525.0}, {'date': 'Mar', 'price': 7525.0}, {'date': 'Apr', 'price': 8450.0}, {'date': 'Mei', 'price': 7550.0}]}, 'DNET': {'ticker': 'DNET', 'company_name': 'Indoritel Makmur Internasional Tbk.', 'sector': 'Investasi', 'current_price': 9475.0, 'change_percent': 0.0, 'is_up': True, 'sentiment_label': 'neutral', 'sentiment_score': 53.0, 'prediction_signal': 'HOLD', 'predicted_change': '+0.0%', 'confidence': 57.1, 'insight': 'Data DNET memakai fallback dataset harga 2 tahun dan ringkasan sentimen tweet. Harga terakhir Rp 9.475 dengan perubahan harian +0.00% dan sentimen neutral.', 'reasons': ['RSI 62.1', 'Return harian +0.00%', 'Sentimen neutral', 'Volume 5.100'], 'price_history': [{'date': 'Okt', 'price': 9100.0}, {'date': 'Nov', 'price': 9250.0}, {'date': 'Des', 'price': 9075.0}, {'date': 'Jan', 'price': 8975.0}, {'date': 'Feb', 'price': 8975.0}, {'date': 'Mar', 'price': 9200.0}, {'date': 'Apr', 'price': 9475.0}, {'date': 'Mei', 'price': 9475.0}]}}
FALLBACK_NEWS = [{'ticker': 'BBCA',
  'title': 'inisialnya BBCA 😂😂😂jebol support dan inverted cup  n handle , see you later , kabur selagi loss '
           'cuma 2% beli dobel bottom kemarin $BBCA\n'
           '\n'
           'fundamental baik tapi asing terus buang ya lemes\n'
           'turut berduka untuk 714ribu sangkuters maaf saya mengundurkan diri dari shareholder sangkut bbca '
           ', saya pake TA dan flow asing soalnya hehe biarin dah fundanya bagus juga tetap sampe jumpa '
           'nanti.',
  'content': 'inisialnya BBCA 😂😂😂jebol support dan inverted cup  n handle , see you later , kabur selagi '
             'loss cuma 2% beli dobel bottom kemarin $BBCA\n'
             '\n'
             'fundamental baik tapi asing terus buang ya lemes\n'
             'turut berduka untuk 714ribu sangkuters maaf saya mengundurkan diri dari shareholder sangkut '
             'bbca , saya pake TA dan flow asing soalnya hehe biarin dah fundanya bagus juga tetap sampe '
             'jumpa nanti.',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/TradingDiary2/status/2047608047389041026',
  'published_at': 'Fri Apr 24 09:26:15 +0000 2026'},
 {'ticker': 'BBCA',
  'title': 'Buat yang belum tahu.....\n'
           'Saham BBCA selama ini jadi cerminan kepercayaan investor asing terhadap kondisi ekonomi dan arah '
           'kebijakan Indonesia.\n'
           '\n'
           'jadi kalo BBCA turun terus \n'
           'biasa ada peristiwa atau ekonomi yang bakal kejadian\n'
           'apakah itu???\n'
           'POKOK NYA ADAAAHHH !!!!',
  'content': 'Buat yang belum tahu.....\n'
             'Saham BBCA selama ini jadi cerminan kepercayaan investor asing terhadap kondisi ekonomi dan '
             'arah kebijakan Indonesia.\n'
             '\n'
             'jadi kalo BBCA turun terus \n'
             'biasa ada peristiwa atau ekonomi yang bakal kejadian\n'
             'apakah itu???\n'
             'POKOK NYA ADAAAHHH !!!!',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2047548619121975368',
  'published_at': 'Fri Apr 24 05:30:07 +0000 2026'},
 {'ticker': 'BBCA',
  'title': 'Orang yang nabung saham BBCA sejak 2021 sampe sekarang blm dapet profit sama-sekali kecuali cuma '
           'dari dividen.\n'
           '\n'
           'Bertahun-tahun, ada mitos kuat di kalangan investor ritel bahwa BBCA adalah saham yang "merem '
           'aja pasti untung" dan investasi jangka panjang paling aman di Indonesia. \n'
           '\n'
           'Kenyataannya? Kampret lah 😅menembus harga Rp5.950 cuk, berarti siapa pun netizen yang memborong '
           'saham BBCA tepat di hari stock split pada bulan Oktober 2021 lalu (di kisaran harga Rp7.300-an) '
           'dan berniat mendiamkannya untuk tabungan masa depan, posisinya saat ini resmi rugi bahasa saham '
           'nya Floating Loss.\n'
           '\n'
           'Fakta ini sukses ngebuat shock karena mematahkan ekspektasi bahwa saham blue chip itu primadona '
           'alias selalu kebal dari kerugian jangka panjang.',
  'content': 'Orang yang nabung saham BBCA sejak 2021 sampe sekarang blm dapet profit sama-sekali kecuali '
             'cuma dari dividen.\n'
             '\n'
             'Bertahun-tahun, ada mitos kuat di kalangan investor ritel bahwa BBCA adalah saham yang "merem '
             'aja pasti untung" dan investasi jangka panjang paling aman di Indonesia. \n'
             '\n'
             'Kenyataannya? Kampret lah 😅menembus harga Rp5.950 cuk, berarti siapa pun netizen yang '
             'memborong saham BBCA tepat di hari stock split pada bulan Oktober 2021 lalu (di kisaran harga '
             'Rp7.300-an) dan berniat mendiamkannya untuk tabungan masa depan, posisinya saat ini resmi rugi '
             'bahasa saham nya Floating Loss.\n'
             '\n'
             'Fakta ini sukses ngebuat shock karena mematahkan ekspektasi bahwa saham blue chip itu '
             'primadona alias selalu kebal dari kerugian jangka panjang.',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Asura0599/status/2048621126700699928',
  'published_at': 'Mon Apr 27 04:31:52 +0000 2026'},
 {'ticker': 'BBCA',
  'title': 'Timoty pernah spill kepemilikan saham BBCA \n'
           'Waktu itu harganya masih harga 8325\n'
           'doi punya 112.076 lot \n'
           '\n'
           'Anggap harga beli disitu \n'
           'Modal beli (harga 8.325)\n'
           '11.207.600 × 8.355 ≈ Rp 93.639.498.000 \n'
           '( Rp 93,64 M)\n'
           '\n'
           'Nilai sekarang (harga 6.050)\n'
           '11.207.600 × 6.050 ≈ Rp 67.805.980.000 \n'
           '(Rp 67,81 M)\n'
           '\n'
           'berarti porto dia lagi rugi \n'
           'sekitar Rp 25,8 Mliarrr',
  'content': 'Timoty pernah spill kepemilikan saham BBCA \n'
             'Waktu itu harganya masih harga 8325\n'
             'doi punya 112.076 lot \n'
             '\n'
             'Anggap harga beli disitu \n'
             'Modal beli (harga 8.325)\n'
             '11.207.600 × 8.355 ≈ Rp 93.639.498.000 \n'
             '( Rp 93,64 M)\n'
             '\n'
             'Nilai sekarang (harga 6.050)\n'
             '11.207.600 × 6.050 ≈ Rp 67.805.980.000 \n'
             '(Rp 67,81 M)\n'
             '\n'
             'berarti porto dia lagi rugi \n'
             'sekitar Rp 25,8 Mliarrr',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2047570312506773684',
  'published_at': 'Fri Apr 24 06:56:19 +0000 2026'},
 {'ticker': 'BREN',
  'title': 'Keluarga om PP mengucapkan terima kasih padamu yang sudah membantu menaikkan free float 🙏\n'
           '\n'
           'Pemegang saham PT Barito Renewables Energy Tbk $BREN yakni Green Era Energy Pte Ltd, tercatat '
           'melepas saham dengan nilai mencapai Rp1,58T\n'
           '\n'
           'Sebanyak 350 juta saham dilepas ke publik pada 6 April 2026 dengan harga Rp4.510 per saham. Di '
           'harga sekarang Rp 5800, yang beli di harga tsb sudah cuan\n'
           '\n'
           'Sebagai informasi Green Era Energy merupakan perusahaan milik putri Prajogo Pangestu, Nancy '
           'Pangestu. Sejak awal tahun ini Green Era beberapa kali melakukan divestasi saham BREN\n'
           '\n'
           'Sumber:\n'
           'https://t.co/HNayRQ9F8l',
  'content': 'Keluarga om PP mengucapkan terima kasih padamu yang sudah membantu menaikkan free float 🙏\n'
             '\n'
             'Pemegang saham PT Barito Renewables Energy Tbk $BREN yakni Green Era Energy Pte Ltd, tercatat '
             'melepas saham dengan nilai mencapai Rp1,58T\n'
             '\n'
             'Sebanyak 350 juta saham dilepas ke publik pada 6 April 2026 dengan harga Rp4.510 per saham. Di '
             'harga sekarang Rp 5800, yang beli di harga tsb sudah cuan\n'
             '\n'
             'Sebagai informasi Green Era Energy merupakan perusahaan milik putri Prajogo Pangestu, Nancy '
             'Pangestu. Sejak awal tahun ini Green Era beberapa kali melakukan divestasi saham BREN\n'
             '\n'
             'Sumber:\n'
             'https://t.co/HNayRQ9F8l',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/desmondwira/status/2043177225651122274',
  'published_at': 'Sun Apr 12 03:59:45 +0000 2026'},
 {'ticker': 'BREN',
  'title': 'Harga wajar Barito Renewables (BREN) kalo pake standar PE 12x, itu cuma Rp200.\n'
           '\n'
           'Dan klo kalian pikir BREN gak bisa turun kesitu, gw kasih tau aja klo dulu saham konglo legend '
           'lainnya, BUMI, pernah jebol dr 8,450 sampe mentok di 50.\n'
           '\n'
           'You guys see nothing yet',
  'content': 'Harga wajar Barito Renewables (BREN) kalo pake standar PE 12x, itu cuma Rp200.\n'
             '\n'
             'Dan klo kalian pikir BREN gak bisa turun kesitu, gw kasih tau aja klo dulu saham konglo legend '
             'lainnya, BUMI, pernah jebol dr 8,450 sampe mentok di 50.\n'
             '\n'
             'You guys see nothing yet',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/investorgabut/status/2040411095261946173',
  'published_at': 'Sat Apr 04 12:48:08 +0000 2026'},
 {'ticker': 'BREN',
  'title': 'Gw mau share analisis &amp; prediksi gw soal apa yang bakal terjadi ke IHSG &amp; 18 saham MSCI '
           'Indonesia pasca passive rebalancing ini\n'
           '\n'
           'BREN udah -12.73% kemaren \n'
           'Ini baru permulaan\n'
           '\n'
           'Thread 🧵👇\n'
           '\n'
           '⚠️ Bukan financial advice. Benar2 hanya perdiksi dari data &amp; pengalaman kasus Januari. '
           'https://t.co/g3KuEGT9Zi',
  'content': 'Gw mau share analisis &amp; prediksi gw soal apa yang bakal terjadi ke IHSG &amp; 18 saham '
             'MSCI Indonesia pasca passive rebalancing ini\n'
             '\n'
             'BREN udah -12.73% kemaren \n'
             'Ini baru permulaan\n'
             '\n'
             'Thread 🧵👇\n'
             '\n'
             '⚠️ Bukan financial advice. Benar2 hanya perdiksi dari data &amp; pengalaman kasus Januari. '
             'https://t.co/g3KuEGT9Zi',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Friday_SOL/status/2039935016269123976',
  'published_at': 'Fri Apr 03 05:16:22 +0000 2026'},
 {'ticker': 'BREN',
  'title': 'Sejauh ini \n'
           'Saham Terkonsentrasi Tinggi:\n'
           '\n'
           'ROCK 99.85%\n'
           'SOTS 98.35%\n'
           'AGII 97,75%\n'
           'BREN 97,31%\n'
           'MGLV 95,94%\n'
           'DSSA 95.76%\n'
           'RLCO 95.35%',
  'content': 'Sejauh ini \n'
             'Saham Terkonsentrasi Tinggi:\n'
             '\n'
             'ROCK 99.85%\n'
             'SOTS 98.35%\n'
             'AGII 97,75%\n'
             'BREN 97,31%\n'
             'MGLV 95,94%\n'
             'DSSA 95.76%\n'
             'RLCO 95.35%',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Aris_Prabowoo/status/2039678111110033588',
  'published_at': 'Thu Apr 02 12:15:31 +0000 2026'},
 {'ticker': 'DSSA',
  'title': 'Setelah free float dibenerin juga dibenerin sih cara ngitung indexnya.\n'
           '\n'
           'Market ijo digendong DSSA trus kita tau gak ada yang benefit dri kenaikan DSSA kecuali '
           'segelintir orang.\n'
           '\n'
           'Ke depan harusnya lebih mencerminkan index sih.\n'
           '\n'
           'Jadi goreng menggoreng index pake saham illiquid dan low float dah lebih sulit. Kayak DCII ARA '
           'udah gak ngefek gimana2 ke pergerakan index.',
  'content': 'Setelah free float dibenerin juga dibenerin sih cara ngitung indexnya.\n'
             '\n'
             'Market ijo digendong DSSA trus kita tau gak ada yang benefit dri kenaikan DSSA kecuali '
             'segelintir orang.\n'
             '\n'
             'Ke depan harusnya lebih mencerminkan index sih.\n'
             '\n'
             'Jadi goreng menggoreng index pake saham illiquid dan low float dah lebih sulit. Kayak DCII ARA '
             'udah gak ngefek gimana2 ke pergerakan index.',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/SarjanaEksu/status/2042139856277737738',
  'published_at': 'Thu Apr 09 07:17:37 +0000 2026'},
 {'ticker': 'DSSA',
  'title': '@pluang_id porto lagi merah gara2 rupiah melemah? tenang, manfaatin aja bonus 300rb saham dssa '
           'dr pluang buat nambah amunisi di saham kyk adro atau indy yg lagi transisi. lumayan dpt modal '
           'gratisan pas harga lagi murah',
  'content': '@pluang_id porto lagi merah gara2 rupiah melemah? tenang, manfaatin aja bonus 300rb saham dssa '
             'dr pluang buat nambah amunisi di saham kyk adro atau indy yg lagi transisi. lumayan dpt modal '
             'gratisan pas harga lagi murah',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/DelvinaHarda/status/2049450183994544563',
  'published_at': 'Wed Apr 29 11:26:15 +0000 2026'},
 {'ticker': 'DSSA',
  'title': 'Daftar saham FTSE DI Indonesia:\n'
           'Large Cap: PT Dian Swastatika Sentosa Tbk (DSSA).\n'
           '\n'
           'Small Cap: PT Adaro Andalan Indonesia Tbk (AADI), PT Daaz Bara Lestari Tbk (DAAZ).\n'
           '\n'
           'Micro Cap: PT Kencana Energi Lestari Tbk (KEEN), PT Midi Utama Indonesia Tbk (MIDI), PT Mulia '
           'Industrindo Tbk (MLIA), PT Multi Bintang Indonesia Tbk (MLBI), PT Nusantara Sejahtera Raya Tbk '
           '(CNMA/Cinema XXI), PT Sariguna Primatirta Tbk (CLEO), PT Ultrajaya Milk Industry & Trading Co '
           'Tbk (ULTJ).\n'
           '\n'
           'DSSA langsung ngegas \n'
           'dan kemaren DSSA juga kagak ARB',
  'content': 'Daftar saham FTSE DI Indonesia:\n'
             'Large Cap: PT Dian Swastatika Sentosa Tbk (DSSA).\n'
             '\n'
             'Small Cap: PT Adaro Andalan Indonesia Tbk (AADI), PT Daaz Bara Lestari Tbk (DAAZ).\n'
             '\n'
             'Micro Cap: PT Kencana Energi Lestari Tbk (KEEN), PT Midi Utama Indonesia Tbk (MIDI), PT Mulia '
             'Industrindo Tbk (MLIA), PT Multi Bintang Indonesia Tbk (MLBI), PT Nusantara Sejahtera Raya Tbk '
             '(CNMA/Cinema XXI), PT Sariguna Primatirta Tbk (CLEO), PT Ultrajaya Milk Industry & Trading Co '
             'Tbk (ULTJ).\n'
             '\n'
             'DSSA langsung ngegas \n'
             'dan kemaren DSSA juga kagak ARB',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2041355716326490392',
  'published_at': 'Tue Apr 07 03:21:43 +0000 2026'},
 {'ticker': 'DSSA',
  'title': 'Berapa estimasi bobot DSSA dan BREN?\n'
           'DSSA :\n'
           '13% x 1720 x 192.638.080.000\n'
           'Rp 43.07 T ~ USD 2.49 miliar\n'
           'Bobot 2.49 / 10,205.15 x 100%\n'
           '0.2447%\n'
           '\n'
           'BREN\n'
           '6% x 4650 x 133.786.220.000\n'
           'Rp 3.73 T ~ USD 2.16 miliar\n'
           'Bobot 2.16 / 10,205.15 x 100%\n'
           '0.0212%\n'
           '\n'
           'Dari 2 saham jika dijumlahkan 0.2659%',
  'content': 'Berapa estimasi bobot DSSA dan BREN?\n'
             'DSSA :\n'
             '13% x 1720 x 192.638.080.000\n'
             'Rp 43.07 T ~ USD 2.49 miliar\n'
             'Bobot 2.49 / 10,205.15 x 100%\n'
             '0.2447%\n'
             '\n'
             'BREN\n'
             '6% x 4650 x 133.786.220.000\n'
             'Rp 3.73 T ~ USD 2.16 miliar\n'
             'Bobot 2.16 / 10,205.15 x 100%\n'
             '0.0212%\n'
             '\n'
             'Dari 2 saham jika dijumlahkan 0.2659%',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Rudiyanto_zh/status/2049367909324255406',
  'published_at': 'Wed Apr 29 05:59:19 +0000 2026'},
 {'ticker': 'DCII',
  'title': 'Kinerja PT DCI Indonesia Tbk (DCII) pada awal 2026 mengalami tekanan akibat peningkatan beban. '
           'Meskipun pendapatan perseroan masih mencatat pertumbuhan, laba bersih justru mengalami penurunan '
           'seiring naiknya biaya operasional yang memengaruhi profitabilitas perusahaan.\n'
           '\n'
           '#idxchannel #idxchannelcommunity',
  'content': 'Kinerja PT DCI Indonesia Tbk (DCII) pada awal 2026 mengalami tekanan akibat peningkatan beban. '
             'Meskipun pendapatan perseroan masih mencatat pertumbuhan, laba bersih justru mengalami '
             'penurunan seiring naiknya biaya operasional yang memengaruhi profitabilitas perusahaan.\n'
             '\n'
             '#idxchannel #idxchannelcommunity',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/idx_channel/status/2048667168762667402',
  'published_at': 'Mon Apr 27 07:34:50 +0000 2026'},
 {'ticker': 'DCII',
  'title': '@SeekHustle Gak seharusnya saham DCII&amp;DSSA mahal, ... lha kan yg emang dicari keunggulan '
           'nya, unggul ya mahal',
  'content': '@SeekHustle Gak seharusnya saham DCII&amp;DSSA mahal, ... lha kan yg emang dicari keunggulan '
             'nya, unggul ya mahal',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Tidakberat/status/2041300247633396088',
  'published_at': 'Mon Apr 06 23:41:19 +0000 2026'},
 {'ticker': 'DCII',
  'title': '@profesor_saham dia mungkin akan seperti ini kalo liat $DCII https://t.co/cCRYybkvmr',
  'content': '@profesor_saham dia mungkin akan seperti ini kalo liat $DCII https://t.co/cCRYybkvmr',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/amertabuwana/status/2039329916270125369',
  'published_at': 'Wed Apr 01 13:11:55 +0000 2026'},
 {'ticker': 'DCII',
  'title': '@damsiesttt tanggal 26 di kita di mereka baru 25 my 😭',
  'content': '@damsiesttt tanggal 26 di kita di mereka baru 25 my 😭',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/euoniacooky/status/2047895801272394194',
  'published_at': 'Sat Apr 25 04:29:41 +0000 2026'},
 {'ticker': 'BBRI',
  'title': '$BBRI update\n'
           '\n'
           'Ada yang masih inget sama trading plan fibo di Timeframe BULANAN?\n'
           '\n'
           'Update: BBRI semakin dekat ke target harga beli.\n'
           '\n'
           'Area perlu diperhatikan:\n'
           '\n'
           'Fibo 78.6 bulanan: Rp3030\n'
           'Demand Zone: Rp2880-3030\n'
           '\n'
           '*Tidak langsung menangkap pisau jatuh. \n'
           'Tapi menunggu reaksi di area yg diamati',
  'content': '$BBRI update\n'
             '\n'
             'Ada yang masih inget sama trading plan fibo di Timeframe BULANAN?\n'
             '\n'
             'Update: BBRI semakin dekat ke target harga beli.\n'
             '\n'
             'Area perlu diperhatikan:\n'
             '\n'
             'Fibo 78.6 bulanan: Rp3030\n'
             'Demand Zone: Rp2880-3030\n'
             '\n'
             '*Tidak langsung menangkap pisau jatuh. \n'
             'Tapi menunggu reaksi di area yg diamati',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/TeknikalSaham/status/2048380120059265057',
  'published_at': 'Sun Apr 26 12:34:12 +0000 2026'},
 {'ticker': 'BBRI',
  'title': 'welcome $BBCA kelapa 5xxx\n'
           'soon $BBRI kepala 2xxx\n'
           '\n'
           'buat yang belum tahu \n'
           'Harga Saham\n'
           'BBCA\n'
           '30 April 2021: 6.425\n'
           '30 April 2026: 5.850\n'
           '\n'
           'BBRI\n'
           '30 April 2021: 4.590\n'
           '30 April 2026: 3.030\n'
           '\n'
           'kedua saham ini balik \n'
           'keharga 5 tahun lalu \n'
           'bahkan lebih parah \n'
           '\n'
           'Simulasi Investasi Rp100 Juta (30 April 2021 – 30 April 2026)\n'
           '\n'
           'BBCA\n'
           'Jumlah saham:\n'
           'Rp100.000.000 ÷ 6.425 ≈ 15.566 lembar\n'
           '\n'
           'Nilai sekarang:\n'
           '15.566 × 5.850 ≈ Rp91.066.000\n'
           '\n'
           'Hasil:\n'
           'Rugi sekitar Rp8,9 juta (-8,9%)\n'
           '\n'
           'BBRI\n'
           'Jumlah saham:\n'
           'Rp100.000.000 ÷ 4.590 ≈ 21.786 lembar\n'
           '\n'
           'Nilai sekarang:\n'
           '21.786 × 3.030 ≈ Rp66.011.000\n'
           '\n'
           'Hasil:\n'
           'Rugi sekitar Rp34 juta (-34%)\n'
           '\n'
           'apakah stigma invest di big bank \n'
           'sudah tidak aman lagi??\n'
           'atau ada sesuatu yang tidak kita tahu??\n'
           'BBCA ini ibarat Bitcoin \n'
           'kalo dia anjlok pasti semua kena dampaknya',
  'content': 'welcome $BBCA kelapa 5xxx\n'
             'soon $BBRI kepala 2xxx\n'
             '\n'
             'buat yang belum tahu \n'
             'Harga Saham\n'
             'BBCA\n'
             '30 April 2021: 6.425\n'
             '30 April 2026: 5.850\n'
             '\n'
             'BBRI\n'
             '30 April 2021: 4.590\n'
             '30 April 2026: 3.030\n'
             '\n'
             'kedua saham ini balik \n'
             'keharga 5 tahun lalu \n'
             'bahkan lebih parah \n'
             '\n'
             'Simulasi Investasi Rp100 Juta (30 April 2021 – 30 April 2026)\n'
             '\n'
             'BBCA\n'
             'Jumlah saham:\n'
             'Rp100.000.000 ÷ 6.425 ≈ 15.566 lembar\n'
             '\n'
             'Nilai sekarang:\n'
             '15.566 × 5.850 ≈ Rp91.066.000\n'
             '\n'
             'Hasil:\n'
             'Rugi sekitar Rp8,9 juta (-8,9%)\n'
             '\n'
             'BBRI\n'
             'Jumlah saham:\n'
             'Rp100.000.000 ÷ 4.590 ≈ 21.786 lembar\n'
             '\n'
             'Nilai sekarang:\n'
             '21.786 × 3.030 ≈ Rp66.011.000\n'
             '\n'
             'Hasil:\n'
             'Rugi sekitar Rp34 juta (-34%)\n'
             '\n'
             'apakah stigma invest di big bank \n'
             'sudah tidak aman lagi??\n'
             'atau ada sesuatu yang tidak kita tahu??\n'
             'BBCA ini ibarat Bitcoin \n'
             'kalo dia anjlok pasti semua kena dampaknya',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2049677935830003845',
  'published_at': 'Thu Apr 30 02:31:15 +0000 2026'},
 {'ticker': 'BBRI',
  'title': 'Guys bennix berpendapat\n'
           ' market lagi masuk fase seru\n'
           'bukan kiamat tapi banyak orang salah nangkep.\n'
           '\n'
           'Menurut Benix, turunnya saham bank besar kayak BBCA dan BBRI itu bukan tanda Indonesia hancur, '
           'tapi lebih ke siklus pasar yang memang wajar. \n'
           '\n'
           'Dia bahkan bilang banyak orang panik karena nggak paham cara baca market, jadi langsung nyalahin '
           'pemerintah atau bilang ekonomi gelap.\n'
           '\n'
           'Soal Saham Bank & IHSG\n'
           'Benix menekankan:\n'
           'Crash di saham big banks itu nggak ada hubungannya dengan Indonesia bubar\n'
           '\n'
           'Perusahaannya juga nggak jelek, cuma lagi kena tekanan market\n'
           'Justru ini dianggap sebagai peluang buat yang ngerti\n'
           'Dia juga tetap optimis:\n'
           'HSG ke depan masih bisa naik (bahkan dia sebut potensi ke 10.000)\n'
           '\n'
           'Soal Rupiah Melemah\n'
           'Menurut Benix:\n'
           'Rupiah kemungkinan akan terus melemah\n'
           'Bahkan bisa ke level lebih tinggi (mendekati 20.000 per USD)\n'
           '\n'
           'Tapi dia bilang:\n'
           'Ini bukan kabar buruk buat semua orang\n'
           '\n'
           'Karena:\n'
           'Yang siap & paham → bisa ambil peluang\n'
           '\n'
           'Yang nggak siap → baru akan panik dan rugi\n'
           'Soal “Serangan Ekonomi”\n'
           '\n'
           'Benix juga menyebut:\n'
           'Akan ada tekanan dari luar (AS, Malaysia, Singapura)\n'
           'Nilai tukar rupiah, terutama terhadap SGD, bisa makin tertekan\n'
           '\n'
           'Intinya:\n'
           ' dia melihat ada tekanan global & regional yang bakal bikin rupiah makin lemah\n'
           '\n'
           'Kritik ke Pemerintah\n'
           'Benix cukup keras di sini:\n'
           'Pemerintah dianggap telat ambil langkah\n'
           'Salah satu yang disorot: nggak dilakukan redenominasi\n'
           '\n'
           'Dia percaya ini bisa berdampak ke:\n'
           'inflasi makin tinggi\n'
           'peredaran uang (termasuk uang palsu) meningkat\n'
           '\n'
           'Menurut dia, mindset yang benar:\n'
           'Market turun = kesempatan, bukan musibah\n'
           'Rupiah lemah = bisa jadi peluang cuan\n'
           '\n'
           'Semua kondisi, kalau paham cara mainnya → tetap bisa untung\n'
           'Dia bahkan bilang:\n'
           '“yang penting bukan kondisi marketnya, tapi posisi kita di market”\n'
           '\n'
           'Benix ingin menekankan:\n'
           'Jangan gampang panik lihat market turun\n'
           'Jangan asal ikut narasi “Indonesia gelap”\n'
           'Tapi juga jangan asal masuk tanpa strategi\n'
           '\n'
           'Karena:\n'
           'di kondisi kayak gini, yang ngerti bisa cuan\n'
           'yang nggak ngerti bisa makin rugi',
  'content': 'Guys bennix berpendapat\n'
             ' market lagi masuk fase seru\n'
             'bukan kiamat tapi banyak orang salah nangkep.\n'
             '\n'
             'Menurut Benix, turunnya saham bank besar kayak BBCA dan BBRI itu bukan tanda Indonesia hancur, '
             'tapi lebih ke siklus pasar yang memang wajar. \n'
             '\n'
             'Dia bahkan bilang banyak orang panik karena nggak paham cara baca market, jadi langsung '
             'nyalahin pemerintah atau bilang ekonomi gelap.\n'
             '\n'
             'Soal Saham Bank & IHSG\n'
             'Benix menekankan:\n'
             'Crash di saham big banks itu nggak ada hubungannya dengan Indonesia bubar\n'
             '\n'
             'Perusahaannya juga nggak jelek, cuma lagi kena tekanan market\n'
             'Justru ini dianggap sebagai peluang buat yang ngerti\n'
             'Dia juga tetap optimis:\n'
             'HSG ke depan masih bisa naik (bahkan dia sebut potensi ke 10.000)\n'
             '\n'
             'Soal Rupiah Melemah\n'
             'Menurut Benix:\n'
             'Rupiah kemungkinan akan terus melemah\n'
             'Bahkan bisa ke level lebih tinggi (mendekati 20.000 per USD)\n'
             '\n'
             'Tapi dia bilang:\n'
             'Ini bukan kabar buruk buat semua orang\n'
             '\n'
             'Karena:\n'
             'Yang siap & paham → bisa ambil peluang\n'
             '\n'
             'Yang nggak siap → baru akan panik dan rugi\n'
             'Soal “Serangan Ekonomi”\n'
             '\n'
             'Benix juga menyebut:\n'
             'Akan ada tekanan dari luar (AS, Malaysia, Singapura)\n'
             'Nilai tukar rupiah, terutama terhadap SGD, bisa makin tertekan\n'
             '\n'
             'Intinya:\n'
             ' dia melihat ada tekanan global & regional yang bakal bikin rupiah makin lemah\n'
             '\n'
             'Kritik ke Pemerintah\n'
             'Benix cukup keras di sini:\n'
             'Pemerintah dianggap telat ambil langkah\n'
             'Salah satu yang disorot: nggak dilakukan redenominasi\n'
             '\n'
             'Dia percaya ini bisa berdampak ke:\n'
             'inflasi makin tinggi\n'
             'peredaran uang (termasuk uang palsu) meningkat\n'
             '\n'
             'Menurut dia, mindset yang benar:\n'
             'Market turun = kesempatan, bukan musibah\n'
             'Rupiah lemah = bisa jadi peluang cuan\n'
             '\n'
             'Semua kondisi, kalau paham cara mainnya → tetap bisa untung\n'
             'Dia bahkan bilang:\n'
             '“yang penting bukan kondisi marketnya, tapi posisi kita di market”\n'
             '\n'
             'Benix ingin menekankan:\n'
             'Jangan gampang panik lihat market turun\n'
             'Jangan asal ikut narasi “Indonesia gelap”\n'
             'Tapi juga jangan asal masuk tanpa strategi\n'
             '\n'
             'Karena:\n'
             'di kondisi kayak gini, yang ngerti bisa cuan\n'
             'yang nggak ngerti bisa makin rugi',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2047868007935033815',
  'published_at': 'Sat Apr 25 02:39:15 +0000 2026'},
 {'ticker': 'BBRI',
  'title': 'Saham bank terbesar di Indonesia lagi “hujan duit” Bank Rakyat Indonesia (BBRI) bagi-bagi '
           'dividen GILA BESAR.\n'
           'Tapi yang bikin panas:\n'
           'Ada pihak yang kantongnya langsung nambah Rp16,68 TRILIUN \n'
           '\n'
           'Siapa yang Dapat Paling Besar?\n'
           'Jawabannya:\n'
           'Danantara Asset Manajemen\n'
           '\n'
           'Pegang: 52,66% saham BBRI\n'
           'Total saham: 79,8 miliar lembar\n'
           'Dividen yang masuk:\n'
           'Rp16,68 TRILIUN\n'
           '\n'
           'Menurut lu duit segitu bakal di apaain oleh danantara??',
  'content': 'Saham bank terbesar di Indonesia lagi “hujan duit” Bank Rakyat Indonesia (BBRI) bagi-bagi '
             'dividen GILA BESAR.\n'
             'Tapi yang bikin panas:\n'
             'Ada pihak yang kantongnya langsung nambah Rp16,68 TRILIUN \n'
             '\n'
             'Siapa yang Dapat Paling Besar?\n'
             'Jawabannya:\n'
             'Danantara Asset Manajemen\n'
             '\n'
             'Pegang: 52,66% saham BBRI\n'
             'Total saham: 79,8 miliar lembar\n'
             'Dividen yang masuk:\n'
             'Rp16,68 TRILIUN\n'
             '\n'
             'Menurut lu duit segitu bakal di apaain oleh danantara??',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2043912420939468851',
  'published_at': 'Tue Apr 14 04:41:09 +0000 2026'},
 {'ticker': 'BMRI',
  'title': '(1/2)\n'
           'Konflik AS–Iran hari ke-53 dorong WTI +7% ke $89.61 dan freight global melonjak. Di IDX, '
           'dampaknya beda tiap sektor, dari tanker, bank, hingga nikel. Ini yang terjadi di market '
           'Indonesia. BULL diuntungkan spot rate, BMRI solid dari kredit👇 https://t.co/q0TBtjXwV4',
  'content': '(1/2)\n'
             'Konflik AS–Iran hari ke-53 dorong WTI +7% ke $89.61 dan freight global melonjak. Di IDX, '
             'dampaknya beda tiap sektor, dari tanker, bank, hingga nikel. Ini yang terjadi di market '
             'Indonesia. BULL diuntungkan spot rate, BMRI solid dari kredit👇 https://t.co/q0TBtjXwV4',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/pluang_id/status/2046925961510416618',
  'published_at': 'Wed Apr 22 12:15:53 +0000 2026'},
 {'ticker': 'BMRI',
  'title': 'bmri walau turun masih belum terendah 5 tahun ini yg terkuat dari trio bank gede yg dijualin '
           'asing https://t.co/SPpuHnNFZI',
  'content': 'bmri walau turun masih belum terendah 5 tahun ini yg terkuat dari trio bank gede yg dijualin '
             'asing https://t.co/SPpuHnNFZI',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/TradingDiary2/status/2049696047207952529',
  'published_at': 'Thu Apr 30 03:43:13 +0000 2026'},
 {'ticker': 'BMRI',
  'title': 'BMRI resmi berikan dividen Rp377/ lembar saham. https://t.co/6tCJVOdPPh',
  'content': 'BMRI resmi berikan dividen Rp377/ lembar saham. https://t.co/6tCJVOdPPh',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/insidefolkative/status/2049406136676430305',
  'published_at': 'Wed Apr 29 08:31:13 +0000 2026'},
 {'ticker': 'BMRI',
  'title': 'BMRI gw mines 10%. Terus gw tanya AI mending average down, hold, atau jual dan ini jawabannya. '
           'Aman ga gaes?? shm! https://t.co/0SWbcOrRZV',
  'content': 'BMRI gw mines 10%. Terus gw tanya AI mending average down, hold, atau jual dan ini jawabannya. '
             'Aman ga gaes?? shm! https://t.co/0SWbcOrRZV',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Saham_fess/status/2042576697925734663',
  'published_at': 'Fri Apr 10 12:13:28 +0000 2026'},
 {'ticker': 'TPIA',
  'title': 'Yang ketinggalan TPIA bisa pantau saham ini. Masih murah dan blm gc tapi kalau di grup saya udh '
           'pada nyolong start. Kalo kita maunya mah saham yang murah2, ga kaya kamu ngejar yang udh lari. '
           'Capek. \n'
           '\n'
           'Beli saham itu kemungkinannya 50% naik 50% turun. Tapi kalo naik profitnya bisa besar seperti '
           'TPIA yang masih kita hold. Kalau turun ruginya kecil karna kita CL max -5%.\n'
           '\n'
           'Kira2 saham apakah ini?',
  'content': 'Yang ketinggalan TPIA bisa pantau saham ini. Masih murah dan blm gc tapi kalau di grup saya '
             'udh pada nyolong start. Kalo kita maunya mah saham yang murah2, ga kaya kamu ngejar yang udh '
             'lari. Capek. \n'
             '\n'
             'Beli saham itu kemungkinannya 50% naik 50% turun. Tapi kalo naik profitnya bisa besar seperti '
             'TPIA yang masih kita hold. Kalau turun ruginya kecil karna kita CL max -5%.\n'
             '\n'
             'Kira2 saham apakah ini?',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/mikelsaham/status/2042550156416159780',
  'published_at': 'Fri Apr 10 10:28:00 +0000 2026'},
 {'ticker': 'TPIA',
  'title': 'IHSG Technical View👀\n'
           '15 April 2026\n'
           '\n'
           'IHSG kemarin ditutup naik 2.34%, tapi disertai dengan net sell asing ~48 Miliar. Saham yang '
           'paling banyak dijual asing adalah BRMS, BRPT, TPIA, IMPC, dan ANTM.',
  'content': 'IHSG Technical View👀\n'
             '15 April 2026\n'
             '\n'
             'IHSG kemarin ditutup naik 2.34%, tapi disertai dengan net sell asing ~48 Miliar. Saham yang '
             'paling banyak dijual asing adalah BRMS, BRPT, TPIA, IMPC, dan ANTM.',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/bnisekuritas46/status/2044216187379441722',
  'published_at': 'Wed Apr 15 00:48:13 +0000 2026'},
 {'ticker': 'TPIA',
  'title': 'Dari 10 Top Constituents,\n'
           '\n'
           '$DSSA $BREN $AMMN $TPIA\n'
           'kena Saham Terkonsentrasi Tinggi (High Shareholding  Concentration).\n'
           '\n'
           'bad news?\n'
           'jelas\n'
           '\n'
           'sy ngk tau pasti perhitungannya gimana,\n'
           'yg jelas mau gk mau indo MSCI pasti outflow terutama buat ke 4 saham ini.\n'
           '\n'
           'yg lebih parah mungkin bisa kena kick\n'
           '\n'
           'mohon penjelasannya pak @Rudiyanto_zh',
  'content': 'Dari 10 Top Constituents,\n'
             '\n'
             '$DSSA $BREN $AMMN $TPIA\n'
             'kena Saham Terkonsentrasi Tinggi (High Shareholding  Concentration).\n'
             '\n'
             'bad news?\n'
             'jelas\n'
             '\n'
             'sy ngk tau pasti perhitungannya gimana,\n'
             'yg jelas mau gk mau indo MSCI pasti outflow terutama buat ke 4 saham ini.\n'
             '\n'
             'yg lebih parah mungkin bisa kena kick\n'
             '\n'
             'mohon penjelasannya pak @Rudiyanto_zh',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/dojjunn/status/2039683173853143118',
  'published_at': 'Thu Apr 02 12:35:38 +0000 2026'},
 {'ticker': 'TPIA',
  'title': 'Market dalam kondisi apapun tetap saya cuma pakai 1 indikator yaitu stoch gc oversold. Kebetulan '
           'dari semua saham pak PP saya pilihnya TPIA dan besoknya gencatan senjata. Hari ini kebetulan '
           'naik lagi. Yauda hold aja kalo takut tinggal TP ½. \n'
           '\n'
           'Yang bukan kebetulan adalah kita selalu beli di harga terendah dan kita pasti masih HOLDDD. '
           'Bukan TP sana sini. Saham maksimal 3, jadi kita masuk minimal 30% dari total modal. Itu namanya '
           'skill bukan hoki.  \n'
           '\n'
           'Mau besok lanjut / engga kita udh tau harus gimana.',
  'content': 'Market dalam kondisi apapun tetap saya cuma pakai 1 indikator yaitu stoch gc oversold. '
             'Kebetulan dari semua saham pak PP saya pilihnya TPIA dan besoknya gencatan senjata. Hari ini '
             'kebetulan naik lagi. Yauda hold aja kalo takut tinggal TP ½. \n'
             '\n'
             'Yang bukan kebetulan adalah kita selalu beli di harga terendah dan kita pasti masih HOLDDD. '
             'Bukan TP sana sini. Saham maksimal 3, jadi kita masuk minimal 30% dari total modal. Itu '
             'namanya skill bukan hoki.  \n'
             '\n'
             'Mau besok lanjut / engga kita udh tau harus gimana.',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/mikelsaham/status/2042293743647408567',
  'published_at': 'Thu Apr 09 17:29:07 +0000 2026'},
 {'ticker': 'BYAN',
  'title': 'Hepi OSh: IHSG ambroek lagee: 23/04/2026: +945,28%, +300,38%: akumulasi total mC plus: '
           'portofolio: INDY   EXCL   BNII   ELSA   ADRO   ASII   CPIN   JSMR   IMAS   KIJA   BYAN   KAEF   '
           'APLN   LAJU   BLTA   MYOR   TAYS   GPSO   GOTO   KEJU   MIDI   ADES   HERO   ANTM   CLEO   ASRI '
           'https://t.co/w5RbjZ3bIg',
  'content': 'Hepi OSh: IHSG ambroek lagee: 23/04/2026: +945,28%, +300,38%: akumulasi total mC plus: '
             'portofolio: INDY   EXCL   BNII   ELSA   ADRO   ASII   CPIN   JSMR   IMAS   KIJA   BYAN   '
             'KAEF   APLN   LAJU   BLTA   MYOR   TAYS   GPSO   GOTO   KEJU   MIDI   ADES   HERO   ANTM   '
             'CLEO   ASRI https://t.co/w5RbjZ3bIg',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/jo_maenSaham/status/2047341841629245653',
  'published_at': 'Thu Apr 23 15:48:27 +0000 2026'},
 {'ticker': 'BYAN',
  'title': '⠀⠀\n⠀ \n⠀⠀⠀⠀TAHUN AJARAN BARU\n⠀⠀⠀⠀— SMAN BERANDAL\n⠀⠀⠀⠀2026\n\n⠀⠀ https://t.co/ERVa4AxiPs',
  'content': '⠀⠀\n⠀ \n⠀⠀⠀⠀TAHUN AJARAN BARU\n⠀⠀⠀⠀— SMAN BERANDAL\n⠀⠀⠀⠀2026\n\n⠀⠀ https://t.co/ERVa4AxiPs',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/BERANDALSMAN/status/2048044240568234392',
  'published_at': 'Sat Apr 25 14:19:32 +0000 2026'},
 {'ticker': 'BYAN',
  'title': 'ㅤㅤㅤ\n𝐒𝐞𝐧𝐢𝐧, 𝟐𝟕 𝐀𝐩𝐫𝐢𝐥 𝟐𝟎𝟐𝟔\n𝟎𝟕:𝟎𝟎 - 𝟐𝟏:𝟎𝟎 𝐖𝐈𝐁.\nㅤ',
  'content': 'ㅤㅤㅤ\n𝐒𝐞𝐧𝐢𝐧, 𝟐𝟕 𝐀𝐩𝐫𝐢𝐥 𝟐𝟎𝟐𝟔\n𝟎𝟕:𝟎𝟎 - 𝟐𝟏:𝟎𝟎 𝐖𝐈𝐁.\nㅤ',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/DIAMNDOFFICE/status/2048570950900383845',
  'published_at': 'Mon Apr 27 01:12:29 +0000 2026'},
 {'ticker': 'BYAN',
  'title': 'MAKASIH YAALLAH, ATAS SEDIKIT PESAN YG BERHARGA INI. SEDIKIT MENGURANGI KESEDIHAN SAYA🥺🫰🏻. '
           'BISMILLAH SIDANG TGL 11 MEI 2026 ATAU TGL 18 MEI 2026, AAMIIN🥺🤲🏻✨. BERIKANLAH KEAJAIBAN ITU '
           'YAALLAH🤲🏻✨. https://t.co/pCiQRQ0QIy',
  'content': 'MAKASIH YAALLAH, ATAS SEDIKIT PESAN YG BERHARGA INI. SEDIKIT MENGURANGI KESEDIHAN SAYA🥺🫰🏻. '
             'BISMILLAH SIDANG TGL 11 MEI 2026 ATAU TGL 18 MEI 2026, AAMIIN🥺🤲🏻✨. BERIKANLAH KEAJAIBAN ITU '
             'YAALLAH🤲🏻✨. https://t.co/pCiQRQ0QIy',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/imbrlnxwnu/status/2049324471950168293',
  'published_at': 'Wed Apr 29 03:06:43 +0000 2026'},
 {'ticker': 'AMMN',
  'title': 'IHSG -0,15% ke 7.095,58 di sesi I Selasa (28/4/2026). Sektor perindustrian +0,97%, dan sektor '
           'energi +0,71%. Sementara sektor barang konsumen non siklikal -1,19%, sektor infrastruktur '
           '-0,72%, dan sektor keuangan -0,59%. IHSG melemah terdampak profit taking dengan saham AMMN '
           '-2,78% usai naik tinggi di Senin, ASII -1,63%, TLKM -2,47%, ADRO -3,19%, DSSA -4,34%, ANTM -3%, '
           'dan BDMN -3%.\n'
           '\n'
           'Dari global, Wall Street bergerak hati-hati di Senin, S&P 500 dan Nasdaq catat kenaikan tipis di '
           'tengah perdagangan lesu. Investor memilih bersikap wait and see menjelang rilis laporan keuangan '
           'emiten kakap, keputusan kebijakan The Fed, dan perkembangan geopolitik di Timur Tengah.\n'
           '\n'
           'Seperti apa review IHSG yang lanjutkan pelemahan dalam ke 7.000-an? Apa rekomendasi saham Big '
           'Caps di tengah profit taking yang terjadi? Saksikan pembahasannya di IDX 2nd session closing, '
           'sore ini pukul 15:30 WIB, LIVE di IDX Channel (MNC VISION Ch 100, MNC PLAY Ch 128 HD, INDI HOME '
           'Ch 119, FIRST MEDIA Ch 389, K-VISION Ch 129, OXYGEN Ch 137, dan MY REPUBLIK Ch 576. Saksikan '
           'juga LIVE STREAMING di https://t.co/Fz5cZjFD4m dan aplikasi IDX Channel TV di APPS store\n'
           '\n'
           '#idxchannel #idxchannelcommunity #2ndsession',
  'content': 'IHSG -0,15% ke 7.095,58 di sesi I Selasa (28/4/2026). Sektor perindustrian +0,97%, dan sektor '
             'energi +0,71%. Sementara sektor barang konsumen non siklikal -1,19%, sektor infrastruktur '
             '-0,72%, dan sektor keuangan -0,59%. IHSG melemah terdampak profit taking dengan saham AMMN '
             '-2,78% usai naik tinggi di Senin, ASII -1,63%, TLKM -2,47%, ADRO -3,19%, DSSA -4,34%, ANTM '
             '-3%, dan BDMN -3%.\n'
             '\n'
             'Dari global, Wall Street bergerak hati-hati di Senin, S&P 500 dan Nasdaq catat kenaikan tipis '
             'di tengah perdagangan lesu. Investor memilih bersikap wait and see menjelang rilis laporan '
             'keuangan emiten kakap, keputusan kebijakan The Fed, dan perkembangan geopolitik di Timur '
             'Tengah.\n'
             '\n'
             'Seperti apa review IHSG yang lanjutkan pelemahan dalam ke 7.000-an? Apa rekomendasi saham Big '
             'Caps di tengah profit taking yang terjadi? Saksikan pembahasannya di IDX 2nd session closing, '
             'sore ini pukul 15:30 WIB, LIVE di IDX Channel (MNC VISION Ch 100, MNC PLAY Ch 128 HD, INDI '
             'HOME Ch 119, FIRST MEDIA Ch 389, K-VISION Ch 129, OXYGEN Ch 137, dan MY REPUBLIK Ch 576. '
             'Saksikan juga LIVE STREAMING di https://t.co/Fz5cZjFD4m dan aplikasi IDX Channel TV di APPS '
             'store\n'
             '\n'
             '#idxchannel #idxchannelcommunity #2ndsession',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/idx_channel/status/2049028088600891652',
  'published_at': 'Tue Apr 28 07:29:00 +0000 2026'},
 {'ticker': 'AMMN',
  'title': 'PT\xa0Amman Mineral Internasional\xa0Tbk (AMMN) membukukan laba bersih sebesar USD162,60 juta '
           'pada kuartal I-2026. Capaian ini menandakan perseroan berhasil membalikkan rugi pada periode '
           'sama setahun sebelumnya yakni USD137,63 juta.\n'
           '\n'
           'EBITDA meningkat dari negatif USD42 juta pada kuartal I-2025 menjadi USD508 juta, dengan margin '
           'EBITDA sebesar 63 persen.\n'
           '\n'
           'Peningkatan EBITDA didorong oleh kenaikan penjualan bersih, dengan dukungan tambahan dari harga '
           'realisasi logam yang lebih tinggi dan penjualan konsentrat.\n'
           '\n'
           'Baca selengkapnya di\n'
           'https://t.co/b8JtzKGNzA \n'
           '\n'
           'Atau klik link di bio @idx_channel\n'
           '\n'
           'Foto: Istimewa\n'
           '\n'
           '#idxchannel #idxchannelcommunity',
  'content': 'PT\xa0Amman Mineral Internasional\xa0Tbk (AMMN) membukukan laba bersih sebesar USD162,60 juta '
             'pada kuartal I-2026. Capaian ini menandakan perseroan berhasil membalikkan rugi pada periode '
             'sama setahun sebelumnya yakni USD137,63 juta.\n'
             '\n'
             'EBITDA meningkat dari negatif USD42 juta pada kuartal I-2025 menjadi USD508 juta, dengan '
             'margin EBITDA sebesar 63 persen.\n'
             '\n'
             'Peningkatan EBITDA didorong oleh kenaikan penjualan bersih, dengan dukungan tambahan dari '
             'harga realisasi logam yang lebih tinggi dan penjualan konsentrat.\n'
             '\n'
             'Baca selengkapnya di\n'
             'https://t.co/b8JtzKGNzA \n'
             '\n'
             'Atau klik link di bio @idx_channel\n'
             '\n'
             'Foto: Istimewa\n'
             '\n'
             '#idxchannel #idxchannelcommunity',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/idx_channel/status/2050123057856176285',
  'published_at': 'Fri May 01 08:00:01 +0000 2026'},
 {'ticker': 'AMMN',
  'title': '앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ '
           '앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ https://t.co/VcnPW0ERkE',
  'content': '앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ '
             '앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ 앙♡ '
             'https://t.co/VcnPW0ERkE',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/hammnyanya/status/2048334112826835062',
  'published_at': 'Sun Apr 26 09:31:23 +0000 2026'},
 {'ticker': 'AMMN',
  'title': '😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭 https://t.co/CZJ1KYmqg8',
  'content': '😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭😭 https://t.co/CZJ1KYmqg8',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/AM1QQ/status/2047768803598070027',
  'published_at': 'Fri Apr 24 20:05:03 +0000 2026'},
 {'ticker': 'TLKM',
  'title': '*EVALUASI INDEKS LQ45, IDX30, IDX80, BISNIS-27, MNC36, SMINFRA18, IDXESGL*\n'
           '\n'
           '(Periode Efektif 04 Mei 2026 - 31 Juli 2026)\n'
           '\n'
           '*INDEKS LQ45*\n'
           '*Baru :* CUAN, DEWA, ESSA, HRTA, WIFI\n'
           '*Keluar :* BREN, CTRA, DSSA, HEAL, NCKL\n'
           '\n'
           '*INDEKS IDX30*\n'
           '*Baru :* ADMR\n'
           '*Keluar :* ISAT\n'
           '\n'
           '*INDEKS IDX80*\n'
           '*Baru :* BKSL, CBDK, DEWA, GGRM, TPIA\n'
           '*Keluar :* BREN, BTPS, DSSA, MTEL, NCKL\n'
           '\n'
           '*INDEKS BISNIS-27*\n'
           '*Baru :* AKRA, BRMS, CPIN, DEWA, ICBP, MBMA, PGAS, TAPG\n'
           '*Keluar :* ADMR, BRPT, DSNG, HEAL, INDF, MYOR, NCKL, PGEO\n'
           '\n'
           '*INDEKS MNC36*\n'
           '*Baru :* BUMI, CPIN, PTBA, SILO\n'
           '*Keluar :* BRPT, CTRA, HEAL, PGAS\n'
           '\n'
           '*INDEKS SMINFRA18*\n'
           '*Baru :* ELSA, MIKA, WIFI\n'
           '*Keluar :* EXCL, MTEL, PTPP\n'
           '\n'
           '*INDEKS IDXESGL*\n'
           '*Baru :* BRPT, INCO, KPIG, TPIA\n'
           '*Keluar :* AKRA, AVIA, MTEL, PGAS\n'
           '\n'
           '*Source : IDX',
  'content': '*EVALUASI INDEKS LQ45, IDX30, IDX80, BISNIS-27, MNC36, SMINFRA18, IDXESGL*\n'
             '\n'
             '(Periode Efektif 04 Mei 2026 - 31 Juli 2026)\n'
             '\n'
             '*INDEKS LQ45*\n'
             '*Baru :* CUAN, DEWA, ESSA, HRTA, WIFI\n'
             '*Keluar :* BREN, CTRA, DSSA, HEAL, NCKL\n'
             '\n'
             '*INDEKS IDX30*\n'
             '*Baru :* ADMR\n'
             '*Keluar :* ISAT\n'
             '\n'
             '*INDEKS IDX80*\n'
             '*Baru :* BKSL, CBDK, DEWA, GGRM, TPIA\n'
             '*Keluar :* BREN, BTPS, DSSA, MTEL, NCKL\n'
             '\n'
             '*INDEKS BISNIS-27*\n'
             '*Baru :* AKRA, BRMS, CPIN, DEWA, ICBP, MBMA, PGAS, TAPG\n'
             '*Keluar :* ADMR, BRPT, DSNG, HEAL, INDF, MYOR, NCKL, PGEO\n'
             '\n'
             '*INDEKS MNC36*\n'
             '*Baru :* BUMI, CPIN, PTBA, SILO\n'
             '*Keluar :* BRPT, CTRA, HEAL, PGAS\n'
             '\n'
             '*INDEKS SMINFRA18*\n'
             '*Baru :* ELSA, MIKA, WIFI\n'
             '*Keluar :* EXCL, MTEL, PTPP\n'
             '\n'
             '*INDEKS IDXESGL*\n'
             '*Baru :* BRPT, INCO, KPIG, TPIA\n'
             '*Keluar :* AKRA, AVIA, MTEL, PGAS\n'
             '\n'
             '*Source : IDX',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/EvaMalca/status/2047916438732824802',
  'published_at': 'Sat Apr 25 05:51:42 +0000 2026'},
 {'ticker': 'TLKM',
  'title': 'Jadual Jualan Rahmah DUN Kg Tunku bagi bulan April 2026 adalah seperti berikut:\n'
           '\n'
           '1️⃣ 26/4/2026 (Ahad) 9AM - 1PM \n'
           '📍Flat Sri Aman PJ (https://t.co/wiuEA52jSs)\n'
           '2️⃣ 27/4/2026 (Isnin) 9AM - 1PM \n'
           '📍Masjid Al-Hidayah SS3 (https://t.co/f4tXltZVTL)\n'
           '\n'
           'Jom datang ramai-ramai! https://t.co/ON2APzPQ15',
  'content': 'Jadual Jualan Rahmah DUN Kg Tunku bagi bulan April 2026 adalah seperti berikut:\n'
             '\n'
             '1️⃣ 26/4/2026 (Ahad) 9AM - 1PM \n'
             '📍Flat Sri Aman PJ (https://t.co/wiuEA52jSs)\n'
             '2️⃣ 27/4/2026 (Isnin) 9AM - 1PM \n'
             '📍Masjid Al-Hidayah SS3 (https://t.co/f4tXltZVTL)\n'
             '\n'
             'Jom datang ramai-ramai! https://t.co/ON2APzPQ15',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LimYiWei4MY/status/2047663159687905543',
  'published_at': 'Fri Apr 24 13:05:15 +0000 2026'},
 {'ticker': 'TLKM',
  'title': 'Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. '
           'jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. '
           'lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. jangan.. '
           'https://t.co/MFcwGiYBr3',
  'content': 'Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. '
             'lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. '
             'jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. jangan.. lompat.. jangan..Lompat.. '
             'jangan.. lompat.. jangan.. https://t.co/MFcwGiYBr3',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/TaliUdeng/status/2049437827117805750',
  'published_at': 'Wed Apr 29 10:37:09 +0000 2026'},
 {'ticker': 'TLKM',
  'title': 'Jika dilihat dari % ETF terhadap Total Lembar, secara rata-rata ETF membeli 1.14% dari total '
           'lembar beredar\n'
           '\n'
           'Jika melihat saham big caps tradisional seperti perbankan, TLKM dan ASII, sekitar 2%\n'
           '\n'
           'Beberapa saham seperti BRMS, PGAS, dan GOTO bisa 3-5% dari saham beredarnya',
  'content': 'Jika dilihat dari % ETF terhadap Total Lembar, secara rata-rata ETF membeli 1.14% dari total '
             'lembar beredar\n'
             '\n'
             'Jika melihat saham big caps tradisional seperti perbankan, TLKM dan ASII, sekitar 2%\n'
             '\n'
             'Beberapa saham seperti BRMS, PGAS, dan GOTO bisa 3-5% dari saham beredarnya',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/Rudiyanto_zh/status/2045826872446169576',
  'published_at': 'Sun Apr 19 11:28:30 +0000 2026'},
 {'ticker': 'ASII',
  'title': 'Adu Prospek Saham ASII, AUTO, DRMA, dan IMAS\n'
           '\n'
           '#saham #infosaham #investasi\n'
           '\n'
           'https://t.co/vS5LpG6DHe',
  'content': 'Adu Prospek Saham ASII, AUTO, DRMA, dan IMAS\n'
             '\n'
             '#saham #infosaham #investasi\n'
             '\n'
             'https://t.co/vS5LpG6DHe',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/InvestorID/status/2047095439137333480',
  'published_at': 'Wed Apr 22 23:29:20 +0000 2026'},
 {'ticker': 'ASII',
  'title': 'PT Bursa Efek Indonesia (BEI) melaporkan kinerja Indeks Harga Saham Gabungan (IHSG) pada periode '
           '27–30 April 2026 ditutup melemah ke level 6.956,804, turun 2,42 persen dari pekan sebelumnya di '
           '7.129,490.\n'
           '\n'
           'Sekretaris Perusahaan BEI, Kautsar Primadi Nurahmad, menyebut pelemahan ini turut diikuti '
           'penurunan kapitalisasi pasar sebesar 2,78 persen menjadi Rp 12.382 triliun.\n'
           '\n'
           'Aktivitas perdagangan juga mengalami perlambatan. Frekuensi transaksi harian turun 15,02 persen '
           'menjadi 2,34 juta kali transaksi. Sementara itu, rata-rata nilai transaksi harian ikut '
           'terkoreksi 6,81 persen menjadi Rp 18,27 triliun.\n'
           '\n'
           'Dari sisi volume, rata-rata transaksi harian juga menyusut 17,32 persen menjadi 37,11 miliar '
           'lembar saham.\n'
           '\n'
           'Di sisi lain, investor asing masih mencatatkan aksi jual bersih sebesar Rp 1,486 triliun pada '
           'penutupan Kamis (30/4). Sepanjang tahun 2026, total net sell investor asing telah mencapai Rp '
           '49,874 triliun.\n'
           '\n'
           '📸: Dok. Antara.\n'
           '\n'
           'Baca selengkapnya dengan klik link di bio. Cari tahu berita update lainnya dengan download '
           'aplikasi kumparan di App Store atau Google Play.\n'
           '\n'
           '📝: bisnisupdate I update I bisnis I oneliner I R074 I E093\n'
           '\n'
           '#bicarafaktalewatberita #kumparan',
  'content': 'PT Bursa Efek Indonesia (BEI) melaporkan kinerja Indeks Harga Saham Gabungan (IHSG) pada '
             'periode 27–30 April 2026 ditutup melemah ke level 6.956,804, turun 2,42 persen dari pekan '
             'sebelumnya di 7.129,490.\n'
             '\n'
             'Sekretaris Perusahaan BEI, Kautsar Primadi Nurahmad, menyebut pelemahan ini turut diikuti '
             'penurunan kapitalisasi pasar sebesar 2,78 persen menjadi Rp 12.382 triliun.\n'
             '\n'
             'Aktivitas perdagangan juga mengalami perlambatan. Frekuensi transaksi harian turun 15,02 '
             'persen menjadi 2,34 juta kali transaksi. Sementara itu, rata-rata nilai transaksi harian ikut '
             'terkoreksi 6,81 persen menjadi Rp 18,27 triliun.\n'
             '\n'
             'Dari sisi volume, rata-rata transaksi harian juga menyusut 17,32 persen menjadi 37,11 miliar '
             'lembar saham.\n'
             '\n'
             'Di sisi lain, investor asing masih mencatatkan aksi jual bersih sebesar Rp 1,486 triliun pada '
             'penutupan Kamis (30/4). Sepanjang tahun 2026, total net sell investor asing telah mencapai Rp '
             '49,874 triliun.\n'
             '\n'
             '📸: Dok. Antara.\n'
             '\n'
             'Baca selengkapnya dengan klik link di bio. Cari tahu berita update lainnya dengan download '
             'aplikasi kumparan di App Store atau Google Play.\n'
             '\n'
             '📝: bisnisupdate I update I bisnis I oneliner I R074 I E093\n'
             '\n'
             '#bicarafaktalewatberita #kumparan',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/kumparan/status/2050014838374691239',
  'published_at': 'Fri May 01 00:49:59 +0000 2026'},
 {'ticker': 'ASII',
  'title': 'Hari ini Kamis 30 April 2026 adalah hari terakhir perdagangan saham di minggu ini\n'
           '\n'
           'Besok hari Jumat 1 Mei Mei bursa saham libur (Hari Buruh Internasional)\n'
           '\n'
           'Sepertinya hari ini menjadi hari profit taking berjamaah, mengantisipasi libur long weekend\n'
           '\n'
           'Sementara IHSG terkoreksi -60 an poin',
  'content': 'Hari ini Kamis 30 April 2026 adalah hari terakhir perdagangan saham di minggu ini\n'
             '\n'
             'Besok hari Jumat 1 Mei Mei bursa saham libur (Hari Buruh Internasional)\n'
             '\n'
             'Sepertinya hari ini menjadi hari profit taking berjamaah, mengantisipasi libur long weekend\n'
             '\n'
             'Sementara IHSG terkoreksi -60 an poin',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/desmondwira/status/2049677645064110259',
  'published_at': 'Thu Apr 30 02:30:06 +0000 2026'},
 {'ticker': 'ASII',
  'title': 'PT Bursa Efek Indonesia melaporkan kinerja Indeks Harga Saham Gabungan (IHSG) selama periode '
           '20–24 April 2026 melemah signifikan. IHSG ditutup di level 7.129,490 atau turun 6,61 persen dari '
           '7.643,004 pada pekan sebelumnya.\n'
           '\n'
           'P.H Sekretaris Perusahaan BEI, Aulia Noviana Utami Putri, menyampaikan kapitalisasi pasar juga '
           'turun 6,59 persen menjadi Rp 12.736 triliun dari Rp 13.635 triliun. Rata-rata nilai transaksi '
           'harian ikut melemah 3,67 persen menjadi Rp 19,61 triliun, meski frekuensi transaksi naik 1,09 '
           'persen menjadi 2,75 juta kali. Sementara itu, rata-rata volume transaksi harian meningkat 4,44 '
           'persen menjadi 44,88 miliar lembar saham.\n'
           '\n'
           'Investor asing mencatatkan jual bersih Rp 2,002 triliun pada penutupan Jumat (24/4), dengan '
           'total jual bersih sepanjang 2026 mencapai Rp 42,809 triliun.\n'
           '\n'
           'Di sisi lain, jumlah investor pasar modal terus bertumbuh. Hingga 24 April 2026, total investor '
           'mencapai 26.121.311 SID atau naik 28,37 persen secara year to date, dengan tambahan 5.773.486 '
           'investor baru. Jumlah investor saham juga meningkat menjadi 9.523.625 SID, tumbuh 10,69 persen '
           'sepanjang tahun berjalan.\n'
           '\n'
           '📸: Dok. Antara.\n'
           '\n'
           'Baca selengkapnya dengan klik link di bio. Cari tahu berita update lainnya dengan download '
           'aplikasi kumparan di App Store atau Google Play.\n'
           '\n'
           '📝: bisnisupdate I update I bisnis I oneliner I R074 I E074 I E036\n'
           '\n'
           '#bicarafaktalewatberita #kumparan',
  'content': 'PT Bursa Efek Indonesia melaporkan kinerja Indeks Harga Saham Gabungan (IHSG) selama periode '
             '20–24 April 2026 melemah signifikan. IHSG ditutup di level 7.129,490 atau turun 6,61 persen '
             'dari 7.643,004 pada pekan sebelumnya.\n'
             '\n'
             'P.H Sekretaris Perusahaan BEI, Aulia Noviana Utami Putri, menyampaikan kapitalisasi pasar juga '
             'turun 6,59 persen menjadi Rp 12.736 triliun dari Rp 13.635 triliun. Rata-rata nilai transaksi '
             'harian ikut melemah 3,67 persen menjadi Rp 19,61 triliun, meski frekuensi transaksi naik 1,09 '
             'persen menjadi 2,75 juta kali. Sementara itu, rata-rata volume transaksi harian meningkat 4,44 '
             'persen menjadi 44,88 miliar lembar saham.\n'
             '\n'
             'Investor asing mencatatkan jual bersih Rp 2,002 triliun pada penutupan Jumat (24/4), dengan '
             'total jual bersih sepanjang 2026 mencapai Rp 42,809 triliun.\n'
             '\n'
             'Di sisi lain, jumlah investor pasar modal terus bertumbuh. Hingga 24 April 2026, total '
             'investor mencapai 26.121.311 SID atau naik 28,37 persen secara year to date, dengan tambahan '
             '5.773.486 investor baru. Jumlah investor saham juga meningkat menjadi 9.523.625 SID, tumbuh '
             '10,69 persen sepanjang tahun berjalan.\n'
             '\n'
             '📸: Dok. Antara.\n'
             '\n'
             'Baca selengkapnya dengan klik link di bio. Cari tahu berita update lainnya dengan download '
             'aplikasi kumparan di App Store atau Google Play.\n'
             '\n'
             '📝: bisnisupdate I update I bisnis I oneliner I R074 I E074 I E036\n'
             '\n'
             '#bicarafaktalewatberita #kumparan',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/kumparan/status/2047844330040414634',
  'published_at': 'Sat Apr 25 01:05:10 +0000 2026'},
 {'ticker': 'SRAJ',
  'title': 'Happy birthday my Ajith sir 💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐have a great year sir 💐💐💐💐💐💐💐💐💐🙏sjs',
  'content': 'Happy birthday my Ajith sir 💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐💐have a great year sir 💐💐💐💐💐💐💐💐💐🙏sjs',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/iam_SJSuryah/status/2050156950990782861',
  'published_at': 'Fri May 01 10:14:41 +0000 2026'},
 {'ticker': 'SRAJ',
  'title': 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍوَّعَلَى آلِ مُحَمَّدٍكَمَاصَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى '
           'آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌمَجِيد\n'
           '\n'
           'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍوَّعَلَى آلِ مُحَمَّدٍكَمَابَارَكْتَ عَلَى إِبْرَاهِيمَ '
           'وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌمَّجِيد',
  'content': 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍوَّعَلَى آلِ مُحَمَّدٍكَمَاصَلَّيْتَ عَلَى إِبْرَاهِيمَ '
             'وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌمَجِيد\n'
             '\n'
             'اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍوَّعَلَى آلِ مُحَمَّدٍكَمَابَارَكْتَ عَلَى إِبْرَاهِيمَ '
             'وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌمَّجِيد',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/ChotiSheikhni/status/2048209804351726044',
  'published_at': 'Sun Apr 26 01:17:25 +0000 2026'},
 {'ticker': 'SRAJ',
  'title': '{ رب أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ '
           'أَعْمَلَ صَالِحاً تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ }',
  'content': '{ رب أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ '
             'أَعْمَلَ صَالِحاً تَرْضَاهُ وَأَدْخِلْنِي بِرَحْمَتِكَ فِي عِبَادِكَ الصَّالِحِينَ }',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/xu_sarona/status/2048018435116793959',
  'published_at': 'Sat Apr 25 12:36:59 +0000 2026'},
 {'ticker': 'SRAJ',
  'title': 'هههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههه',
  'content': 'هههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههههه',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/samarrah0/status/2049089151790723391',
  'published_at': 'Tue Apr 28 11:31:38 +0000 2026'},
 {'ticker': 'BBNI',
  'title': 'Andry hakim ada saham BBNI\n'
           '\n'
           'Jumlah saham: 12.000.000 lembar\n'
           'Harga: Rp 3.630\n'
           '\n'
           'Modal = 12.000.000 × 3.630\n'
           '= Rp 43.560.000.000 (± 43,56 Miliar)\n'
           '\n'
           'Dividen: Rp 4.192.960.384 (~4,19 M)\n'
           'Yield:\n'
           '4,19M / 43,56M ≈ 9,6%\n'
           '\n'
           'Modal: ± 43,56 M\n'
           'Dividen: ± 4,19 M/tahun\n'
           'artinya tiap tahun beliau ini bisa beli ferrari cok \n'
           'kalalau mau dari dividen BBNI doang',
  'content': 'Andry hakim ada saham BBNI\n'
             '\n'
             'Jumlah saham: 12.000.000 lembar\n'
             'Harga: Rp 3.630\n'
             '\n'
             'Modal = 12.000.000 × 3.630\n'
             '= Rp 43.560.000.000 (± 43,56 Miliar)\n'
             '\n'
             'Dividen: Rp 4.192.960.384 (~4,19 M)\n'
             'Yield:\n'
             '4,19M / 43,56M ≈ 9,6%\n'
             '\n'
             'Modal: ± 43,56 M\n'
             'Dividen: ± 4,19 M/tahun\n'
             'artinya tiap tahun beliau ini bisa beli ferrari cok \n'
             'kalalau mau dari dividen BBNI doang',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2041056603089277304',
  'published_at': 'Mon Apr 06 07:33:09 +0000 2026'},
 {'ticker': 'BBNI',
  'title': '@LambeSahamjja BBNI akhirnya sadar kalau reputasi itu jauh lebih mahal daripada 28M. Bayangin '
           'kalau nasabah satu Indonesia trust issue gara-gara kasus ini nggak beres, bisa rill goyang itu '
           'saham. Solusinya ya emang harus beresin secepatnya tanpa tapi-tapi lagi. Mari kita kawal',
  'content': '@LambeSahamjja BBNI akhirnya sadar kalau reputasi itu jauh lebih mahal daripada 28M. Bayangin '
             'kalau nasabah satu Indonesia trust issue gara-gara kasus ini nggak beres, bisa rill goyang itu '
             'saham. Solusinya ya emang harus beresin secepatnya tanpa tapi-tapi lagi. Mari kita kawal',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/ojol_naikelas/status/2045795853429002649',
  'published_at': 'Sun Apr 19 09:25:15 +0000 2026'},
 {'ticker': 'BBNI',
  'title': 'Guys update terbaru nih..\n'
           'Bank Negara Indonesia $BBNI \n'
           'buka suara perihal kasus dugaan penggelapan dana jemaat Gereja Katolik Paroki Aek Nabara\n'
           '\n'
           'BNI menyampaikan bahwa pengembalian dana dilakukan dalam minggu ini (Senin–Jumat hari kerja)\n'
           'target pengembalian keseluruhan = selesai dalam minggu berjalan (hari kerja Senin–Jumat)\n'
           'dengan mekanisme bertahap dan perjanjian resmi.\n'
           'Tetap kita kawal......\n'
           'Gk viral gk di gubris',
  'content': 'Guys update terbaru nih..\n'
             'Bank Negara Indonesia $BBNI \n'
             'buka suara perihal kasus dugaan penggelapan dana jemaat Gereja Katolik Paroki Aek Nabara\n'
             '\n'
             'BNI menyampaikan bahwa pengembalian dana dilakukan dalam minggu ini (Senin–Jumat hari kerja)\n'
             'target pengembalian keseluruhan = selesai dalam minggu berjalan (hari kerja Senin–Jumat)\n'
             'dengan mekanisme bertahap dan perjanjian resmi.\n'
             'Tetap kita kawal......\n'
             'Gk viral gk di gubris',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2045724911541588027',
  'published_at': 'Sun Apr 19 04:43:21 +0000 2026'},
 {'ticker': 'BBNI',
  'title': '@Makaryo0 Membayangkan umat Katolik dan yayasan2 dari sekolah, rumah sakit hingga kelompok2 '
           'menarik semua tabungan (rush) dan lepas saham BBNI apa yg akan terjadi?',
  'content': '@Makaryo0 Membayangkan umat Katolik dan yayasan2 dari sekolah, rumah sakit hingga kelompok2 '
             'menarik semua tabungan (rush) dan lepas saham BBNI apa yg akan terjadi?',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/masmadsun63908/status/2045306316043026463',
  'published_at': 'Sat Apr 18 01:00:00 +0000 2026'},
 {'ticker': 'PANI',
  'title': 'Guys, Andry Hakim baru bahas dua saham yang lagi banyak dibicarakan di komunitas investor CBDK '
           'dan PANI.\n'
           '\n'
           'Dan penjelasannya menarik karena dia tidak sekadar bilang beli atau jual. Dia bedah kenapa dua '
           'saham dari grup yang sama bisa punya peran yang sangat berbeda dalam portofolio.\n'
           '\n'
           'CBDK dan PANI satu grup, dua karakter berbeda:\n'
           '\n'
           'CBDK adalah anak perusahaan yang baru IPO. Bisnisnya pusat konvensi dan pendapatan sewa stabil, '
           'predictable, tapi tidak explosive.\n'
           '\n'
           'PANI adalah induknya. Dan ini yang Andry lebih fokus.\n'
           '\n'
           'CBDK itu dividend play masa depan. PANI itu capital gain play sekarang.\n'
           '\n'
           'Dua instrumen berbeda untuk tujuan berbeda.\n'
           '\n'
           'Kenapa Andry lebih pilih PANI:\n'
           '\n'
           'Satu aksi korporasi yang terus bergerak.\n'
           '\n'
           'PANI terus menyuntikkan aset lahan baru ke dalam perusahaan secara berkala. Setiap kali ada aset '
           'baru masuk nilai perusahaan naik. Ini bukan growth yang bergantung pada kondisi pasar semata, '
           'tapi growth yang by design dari manajemen.\n'
           '\n'
           'PANI akan terus berkembang seiring penambahan aset. Nilai perusahaannya berpotensi terus '
           'meningkat."\n'
           '\n'
           'Dua  efisiensi modal untuk investor besar.\n'
           '\n'
           'Di IPO CBDK ada batasan alokasi maksimal sekitar 1,5% per investor. Untuk Andry yang kelola '
           'modal dalam jumlah besar 1,5% dari IPO CBDK itu kecil banget\n'
           '\n'
           'Kalkulasinya sederhana: kalau PANI naik beberapa persen saja dari posisi yang sudah dia pegang — '
           'keuntungannya jauh lebih besar daripada hasil maksimal yang bisa dia dapat dari partisipasi '
           'terbatas di IPO CBDK.\n'
           '\n'
           'Lebih menguntungkan tahan modal besar di PANI. Naik sedikit saja sudah lebih besar hasilnya.\n'
           '\n'
           'Tiga growth masif tetap di induknya.\n'
           '\n'
           'CBDK sebagai anak perusahaan punya peran yang jelas dan terbatas pusat konvensi dan sewa. Tapi '
           'seluruh aset baru yang terus disuntikkan masuk ke PANI sebagai induk. Pertumbuhan nilai yang '
           'paling masif akan tetap terjadi di sana.\n'
           '\n'
           'Lalu apakah CBDK tidak menarik sama sekali?\n'
           '\n'
           'Tidak begitu.\n'
           '\n'
           'CBDK menarik untuk profil investor yang berbeda yang cari stabilitas dan dividend yield di masa '
           'depan ketika bisnisnya sudah mature. Kalau lo investor yang sabar dan tidak butuh capital gain '
           'cepat CBDK bisa masuk watchlist untuk jangka panjang.\n'
           '\n'
           'Tapi kalau lo investor yang orientasinya capital gain dan efisiensi modal dalam kondisi '
           'sekarang, PANI lebih masuk akal menurut Andry.\n'
           '\n'
           '⚠️ Disclaimer: Berdasarkan analisis Andry Hakim dalam videonya. Ini bukan rekomendasi beli atau '
           'jual. Lakukan riset mandiri dan sesuaikan dengan profil risiko lo sebelum mengambil keputusan '
           'investasi apapun.',
  'content': 'Guys, Andry Hakim baru bahas dua saham yang lagi banyak dibicarakan di komunitas investor CBDK '
             'dan PANI.\n'
             '\n'
             'Dan penjelasannya menarik karena dia tidak sekadar bilang beli atau jual. Dia bedah kenapa dua '
             'saham dari grup yang sama bisa punya peran yang sangat berbeda dalam portofolio.\n'
             '\n'
             'CBDK dan PANI satu grup, dua karakter berbeda:\n'
             '\n'
             'CBDK adalah anak perusahaan yang baru IPO. Bisnisnya pusat konvensi dan pendapatan sewa '
             'stabil, predictable, tapi tidak explosive.\n'
             '\n'
             'PANI adalah induknya. Dan ini yang Andry lebih fokus.\n'
             '\n'
             'CBDK itu dividend play masa depan. PANI itu capital gain play sekarang.\n'
             '\n'
             'Dua instrumen berbeda untuk tujuan berbeda.\n'
             '\n'
             'Kenapa Andry lebih pilih PANI:\n'
             '\n'
             'Satu aksi korporasi yang terus bergerak.\n'
             '\n'
             'PANI terus menyuntikkan aset lahan baru ke dalam perusahaan secara berkala. Setiap kali ada '
             'aset baru masuk nilai perusahaan naik. Ini bukan growth yang bergantung pada kondisi pasar '
             'semata, tapi growth yang by design dari manajemen.\n'
             '\n'
             'PANI akan terus berkembang seiring penambahan aset. Nilai perusahaannya berpotensi terus '
             'meningkat."\n'
             '\n'
             'Dua  efisiensi modal untuk investor besar.\n'
             '\n'
             'Di IPO CBDK ada batasan alokasi maksimal sekitar 1,5% per investor. Untuk Andry yang kelola '
             'modal dalam jumlah besar 1,5% dari IPO CBDK itu kecil banget\n'
             '\n'
             'Kalkulasinya sederhana: kalau PANI naik beberapa persen saja dari posisi yang sudah dia pegang '
             '— keuntungannya jauh lebih besar daripada hasil maksimal yang bisa dia dapat dari partisipasi '
             'terbatas di IPO CBDK.\n'
             '\n'
             'Lebih menguntungkan tahan modal besar di PANI. Naik sedikit saja sudah lebih besar hasilnya.\n'
             '\n'
             'Tiga growth masif tetap di induknya.\n'
             '\n'
             'CBDK sebagai anak perusahaan punya peran yang jelas dan terbatas pusat konvensi dan sewa. Tapi '
             'seluruh aset baru yang terus disuntikkan masuk ke PANI sebagai induk. Pertumbuhan nilai yang '
             'paling masif akan tetap terjadi di sana.\n'
             '\n'
             'Lalu apakah CBDK tidak menarik sama sekali?\n'
             '\n'
             'Tidak begitu.\n'
             '\n'
             'CBDK menarik untuk profil investor yang berbeda yang cari stabilitas dan dividend yield di '
             'masa depan ketika bisnisnya sudah mature. Kalau lo investor yang sabar dan tidak butuh capital '
             'gain cepat CBDK bisa masuk watchlist untuk jangka panjang.\n'
             '\n'
             'Tapi kalau lo investor yang orientasinya capital gain dan efisiensi modal dalam kondisi '
             'sekarang, PANI lebih masuk akal menurut Andry.\n'
             '\n'
             '⚠️ Disclaimer: Berdasarkan analisis Andry Hakim dalam videonya. Ini bukan rekomendasi beli '
             'atau jual. Lakukan riset mandiri dan sesuaikan dengan profil risiko lo sebelum mengambil '
             'keputusan investasi apapun.',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2043287896187420995',
  'published_at': 'Sun Apr 12 11:19:31 +0000 2026'},
 {'ticker': 'PANI',
  'title': 'Guys, Andry Hakim orang yang pernah pegang PANI dari puluhan miliar jadi ratusan miliar, hampir '
           '2.000% return baru ngobrol soal satu pertanyaan yang paling banyak ditanyakan ke dia.\n'
           '\n'
           'Saham apa yang bisa jadi PANI berikutnya? \n'
           'Dan gimana cara nemunya?\n'
           '\n'
           'Tapi sebelum itu  dia koreksi satu miskonsepsi besar dulu.\n'
           'Selama ini beredar narasi di komunitas saham: \n'
           'cari Ferrari harga Bajaj \n'
           'alias value investing, beli yang murah.\n'
           'Andry tidak setuju sepenuhnya.\n'
           '\n'
           'Bukan berarti value investing salah. \n'
           'Tapi dia kasih contoh nyata Panin, BMTR. \n'
           'Murah? \n'
           'Murah banget. \n'
           'Sudah bertahun-tahun murah. \n'
           'Dan tidak naik-naik.\n'
           '\n'
           'Jam tangan di Mangga Dua murah tapi murahnya tetap. \n'
           'Tidak naik. \n'
           'Sedangkan Rolex mahaltapi tahun depan makin mahal.\n'
           'Jadi prinsipnya bukan cari yang murah. \n'
           'Tapi cari yang akan bergerak. \n'
           'Dan itu berbeda.\n'
           '\n'
           'Lalu apa yang dia cari?\n'
           'Corporate action dan story.\n'
           '\n'
           'Andry tidak beli saham lalu tunggu pasar mengapresiasi fundamental. \n'
           'Dia beli saham yang punya story yang belum selesai biasanya berupa corporate action yang akan '
           'datang.\n'
           '\n'
           'Contoh konkret yang dia kasih: CBRE.\n'
           '\n'
           'Waktu dia akumulasi, market cap-nya masih ratusan miliar. Lalu dia dengar kabar perusahaan mau '
           'inject kapal senilai Rp1,8 triliun.\n'
           '\n'
           '"Market cap 100 miliar, aset yang mau masuk 1,8 triliun itu 18 kali lipat. \n'
           'Ya udah gue beli terus."\n'
           '\n'
           'Dia akumulasi terus dari harga 75-100 perak. \n'
           'Beli terus. Tidak peduli naik turun setelah itu.\n'
           'Yang penting dia corporate action nanti gue tebus.\n'
           '\n'
           'Cara mainnya:\n'
           'Beli dari ada rumor corporate action. Akumulasi. Tunggu sampai corporate action-nya benar-benar '
           'terjadi. Tebus. Selesai.\n'
           '\n'
           'Bukan beli hari ini jual besok. Bukan beli karena grafik bagus. Tapi beli karena ada cerita yang '
           'belum selesai dan tunggu sampai ceritanya selesai.\n'
           '\n'
           'PANI dia pegang hampir 4 tahun. ARTO 2,5 tahun. BBHI 1,5 tahun.\n'
           '\n'
           'Napas gue panjang  itu kenapa gue bisa menang di market.\n'
           'Dan ini yang paling bikin gue diam.\n'
           '\n'
           'Andry cerita waktu lulus kuliah dari Amerika, dia bawa pulang sekitar Rp500 juta dari hasil '
           'jualan di Amazon.\n'
           '\n'
           'Uang itu dia pakai buat bisnis macam-macam. 8 tahun berlalu. Untung rugi, untung rugi. Di 2020 '
           'uangnya masih Rp1 miliar. 8 tahun hanya untuk menggandakan 2x.\n'
           '\n'
           'Lalu dia hitung ulang. Kalau Rp500 juta itu langsung ditaruh di saham BCA dari awal tidak '
           'disentuh — sekarang bisa jadi Rp5 sampai 10 miliar. Tanpa kerja keras bisnis. Tanpa drama.\n'
           '\n'
           'Gue buang-buang umur 8 tahun cuma buat jalan di tempat.\n'
           '\n'
           'Dan soal PTRO yang cut loss Rp2,6 miliar:\n'
           'Dia beli PTRO di harga 11.000 karena ada isu masuk MSCI target harga 15.000. Tapi flow penjualan '
           'terlalu besar, drawdown kelihatan bakal panjang.\n'
           '\n'
           'Keputusannya: cut loss di 9.000-10.000. \n'
           'Rugi Rp2,6 miliar dari modal sekitar Rp20 miliar.\n'
           'Daripada gue nyangkut lama mending cut loss, redirect ke saham yang lebih jelas story-nya.\n'
           '\n'
           'Dari sisa modal yang ada dia averaging down ke bank-bank besar yang turun: Mandiri, BNI, dan '
           'saham-saham lain yang corporate action-nya masih jelas.\n'
           '\n'
           'Dan sekarang posisi Andry?\n'
           'Dari portofolionya dividen saja sudah cukup untuk hidup. Dia sudah tidak agresif seperti dulu. '
           'Tidak all-in. Tidak cacing naga setiap hari.\n'
           '\n'
           'Sekarang dia defensif taruh sedikit di sana, sedikit di sini. Gulung terus. Withdraw jarang.',
  'content': 'Guys, Andry Hakim orang yang pernah pegang PANI dari puluhan miliar jadi ratusan miliar, '
             'hampir 2.000% return baru ngobrol soal satu pertanyaan yang paling banyak ditanyakan ke dia.\n'
             '\n'
             'Saham apa yang bisa jadi PANI berikutnya? \n'
             'Dan gimana cara nemunya?\n'
             '\n'
             'Tapi sebelum itu  dia koreksi satu miskonsepsi besar dulu.\n'
             'Selama ini beredar narasi di komunitas saham: \n'
             'cari Ferrari harga Bajaj \n'
             'alias value investing, beli yang murah.\n'
             'Andry tidak setuju sepenuhnya.\n'
             '\n'
             'Bukan berarti value investing salah. \n'
             'Tapi dia kasih contoh nyata Panin, BMTR. \n'
             'Murah? \n'
             'Murah banget. \n'
             'Sudah bertahun-tahun murah. \n'
             'Dan tidak naik-naik.\n'
             '\n'
             'Jam tangan di Mangga Dua murah tapi murahnya tetap. \n'
             'Tidak naik. \n'
             'Sedangkan Rolex mahaltapi tahun depan makin mahal.\n'
             'Jadi prinsipnya bukan cari yang murah. \n'
             'Tapi cari yang akan bergerak. \n'
             'Dan itu berbeda.\n'
             '\n'
             'Lalu apa yang dia cari?\n'
             'Corporate action dan story.\n'
             '\n'
             'Andry tidak beli saham lalu tunggu pasar mengapresiasi fundamental. \n'
             'Dia beli saham yang punya story yang belum selesai biasanya berupa corporate action yang akan '
             'datang.\n'
             '\n'
             'Contoh konkret yang dia kasih: CBRE.\n'
             '\n'
             'Waktu dia akumulasi, market cap-nya masih ratusan miliar. Lalu dia dengar kabar perusahaan mau '
             'inject kapal senilai Rp1,8 triliun.\n'
             '\n'
             '"Market cap 100 miliar, aset yang mau masuk 1,8 triliun itu 18 kali lipat. \n'
             'Ya udah gue beli terus."\n'
             '\n'
             'Dia akumulasi terus dari harga 75-100 perak. \n'
             'Beli terus. Tidak peduli naik turun setelah itu.\n'
             'Yang penting dia corporate action nanti gue tebus.\n'
             '\n'
             'Cara mainnya:\n'
             'Beli dari ada rumor corporate action. Akumulasi. Tunggu sampai corporate action-nya '
             'benar-benar terjadi. Tebus. Selesai.\n'
             '\n'
             'Bukan beli hari ini jual besok. Bukan beli karena grafik bagus. Tapi beli karena ada cerita '
             'yang belum selesai dan tunggu sampai ceritanya selesai.\n'
             '\n'
             'PANI dia pegang hampir 4 tahun. ARTO 2,5 tahun. BBHI 1,5 tahun.\n'
             '\n'
             'Napas gue panjang  itu kenapa gue bisa menang di market.\n'
             'Dan ini yang paling bikin gue diam.\n'
             '\n'
             'Andry cerita waktu lulus kuliah dari Amerika, dia bawa pulang sekitar Rp500 juta dari hasil '
             'jualan di Amazon.\n'
             '\n'
             'Uang itu dia pakai buat bisnis macam-macam. 8 tahun berlalu. Untung rugi, untung rugi. Di 2020 '
             'uangnya masih Rp1 miliar. 8 tahun hanya untuk menggandakan 2x.\n'
             '\n'
             'Lalu dia hitung ulang. Kalau Rp500 juta itu langsung ditaruh di saham BCA dari awal tidak '
             'disentuh — sekarang bisa jadi Rp5 sampai 10 miliar. Tanpa kerja keras bisnis. Tanpa drama.\n'
             '\n'
             'Gue buang-buang umur 8 tahun cuma buat jalan di tempat.\n'
             '\n'
             'Dan soal PTRO yang cut loss Rp2,6 miliar:\n'
             'Dia beli PTRO di harga 11.000 karena ada isu masuk MSCI target harga 15.000. Tapi flow '
             'penjualan terlalu besar, drawdown kelihatan bakal panjang.\n'
             '\n'
             'Keputusannya: cut loss di 9.000-10.000. \n'
             'Rugi Rp2,6 miliar dari modal sekitar Rp20 miliar.\n'
             'Daripada gue nyangkut lama mending cut loss, redirect ke saham yang lebih jelas story-nya.\n'
             '\n'
             'Dari sisa modal yang ada dia averaging down ke bank-bank besar yang turun: Mandiri, BNI, dan '
             'saham-saham lain yang corporate action-nya masih jelas.\n'
             '\n'
             'Dan sekarang posisi Andry?\n'
             'Dari portofolionya dividen saja sudah cukup untuk hidup. Dia sudah tidak agresif seperti dulu. '
             'Tidak all-in. Tidak cacing naga setiap hari.\n'
             '\n'
             'Sekarang dia defensif taruh sedikit di sana, sedikit di sini. Gulung terus. Withdraw jarang.',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/LambeSahamjja/status/2042178192014991799',
  'published_at': 'Thu Apr 09 09:49:57 +0000 2026'},
 {'ticker': 'PANI',
  'title': '💚 dulu gajian🥰🥰🥰🥰🥳🥰🥳🥰🥳🥰😍😙😚😘🤩\nskg gajian😊🥰🥹😩🥺🥲🥺😖😫🙁😕😟😔',
  'content': '💚 dulu gajian🥰🥰🥰🥰🥳🥰🥳🥰🥳🥰😍😙😚😘🤩\nskg gajian😊🥰🥹😩🥺🥲🥺😖😫🙁😕😟😔',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/tanyarlfes/status/2047970140134813942',
  'published_at': 'Sat Apr 25 09:25:05 +0000 2026'},
 {'ticker': 'PANI',
  'title': 'ㅤㅤ\nㅤㅤ\n𝗣𝗘𝗥𝗘𝗠𝗣𝗨𝗔𝗡 𝗕𝗘𝗥𝗡𝗬𝗔𝗡𝗬𝗜\n⋮ ⌗ ┆Selasa, 21 April 2026.\nㅤㅤ\nㅤㅤ https://t.co/xa9tstXXew',
  'content': 'ㅤㅤ\nㅤㅤ\n𝗣𝗘𝗥𝗘𝗠𝗣𝗨𝗔𝗡 𝗕𝗘𝗥𝗡𝗬𝗔𝗡𝗬𝗜\n⋮ ⌗ ┆Selasa, 21 April 2026.\nㅤㅤ\nㅤㅤ https://t.co/xa9tstXXew',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/anaraswata/status/2048278525913010622',
  'published_at': 'Sun Apr 26 05:50:30 +0000 2026'},
 {'ticker': 'DNET',
  'title': 'UPDATE 🎴\n'
           '\n'
           '🌴 $DSNG laba Q1 2026 naik 15% jadi IDR 421 M! Revenue IDR 2,9 T (+8%), CPO sales +18%. Saham '
           'melonjak 6,74% hari ini, +20,93% YTD! Tapi wood segment lesu -63,2% karena tarif AS. 📈 #IHSG '
           '#Sawit #CPO #SahamIndonesia #PalmOil\n'
           '\n'
           'Source: IDN FInancials',
  'content': 'UPDATE 🎴\n'
             '\n'
             '🌴 $DSNG laba Q1 2026 naik 15% jadi IDR 421 M! Revenue IDR 2,9 T (+8%), CPO sales +18%. Saham '
             'melonjak 6,74% hari ini, +20,93% YTD! Tapi wood segment lesu -63,2% karena tarif AS. 📈 #IHSG '
             '#Sawit #CPO #SahamIndonesia #PalmOil\n'
             '\n'
             'Source: IDN FInancials',
  'tag': 'Positive',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/bullandbear_id/status/2048741408002179136',
  'published_at': 'Mon Apr 27 12:29:50 +0000 2026'},
 {'ticker': 'DNET',
  'title': 'MAK KAU MERAH AH SIALLLLL 😭😭😭😭😭😭😭😭😭😭😭',
  'content': 'MAK KAU MERAH AH SIALLLLL 😭😭😭😭😭😭😭😭😭😭😭',
  'tag': 'Negative',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/deangyut/status/2049803146084708602',
  'published_at': 'Thu Apr 30 10:48:48 +0000 2026'},
 {'ticker': 'DNET',
  'title': 'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'ᅠ\n'
           '\n'
           'pembersihan tl 1',
  'content': 'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'ᅠ\n'
             '\n'
             'pembersihan tl 1',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/AstroDiiamond/status/2048722324354936854',
  'published_at': 'Mon Apr 27 11:14:00 +0000 2026'},
 {'ticker': 'DNET',
  'title': 'ㅤ️️ ️️\nㅤ️️ ️️\nDyem di sini adanya si como \n \n ️️\nㅤ️️',
  'content': 'ㅤ️️ ️️\nㅤ️️ ️️\nDyem di sini adanya si como \n \n ️️\nㅤ️️',
  'tag': 'Neutral',
  'source': 'Dataset Sentimen X/Twitter',
  'url': 'https://x.com/guratiIusi/status/2047912514181275985',
  'published_at': 'Sat Apr 25 05:36:06 +0000 2026'},
 {'ticker': 'IHSG',
  'title': 'Pasar bergerak selektif; investor memantau sentimen emiten big cap dan arah suku bunga.',
  'content': 'Pasar bergerak selektif; investor memantau sentimen emiten big cap dan arah suku bunga.',
  'tag': 'Neutral',
  'source': 'FinSight Dataset',
  'url': '',
  'published_at': ''}]

FALLBACK_IHSG = {
    "value": 7412.0,
    "formatted": "7.412",
    "change": 0.64,
    "change_str": "+0.64%",
    "up": True,
}
