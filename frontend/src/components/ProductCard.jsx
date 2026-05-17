export default function ProductCard({ urun, index, onSelect, sepette }) {
  const badge = urun.badge || (index === 0 ? 'best' : null);

  const badgeConfig = {
    best:  { text: '★ En Uygun',  bg: 'var(--accent-dim)',  color: 'var(--accent)',  border: 'rgba(110,231,183,0.25)' },
    cheap: { text: '↓ En Ucuz',   bg: 'rgba(59,130,246,0.12)', color: '#60A5FA', border: 'rgba(59,130,246,0.25)' },
    warn:  { text: '↑ Bütçe Aşımı', bg: 'var(--red-dim)', color: 'var(--red)',  border: 'rgba(248,113,113,0.25)' },
  };
  const bc = badgeConfig[badge];

  const skorRenk = urun.puan >= 4.5 ? 'var(--accent)'
    : urun.puan >= 3.5 ? 'var(--yellow)'
    : 'var(--red)';

  return (
    <div
      style={{
        ...styles.card,
        ...(sepette ? styles.cardSepette : {}),
        animationDelay: `${index * 0.06}s`,
      }}
      className="fade-up"
      onClick={() => onSelect(urun)}
    >
      {/* Üst satır */}
      <div style={styles.topRow}>
        <span style={styles.siteBadge}>{urun.site || 'Demo'}</span>
        <div style={styles.topRight}>
          {bc && (
            <span style={{ ...styles.badge, background: bc.bg, color: bc.color, borderColor: bc.border }}>
              {bc.text}
            </span>
          )}
          <span style={styles.demoBadge}>DEMO</span>
        </div>
      </div>

      {/* Ürün adı */}
      <h3 style={styles.name}>{urun.ad}</h3>

      {/* Fiyat */}
      <div style={styles.priceRow}>
        <span style={styles.price}>
          {Number(urun.fiyat).toLocaleString('tr-TR')} ₺
        </span>
        {urun.true_price && (
          <span style={styles.truePrice}>
            TruePrice: {Number(urun.true_price).toLocaleString('tr-TR')} ₺
          </span>
        )}
      </div>

      {/* Puan */}
      <div style={styles.puanRow}>
        <div style={styles.puanBarBg}>
          <div style={{ ...styles.puanBarFill, width: `${(urun.puan / 5) * 100}%`, background: skorRenk }} className="bar-anim" />
        </div>
        <span style={{ ...styles.puanText, color: skorRenk }}>{urun.puan}</span>
      </div>

      {/* Özellik etiketleri */}
      {urun.ozellikler?.length > 0 && (
        <div style={styles.tagRow}>
          {urun.ozellikler.slice(0, 4).map(t => (
            <span key={t} style={styles.tag}>{t}</span>
          ))}
        </div>
      )}

      {/* Alt aksiyon */}
      <div style={styles.footer}>
        <button
          style={styles.detailBtn}
          onClick={e => { e.stopPropagation(); onSelect(urun); }}
        >
          TruePrice Gör →
        </button>
        {sepette && <span style={styles.sepetteLabel}>✓ Sepette</span>}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--r2)',
    padding: '18px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  cardSepette: {
    borderColor: 'rgba(110,231,183,0.3)',
    boxShadow: '0 0 0 1px rgba(110,231,183,0.1)',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  topRight: {
    display: 'flex',
    gap: 6,
    alignItems: 'center',
  },
  siteBadge: {
    fontSize: 11,
    fontWeight: 600,
    color: 'var(--text3)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontFamily: 'var(--font-display)',
  },
  badge: {
    fontSize: 11,
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: 10,
    border: '1px solid',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-display)',
  },
  demoBadge: {
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: 6,
    background: 'rgba(255,255,255,0.06)',
    color: 'var(--text3)',
    letterSpacing: '0.08em',
    fontFamily: 'var(--font-display)',
  },
  name: {
    fontFamily: 'var(--font-display)',
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text)',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    flexWrap: 'wrap',
  },
  price: {
    fontFamily: 'var(--font-display)',
    fontSize: 22,
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.02em',
  },
  truePrice: {
    fontSize: 12,
    color: 'var(--red)',
    fontWeight: 500,
  },
  puanRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  puanBarBg: {
    flex: 1,
    height: 4,
    background: 'var(--bg3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  puanBarFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.8s ease',
    animation: 'barGrow 0.8s ease both',
  },
  puanText: {
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    minWidth: 28,
    textAlign: 'right',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    fontSize: 11,
    padding: '3px 9px',
    borderRadius: 8,
    background: 'var(--bg3)',
    color: 'var(--text2)',
    fontWeight: 400,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 10,
    borderTop: '1px solid var(--border)',
  },
  detailBtn: {
    background: 'transparent',
    border: 'none',
    color: 'var(--accent)',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-display)',
    padding: 0,
    letterSpacing: '0.01em',
  },
  sepetteLabel: {
    fontSize: 12,
    color: 'var(--accent)',
    fontWeight: 500,
  },
};
