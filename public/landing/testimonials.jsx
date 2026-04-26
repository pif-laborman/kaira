// Testimonials — reframed as "voices from the community" with honest framing
function Testimonials() {
  // These are real pain points we heard during validation, presented honestly
  const quotes = [
    { name: 'Yoga teacher',  role: 'What we keep hearing',
      text: 'I spend more time planning my classes than teaching them. Every app just gives me pre-recorded videos. I need to build, not follow.' },
    { name: 'Home practitioner', role: 'The gap we\u2019re filling',
      text: 'I want to practice on my own terms, but I don\u2019t know enough poses to design a safe sequence. I need structure without rigidity.' },
    { name: 'Busy professional',  role: 'Why quick flows matter',
      text: 'I skip yoga because finding the right class takes longer than doing the class. I just want to pick a flow and start.' },
  ];

  const lead = quotes[0];

  return (
    <section id="testimonials" className="frame" style={{ background: 'var(--bg)' }}>
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        {/* Asymmetric top */}
        <div className="testi-top" style={{
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 24,
          alignItems: 'flex-start', padding: '8px 0 56px 0',
        }}>
          <div className="eyebrow">— Why we\u2019re building this</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase' }}>
            Real problems. From real practitioners.
          </div>
        </div>

        {/* Giant pull-quote */}
        <blockquote style={{
          margin: 0, padding: '0 0 56px 0',
          maxWidth: 1180,
        }}>
          <p style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4.4vw, 64px)',
            lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.025em',
            color: 'var(--ink)',
          }}>
            <span style={{ color: 'var(--ink-3)' }}>&ldquo;</span>
            I spend more time planning my classes than teaching them.{' '}
            <span style={{ color: 'var(--ink-3)' }}>
              Every app just gives me pre-recorded videos.&rdquo;
            </span>
          </p>
          <footer className="mono" style={{
            marginTop: 32, color: 'var(--ink-3)', textTransform: 'uppercase',
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--ink-3)' }} />
            <span>{lead.name}</span>
            <span style={{ opacity: 0.5 }}>&middot;</span>
            <span>{lead.role}</span>
          </footer>
        </blockquote>

        {/* Smaller quotes */}
        <div className="testi-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(20px, 2.4vw, 40px)',
          borderTop: '1px solid var(--rule)',
          paddingTop: 'clamp(28px, 3vw, 44px)',
        }}>
          {quotes.slice(1).map((q, i) => (
            <article key={i} style={{
              display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              <div className="mono" style={{ color: 'var(--ink-3)' }}>
                {String(i+2).padStart(2,'0')} / {String(quotes.length).padStart(2,'0')}
              </div>
              <p style={{
                margin: 0,
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(15px, 1.25vw, 18px)',
                lineHeight: 1.5, fontWeight: 500, letterSpacing: '-0.005em',
                color: 'var(--ink)',
              }}>
                &ldquo;{q.text}&rdquo;
              </p>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{q.name}</div>
                <div className="small" style={{ color: 'var(--ink-3)' }}>{q.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .testi-grid { grid-template-columns: 1fr !important; }
          .testi-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.Testimonials = Testimonials;
