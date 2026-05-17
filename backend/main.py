from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="TruePrice AI",
    description="Akıllı alışveriş ve gerçek maliyet platformu",
    version="0.1.0"
)

# CORS — React frontend'in backend'e istek atabilmesi için
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Deploy'da Vercel URL'inle değiştir
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
    Kullanıcının doğal dil sorgusunu alır, mock veri üzerinden
    eşleşen ürünleri puana göre sıralı döndürür.
    Şu an: coming soon — Görev 5 ve 6'da tamamlanacak.
    """
    return {
        "status": "coming_soon",
        "sorgu": req.sorgu,
        "profil": req.profil,
        "sonuclar": []
    }


@app.post("/trueprice")
def trueprice(req: TruePriceRequest):
    """
    Ürün ID veya {fiyat, kategori} alır.
    3 yıllık toplam maliyet hesabını ve breakdown'ını döndürür.
    Şu an: coming soon — Görev 7 ve 8'de tamamlanacak.
    """
    return {
        "status": "coming_soon",
        "urun_id": req.urun_id,
        "etiket_fiyat": req.fiyat,
        "trueprice": None,
        "breakdown": {}
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