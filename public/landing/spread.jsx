// Spread — single full-bleed image w/ mono caption beneath
function Spread() {
  return (
    <section id="spread" className="frame" style={{ paddingTop: 'clamp(20px, 2.4vw, 36px)' }}>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'relative', width: '100%',
          height: 'clamp(380px, 62vw, 720px)',
          overflow: 'hidden',
          background: 'var(--bg-2)',
        }}>
          <img
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=2400&q=85&auto=format&fit=crop"
            alt="Practitioner in tree pose, morning light"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="page" style={{ paddingTop: 16, paddingBottom: 0 }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 24, alignItems: 'flex-start',
          }} className="spread-cap">
            <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase' }}>
              fig.05 — VRKSASANA / TREE / 06:42 / BENGALURU
            </div>
            <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase', textAlign: 'right' }}>
              Photograph by KAIRA STUDIO
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .spread-cap { grid-template-columns: 1fr !important; }
          .spread-cap > div:last-child { text-align: left !important; }
        }
      `}</style>
    </section>
  );
}
window.Spread = Spread;
