// Manifesto — single short paragraph, mostly empty page, between busier sections
function Manifesto() {
  return (
    <section id="manifesto" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2.4fr 1fr',
          gap: 'clamp(16px, 2vw, 40px)',
          padding: 'clamp(40px, 6vw, 96px) 0',
          alignItems: 'flex-start',
        }} className="manifesto-grid">
          <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase', paddingTop: 8 }}>
            — A short note
          </div>
          <p style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(22px, 2.6vw, 34px)',
            lineHeight: 1.4, fontWeight: 500, letterSpacing: '-0.012em',
            color: 'var(--ink-2)',
          }}>
            We&rsquo;re not building another streaming app. Kaira is a tool for the practice
            you actually want — adaptive, personal, and quiet enough to stay out of the way.
            <span style={{ color: 'var(--ink-3)' }}>{' '}Show up as you are. The mat will meet you there.</span>
          </p>
          <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase', paddingTop: 8, textAlign: 'right' }}>
            Kaira / 2026
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .manifesto-grid { grid-template-columns: 1fr !important; }
          .manifesto-grid > div:last-child { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
window.Manifesto = Manifesto;
