// Features — Berbel-style numbered services. Big numbers, stacked rows, link-cta
function Features() {
  const items = [
    { tag: '01', title: 'Sequence Builder', body: 'Smart pose suggestions, filter by chakra, meridian, or benefit. Cuts class prep by seventy percent.', cta: 'See builder' },
    { tag: '02', title: 'Sequence Player',  body: 'Voice cues, gong transitions, or full video. Practice on your terms, at your pace.', cta: 'See player' },
    { tag: '03', title: 'Pre-Made Flows',   body: 'Expert-crafted sequences for energy, relaxation, and flexibility. Ten to ninety minutes.', cta: 'See flows' },
    { tag: '04', title: 'Pose Library',     body: 'Alignment cues, modifications, and video guidance from certified instructors.', cta: 'See library' },
    { tag: '05', title: 'Multi-Style',      body: 'Hatha, Yin, Restorative, Chair, Kundalini, Meditation. Switch between sessions.', cta: 'See styles' },
    { tag: '06', title: 'Smart Filtering',  body: 'Find poses by chakra, meridian, body area, or difficulty. Build with intention.', cta: 'See filters' },
  ];

  return (
    <section id="features" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        {/* Asymmetric intro */}
        <div className="features-top" style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 'clamp(20px, 3vw, 60px)',
          alignItems: 'flex-end',
          padding: '8px 0 80px 0',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>— Index of Features</div>
            <h2 style={{
              margin: 0,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(32px, 4.6vw, 64px)',
              lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em',
              maxWidth: 760,
            }}>
              Everything you need to build, practice, and grow —{' '}
              <span style={{ color: 'var(--ink-3)' }}>and nothing you don't.</span>
            </h2>
          </div>
          <p className="small" style={{ margin: 0, color: 'var(--ink-2)', maxWidth: 280, paddingBottom: 6 }}>
            A short index of what&rsquo;s on offer. Each entry below is a chapter inside the app.
          </p>
        </div>

        {/* Berbel-style numbered services list */}
        <div className="features-list">
          {items.map((f, i) => (
            <a key={i} href="#" className="feature-item" style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'flex-start',
              gap: 'clamp(20px, 3vw, 60px)',
              padding: 'clamp(28px, 3.4vw, 48px) 0',
              borderTop: '1px solid var(--rule)',
              color: 'var(--ink)',
              textDecoration: 'none',
              position: 'relative',
            }}>
              {/* Big number */}
              <div className="feature-num" style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(36px, 4.8vw, 72px)',
                fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 0.95,
                color: 'var(--ink)', minWidth: '1.6em',
              }}>{f.tag}</div>

              {/* Title + body */}
              <div className="feature-content" style={{ paddingTop: 8 }}>
                <h3 className="feature-title" style={{
                  margin: 0,
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 'clamp(28px, 3.6vw, 52px)',
                  fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.05,
                  transition: 'color .25s ease, transform .35s cubic-bezier(.65,0,.35,1)',
                  display: 'inline-block',
                }}>{f.title}</h3>
                <p className="body" style={{
                  margin: '14px 0 0 0', maxWidth: 520, color: 'var(--ink-2)',
                }}>{f.body}</p>
              </div>

              {/* CTA + arrow */}
              <div className="feature-cta" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                paddingTop: 16,
                whiteSpace: 'nowrap',
              }}>
                <span className="mono" style={{
                  color: 'var(--ink-3)', textTransform: 'uppercase',
                  transition: 'color .25s ease',
                }}>{f.cta}</span>
                <span className="feature-arrow" style={{
                  width: 44, height: 44, borderRadius: 999,
                  border: '1px solid var(--rule)',
                  display: 'inline-grid', placeItems: 'center',
                  transition: 'background .25s ease, color .25s ease, transform .35s cubic-bezier(.65,0,.35,1), border-color .25s ease',
                }}>
                  <ArrowRight size={14}/>
                </span>
              </div>
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>
      </div>
      <style>{`
        .feature-item:hover .feature-title { transform: translateX(8px); }
        .feature-item:hover .feature-arrow { background: var(--ink); color: var(--card-2); border-color: var(--ink); transform: rotate(-45deg); }
        .feature-item:hover .feature-cta .mono { color: var(--ink); }
        @media (max-width: 900px) {
          .features-top { grid-template-columns: 1fr !important; align-items: flex-start !important; }
          .feature-item { grid-template-columns: auto 1fr !important; }
          .feature-cta { grid-column: 1 / -1; padding-top: 8px !important; }
        }
      `}</style>
    </section>
  );
}
window.Features = Features;
