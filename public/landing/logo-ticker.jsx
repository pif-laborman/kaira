// Logo ticker — horizontal marquee, tiny grayscale, Berbel-style
function LogoTicker() {
  // Placeholder marks: stylized brand glyphs as inline SVG so we don't need real assets
  const marks = [
    { name: 'Studio Sangha', glyph: <svg width="84" height="20" viewBox="0 0 84 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.04em" fill="currentColor">SANGHA</text></svg> },
    { name: 'Aura', glyph: <svg width="60" height="20" viewBox="0 0 60 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" fontWeight="600" fontStyle="italic" letterSpacing="-0.02em" fill="currentColor">aura.</text></svg> },
    { name: 'Mat & Stone', glyph: <svg width="100" height="20" viewBox="0 0 100 20"><circle cx="9" cy="10" r="6" fill="currentColor"/><text x="22" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.04em" fill="currentColor">MAT&amp;STONE</text></svg> },
    { name: 'Prana', glyph: <svg width="68" height="20" viewBox="0 0 68 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" fontWeight="700" letterSpacing="0.16em" fill="currentColor">PRĀṆA</text></svg> },
    { name: 'Three Stones', glyph: <svg width="86" height="20" viewBox="0 0 86 20"><circle cx="6" cy="10" r="3" fill="currentColor"/><circle cx="16" cy="10" r="3" fill="currentColor"/><circle cx="26" cy="10" r="3" fill="currentColor"/><text x="36" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="500" letterSpacing="0.04em" fill="currentColor">stones</text></svg> },
    { name: 'Yoga Journal', glyph: <svg width="120" height="20" viewBox="0 0 120 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.06em" fill="currentColor">YOGA JOURNAL</text></svg> },
    { name: 'Bloom', glyph: <svg width="68" height="20" viewBox="0 0 68 20"><circle cx="9" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/><text x="20" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" fontWeight="600" letterSpacing="-0.01em" fill="currentColor">bloom</text></svg> },
    { name: 'Lotus Times', glyph: <svg width="106" height="20" viewBox="0 0 106 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.04em" fill="currentColor">LOTUS·TIMES</text></svg> },
    { name: 'Kindred', glyph: <svg width="84" height="20" viewBox="0 0 84 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="15" fontWeight="500" fontStyle="italic" letterSpacing="-0.02em" fill="currentColor">kindred</text></svg> },
    { name: 'Stillpoint', glyph: <svg width="98" height="20" viewBox="0 0 98 20"><rect x="2" y="6" width="8" height="8" fill="currentColor"/><text x="16" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="600" letterSpacing="0.04em" fill="currentColor">STILLPOINT</text></svg> },
    { name: 'Wellness Co', glyph: <svg width="98" height="20" viewBox="0 0 98 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.18em" fill="currentColor">WELLNESS</text></svg> },
    { name: 'Rooted', glyph: <svg width="68" height="20" viewBox="0 0 68 20"><text x="0" y="15" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" fontWeight="500" letterSpacing="-0.01em" fill="currentColor">Rooted</text></svg> },
  ];
  // Duplicate for seamless loop
  const reel = [...marks, ...marks];

  return (
    <section id="ticker" className="frame" style={{ paddingTop: 'clamp(32px, 4vw, 56px)', paddingBottom: 'clamp(24px, 3vw, 40px)' }}>
      <div className="page" style={{ paddingTop: 0, paddingBottom: 16 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-end', paddingBottom: 24,
        }}>
          <div className="eyebrow" style={{ color: 'var(--ink-3)' }}>— As featured in</div>
          <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 8 }} />
        </div>
      </div>
      <div className="ticker-mask">
        <div className="ticker-track">
          {reel.map((m, i) => (
            <span key={i} className="ticker-item" aria-label={m.name}>
              {m.glyph}
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
          animation: tickerScroll 42s linear infinite;
          color: var(--ink-3);
          padding: 8px 0;
        }
        .ticker-track:hover { animation-play-state: paused; }
        .ticker-item {
          display: inline-flex; align-items: center;
          opacity: 0.7;
          transition: opacity .25s ease, color .25s ease;
        }
        .ticker-item:hover { opacity: 1; color: var(--ink); }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
window.LogoTicker = LogoTicker;
