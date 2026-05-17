import { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import TruePricePanel from './components/TruePricePanel';
import Sepet from './components/Sepet';
import { searchProducts } from './api/client';

// Backend'den farklı format gelirse normalize et
function normalizeUrun(u, index) {
  return {
    id:         u.id || u._id || `urun_${index}`,
    ad:         u.ad || u.name || u.title || 'Ürün',
    fiyat:      u.fiyat || u.price || u.fiyat_tl || 0,
    site:       u.site || u.platform || 'Demo',
    puan:       u.puan || u.rating || u.score || 4.0,
    kategori:   u.kategori || u.category || 'laptop',
    ozellikler: u.ozellikler || u.features || u.tags || [],
    yorumOzeti: u.yorumOzeti || u.review_summary || u.yorum_ozeti || null,
    kronikSorun:u.kronikSorun || u.chronic_issue || null,
    badge:      u.badge || null,
    true_price: u.true_price || null,
  };
}

export default function App() {
  const [sonuclar,     setSonuclar]     = useState([]);
  const [searching,    setSearching]    = useState(false);
  const [hata,         setHata]         = useState(null);
  const [seciliUrun,   setSeciliUrun]   = useState(null);
  const [sepet,        setSepet]        = useState([]);
  const [aramaYapildi, setAramaYapildi] = useState(false);
  const [optimizing,   setOptimizing]   = useState(false);

  const handleSearch = useCallback(async (query, profil) => {
    setSearching(true);
    setHata(null);
    setAramaYapildi(true);
    setSonuclar([]);
    try {
      const res = await searchProducts(query, profil);
      // Backend farklı yapıda dönebilir
      const liste = Array.isArray(res)
        ? res
        : res.urunler || res.results || res.data || [];
      setSonuclar(liste.map(normalizeUrun));
    } catch (e) {
      setHata(e.message || 'Arama sırasında hata oluştu.');
    } finally {
      setSearching(false);
    }
  }, []);

  const sepeteEkle = (urun) => {
    setSepet(prev => {
      const var_mi = prev.some(u => u.id === urun.id);
      return var_mi ? prev.filter(u => u.id !== urun.id) : [...prev, urun];
    });
  };

  const sepettenKaldir = (id) => setSepet(prev => prev.filter(u => u.id !== id));

  const optimizeSepet = async () => {
    setOptimizing(true);
    await new Promise(r => setTimeout(r, 1200)); // Demo gecikme
    setOptimizing(false);
    alert('Sepet optimizasyonu: Demo modunda. Gerçek sistemde AI ucuz alternatifleri önerecek.');
  };

  const sepetteMi = (id) => sepet.some(u => u.id === id);

  return (
    <div style={styles.app}>
      {/* Arka plan efekti */}
      <div style={styles.bgGlow} />

      {/* Navbar */}
      <nav style={styles.nav}>
        <span style={styles.logo}>TruePrice<span style={{ color: 'var(--accent)' }}>.</span></span>
        <span style={styles.navTag}>AI Alışveriş Asistanı</span>
        {sepet.length > 0 && (
          <span style={styles.sepetCount}>{sepet.length}</span>
        )}
      </nav>

      <main style={styles.main}>
        {/* Arama */}
        <SearchBar onSearch={handleSearch} loading={searching} />

        {/* Hata */}
        {hata && (
          <div style={styles.hataBox} className="fade-up">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
              <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"/>
            </svg>
            {hata}
          </div>
        )}

        {/* Yükleniyor iskelet */}
        {searching && (
          <div style={styles.grid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ ...styles.skeletonCard, animationDelay: `${i * 0.08}s` }} className="fade-up">
                <div className="skeleton" style={{ height: 12, width: '40%', marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 18, width: '80%', marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 28, width: '55%', marginBottom: 12 }} />
                <div className="skeleton" style={{ height: 4, width: '100%', marginBottom: 12 }} />
                <div style={{ display: 'flex', gap: 6 }}>
                  <div className="skeleton" style={{ height: 22, width: 70 }} />
                  <div className="skeleton" style={{ height: 22, width: 60 }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sonuçlar */}
        {!searching && sonuclar.length > 0 && (
          <div style={styles.resultsWrap}>
            <div style={styles.resultsHeader} className="fade-up">
              <span style={styles.resultsCount}>{sonuclar.length} ürün bulundu</span>
              <span style={styles.resultsSub}>Demo verisi · Gerçek sistemde canlı siteler taranır</span>
            </div>

            <div style={styles.contentGrid}>
              {/* Ürün grid */}
              <div style={styles.grid}>
                {sonuclar.map((u, i) => (
                  <ProductCard
                    key={u.id}
                    urun={u}
                    index={i}
                    onSelect={setSeciliUrun}
                    sepette={sepetteMi(u.id)}
                  />
                ))}
              </div>

              {/* Sepet yan panel */}
              {sepet.length > 0 && (
                <div style={styles.sepetWrap}>
                  <Sepet
                    urunler={sepet}
                    onKaldir={sepettenKaldir}
                    onOptimize={optimizeSepet}
                    optimizing={optimizing}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Boş durum */}
        {!searching && aramaYapildi && sonuclar.length === 0 && !hata && (
          <div style={styles.bosState} className="fade-up">
            <span style={{ fontSize: 36 }}>🔍</span>
            <p>Sonuç bulunamadı. Farklı bir terim dene.</p>
          </div>
        )}
      </main>

      {/* TruePrice panel */}
      {seciliUrun && (
        <TruePricePanel
          urun={seciliUrun}
          onClose={() => setSeciliUrun(null)}
          onSepeteEkle={sepeteEkle}
          sepette={sepetteMi(seciliUrun.id)}
        />
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow: {
    position: 'fixed',
    top: -200, left: '50%',
    transform: 'translateX(-50%)',
    width: 800, height: 600,
    background: 'radial-gradient(ellipse, rgba(110,231,183,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '18px 32px',
    borderBottom: '1px solid var(--border)',
    background: 'rgba(10,10,15,0.8)',
    backdropFilter: 'blur(12px)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--text)',
    letterSpacing: '-0.03em',
  },
  navTag: {
    fontSize: 12,
    color: 'var(--text3)',
    fontWeight: 400,
    flex: 1,
  },
  sepetCount: {
    background: 'var(--accent)',
    color: '#0A0A0F',
    borderRadius: '50%',
    width: 22, height: 22,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700,
    fontFamily: 'var(--font-display)',
  },
  main: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px 80px',
  },
  hataBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    background: 'var(--red-dim)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 'var(--r)',
    padding: '14px 16px',
    color: 'var(--red)',
    fontSize: 14,
    maxWidth: 760,
    margin: '0 auto 24px',
  },
  resultsWrap: {
    maxWidth: 1100,
    margin: '0 auto',
  },
  resultsHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 20,
  },
  resultsCount: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.02em',
  },
  resultsSub: {
    fontSize: 12,
    color: 'var(--text3)',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0,1fr) auto',
    gap: 20,
    alignItems: 'start',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 14,
  },
  sepetWrap: {
    width: 300,
    position: 'sticky',
    top: 80,
  },
  skeletonCard: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r2)',
    padding: '18px',
  },
  bosState: {
    textAlign: 'center',
    padding: '60px 24px',
    color: 'var(--text2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
};
