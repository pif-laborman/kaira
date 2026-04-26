// Testimonials — editorial pull-quote spread, no cards
function Testimonials() {
  const quotes = [
    { name: 'Sofia',  role: 'Practitioner & Beta Tester',
      text: 'The sequence builder is the first thing I\u2019ve seen that actually keeps up with how I want to practice. Lifetime access is a no-brainer.' },
    { name: 'Ann S.', role: 'Yoga Teacher · 10 yrs',
      text: 'First time I genuinely want to use a yoga app for class prep. What\u2019s coming is mind-blowing.' },
    { name: 'Anika',  role: 'Yoga Teacher & Beta Tester',
      text: 'Planning feels creative and intuitive. As a teacher, I see the potential to connect with students who actually align with my style.' },
    { name: 'Davide', role: 'Software Engineer · Beta',
      text: 'This isn\u2019t just another streaming app with pre-made videos. The team is building with real depth.' },
  ];

  // Featured (giant) quote shown on top, rest as small marginalia below
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
          <div className="eyebrow">— Voices</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textTransform: 'uppercase' }}>
            From practitioners. From teachers. From beta.
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
            The sequence builder is the first thing I&rsquo;ve seen that actually keeps up
            with how I want to practice.{' '}
            <span style={{ color: 'var(--ink-3)' }}>
              Lifetime access is a no-brainer.&rdquo;
            </span>
          </p>
          <footer className="mono" style={{
            marginTop: 32, color: 'var(--ink-3)', textTransform: 'uppercase',
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <span style={{ display: 'inline-block', width: 36, height: 1, background: 'var(--ink-3)' }} />
            <span>{lead.name}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{lead.role}</span>
          </footer>
        </blockquote>

        {/* Smaller quotes — three columns, no cards, just rule */}
        <div className="testi-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
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
        @media (max-width: 900px) { .testi-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) {
          .testi-grid { grid-template-columns: 1fr !important; }
          .testi-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.Testimonials = Testimonials;
