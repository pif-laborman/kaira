// Beyond Movement — pranayama, mudras, meditation, mantras
// Layout mirrors the editorial team-carousel ref:
//   - Big left-aligned headline + small uppercase label top right
//   - Row of portrait cards w/ name + role under each
//   - Last (featured) card has a side-panel bio + tag pills
//   - Arrow buttons + nn/nn counter bottom right
function Beyond() {
  const items = [
    {
      name: 'Pranayama',
      role: 'Breathwork & energy',
      bio: 'Pranayama steadies the mind and energizes the body. Layered into your sequences as guided breath cycles between poses.',
      tags: ['Breath', 'Energy', 'Focus'],
      img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop',
    },
    {
      name: 'Mudras',
      role: 'Hand gestures',
      bio: 'Subtle hand positions that direct attention and energy through the body. Cued visually in the player so you never lose your place.',
      tags: ['Subtle', 'Gesture', 'Direction'],
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80&auto=format&fit=crop',
    },
    {
      name: 'Meditation',
      role: 'Guided sittings',
      bio: 'Five minutes to a full hour. Body scans, breath counts, and silent sits — built to slot into your day or close out a flow.',
      tags: ['Stillness', 'Awareness', 'Daily'],
      img: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=1200&q=80&auto=format&fit=crop',
      soon: true,
    },
    {
      name: 'Mantras',
      role: 'Sacred sound',
      bio: 'Sanskrit chants and seed sounds woven into your sequences. Listen passively, repeat aloud, or set as your closing.',
      tags: ['Sound', 'Voice', 'Ritual'],
      img: 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=1200&q=80&auto=format&fit=crop',
      soon: true,
    },
  ];

  const [idx, setIdx] = React.useState(0);
  const len = items.length;
  // 3 visible: two regulars, one featured
  const visible = [
    items[idx % len],
    items[(idx + 1) % len],
    items[(idx + 2) % len],
  ];
  const featured = visible[2];

  return (
    <section id="beyond" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        {/* Top row: headline left, small label right */}
        <div className="beyond-top" style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'flex-start',
          padding: '8px 0 56px 0',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>— Beyond Movement</div>
            <h2 style={{
              margin: 0,
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: 'clamp(28px, 3.6vw, 52px)',
              lineHeight: 1.1, fontWeight: 600, letterSpacing: '-0.02em',
              maxWidth: 880,
            }}>
              Yoga is more than movement — breath, stillness, and sound,
              <span style={{ color: 'var(--ink-3)' }}> woven into every practice.</span>
            </h2>
          </div>
          <div className="mono" style={{
            color: 'var(--ink-3)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            paddingTop: 6,
          }}>
            Explore Practices
          </div>
        </div>

        {/* Carousel row: 3 cards. Layout = card | card | featured(big)+side-panel */}
        <div className="beyond-row" style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 0.9fr 2.6fr',
          gap: 'clamp(12px, 1.6vw, 22px)',
          alignItems: 'flex-end',
        }}>
          {/* Two regular cards (smaller) */}
          {visible.slice(0, 2).map((it, i) => (
            <article key={`small-${idx}-${i}`} className="beyond-fade" style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              animationDelay: `${i * 60}ms`,
            }}>
              <div style={{
                position: 'relative', borderRadius: 6, overflow: 'hidden',
                aspectRatio: '4 / 5', background: 'var(--bg-2)',
              }}>
                <img src={it.img} alt={it.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
                {it.soon && (
                  <span className="mono" style={{
                    position: 'absolute', top: 12, right: 12,
                    background: 'rgba(255,255,255,0.92)', padding: '4px 10px', borderRadius: 999,
                  }}>SOON</span>
                )}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}>{it.name}</div>
                <div className="small" style={{ marginTop: 4, color: 'var(--ink-3)' }}>{it.role}</div>
              </div>
            </article>
          ))}

          {/* Featured: bigger image + side panel */}
          <article className="beyond-featured" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'clamp(20px, 2.4vw, 36px)',
            alignItems: 'flex-end',
          }}>
            {/* Big featured image */}
            <div key={`feat-img-${idx}`} className="beyond-fade-up" style={{
              position: 'relative', borderRadius: 8, overflow: 'hidden',
              aspectRatio: '3 / 4',
              background: 'var(--bg-2)',
              boxShadow: '0 18px 50px -28px rgba(20,18,16,0.35)',
            }}>
              <img src={featured.img} alt={featured.name}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
              {featured.soon && (
                <span className="mono" style={{
                  position: 'absolute', top: 14, left: 14,
                  background: 'rgba(255,255,255,0.92)', padding: '5px 12px', borderRadius: 999,
                }}>SOON</span>
              )}
            </div>

            {/* Right side panel — text */}
            <div key={`feat-text-${idx}`} className="beyond-fade-text" style={{
              display: 'flex', flexDirection: 'column',
              gap: 22,
              paddingBottom: 'clamp(8px, 2vw, 24px)',
            }}>
              {/* Tag pills */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {featured.tags.map((t) => (
                  <span key={t} className="pill outline" style={{
                    fontSize: 11, padding: '5px 12px',
                    letterSpacing: '0.02em', textTransform: 'none', fontWeight: 500,
                    color: 'var(--ink-2)',
                  }}>{t}</span>
                ))}
              </div>

              <div>
                <div style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 'clamp(22px, 1.9vw, 26px)',
                  fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}>{featured.name}</div>
                <div className="small" style={{ marginTop: 6, color: 'var(--ink-3)' }}>{featured.role}</div>
              </div>

              <p className="small" style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 340 }}>
                {featured.bio}
              </p>
            </div>
          </article>
        </div>

        {/* Counter row, right-aligned */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: 18, marginTop: 36,
        }}>
          <button className="icon-btn" onClick={() => setIdx(i => (i - 1 + len) % len)} aria-label="Previous">
            <ArrowLeft size={14}/>
          </button>
          <span className="mono" style={{ color: 'var(--ink-3)', minWidth: 50, textAlign: 'center' }}>
            {String((idx % len) + 1).padStart(2, '0')}/{String(len).padStart(2, '0')}
          </span>
          <button className="icon-btn" onClick={() => setIdx(i => (i + 1) % len)} aria-label="Next">
            <ArrowRight size={14}/>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes beyondFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes beyondFadeUp {
          from { opacity: 0; transform: translateY(16px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes beyondFadeText {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .beyond-fade {
          animation: beyondFade 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .beyond-fade-up {
          animation: beyondFadeUp 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .beyond-fade-text {
          animation: beyondFadeText 620ms cubic-bezier(0.22, 1, 0.36, 1) 80ms both;
        }
        .beyond-fade-up img {
          transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .beyond-featured:hover .beyond-fade-up img {
          transform: scale(1.03);
        }

        @media (max-width: 1000px) {
          .beyond-row { grid-template-columns: 1fr 1fr !important; }
          .beyond-row > article:nth-child(3) { grid-column: 1 / -1; grid-template-columns: 1.2fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .beyond-row { grid-template-columns: 1fr !important; }
          .beyond-row > article:nth-child(3) { grid-column: auto; grid-template-columns: 1fr !important; }
          .beyond-top { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.Beyond = Beyond;
