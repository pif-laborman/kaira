// Stats — three giant numbers, editorial spread, lots of air
function Stats() {
  const stats = [
    { n: '10,000+', label: 'Poses indexed', sub: 'Across six styles, with alignment cues for each.' },
    { n: '240',     label: 'Pre-made sequences', sub: 'From five-minute resets to ninety-minute deep work.' },
    { n: '6',       label: 'Practice styles', sub: 'Hatha · Yin · Restorative · Chair · Kundalini · Meditation.' },
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
          <div className="eyebrow">— By the Numbers</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textAlign: 'right', textTransform: 'uppercase' }}>
            Index 03 / Quantities
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
              <p className="small" style={{ margin: '8px 0 0 0', color: 'var(--ink-3)', maxWidth: 240 }}>
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
