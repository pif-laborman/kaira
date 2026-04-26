// Yoga Player — voice/gong/video guidance modes
function Player() {
  const [mode, setMode] = React.useState('voice');
  const modes = [
    { id: 'voice', label: 'Voice cues',     desc: 'A gentle voice marks each transition. Eyes closed, mat empty, fully present.' },
    { id: 'gong',  label: 'Simple gong',    desc: 'A single tone signals the next pose. The most ambient way to flow.' },
    { id: 'video', label: 'Video guidance', desc: 'Full-frame video instruction for every asana, played in sequence with your timing.' },
  ];
  const active = modes.find(m => m.id === mode);

  return (
    <section id="player" className="frame" style={{ background: 'var(--ink)', color: '#fff' }}>
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8, color: '#fff', opacity: 0.55 }} />
        <span className="reg-mark" style={{ top: 0, right: 8, color: '#fff', opacity: 0.55 }} />

        <div style={{ textAlign: 'center', maxWidth: 920, margin: '0 auto', padding: '8px 0 48px 0' }}>
          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)', marginBottom: 18 }}>— The Yoga Player</div>
          <h2 style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(30px, 4.2vw, 64px)',
            lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.025em',
            color: '#fff',
          }}>
            The world's first yoga player<br/>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>for sequences you create.</span>
          </h2>
          <p className="body-lg" style={{ maxWidth: 620, margin: '24px auto 0 auto', color: 'rgba(255,255,255,0.75)' }}>
            For the first time, build your own sequence and be guided through it — exactly the way you made it.
            See your asana and what's coming next, at a glance.
          </p>
        </div>

        <div className="player-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(16px, 2vw, 28px)', alignItems: 'stretch',
        }}>
          {/* Phone-like preview */}
          <div style={{
            background: '#0d0c0a', borderRadius: 10, overflow: 'hidden',
            position: 'relative', minHeight: 460, display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ position: 'relative', flex: 1, minHeight: 320 }}>
              <img
                src="https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=1400&q=80&auto=format&fit=crop"
                alt="Practice"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)' }}/>
              {/* Now playing chip */}
              <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="mono" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: '#fff', padding: '6px 12px', borderRadius: 999 }}>
                  04 / 12 · 2:18
                </span>
                <span className="mono" style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', color: '#fff', padding: '6px 12px', borderRadius: 999 }}>
                  RIGHT SIDE
                </span>
              </div>
              {/* Pose name */}
              <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18 }}>
                <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>— Now</div>
                <div style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05,
                }}>
                  Warrior II
                </div>
                <div className="small" style={{ color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>
                  Virabhadrasana II · 0:42 remaining
                </div>
              </div>
            </div>
            {/* Up next strip */}
            <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <div className="mono" style={{ color: 'rgba(255,255,255,0.5)' }}>UP NEXT</div>
                <div style={{ fontWeight: 500, marginTop: 2 }}>Triangle Pose</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="icon-btn" style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}><ArrowLeft size={14}/></button>
                <button style={{
                  width: 44, height: 44, borderRadius: 999, background: '#fff', color: 'var(--ink)',
                  display: 'inline-grid', placeItems: 'center', cursor: 'pointer',
                }}><Play size={14}/></button>
                <button className="icon-btn" style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}><ArrowRight size={14}/></button>
              </div>
            </div>
          </div>

          {/* Mode selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.65)' }}>— Choose your guidance</div>
            {modes.map(m => {
              const isActive = m.id === mode;
              return (
                <button key={m.id} onClick={() => setMode(m.id)}
                  style={{
                    textAlign: 'left',
                    padding: 'clamp(20px, 2.2vw, 28px)',
                    borderRadius: 10,
                    background: isActive ? '#fff' : 'rgba(255,255,255,0.05)',
                    color: isActive ? 'var(--ink)' : '#fff',
                    border: '1px solid ' + (isActive ? '#fff' : 'rgba(255,255,255,0.1)'),
                    cursor: 'pointer',
                    transition: 'all .25s ease',
                    display: 'flex', flexDirection: 'column', gap: 8,
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontSize: 22, fontWeight: 600, letterSpacing: '-0.015em',
                    }}>{m.label}</span>
                    <span style={{
                      width: 22, height: 22, borderRadius: 999,
                      border: '1.5px solid ' + (isActive ? 'var(--ink)' : 'rgba(255,255,255,0.4)'),
                      display: 'inline-grid', placeItems: 'center',
                    }}>
                      {isActive && <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--ink)' }}/>}
                    </span>
                  </div>
                  <p className="small" style={{
                    margin: 0,
                    color: isActive ? 'var(--ink-2)' : 'rgba(255,255,255,0.7)',
                    lineHeight: 1.5,
                  }}>{m.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .player-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
window.Player = Player;
