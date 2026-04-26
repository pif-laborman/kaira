// Styles — centered intro + section title, then big 3-image gallery w/ filter pills + counter
function Styles() {
  const styles = [
    { id: 'vinyasa', name: 'Hatha Vinyasa', flows: 24, level: 'All levels', minutes: '20–75', tag: 'Flow', img: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80&auto=format&fit=crop', body: 'Linked breath and movement. Builds heat, strength, and steady focus across a moving meditation.' },
    { id: 'yin',     name: 'Yin Yoga',      flows: 18, level: 'Gentle',     minutes: '30–90', tag: 'Slow', img: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=1200&q=80&auto=format&fit=crop', body: 'Long, supported holds for deep tissue and quiet attention. The opposite of pushing.' },
    { id: 'restorative', name: 'Restorative', flows: 16, level: 'Recovery', minutes: '20–60', tag: 'Slow', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80&auto=format&fit=crop', body: 'Bolsters, blankets, and stillness. Built for nervous system reset and full-body release.' },
    { id: 'chair',   name: 'Chair Yoga',    flows: 12, level: 'Accessible', minutes: '10–30', tag: 'Seated', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=1200&q=80&auto=format&fit=crop', body: 'Seated and supported variations of every major pose. For desks, tight days, or limited mobility.' },
    { id: 'kundalini', name: 'Kundalini',   flows: 14, level: 'Energetic', minutes: '20–60', tag: 'Energy', img: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=1200&q=80&auto=format&fit=crop', body: 'Breath, repetition, and chant. A practice that works on the energetic body, not just muscle.' },
    { id: 'meditation', name: 'Meditation', flows: 22, level: 'Stillness', minutes: '5–45',  tag: 'Mind',  img: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=1200&q=80&auto=format&fit=crop', body: 'Guided sittings, body scans, breathwork. A daily practice that fits in the cracks of any day.' },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'flow', label: 'Flow', match: ['vinyasa','kundalini'] },
    { id: 'slow', label: 'Slow', match: ['yin','restorative'] },
    { id: 'mind', label: 'Mind', match: ['meditation'] },
    { id: 'access', label: 'Accessible', match: ['chair','restorative'] },
  ];

  const [active, setActive] = React.useState('all');
  const visible = styles.filter(s => {
    if (active === 'all') return true;
    const f = filters.find(x => x.id === active);
    return f && f.match && f.match.includes(s.id);
  });

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => { setIdx(0); }, [active]);
  const len = visible.length;
  const showing = len === 0 ? [] : [
    visible[idx % len],
    visible[(idx+1) % len],
    visible[(idx+2) % len],
  ];
  const featured = showing[2];

  return (
    <section id="styles" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        {/* Centered eyebrow + intro */}
        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', padding: '8px 0 40px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Our Yoga Styles</div>
          <h2 className="display-md" style={{
            margin: 0,
            fontSize: 'clamp(26px, 3.4vw, 44px)',
            lineHeight: 1.2,
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}>
            Our sessions focus on building strength, balance, and presence
            through mindful movement and steady breath.
          </h2>
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={active === f.id ? 'pill dark' : 'pill outline'}
              style={{ padding: '10px 18px', fontSize: 12, letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Big section title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h3 className="display-cap" style={{ margin: 0, fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.03em' }}>
            {featured ? featured.name.toUpperCase() : 'NO STYLES'}
          </h3>
        </div>

        {/* 3-image carousel — small, small, large */}
        <div className="styles-carousel" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1.6fr',
          gap: 'clamp(12px, 1.6vw, 22px)',
          alignItems: 'flex-start',
        }}>
          {showing.map((s, i) => s && (
            <article key={`${active}-${idx}-${i}`} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                position: 'relative',
                borderRadius: 6, overflow: 'hidden',
                aspectRatio: '4 / 5',
                background: 'var(--bg-2)',
              }}>
                <img src={s.img} alt={s.name}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
                {i === 1 && (
                  <div style={{ position: 'absolute', bottom: 12, right: 12, display: 'flex', gap: 6 }}>
                    <span className="pill" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', fontSize: 11, padding: '6px 12px' }}>
                      {s.minutes} min
                    </span>
                    <span className="pill" style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)', fontSize: 11, padding: '6px 12px' }}>
                      {s.level}
                    </span>
                  </div>
                )}
              </div>
              {i === 0 && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ marginTop: 2, color: 'var(--ink-3)' }}><Sparkle size={12}/></span>
                  <p className="small" style={{ margin: 0, maxWidth: 240 }}>
                    Perfect for those who want to build steady strength and body awareness.
                  </p>
                </div>
              )}
              {i === 2 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
                  <p className="small" style={{ margin: 0, maxWidth: 340, color: 'var(--ink-2)' }}>
                    {s.body}
                  </p>
                  <a href="#pricing" className="btn-pill sm">
                    <span className="label">Book Now</span>
                    <span className="arrow"><ArrowRight size={12}/></span>
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Counter row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 28 }}>
          <button className="icon-btn" onClick={() => len && setIdx(i => (i - 1 + len) % len)} aria-label="Previous">
            <ArrowLeft size={14}/>
          </button>
          <span className="mono" style={{ color: 'var(--ink-3)', minWidth: 50 }}>
            {String((idx % Math.max(len,1))+1).padStart(2,'0')}/{String(len).padStart(2,'0')}
          </span>
          <button className="icon-btn" onClick={() => len && setIdx(i => (i + 1) % len)} aria-label="Next">
            <ArrowRight size={14}/>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .styles-carousel { grid-template-columns: 1fr 1fr !important; }
          .styles-carousel > article:nth-child(3) { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .styles-carousel { grid-template-columns: 1fr !important; }
          .styles-carousel > article:nth-child(3) { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
window.Styles = Styles;
