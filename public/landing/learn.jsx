// Learn — pose breakdowns / academy (mirrors Floga's "Learn Faster, Remember More")
function Learn() {
  return (
    <section id="learn" className="frame" style={{ background: 'var(--bg-2)' }}>
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 12, left: 8 }} />
        <span className="reg-mark" style={{ top: 12, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', padding: '8px 0 48px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— The Academy</div>
          <h2 style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(30px, 4.2vw, 60px)',
            lineHeight: 1.05,
            fontWeight: 600,
            letterSpacing: '-0.025em',
          }}>
            Learn faster.<br/>Remember more.<br/>
            <span style={{ color: 'var(--ink-3)' }}>Deepen your practice.</span>
          </h2>
        </div>

        <div className="learn-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 'clamp(16px, 2vw, 28px)',
          alignItems: 'stretch',
        }}>
          {/* Big pose card */}
          <div style={{ background: 'var(--card)', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 11', background: '#1f1d1a' }}>
              <img
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80&auto=format&fit=crop"
                alt="Pose detail"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="pill" style={{
                position: 'absolute', top: 16, left: 16,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(6px)',
              }}>
                <Play size={11}/> 1:42 video guidance
              </span>
              <span className="mono" style={{
                position: 'absolute', bottom: 16, left: 16,
                background: 'rgba(20,19,15,0.7)', color: '#fff',
                padding: '6px 12px', borderRadius: 999,
              }}>
                ASANA · #047
              </span>
            </div>
            <div style={{ padding: 'clamp(20px, 2.4vw, 32px)' }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>— Adho Mukha Svanasana</div>
              <h3 style={{
                margin: '0 0 12px 0',
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: 'clamp(22px, 2.4vw, 32px)',
                fontWeight: 600, letterSpacing: '-0.02em',
              }}>
                Downward-Facing Dog
              </h3>
              <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                Every asana includes alignment cues, modifications, sanskrit pronunciation,
                and expert video guidance from our academy. Tap any pose in your sequence
                — it's all one tap away.
              </p>
            </div>
          </div>

          {/* Right column — 2 stacked info cards */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 'clamp(16px, 2vw, 28px)' }}>
            <div style={{
              background: 'var(--card)', borderRadius: 10, padding: 'clamp(20px, 2.4vw, 32px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18,
            }}>
              <div className="eyebrow">— Filter Smarter</div>
              <div>
                <h3 style={{
                  margin: '0 0 10px 0',
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15,
                }}>
                  By style, chakra, meridian, or benefit.
                </h3>
                <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                  Find the exact pose you need in seconds. Search by name, card number, or what you want from your practice.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Hip openers','Heart openers','Inversions','Yin','Heart chakra','Pre-natal','Standing balance'].map(t => (
                  <span key={t} className="pill" style={{ fontSize: 11, padding: '5px 10px' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{
              background: 'var(--ink)', color: '#fff', borderRadius: 10, padding: 'clamp(20px, 2.4vw, 32px)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18,
            }}>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>— Smart Suggestions</div>
              <div>
                <h3 style={{
                  margin: '0 0 10px 0',
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 'clamp(20px, 2.2vw, 28px)',
                  fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15,
                }}>
                  Poses that naturally follow.
                </h3>
                <p className="small" style={{ margin: 0, color: 'rgba(255,255,255,0.78)', lineHeight: 1.55 }}>
                  Kaira suggests what comes next as you build, so your sequences unfold with clarity and purpose.
                  No guesswork. Just smart, personal flow.
                </p>
              </div>
              <div className="mono" style={{ color: 'rgba(255,255,255,0.55)' }}>SUGGESTION ENGINE · v2.1</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .learn-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
window.Learn = Learn;
