function Footer() {
  return (
    <footer className="frame" style={{ paddingTop: 24, paddingBottom: 48 }}>
      <div className="page">
        <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 22, padding: 'clamp(32px, 4vw, 56px)' }}>
          <div className="footer-grid" style={{
            display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 'clamp(16px, 2vw, 32px)',
            alignItems: 'flex-start',
          }}>
            <div>
              <div className="display" style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>Kaira</div>
              <p className="body" style={{ marginTop: 14, maxWidth: 320, color: 'rgba(255,255,255,0.7)' }}>
                Yoga that adapts to you. Made by teachers and practitioners.
                Bootstrapped, no investors.
              </p>
              <a href="#pricing" className="btn-pill inverted" style={{ marginTop: 22 }}>
                <span className="label">Begin Practice</span>
                <span className="arrow"><ArrowRight size={14}/></span>
              </a>
            </div>
            {[
              { h: 'Product', l: ['Sequence Builder','Player','Pose Library','Pre-Made Flows'] },
              { h: 'Company', l: ['Our Story','Press','Contact','Careers'] },
              { h: 'Legal',   l: ['Privacy','Terms','Cookies','Accessibility'] },
            ].map(col => (
              <div key={col.h}>
                <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 14 }}>{col.h.toUpperCase()}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.l.map(x => (
                    <li key={x}><a href="#" style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>{x}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 40, paddingTop: 20,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            color: 'rgba(255,255,255,0.55)',
          }}>
            <div className="small" style={{ color: 'inherit' }}>© 2026 Kaira Ltd.</div>
            <div className="small" style={{ fontStyle: 'italic', color: 'inherit' }}>Design your practice, not just your schedule.</div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
window.Footer = Footer;
