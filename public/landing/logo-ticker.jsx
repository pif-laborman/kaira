// Logo ticker — horizontal marquee of yoga style names
function LogoTicker() {
  const styles = [
    'HATHA VINYASA', 'YIN', 'RESTORATIVE', 'CHAIR YOGA',
    'KUNDALINI', 'MEDITATION', 'PRANAYAMA',
  ];
  // Duplicate for seamless loop
  const reel = [...styles, ...styles, ...styles];

  return (
    <section id="ticker" className="frame" style={{ paddingTop: 'clamp(32px, 4vw, 56px)', paddingBottom: 'clamp(24px, 3vw, 40px)' }}>
      <div className="page" style={{ paddingTop: 0, paddingBottom: 16 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-end', paddingBottom: 24,
        }}>
          <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>— Seven styles, one app</div>
          <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 8 }} />
        </div>
      </div>
      <div className="ticker-mask">
        <div className="ticker-track">
          {reel.map((s, i) => (
            <span key={i} className="ticker-item" style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 14, fontWeight: 700,
              letterSpacing: '0.12em',
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .ticker-mask {
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .ticker-track {
          display: flex;
          gap: clamp(40px, 5vw, 80px);
          width: max-content;
          animation: tickerScroll 32s linear infinite;
          color: var(--ink-3);
          padding: 8px 0;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-item {
          display: inline-flex; align-items: center;
          opacity: 0.6;
          transition: opacity .25s ease, color .25s ease;
          white-space: nowrap;
        }
        .ticker-item:hover { opacity: 1; color: var(--ink); }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
}
window.LogoTicker = LogoTicker;
