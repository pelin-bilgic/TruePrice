from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Gemini'ye bağlan
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(
    title="TruePrice AI",
    description="Akıllı alışveriş ve gerçek maliyet platformu",
    version="0.1.0"
)

# CORS — React frontend'in backend'e istek atabilmesi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Request modelleri ──────────────────────────────────────────────

class SearchRequest(BaseModel):
    sorgu: str                        # "yazılım için hafif laptop 40k altı"
    profil: Optional[str] = None      # "ogrenci" | "yazilimci" | "oyuncu"

class TruePriceRequest(BaseModel):
    urun_id: Optional[str] = None
    fiyat: Optional[float] = None
    kategori: Optional[str] = None    # "laptop" | "telefon" | "tablet"


# ── Endpoint'ler ───────────────────────────────────────────────────

@app.get("/")
def root():
    return {"mesaj": "TruePrice AI backend çalışıyor 🚀"}


@app.post("/search")
def search(req: SearchRequest):
    """
    Kullanıcının doğal dil sorgusunu Gemini ile analiz eder,
    arama kriterlerini çıkarır.
    """
    prompt = f"""
    Kullanıcı şunu yazdı: "{req.sorgu}"
    Kullanıcı profili: "{req.profil or 'belirtilmedi'}"
    
    Bu metinden alışveriş kriterlerini çıkar ve SADECE JSON döndür:
    {{
        "kategori": "laptop veya telefon veya tablet",
        "butce_max": sayı (TL cinsinden, belirtilmediyse null),
        "ozellikler": ["özellik1", "özellik2"],
        "profil": "ogrenci veya yazilimci veya oyuncu veya genel"
    }}
    
    Başka hiçbir şey yazma, sadece JSON.
    """

    try:
        response = model.generate_content(prompt)
        temiz = response.text.strip().replace("```json", "").replace("```", "")
        kriterler = json.loads(temiz)
        return {
            "status": "ok",
            "sorgu": req.sorgu,
            "kriterler": kriterler,
            "sonuclar": []  # Kisi 2'nin mock verisi gelince dolacak
        }
    except Exception as e:
        return {"status": "hata", "mesaj": str(e)}


@app.post("/trueprice")
def trueprice(req: TruePriceRequest):
    """
    Ürün fiyatı ve kategorisine göre 3 yıllık gerçek maliyeti hesaplar.
    """
    if not req.fiyat or not req.kategori:
        return {"status": "hata", "mesaj": "fiyat ve kategori gerekli"}

    # Kategori bazlı katsayılar
    katsayilar = {
        "laptop": {
            "bakim": 0.08,
            "aksesuar": 0.12,
            "enerji": 0.056,
            "deger_kaybi": 0.35
        },
        "telefon": {
            "bakim": 0.10,
            "aksesuar": 0.15,
            "enerji": 0.01,
            "deger_kaybi": 0.45
        },
        "tablet": {
            "bakim": 0.07,
            "aksesuar": 0.10,
            "enerji": 0.02,
            "deger_kaybi": 0.40
        }
    }

    k = katsayilar.get(req.kategori.lower(), katsayilar["laptop"])
    fiyat = req.fiyat

    bakim = round(fiyat * k["bakim"] * 3)
    aksesuar = round(fiyat * k["aksesuar"])
    enerji = round(fiyat * k["enerji"] * 3)
    deger_kaybi = round(fiyat * k["deger_kaybi"])
    trueprice_toplam = round(fiyat + bakim + aksesuar + enerji + deger_kaybi)

    return {
        "status": "ok",
        "urun_id": req.urun_id,
        "etiket_fiyat": fiyat,
        "trueprice": trueprice_toplam,
        "fark": trueprice_toplam - fiyat,
        "breakdown": {
            "bakim": bakim,
            "aksesuar": aksesuar,
            "enerji": enerji,
            "deger_kaybi": deger_kaybi
        }
    }


@app.get("/compare")
def compare(urun_id_1: str, urun_id_2: str):
    """
    İki ürünü TruePrice bazında karşılaştırır.
    Şu an: coming soon.
    """
    return {
        "status": "coming_soon",
        "urun_1": urun_id_1,
        "urun_2": urun_id_2,
        "kazanan": None
    }
