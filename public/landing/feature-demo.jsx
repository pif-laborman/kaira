// Feature Demo — interactive click-to-reveal with mockup swap (Cal AI pattern)
function FeatureDemo() {
  const [active, setActive] = React.useState(0);
  const [hovered, setHovered] = React.useState(null);
  const autoRef = React.useRef(null);

  const features = [
    {
      id: 'builder',
      title: 'Sequence Builder',
      desc: 'Filter by style, chakra, meridian, or benefit. Smart suggestions handle transitions. Build a complete class in under five minutes.',
      color: 'var(--blush)',
      mockupLabel: 'Builder',
    },
    {
      id: 'player',
      title: 'Sequence Player',
      desc: 'Voice cues, gong transitions, or full video. The player guides you through each pose at your pace. Countdown between transitions.',
      color: 'var(--bg-2)',
      mockupLabel: 'Player',
    },
    {
      id: 'premade',
      title: 'Pre-Made Flows',
      desc: 'Expert-crafted sequences for energy, relaxation, flexibility, and strength. Pick one and start. Ten to ninety minutes.',
      color: 'var(--blush-2)',
      mockupLabel: 'Pre-Made',
    },
    {
      id: 'poses',
      title: 'Pose Library',
      desc: 'Every pose with alignment cues, modifications, Sanskrit names, and video guidance from certified instructors.',
      color: 'var(--card-2)',
      mockupLabel: 'Poses',
    },
    {
      id: 'styles',
      title: 'Seven Styles',
      desc: 'Hatha Vinyasa, Yin, Restorative, Chair, Kundalini, Pranayama, Meditation. Each with its own pose library and color palette.',
      color: 'var(--bg-2)',
      mockupLabel: 'Styles',
    },
  ];

  // Auto-cycle every 5 seconds, pause on hover
  React.useEffect(() => {
    if (hovered !== null) return;
    autoRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, [hovered, features.length]);

  const handleClick = (i) => {
    setActive(i);
    clearInterval(autoRef.current);
  };

  const f = features[active];

  return (
    <section id="features" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24,
          alignItems: 'flex-end', paddingBottom: 'clamp(40px, 5vw, 80px)',
        }}>
          <div className="eyebrow">— Features</div>
          <div className="mono" style={{ color: 'var(--ink-3)', textAlign: 'right', textTransform: 'uppercase' }}>
            {String(active + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
          </div>
        </div>

        <div className="fd-layout" style={{
          display: 'grid', gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(32px, 4vw, 80px)', alignItems: 'start',
        }}>
          {/* Left: feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {features.map((feat, i) => {
              const isActive = i === active;
              return (
                <button
                  key={feat.id}
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'flex', alignItems: 'baseline',
                    gap: 'clamp(12px, 1.6vw, 24px)',
                    padding: 'clamp(18px, 2.2vw, 28px) 0',
                    borderTop: '1px solid var(--rule)',
                    background: 'none', border: 'none', borderTop: '1px solid var(--rule)',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'background 200ms ease',
                  }}
                >
                  <span className="mono" style={{
                    color: isActive ? 'var(--ink)' : 'var(--ink-3)',
                    minWidth: 28,
                    transition: 'color 200ms ease',
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontSize: 'clamp(18px, 1.8vw, 24px)',
                      fontWeight: 600, letterSpacing: '-0.015em',
                      color: isActive ? 'var(--ink)' : 'var(--ink-3)',
                      transition: 'color 200ms ease',
                    }}>{feat.title}</div>
                    <div style={{
                      maxHeight: isActive ? 120 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 520ms cubic-bezier(.22,1,.36,1), opacity 350ms ease',
                      opacity: isActive ? 1 : 0,
                    }}>
                      <p style={{
                        margin: '8px 0 0 0',
                        fontSize: 15, lineHeight: 1.6,
                        color: 'var(--ink-2)',
                        maxWidth: 400,
                      }}>{feat.desc}</p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: 18, color: 'var(--ink-3)',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateX(0)' : 'translateX(-6px)',
                    transition: 'opacity 250ms ease, transform 350ms cubic-bezier(.65,0,.35,1)',
                  }}>+</span>
                </button>
              );
            })}
            <div style={{ borderTop: '1px solid var(--rule)' }} />

            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
              {features.map((_, i) => (
                <button key={i} onClick={() => handleClick(i)} style={{
                  width: i === active ? 24 : 8, height: 8,
                  borderRadius: 999,
                  background: i === active ? 'var(--ink)' : 'var(--rule)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'width 350ms cubic-bezier(.65,0,.35,1), background 200ms ease',
                }} />
              ))}
            </div>
          </div>

          {/* Right: mockup placeholder */}
          <div style={{
            aspectRatio: '4/5',
            borderRadius: 18,
            background: f.color,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 16,
            transition: 'background 520ms cubic-bezier(.22,1,.36,1)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 20, left: 20,
            }}>
              <span className="mono" style={{ color: 'var(--ink-3)' }}>
                FIG.{String(active + 1).padStart(2, '0')}
              </span>
            </div>
            <div style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 600, letterSpacing: '-0.02em',
              color: 'var(--ink)',
              opacity: 0.25,
            }}>{f.mockupLabel}</div>
            <div className="mono" style={{ color: 'var(--ink-3)' }}>
              App screenshot placeholder
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 800px) {
          .fd-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.FeatureDemo = FeatureDemo;
