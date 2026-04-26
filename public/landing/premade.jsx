// Pre-Made Flows — "Some days you create. Other days you just press play."
function Premade() {
  const flows = [
    { dur: '20', name: 'Morning Energy', tag: 'Vinyasa', img: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=1200&q=80&auto=format&fit=crop' },
    { dur: '45', name: 'Deep Restore', tag: 'Yin', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop' },
    { dur: '30', name: 'Hip Opening', tag: 'Hatha', img: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80&auto=format&fit=crop' },
    { dur: '15', name: 'Wind Down', tag: 'Restorative', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&auto=format&fit=crop' },
    { dur: '60', name: 'Strength Flow', tag: 'Power', img: 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=1200&q=80&auto=format&fit=crop' },
  ];

  return (
    <section id="flows" className="frame" style={{ background: 'var(--bg-2)' }}>
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div className="premade-head" style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr',
          gap: 'clamp(24px, 4vw, 80px)', alignItems: 'flex-end',
          padding: '8px 0 48px 0',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>— Pre-Made Flows</div>
            <h2 style={{
              margin: 0,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(30px, 4.2vw, 64px)',
              lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em',
            }}>
              Some days you create.<br/>
              <span style={{ color: 'var(--ink-3)' }}>Other days you just press play.</span>
            </h2>
          </div>
          <p className="body-lg" style={{ margin: 0, maxWidth: 380, color: 'var(--ink-2)' }}>
            Expert-crafted sequences for energy, recovery, flexibility, or strength.
            No searching. No second-guessing. Pick one and move.
          </p>
        </div>

        {/* Horizontal scroll row */}
        <div className="premade-row" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 'clamp(10px, 1.4vw, 18px)',
        }}>
          {flows.map((f, i) => (
            <article key={i} style={{
              position: 'relative', borderRadius: 8, overflow: 'hidden',
              aspectRatio: '3 / 4', background: 'var(--bg-2)',
              cursor: 'pointer', transition: 'transform .3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={f.img} alt={f.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.7) 100%)' }}/>
              <span className="mono" style={{
                position: 'absolute', top: 12, left: 12,
                background: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: 999,
              }}>{f.dur} MIN</span>
              <span className="pill" style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(255,255,255,0.92)', fontSize: 11, padding: '4px 10px',
              }}>{f.tag}</span>
              <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, color: '#fff' }}>
                <div style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em',
                }}>{f.name}</div>
                <div className="mono" style={{ color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                  PRESS PLAY →
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* AI coming-soon strip */}
        <div style={{
          marginTop: 28, padding: '20px 24px', borderRadius: 999,
          background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span className="mono" style={{
              background: 'var(--ink)', color: '#fff', padding: '4px 10px', borderRadius: 999,
            }}>SOON</span>
            <span style={{ fontWeight: 500 }}>AI-powered flows, personalized for you.</span>
          </div>
          <span className="small" style={{ color: 'var(--ink-3)' }}>Tell us your goal · Kaira builds the flow</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .premade-row { grid-template-columns: repeat(3, 1fr) !important; }
                                     .premade-row > article:nth-child(n+4) { display: none; } }
        @media (max-width: 720px)  { .premade-row { grid-template-columns: 1fr 1fr !important; }
                                     .premade-head { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
window.Premade = Premade;
