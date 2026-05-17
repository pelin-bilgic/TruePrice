import { useState } from 'react';

const ORNEKLER = [
  { label: 'Yazılımcı laptopu', query: 'yazılım için hafif laptop 40k altı' },
  { label: 'Öğrenci telefonu', query: 'öğrenci için uygun fiyatlı telefon' },
  { label: 'Oyuncu tableti', query: 'oyun için güçlü tablet' },
  { label: 'Anne telefonu',  query: 'yaşlı anne için kolay kullanılabilir telefon' },
];

const PROFILLER = [
  { id: 'genel',     label: 'Genel' },
  { id: 'ogrenci',  label: 'Öğrenci' },
  { id: 'yazilimci',label: 'Yazılımcı' },
  { id: 'oyuncu',   label: 'Oyuncu' },
];

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery]   = useState('');
  const [profil, setProfil] = useState('genel');

  const submit = (q = query) => {
    if (!q.trim() || loading) return;
    onSearch(q.trim(), profil);
  };

  return (
    <div style={styles.wrap}>
      {/* Başlık */}
      <div style={styles.hero}>
        <div style={styles.badge}>Demo</div>
        <h1 style={styles.title}>
          Fiyat etiketi<br />
          <span style={styles.titleAccent}>yalandır.</span>
        </h1>
        <p style={styles.sub}>
          AI tüm siteleri tarar, ürünleri karşılaştırır ve<br />
          <strong style={{ color: 'var(--accent)' }}>gerçek 3 yıllık maliyeti</strong> hesaplar.
        </p>
      </div>

      {/* Arama kutusu */}
      <div style={styles.searchWrap}>
        <div style={styles.inputRow}>
          <span style={styles.searchIcon}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            style={styles.input}
            type="text"
            placeholder="Ürününü tarif et: 'yazılım için hafif laptop, 40k altı'"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            autoFocus
          />
          <button
            style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
            onClick={() => submit()}
            disabled={loading}
          >
            {loading
              ? <span style={styles.spinner} />
              : <>
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6 }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Ara
                </>
            }
          </button>
        </div>

        {/* Profil seçici */}
        <div style={styles.profilRow}>
          <span style={styles.profilLabel}>Profil:</span>
          {PROFILLER.map(p => (
            <button
              key={p.id}
              style={{ ...styles.profilChip, ...(profil === p.id ? styles.profilChipActive : {}) }}
              onClick={() => setProfil(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Örnek sorgular */}
      <div style={styles.ornekRow}>
        <span style={styles.ornekLabel}>Örnek:</span>
        {ORNEKLER.map(o => (
          <button
            key={o.query}
            style={styles.ornekChip}
            onClick={() => { setQuery(o.query); submit(o.query); }}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    padding: '60px 24px 40px',
    maxWidth: 760,
    margin: '0 auto',
    textAlign: 'center',
  },
  hero: {
    marginBottom: 40,
    animation: 'fadeUp 0.6s ease both',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    background: 'var(--accent-dim)',
    border: '1px solid rgba(110,231,183,0.25)',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: 'var(--accent)',
    marginBottom: 20,
    fontFamily: 'var(--font-display)',
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(40px, 7vw, 72px)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    color: 'var(--text)',
    marginBottom: 20,
  },
  titleAccent: {
    color: 'var(--accent)',
  },
  sub: {
    fontSize: 16,
    color: 'var(--text2)',
    lineHeight: 1.7,
    fontWeight: 300,
  },
  searchWrap: {
    background: 'var(--bg2)',
    border: '1px solid var(--border2)',
    borderRadius: var_r2,
    padding: '6px 6px 12px',
    marginBottom: 16,
    animation: 'fadeUp 0.6s 0.1s ease both',
    boxShadow: '0 0 0 1px rgba(110,231,183,0.06), var(--shadow)',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 4px 4px 16px',
  },
  searchIcon: {
    color: 'var(--text3)',
    flexShrink: 0,
    display: 'flex',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text)',
    fontSize: 16,
    fontFamily: 'var(--font-body)',
    padding: '10px 0',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--accent)',
    color: '#0A0A0F',
    border: 'none',
    borderRadius: 12,
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transition: 'opacity 0.2s, transform 0.15s',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  spinner: {
    width: 18,
    height: 18,
    border: '2px solid rgba(0,0,0,0.3)',
    borderTopColor: '#0A0A0F',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  profilRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 12px 0',
    flexWrap: 'wrap',
  },
  profilLabel: {
    fontSize: 12,
    color: 'var(--text3)',
    fontWeight: 500,
    marginRight: 4,
  },
  profilChip: {
    padding: '4px 14px',
    borderRadius: 20,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text2)',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.15s',
    fontFamily: 'var(--font-body)',
  },
  profilChipActive: {
    background: 'var(--accent-dim)',
    borderColor: 'rgba(110,231,183,0.3)',
    color: 'var(--accent)',
  },
  ornekRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
    animation: 'fadeUp 0.6s 0.2s ease both',
  },
  ornekLabel: {
    fontSize: 12,
    color: 'var(--text3)',
  },
  ornekChip: {
    padding: '5px 14px',
    borderRadius: 20,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--text2)',
    fontSize: 13,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'var(--font-body)',
  },
};

// CSS var trick için
const var_r2 = 'var(--r2)';
