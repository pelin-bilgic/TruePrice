const BASE = import.meta.env.VITE_API_URL || 'https://trueprice-production.up.railway.app';

const MOCK_DATA = [
  {
    "id": "laptop_001", "ad": "ProBook X14 Slim", "fiyat": 38499, "site": "Trendyol", "puan": 4.3, "kategori": "laptop",
    "ozellikler": ["14 inç", "1.4 kg", "Intel Core i5", "16GB RAM", "512GB SSD", "14 saat batarya", "Wi-Fi 6"],
    "yorumOzeti": "Hafifliği ve batarya ömrü çok iyi, ekranı biraz soluk kalıyor.", "kronikSorun": "Klavye ısınması uzun kullanımda hissediliyor",
    "profilSkor": { "ogrenci": 88, "yazilimci": 85, "oyuncu": 42 }
  },
  {
    "id": "laptop_002", "ad": "SwiftAir Pro 15", "fiyat": 52900, "site": "Hepsiburada", "puan": 4.6, "kategori": "laptop",
    "ozellikler": ["15.6 inç", "1.8 kg", "Intel Core i7", "32GB RAM", "1TB SSD", "10 saat batarya", "Thunderbolt 4"],
    "yorumOzeti": "Performansı mükemmel, programcılar için ideal. Biraz ağır.", "kronikSorun": "Şarj adaptörü büyük ve hantal",
    "profilSkor": { "ogrenci": 70, "yazilimci": 96, "oyuncu": 68 }
  },
  {
    "id": "laptop_003", "ad": "BudgetMax A12", "fiyat": 27999, "site": "Trendyol", "puan": 3.8, "kategori": "laptop",
    "ozellikler": ["14 inç", "1.9 kg", "AMD Ryzen 5", "8GB RAM", "256GB SSD", "7 saat batarya"],
    "yorumOzeti": "Fiyatına göre iyi, ama RAM yetersiz kalıyor.", "kronikSorun": "Ekran kalitesi düşük, güneş altında görünmüyor",
    "profilSkor": { "ogrenci": 75, "yazilimci": 48, "oyuncu": 35 }
  },
  {
    "id": "laptop_004", "ad": "GameForce G15 RTX", "fiyat": 67500, "site": "Hepsiburada", "puan": 4.4, "kategori": "laptop",
    "ozellikler": ["15.6 inç", "2.4 kg", "Intel Core i7", "16GB RAM", "512GB SSD", "RTX 4060", "165Hz ekran"],
    "yorumOzeti": "Oyun performansı harika, pil ömrü berbat.", "kronikSorun": "Şarjsız 2.5 saatten fazla dayanmıyor, fan gürültülü",
    "profilSkor": { "ogrenci": 38, "yazilimci": 62, "oyuncu": 95 }
  },
  {
    "id": "laptop_005", "ad": "UltraSlim Z360", "fiyat": 44900, "site": "Trendyol", "puan": 4.1, "kategori": "laptop",
    "ozellikler": ["13.3 inç", "1.2 kg", "Intel Core i5", "16GB RAM", "512GB SSD", "12 saat batarya", "OLED ekran"],
    "yorumOzeti": "OLED ekranı muhteşem, gövde plastik hissettiriyor.", "kronikSorun": "USB-A portu yok, adaptör gerekiyor",
    "profilSkor": { "ogrenci": 82, "yazilimci": 80, "oyuncu": 30 }
  },
  {
    "id": "telefon_001", "ad": "PulsePhone X12 Pro", "fiyat": 34990, "site": "Trendyol", "puan": 4.5, "kategori": "telefon",
    "ozellikler": ["6.7 inç AMOLED", "5G", "256GB", "50MP kamera", "5000mAh", "120Hz", "IP68"],
    "yorumOzeti": "Kamera performansı mükemmel, batarya ömrü harika.", "kronikSorun": "Şarj adaptörü kutuda yok",
    "profilSkor": { "ogrenci": 75, "yazilimci": 80, "oyuncu": 85 }
  },
  {
    "id": "telefon_002", "ad": "BudgetDroid A8", "fiyat": 12500, "site": "Hepsiburada", "puan": 3.7, "kategori": "telefon",
    "ozellikler": ["6.5 inç IPS", "4G", "128GB", "48MP kamera", "4000mAh", "60Hz"],
    "yorumOzeti": "Fiyatına göre iyi, ama işlemci zaman zaman takılıyor.", "kronikSorun": "Güncelleme desteği 1 yılda bitiyor",
    "profilSkor": { "ogrenci": 80, "yazilimci": 45, "oyuncu": 38 }
  },
  {
    "id": "telefon_003", "ad": "NovaSmart Z40 Ultra", "fiyat": 52000, "site": "Trendyol", "puan": 4.8, "kategori": "telefon",
    "ozellikler": ["6.8 inç OLED", "5G", "512GB", "200MP kamera", "5500mAh", "144Hz", "IP68", "65W hızlı şarj"],
    "yorumOzeti": "Piyasanın en iyi kamerasına sahip.", "kronikSorun": "Büyük boyutu tek elle kullanımı zorlaştırıyor",
    "profilSkor": { "ogrenci": 62, "yazilimci": 85, "oyuncu": 90 }
  },
  {
    "id": "tablet_001", "ad": "TabMax Pro 11", "fiyat": 22500, "site": "Trendyol", "puan": 4.4, "kategori": "tablet",
    "ozellikler": ["11 inç", "128GB", "Wi-Fi + 4G", "8500mAh", "Kalem desteği", "120Hz"],
    "yorumOzeti": "Kalem hassasiyeti mükemmel, not almak için ideal.", "kronikSorun": "Kalem ayrıca satılıyor",
    "profilSkor": { "ogrenci": 90, "yazilimci": 72, "oyuncu": 65 }
  },
  {
    "id": "tablet_002", "ad": "GameTab GT8 Pro", "fiyat": 19800, "site": "Hepsiburada", "puan": 4.3, "kategori": "tablet",
    "ozellikler": ["8.7 inç", "128GB", "Wi-Fi + 5G", "7250mAh", "120Hz", "Oyun modlu işlemci"],
    "yorumOzeti": "Tablet oyunculuğunda rakipsiz, ekran çok akıcı.", "kronikSorun": "Oyun modunda ısınma belirgin",
    "profilSkor": { "ogrenci": 48, "yazilimci": 42, "oyuncu": 92 }
  },
];

const TRUEPRICE_KATSAYILARI = {
  laptop:  { bakim: 0.08, aksesuar: 0.12, yazilim: 0.05 },
  telefon: { bakim: 0.06, aksesuar: 0.10, operator: 0.30 },
  tablet:  { bakim: 0.05, aksesuar: 0.08, uygulama: 0.04 },
};

function hesaplaTruePrice(fiyat, kategori) {
  const k = TRUEPRICE_KATSAYILARI[kategori] || { bakim: 0.07, aksesuar: 0.10 };
  const toplam = Object.values(k).reduce((a, b) => a + b, 0);
  return Math.round(fiyat * (1 + toplam * 3));
}

export async function searchProducts(query, profil = 'genel') {
  const q = query.toLowerCase();
  let sonuclar = MOCK_DATA.filter(u =>
    u.ad.toLowerCase().includes(q) ||
    u.kategori.toLowerCase().includes(q) ||
    u.ozellikler.some(o => o.toLowerCase().includes(q)) ||
    q.includes(u.kategori)
  );

  if (sonuclar.length === 0) sonuclar = MOCK_DATA.slice(0, 5);

  const profilKey = profil === 'ogrenci' ? 'ogrenci' : profil === 'yazilimci' ? 'yazilimci' : profil === 'oyuncu' ? 'oyuncu' : null;

  return sonuclar
    .map(u => ({ ...u, trueprice: hesaplaTruePrice(u.fiyat, u.kategori) }))
    .sort((a, b) => profilKey ? (b.profilSkor[profilKey] || 0) - (a.profilSkor[profilKey] || 0) : b.puan - a.puan);
}
export async function getTruePrice(urunId) {
  const urun = MOCK_DATA.find(u => u.id === urunId);
  if (!urun) throw new Error('Ürün bulunamadı');
  const f = urun.fiyat;
  const kat = urun.kategori || 'laptop';
  const k = { laptop: [0.12, 0.08, 420, 0.35], telefon: [0.15, 0.10, 120, 0.45], tablet: [0.10, 0.06, 200, 0.30] };
  const [aksesuar_r, bakim_r, enerji, deger_r] = k[kat] || k.laptop;
  const aksesuar = Math.round(f * aksesuar_r);
  const bakim = Math.round(f * bakim_r * 3);
  const enerji_3 = enerji * 3;
  const deger_k = Math.round(f * deger_r);
  return {
    etiket_fiyat: f,
    true_price: Math.round(f + aksesuar + bakim + enerji_3 + deger_k),
    breakdown: {
      aksesuar,
      bakim_3yil: bakim,
      enerji_3yil: Math.round(enerji_3),
      deger_kaybi: deger_k,
    },
  };
}