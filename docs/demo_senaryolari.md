# TruePrice Demo Senaryoları
## Anlatım Metni + Tıklama Sırası + Beklenen Çıktılar

---

## 🎯 Genel İpuçları
- Toplam demo süresi: ~3.5 dakika (3 senaryo + geçişler)
- Senaryo 1: ~60 sn / Senaryo 2: ~75 sn / Senaryo 3: ~75 sn
- Konuşma akışı: **Problem → Eylem → "Bakın ne oldu" → Sonuç**
- Kişi 3 slaytları, sen demoyı yapıyorsun
- Sinirli ya da hızlı konuşma: yavaşla, jüri takip etmeli

---

## 📋 Senaryo 1 — Doğal Dil + TruePrice Farkı (~60 sn)

### Amaç
Sistemin doğal dili anlayıp TruePrice'ı görsel olarak gösterdiğini kanıtlamak.

### Tıklama Sırası
1. Arama kutusuna yaz: **"yazılım için hafif laptop, 40k altı"**
2. "AI Ara" butonuna tıkla
3. Yükleme animasyonu izle (3-5 sn)
4. Sonuç listesi gelince 1. sıradaki ürüne (ProBook X14 Slim) tıkla
5. TruePrice panelinin açıldığını göster
6. **"15.846 TL gizli maliyet"** rakamını vurgula

### Anlatım Metni
> *"Sisteme yazıyorum: 'yazılım için hafif laptop, 40 bin altı.' Türkçe, doğal cümle.*
>
> *Yapay zeka bunu kategoriye, bütçeye, özelliklere çeviriyor. İşte sonuçlar.*
>
> *En üstteki ürüne tıklıyorum. Etiket fiyatı: 38.499 TL. Bitti mi? Hayır.*
>
> *Bakım, aksesuar, enerji — bunlar her ürün sayfasında gizli. Üç yılda 15.846 TL ekstra ödüyorsunuz. TruePrice bunu önceden söylüyor. Satın almadan önce."*

### Beklenen Ekran Çıktısı
```
Arama: "yazılım için hafif laptop, 40k altı"

Sonuçlar (puan sırasına göre):
1. ProBook X14 Slim       — 38.499 TL  [TruePrice: 40.870 TL] ★4.3
2. CoreBook V7 Pro        — 39.800 TL  [TruePrice: 42.500 TL] ★4.0
3. CampusBook E3          — 35.200 TL  [TruePrice: 37.900 TL] ★4.0

TruePrice Paneli (ProBook X14 Slim):
  Etiket fiyatı:   38.499 TL
  Gizli maliyet:  +15.846 TL  ← bu rakamı vurgula
  TruePrice:       40.870 TL
  ─────────────────────────
  Bakım (3 yıl):    9.240 TL
  Aksesuar:         4.620 TL
  Enerji (3 yıl):   1.986 TL
  Değer kaybı:     25.024 TL
  İkinci el:       -13.475 TL
```

---

## 📋 Senaryo 2 — Kullanıcı Profili Farkı (~75 sn)

### Amaç
Aynı sorgunun farklı kullanıcılar için farklı sonuç verdiğini göstermek.

### Tıklama Sırası
1. Profil seçiciyi göster (sağ üstte)
2. Profil: **"Öğrenci"** seç
3. Arama: **"hafif laptop, 40k altı"** yaz ve ara
4. Sıralamayı göster — CampusBook E3 üstte
5. Profili **"Yazılımcı"** olarak değiştir
6. Aynı arama sonuçlarına bak — CoreBook V7 Pro veya SwiftAir Pro üste geçti
7. Farkı söyle

### Anlatım Metni
> *"Şimdi aynı sorguyu farklı bir gözden yapalım. Profili 'Öğrenci' seçiyorum.*
>
> *Sıralama şöyle: CampusBook E3 birinci — öğrenci skoru 93. MIL-SPEC dayanıklılık, 13 saat batarya. Mantıklı.*
>
> *Şimdi profili 'Yazılımcı'ya alıyorum...*
>
> *Bakın sıralama değişti. Artık CoreBook V7 Pro önde — yazılımcı skoru 88. Öğrenci için 78'di, yani listede daha aşağıdaydı.*
>
> *Aynı ürün, aynı fiyat — ama siz için farklı değerde. İşte bu farkı AI hesaplıyor."*

### Beklenen Ekran Çıktısı
```
Profil: Öğrenci
1. CampusBook E3    — Öğrenci Skoru: 93  ★ "En Uygun"
2. ProBook X14 Slim — Öğrenci Skoru: 88
3. CoreBook V7 Pro  — Öğrenci Skoru: 80

─── Profil değiştiriliyor: Yazılımcı ───

1. SwiftAir Pro 15  — Yazılımcı Skoru: 96  ★ "En Uygun"
2. CoreBook V7 Pro  — Yazılımcı Skoru: 88
3. ProBook X14 Slim — Yazılımcı Skoru: 85
```

> **Not:** Senaryo 2 geçişi hızlı ve net yapılmalı. "Şimdi değiştiriyorum..." derken gecikme olursa jüri odağını kaybeder. Profil değişikliği 1 tıkla olacak şekilde UI'ın hazır olduğundan emin ol.

---

## 📋 Senaryo 3 — Sepet Optimizasyonu (~75 sn)

### Amaç
AI'ın proaktif olarak daha iyi alternatif önerdiğini göstermek.

### Tıklama Sırası
1. CoreBook V7 Pro'yu "Sepete Ekle" butonuyla sepete ekle
2. Sepet ikonuna tıkla (sağ üst)
3. AI öneri baloncuğunun geldiğini bekle
4. Öneriyi oku: "Etiket 4.600 TL daha düşük, TruePrice farkı 4.800 TL"
5. Alternatife tıkla — CampusBook E3 açılır
6. İki ürünü yan yana göster (compare view)

### Anlatım Metni
> *"CoreBook'u sepete ekliyorum. Güçlü seçim — ama AI durmuyor.*
>
> *'CampusBook E3'ü değerlendirin' diyor. Neden? Etiket 4.600 TL daha ucuz, üç yılda TruePrice farkı 4.800 TL. Batarya 2 saat daha uzun.*
>
> *Yazılımcı skoru 10 puan az — bu 10 puan size 4.800 TL ediyor mu?*
>
> *Biz sizi ucuza yönlendirmiyoruz. Sadece soruyu soruyoruz — karar sizin."*

### Beklenen Ekran Çıktısı
```
Sepette: CoreBook V7 Pro — 39.800 TL

💡 AI Önerisi:
"CampusBook E3 bu profil için güçlü alternatif:
  Etiket farkı:      -4.600 TL
  TruePrice farkı:   -4.800 TL (3 yılda)
  Yazılımcı skoru:   78 (CoreBook: 88 — fark 10 puan)
  Batarya:           13 saat vs 11 saat (CampusBook kazanıyor)
  [Alternatifi Gör] [Sepette Tut]"
```

---

## ⚠️ Yedek Söylem (İnternet Kesilirse)

> *"Sistemi çevrimdışı modda da gösterebiliriz — demo verisiyle hazırladık çünkü canlı ortamda sürprizlere karşı yedek planımız var. Bu aslında hibrit veri stratejimizin bir parçası: sistem çevrimdışıyken bile çalışmaya devam eder."*

Bunu söyleyince yedek ekran görüntülerine geç. Özür dileme, strateji olarak sun.

---

## 🔥 Jüri Soruları — Hızlı Cevap

| Soru | Cevap |
|---|---|
| Bu gerçek mi demo mu? | Demo, mock veri kullanıyor. Canlı entegrasyon planlandı — mimari şu an tam veri için hazır. |
| Nasıl para kazanıyorsunuz? | Affiliate komisyonu (şeffaf badge ile) + premium analiz üyeliği + B2B API lisansı. |
| Rakiplerden farkı ne? | Hiçbir karşılaştırma sitesi TruePrice hesabı yapmıyor. Etiket fiyatı gösteriyorlar, gerçek değil. |
| Neden AI gerekli? | Doğal dil anlama, profil bazlı skorlama ve yorum analizi — bunlar kural tabanlı sistemle yapılamaz. |
| Katsayılar nereden geliyor? | Türkiye teknik servis fiyatları, TEDAŞ tarifeleri, sahibinden.com ikinci el verileri — belgeli. |
| Trendyol/Hepsiburada izin verdi mi? | Public ürün sayfası verisi — ToS incelendi, public veri kullanımı serbestçe mevcut. |
