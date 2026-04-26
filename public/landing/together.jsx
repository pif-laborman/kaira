// Together — Berbel-style stacked one-liners. Hover shifts each line.
// Reuses an existing list of value props from the app. Pure design pattern.
function Together() {
  const lines = [
    'Build a practice that actually fits your body',
    'Move past pre-recorded classes that ignore you',
    'Find teachers who teach the way you want to learn',
    'Make yoga personal again — every single day',
    'Carry your sequences across studio, home, travel',
  ];

  return (
    <section id="together" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-end', paddingBottom: 'clamp(40px, 5vw, 80px)',
        }}>
          <div className="eyebrow">— Together, we can</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textAlign: 'right', textTransform: 'uppercase' }}>
            {String(lines.length).padStart(2, '0')} promises
          </div>
        </div>

        <div className="together-list">
          {lines.map((line, i) => (
            <div key={i} className="together-row" style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'baseline',
              gap: 'clamp(16px, 2.4vw, 40px)',
              padding: 'clamp(20px, 2.6vw, 36px) 0',
              borderTop: '1px solid var(--rule)',
              cursor: 'default',
              position: 'relative',
            }}>
              <span className="mono together-num" style={{
                color: 'var(--ink-3)',
                transition: 'color .25s ease',
                minWidth: 32,
              }}>{String(i+1).padStart(2,'0')}</span>
              <span className="together-text" style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(22px, 3vw, 44px)',
                fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.1,
                color: 'var(--ink-2)',
                transition: 'color .35s ease, transform .35s cubic-bezier(.65,0,.35,1)',
                display: 'inline-block',
              }}>{line}</span>
              <span className="together-arrow" style={{
                fontSize: 22, fontWeight: 400, color: 'var(--ink-3)',
                transition: 'color .25s ease, transform .35s cubic-bezier(.65,0,.35,1), opacity .25s ease',
                opacity: 0,
                transform: 'translateX(-8px)',
              }}>→</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>
      </div>
      <style>{`
        .together-row:hover .together-text { color: var(--ink); transform: translateX(12px); }
        .together-row:hover .together-num { color: var(--ink); }
        .together-row:hover .together-arrow { opacity: 1; transform: translateX(0); color: var(--ink); }
        @media (max-width: 600px) {
          .together-row { grid-template-columns: auto 1fr !important; }
          .together-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
window.Together = Together;
