export default function Sepet({ urunler, onKaldir, onOptimize, optimizing }) {
  if (urunler.length === 0) return null;

  const toplam = urunler.reduce((s, u) => s + (u.fiyat || 0), 0);
  const toplamTrue = urunler.reduce((s, u) => s + (u.true_price || u.fiyat || 0), 0);
  const fark = toplamTrue - toplam;

  return (
    <div style={styles.wrap} className="fade-up">
      <div style={styles.header}>
        <span style={styles.title}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}>
            <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Sepet ({urunler.length})
        </span>
        <button style={styles.optimizeBtn} onClick={onOptimize} disabled={optimizing}>
          {optimizing ? 'Analiz ediliyor…' : '⚡ Optimize Et'}
        </button>
      </div>

      <div style={styles.list}>
        {urunler.map(u => (
          <div key={u.id} style={styles.row}>
            <span style={styles.urunAd}>{u.ad}</span>
            <span style={styles.urunFiyat}>{Number(u.fiyat).toLocaleString('tr-TR')} ₺</span>
            <button style={styles.kaldir} onClick={() => onKaldir(u.id)}>×</button>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <div style={styles.footerRow}>
          <span style={{ color: 'var(--text2)', fontSize: 13 }}>Etiket Toplam</span>
          <span style={styles.toplamVal}>{Number(toplam).toLocaleString('tr-TR')} ₺</span>
        </div>
        {fark > 0 && (
          <div style={styles.footerRow}>
            <span style={{ color: 'var(--red)', fontSize: 13 }}>TruePrice Toplam (3 yıl)</span>
            <span style={{ ...styles.toplamVal, color: 'var(--red)' }}>{Number(toplamTrue).toLocaleString('tr-TR')} ₺</span>
          </div>
        )}
        {fark > 0 && (
          <div style={styles.uyari}>
            ⚠ Seçtiğin ürünler 3 yılda <strong>+{Number(fark).toLocaleString('tr-TR')} ₺</strong> daha pahalıya mal olacak
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r2)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--text)',
    display: 'flex',
    alignItems: 'center',
  },
  optimizeBtn: {
    background: 'var(--yellow-dim)',
    border: '1px solid rgba(251,191,36,0.25)',
    borderRadius: 8,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--yellow)',
    cursor: 'pointer',
    fontFamily: 'var(--font-display)',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 10px',
    background: 'var(--bg3)',
    borderRadius: 8,
  },
  urunAd: {
    flex: 1,
    fontSize: 13,
    color: 'var(--text)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  urunFiyat: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text)',
    fontFamily: 'var(--font-display)',
    whiteSpace: 'nowrap',
  },
  kaldir: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text3)',
    cursor: 'pointer',
    fontSize: 18,
    lineHeight: 1,
    padding: '0 2px',
    transition: 'color 0.15s',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    paddingTop: 10,
    borderTop: '1px solid var(--border)',
  },
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toplamVal: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 700,
    color: 'var(--text)',
  },
  uyari: {
    background: 'var(--red-dim)',
    border: '1px solid rgba(248,113,113,0.2)',
    borderRadius: 8,
    padding: '8px 12px',
    fontSize: 12,
    color: 'var(--red)',
    lineHeight: 1.5,
  },
};
