# TruePrice AI 🧾
# Katkıda Bulunanlar 
- Hayat Ay
-  Avşin Pelin Bilgiç
-  Beray Akar

> **E-ticaret siteleri size fiyat gösterir. Biz gerçeği gösteriyoruz.**

TruePrice AI, Türkiye'deki alışveriş kararlarını dönüştüren yeni nesil bir platformdur. Kullanıcı istediği ürünü doğal dille tarif eder; yapay zeka tüm e-ticaret sitelerini tarar, yorumları analiz eder ve **etiket fiyatının arkasındaki gerçek maliyeti** hesaplar.

---

## 🔍 Neden TruePrice?

Bir ürünün fiyat etiketi yalnızca satın alma bedelini gösterir. Gerçek maliyet çok daha fazlasını içerir:

| Görünen | Gizlenen |
|---|---|
| Etiket fiyatı | Yıllık bakım maliyeti |
| — | Zorunlu aksesuarlar |
| — | Enerji / şarj tüketimi |
| — | 3. yılda değer kaybı |

Bir 38.499 TL laptop, 3 yılda size **52.000 TL'ye** mal olabilir. TruePrice bunu önceden gösterir.

---

## ✨ Özellikler

- 🗣️ **Doğal dil arama** — "Yazılım için hafif laptop, 40k altı" yaz, kriterlere dönüştürür
- 💸 **TruePrice hesabı** — 3 yıllık toplam sahip olma maliyeti
- 👤 **Kullanıcı profili** — Aynı ürün öğrenci, yazılımcı ve oyuncu için farklı skorlanır
- 🛡️ **Manipülasyon tespiti** — Sponsorlu ürünler ve sahte yorumlar işaretlenir
- 🛒 **Sepet optimizasyonu** — AI daha ucuz alternatif ve uyumlu kombinasyon önerir

---

## 🏗️ Mimari

```
trueprice-ai/
├── backend/          # FastAPI — AI motoru ve API endpoint'leri
│   ├── main.py
│   ├── requirements.txt
│   └── .env.ornek
├── frontend/         # React + Vite — Kullanıcı arayüzü
├── data/             # Mock veri seti ve TruePrice katsayıları
└── docs/             # Sunum, senaryo ve teknik belgeler
```

### Tech Stack

| Katman | Teknoloji |
|---|---|
| Backend | Python · FastAPI · Uvicorn |
| AI | OpenAI API (GPT-4o) |
| Frontend | React · Vite · Tailwind CSS |
| Deploy | Railway (backend) · Vercel (frontend) |

---

## 🚀 Kurulum

### Gereksinimler

- Python 3.10+
- Node.js 18+
- OpenAI API key ([platform.openai.com](https://platform.openai.com))

### Backend

```bash
cd backend
pip install -r requirements.txt

# .env.ornek dosyasını kopyala ve düzenle
cp .env.ornek .env
# OPENAI_API_KEY=sk-...

uvicorn main:app --reload
```

Swagger arayüzü: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoint'leri

| Method | Endpoint | Açıklama |
|---|---|---|
| `GET` | `/` | Sağlık kontrolü |
| `POST` | `/search` | Doğal dil sorgusu → ürün listesi |
| `POST` | `/trueprice` | Ürün ID veya {fiyat, kategori} → maliyet hesabı |
| `GET` | `/compare` | İki ürünü TruePrice bazında karşılaştır |

### Örnek İstek — `/search`

```json
{
  "sorgu": "yazılım için hafif laptop 40k altı",
  "profil": "yazilimci"
}
```

### Örnek Yanıt — `/trueprice`

```json
{
  "urun_id": "laptop_001",
  "etiket_fiyat": 38499,
  "trueprice": 52340,
  "breakdown": {
    "bakim": 3080,
    "aksesuar": 4620,
    "enerji": 2141,
    "deger_kaybi": 13475
  }
}
```

---

## 🎯 Demo Senaryoları

Demo sırasında 3 senaryo gösterilecektir:

1. **TruePrice farkı** — "Yazılım için hafif laptop, 40k altı" sorgusu; etiket vs gerçek maliyet yan yana
2. **Profil etkisi** — Aynı sorgu önce öğrenci, sonra yazılımcı profiliyle; sıralama nasıl değişiyor
3. **Sepet optimizasyonu** — Laptop sepete eklendi, AI 3.200 TL daha ucuz alternatif öneriyor

---

## 🗺️ Yol Haritası

| Faz | Süre | Kapsam |
|---|---|---|
| **MVP** | Şimdi | 2 site · Elektronik · Web |
| **Genişlet** | Ay 1–2 | Amazon TR, Teknosa · API anlaşmaları |
| **Derinleştir** | Ay 3–4 | Yorum analizi · Sahte yorum tespiti · Fiyat alarmı |
| **Platform** | Ay 5–6 | Browser extension · Mobil uygulama · B2B API |

---

## 💰 Gelir Modeli

- **Affiliate komisyonu** — Yönlendirme başına e-ticaret sitelerinden komisyon *(şeffaf badge ile)*
- **Premium üyelik** — Gelişmiş TruePrice analizi ve kişisel raporlar
- **B2B API** — E-ticaret sitelerine TruePrice badge lisansı

---

## 👥 Ekip

| Rol | Sorumluluk |
|---|---|
| **Backend & AI** | FastAPI · OpenAI entegrasyonu · TruePrice motoru |
| **Veri & Test** | Mock veri seti · Katsayı araştırması · Demo senaryoları |
| **Frontend & Sunum** | React UI · Slaytlar · Pitch |

---

## ⚠️ Önemli Notlar

- Bu proje şu an **demo aşamasında** olup mock veri kullanmaktadır
- `.env` dosyasını **asla** git'e push'lamayın — `.gitignore` ile korunmaktadır
- Affiliate linkleri şeffaf biçimde "Reklamlı" etiketiyle işaretlenmektedir

---

<p align="center">
  <em>"E-ticaret siteleri size fiyat gösterir. Biz gerçeği gösteriyoruz."</em>
</p>
