const BASE = import.meta.env.VITE_API_URL || 'https://trueprice-production.up.railway.app';

// Genel fetch yardımcısı
async function apiFetch(path, params = {}) {
  const url = new URL(BASE + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Bilinmeyen hata' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

// Ürün arama
export async function searchProducts(query, profil = 'genel') {
  return apiFetch('/search', { q: query, profil });
}

// TruePrice hesapla
export async function getTruePrice(urunId) {
  return apiFetch(`/trueprice/${urunId}`);
}

// Sepet optimizasyonu
export async function optimizeSepet(sepet) {
  const res = await fetch(`${BASE}/sepet-optimizasyon`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sepet }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Backend sağlık kontrolü
export async function healthCheck() {
  return apiFetch('/');
}
