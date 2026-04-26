// Why Kaira — editorial: huge numbered chapters, asymmetric layout, no cards
function Problem() {
  const pillars = [
    {
      n: '01',
      title: 'Create your own sequences.',
      body: 'No more one-size-fits-all flows. Design a practice that fits your body, your schedule, and your reasons for showing up.',
      caption: 'fig.01 — VRKSASANA / TREE',
      img: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80&auto=format&fit=crop',
    },
    {
      n: '02',
      title: 'Practice your way.',
      body: 'Voice cues, a simple gong, or full video. The flow follows you, not the other way around.',
      caption: 'fig.02 — ADHO MUKHA / DOWN-DOG',
      img: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=1400&q=80&auto=format&fit=crop',
    },
    {
      n: '03',
      title: 'Go beyond movement.',
      body: 'Pranayama, mudras, meditation, mantras. Yoga in its full depth, woven seamlessly into your journey.',
      caption: 'fig.03 — MUDRA / GYAN',
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=80&auto=format&fit=crop',
    },
    {
      n: '04',
      title: 'Connect, don\u2019t just watch.',
      body: 'Share your flows. Find teachers. Be part of a real yoga community — not a feed of pre-recorded classes.',
      caption: 'fig.04 — SANGHA / COMMUNITY',
      img: 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=1200&q=80&auto=format&fit=crop',
    },
  ];

  return (
    <section id="why" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        {/* Asymmetric intro: eyebrow tucked far-left, big claim mid, deck right */}
        <div className="problem-top" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2.4fr 1fr',
          gap: 'clamp(16px, 2vw, 40px)',
          alignItems: 'flex-start',
          padding: '8px 0 80px 0',
        }}>
          <div className="eyebrow" style={{ paddingTop: 12 }}>— Why Kaira</div>
          <h2 style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(32px, 4.6vw, 64px)',
            lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em',
          }}>
            Most yoga apps follow the same outdated formula.{' '}
            <span style={{ color: 'var(--ink-3)' }}>
              Pre-recorded. Rigid. No room to explore.
            </span>
          </h2>
          <p className="small" style={{ margin: 0, paddingTop: 14, color: 'var(--ink-2)', maxWidth: 220 }}>
            Kaira is built to adapt to <em>you</em> — your body, schedule, and the reasons you keep showing up.
          </p>
        </div>

        {/* Editorial chapter list — no cards. Each item: huge number left, image+title right, thin rule between */}
        <div className="problem-list">
          {pillars.map((p, i) => (
            <article key={p.n} className="problem-row" style={{
              display: 'grid',
              gridTemplateColumns: '90px 1.1fr 1fr',
              gap: 'clamp(20px, 3vw, 60px)',
              alignItems: 'flex-start',
              padding: 'clamp(36px, 4vw, 56px) 0',
              borderTop: '1px solid var(--rule)',
            }}>
              {/* Big margin number */}
              <div style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 600, letterSpacing: '-0.02em',
                color: 'var(--ink)', lineHeight: 1,
              }}>{p.n}</div>

              {/* Image + caption */}
              <div>
                <div style={{
                  position: 'relative', borderRadius: 4, overflow: 'hidden',
                  aspectRatio: '4 / 3', background: 'var(--bg-2)',
                }}>
                  <img src={p.img} alt={p.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
                </div>
                <div className="mono" style={{ marginTop: 10, color: 'var(--ink-3)', textTransform: 'uppercase' }}>
                  {p.caption}
                </div>
              </div>

              {/* Title + body */}
              <div style={{ paddingTop: 4 }}>
                <h3 style={{
                  margin: 0,
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15,
                }}>{p.title}</h3>
                <p className="body" style={{ margin: '16px 0 0 0', maxWidth: 380 }}>
                  {p.body}
                </p>
              </div>
            </article>
          ))}
          <div style={{ borderTop: '1px solid var(--rule)' }} />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .problem-top { grid-template-columns: 1fr !important; gap: 16px !important; padding-bottom: 40px !important; }
          .problem-row { grid-template-columns: 60px 1fr !important; }
          .problem-row > div:nth-child(2) { grid-column: 1 / -1; grid-row: 2; }
          .problem-row > div:nth-child(3) { grid-column: 2; grid-row: 1; }
        }
        @media (max-width: 560px) {
          .problem-row { grid-template-columns: 1fr !important; }
          .problem-row > div:nth-child(1), .problem-row > div:nth-child(2), .problem-row > div:nth-child(3) {
            grid-column: 1; grid-row: auto;
          }
        }
      `}</style>
    </section>
  );
}
window.Problem = Problem;
