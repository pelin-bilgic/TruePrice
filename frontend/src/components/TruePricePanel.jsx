import { useEffect, useState } from 'react';
import { getTruePrice } from '../api/client';

export default function TruePricePanel({ urun, onClose, onSepeteEkle, sepette }) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!urun) return;
    setLoading(true);
    setError(null);
    getTruePrice(urun.id)
      .then(setData)
      .catch(e => {
        // Backend'de endpoint yoksa mock data göster
        setData(mockTruePrice(urun));
      })
      .finally(() => setLoading(false));
  }, [urun?.id]);

  if (!urun) return null;

  const fark  = data ? Math.round(data.true_price - data.etiket_fiyat) : 0;
  const artis = data ? Math.round((fark / data.etiket_fiyat) * 100) : 0;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} className="slide-in" onClick={e => e.stopPropagation()}>
        {/* Kapat */}
        <button style={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Başlık */}
        <div style={styles.header}>
          <span style={styles.headerTag}>TruePrice Analizi</span>
          <h2 style={styles.urunAdi}>{urun.ad}</h2>
          <span style={styles.siteName}>{urun.site || 'Demo'} · Demo Verisi</span>
        </div>

        {loading ? (
          <div style={styles.loadingWrap}>
            <span style={styles.spinner} />
            <span style={{ color: 'var(--text2)', fontSize: 14 }}>Hesaplanıyor…</span>
          </div>
        ) : data ? (
          <>
            {/* Ana karşılaştırma */}
            <div style={styles.compareGrid}>
              <div style={styles.compareCard}>
                <span style={styles.compareLabel}>Etiket Fiyatı</span>
                <span style={styles.compareValue}>
                  {Number(data.etiket_fiyat).toLocaleString('tr-TR')} ₺
                </span>
                <span style={styles.compareNote}>Bugün ödeyeceğin</span>
              </div>
              <div style={{ ...styles.compareCard, ...styles.compareCardAccent }}>
                <span style={{ ...styles.compareLabel, color: 'var(--red)' }}>TruePrice (3 Yıl)</span>
                <span style={{ ...styles.compareValue, color: 'var(--red)' }}>
                  {Number(data.true_price).toLocaleString('tr-TR')} ₺
                </span>
                <span style={{ ...styles.compareNote, color: 'var(--red)' }}>
                  +{Number(fark).toLocaleString('tr-TR')} ₺ gizli maliyet (%{artis})
                </span>
              </div>
            </div>

            {/* Breakdown */}
            {data.breakdown && (
              <div style={styles.breakdown}>
                <h4 style={styles.breakdownTitle}>Maliyet Dağılımı</h4>
                {Object.entries(data.breakdown).map(([key, val]) => {
                  const labels = {
                    aksesuar: 'Aksesuar & Kablo',
                    bakim_3yil: '3 Yıllık Bakım',
                    enerji_3yil: '3 Yıllık Enerji',
                    deger_kaybi: 'Değer Kaybı',
                  };
                  const pct = Math.round((val / data.true_price) * 100);
                  return (
                    <div key={key} style={styles.breakdownRow}>
                      <span style={styles.breakdownKey}>{labels[key] || key}</span>
                      <div style={styles.breakdownBarBg}>
                        <div style={{ ...styles.breakdownBarFill, width: `${pct}%` }} />
                      </div>
                      <span style={styles.breakdownVal}>
                        {Number(val).toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* AI özeti */}
            {urun.yorumOzeti && (
              <div style={styles.aiBox}>
                <span style={styles.aiLabel}>
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20" style={{ marginRight: 5 }}>
                    <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 11H9v-2h2v2zm0-4H9V6h2v3z"/>
                  </svg>
                  AI Yorum Özeti
                </span>
                <p style={styles.aiText}>{urun.yorumOzeti}</p>
              </div>
            )}

            {/* Kronik sorun */}
            {urun.kronikSorun && (
              <div style={{ ...styles.aiBox, background: 'var(--red-dim)', borderColor: 'rgba(248,113,113,0.2)' }}>
                <span style={{ ...styles.aiLabel, color: 'var(--red)' }}>⚠ Kronik Sorun Tespit Edildi</span>
                <p style={{ ...styles.aiText, color: 'var(--red)' }}>{urun.kronikSorun}</p>
              </div>
            )}

            {/* Sepet butonu */}
            <button
              style={{ ...styles.sepetBtn, ...(sepette ? styles.sepetBtnActive : {}) }}
              onClick={() => onSepeteEkle(urun)}
            >
              {sepette ? '✓ Sepetten Çıkar' : '+ Sepete Ekle'}
            </button>
          </>
        ) : (
          <p style={{ color: 'var(--text2)', padding: '20px 0' }}>Veri yüklenemedi.</p>
        )}
      </div>
    </div>
  );
}

// Backend /trueprice endpoint yoksa mock hesap
function mockTruePrice(urun) {
  const f = urun.fiyat || 0;
  const kat = urun.kategori || 'laptop';
  const k = { laptop: [0.12, 0.08, 420, 0.35], telefon: [0.15, 0.10, 120, 0.45], tablet: [0.10, 0.06, 200, 0.30] };
  const [aksesuar_r, bakim_r, enerji, deger_r] = k[kat] || k.laptop;
  const aksesuar   = Math.round(f * aksesuar_r);
  const bakim      = Math.round(f * bakim_r * 3);
  const enerji_3   = enerji * 3;
  const deger_k    = Math.round(f * deger_r);
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

const styles = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(6px)',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  panel: {
    width: 'min(480px, 100vw)',
    height: '100vh',
    background: 'var(--bg2)',
    borderLeft: '1px solid var(--border2)',
    overflowY: 'auto',
    padding: '28px 28px 40px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  closeBtn: {
    position: 'absolute', top: 20, right: 20,
    background: 'var(--bg3)', border: '1px solid var(--border)',
    borderRadius: 8, width: 36, height: 36,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'var(--text2)',
  },
  header: {
    paddingRight: 40,
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  headerTag: {
    fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
    color: 'var(--accent)', textTransform: 'uppercase',
    fontFamily: 'var(--font-display)',
  },
  urunAdi: {
    fontFamily: 'var(--font-display)', fontSize: 22,
    fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em',
    lineHeight: 1.25,
  },
  siteName: {
    fontSize: 12, color: 'var(--text3)', fontWeight: 400,
  },
  loadingWrap: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 12, padding: '40px 0',
  },
  spinner: {
    width: 28, height: 28,
    border: '2px solid var(--border2)',
    borderTopColor: 'var(--accent)',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  compareGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10,
  },
  compareCard: {
    background: 'var(--bg3)', borderRadius: 'var(--r)',
    padding: '16px', display: 'flex', flexDirection: 'column', gap: 4,
    border: '1px solid var(--border)',
  },
  compareCardAccent: {
    background: 'var(--red-dim)', borderColor: 'rgba(248,113,113,0.2)',
  },
  compareLabel: {
    fontSize: 11, fontWeight: 600, color: 'var(--text2)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    fontFamily: 'var(--font-display)',
  },
  compareValue: {
    fontFamily: 'var(--font-display)', fontSize: 24,
    fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.03em',
  },
  compareNote: {
    fontSize: 11, color: 'var(--text3)', fontWeight: 400,
  },
  breakdown: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  breakdownTitle: {
    fontFamily: 'var(--font-display)', fontSize: 13,
    fontWeight: 600, color: 'var(--text2)',
    textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: 2,
  },
  breakdownRow: {
    display: 'grid', gridTemplateColumns: '1fr 2fr auto',
    alignItems: 'center', gap: 10,
  },
  breakdownKey: {
    fontSize: 13, color: 'var(--text2)', fontWeight: 400,
  },
  breakdownBarBg: {
    height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden',
  },
  breakdownBarFill: {
    height: '100%', background: 'var(--red)', borderRadius: 2,
    animation: 'barGrow 0.8s ease both',
  },
  breakdownVal: {
    fontSize: 13, color: 'var(--text)', fontWeight: 500,
    textAlign: 'right', whiteSpace: 'nowrap',
    fontFamily: 'var(--font-display)',
  },
  aiBox: {
    background: 'var(--accent-dim)', borderRadius: 'var(--r)',
    border: '1px solid rgba(110,231,183,0.15)',
    padding: '14px 16px',
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  aiLabel: {
    fontSize: 11, fontWeight: 700, color: 'var(--accent)',
    textTransform: 'uppercase', letterSpacing: '0.06em',
    display: 'flex', alignItems: 'center',
    fontFamily: 'var(--font-display)',
  },
  aiText: {
    fontSize: 13, color: 'var(--text2)', lineHeight: 1.6,
  },
  sepetBtn: {
    width: '100%', padding: '14px',
    background: 'var(--accent)', color: '#0A0A0F',
    border: 'none', borderRadius: 'var(--r)',
    fontSize: 15, fontWeight: 700,
    cursor: 'pointer', fontFamily: 'var(--font-display)',
    letterSpacing: '0.02em', marginTop: 'auto',
    transition: 'opacity 0.2s',
  },
  sepetBtnActive: {
    background: 'var(--bg3)', color: 'var(--accent)',
    border: '1px solid rgba(110,231,183,0.3)',
  },
};
