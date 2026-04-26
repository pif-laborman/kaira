function FAQ() {
  const items = [
    { q: 'How is Kaira different from a video class app?', a: 'Those apps give you pre-recorded classes — you press play and follow along. Kaira is the opposite: you design your own sequences (or pick expert-crafted ones), and the app guides you with voice cues, gongs, or video. You\'re the author, not the audience.' },
    { q: 'I\'m a complete beginner. Is this too advanced for me?', a: 'Not at all. Every pose includes alignment cues, modifications, and video guidance. The pre-made flows range from gentle beginner sequences to advanced vinyasa. Start pre-made, build your own when you\'re ready.' },
    { q: 'Can I use this for class planning as a teacher?', a: 'It\'s the most popular use case. Filter by style, chakra, meridian, or benefit. The builder suggests poses that naturally follow your choices. Teachers tell us it cuts class prep time by seventy percent.' },
    { q: 'Will my price ever increase?', a: 'Not if you subscribe on this site. Web subscribers get price-lock for life — your rate stays the same as long as your subscription is active.' },
    { q: 'What devices does Kaira work on?', a: 'iOS and Android right now. Web version is on the roadmap for 2026. Sequences sync across devices once you\'re signed in.' },
    { q: 'Does it work offline?', a: 'Yes. Build and play sequences without an internet connection. Your library syncs when you\'re back online.' },
    { q: 'Can I cancel anytime?', a: 'Yes. No commitments, no penalties. You keep access until your current billing period ends.' },
  ];
  const [open, setOpen] = React.useState(0);

  return (
    <section id="faq" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto', padding: '8px 0 40px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Questions, Answered</div>
          <h2 className="display-md" style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.15, fontWeight: 600, letterSpacing: '-0.015em' }}>
            Everything you might want to know,<br/>before you press play.
          </h2>
        </div>

        <div style={{ background: 'var(--card)', borderRadius: 18, padding: 0, overflow: 'hidden', maxWidth: 880, margin: '0 auto' }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule-2)' }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: '100%', textAlign: 'left',
                    padding: 'clamp(20px, 2.4vw, 28px)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    gap: 16, cursor: 'pointer',
                  }}>
                  <span className="display-sm" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 600 }}>
                    {it.q}
                  </span>
                  <span style={{
                    width: 36, height: 36, borderRadius: 999,
                    border: '1px solid var(--rule)',
                    display: 'grid', placeItems: 'center',
                    transition: 'transform .3s ease, background .25s ease, color .25s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    background: isOpen ? 'var(--ink)' : 'transparent',
                    color: isOpen ? '#fff' : 'var(--ink)',
                    flex: '0 0 auto',
                  }}>
                    <Plus size={14}/>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 320 : 0,
                  overflow: 'hidden',
                  transition: 'max-height .4s ease, padding .3s ease, opacity .3s ease',
                  opacity: isOpen ? 1 : 0,
                  padding: isOpen ? '0 clamp(20px, 2.4vw, 28px) clamp(22px, 2.4vw, 28px)' : '0 clamp(20px, 2.4vw, 28px)',
                }}>
                  <p className="body" style={{ margin: 0, maxWidth: 620 }}>{it.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
window.FAQ = FAQ;
