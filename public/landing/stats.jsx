// Stats — three giant numbers, editorial spread
function Stats() {
  const stats = [
    { n: '7', label: 'Practice styles', sub: 'Hatha Vinyasa, Yin, Restorative, Chair, Kundalini, Pranayama, Meditation.' },
    { n: '100+', label: 'Poses in the library', sub: 'Each with alignment cues, Sanskrit names, and video guidance.' },
    { n: '<5', label: 'Minutes to build a flow', sub: 'Filter by style, chakra, or benefit. Smart suggestions handle the rest.' },
  ];
  return (
    <section id="stats" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />
        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-start', paddingBottom: 'clamp(40px, 5vw, 80px)',
        }}>
          <div className="eyebrow">— By the numbers</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textAlign: 'right', textTransform: 'uppercase' }}>
            What you get
          </div>
        </div>
        <div className="stats-row" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(20px, 3vw, 60px)',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              borderTop: '1px solid var(--ink)',
              paddingTop: 'clamp(20px, 2vw, 28px)',
            }}>
              <div style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(56px, 9vw, 140px)',
                fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 0.95,
                color: 'var(--ink)',
              }}>{s.n}</div>
              <div style={{
                marginTop: 24,
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{s.label}</div>
              <p className="small" style={{ margin: '8px 0 0 0', color: 'var(--ink-3)', maxWidth: 280 }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .stats-row { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>
    </section>
  );
}
window.Stats = Stats;
