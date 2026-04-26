// How It Works — 3-step visual walkthrough
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Pick your style', desc: 'Choose from seven yoga traditions. Each has its own pose library, transitions, and expert-crafted flows.' },
    { num: '02', title: 'Build your flow', desc: 'Browse poses, filter by chakra or benefit. Kaira suggests what comes next. A full sequence in under five minutes.' },
    { num: '03', title: 'Hit play', desc: 'Voice cues, gong transitions, or video. The player guides you through every pose at your pace.' },
  ];

  return (
    <section id="how-it-works" className="frame" style={{ background: 'var(--bg-2)' }}>
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-end', paddingBottom: 'clamp(40px, 5vw, 80px)',
        }}>
          <div className="eyebrow">— How it works</div>
          <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 8 }} />
        </div>

        <div className="hiw-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(20px, 3vw, 60px)',
        }}>
          {steps.map((s) => (
            <div key={s.num}>
              <div className="mono" style={{
                color: 'var(--ink-3)',
                marginBottom: 'clamp(16px, 2vw, 24px)',
              }}>{s.num}</div>
              <h3 style={{
                margin: 0,
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(22px, 2.4vw, 32px)',
                fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15,
              }}>{s.title}</h3>
              <p className="body-text" style={{
                margin: '12px 0 0 0',
                color: 'var(--ink-2)',
                maxWidth: 340,
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 700px) {
          .hiw-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
window.HowItWorks = HowItWorks;
