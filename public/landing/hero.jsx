// Hero — CoreFit-style: full-bleed image with all content overlaid
function Hero() {
  return (
    <section id="top" style={{ position: 'relative', padding: 0 }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'min(92vh, 880px)',
        minHeight: 560,
        overflow: 'hidden',
        background: '#cfcfcf',
      }}>
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=2400&q=85&auto=format&fit=crop"
          alt="Yoga practice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Soft gradient for legibility on bottom + top */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(20,19,15,0.35) 0%, rgba(20,19,15,0) 22%, rgba(20,19,15,0) 60%, rgba(20,19,15,0.55) 100%)',
        }}/>

        {/* Top nav row overlaid */}
        <div className="page" style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          paddingTop: 28, paddingBottom: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: '#fff', zIndex: 3,
        }}>
          <a href="#top" className="display" style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            Kaira
          </a>
          <a href="#pricing" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 12, fontWeight: 600,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#fff',
          }}>
            Menu <Plus size={14}/>
          </a>
        </div>

        {/* Inner registration crosses bracketing the headline */}
        <span className="reg-mark" style={{ top: '14%', left: '8%', color: '#fff', opacity: 0.7 }}/>
        <span className="reg-mark" style={{ top: '14%', right: '8%', color: '#fff', opacity: 0.7 }}/>
        <span className="reg-mark" style={{ bottom: '22%', left: '8%', color: '#fff', opacity: 0.7 }}/>
        <span className="reg-mark" style={{ bottom: '22%', right: '8%', color: '#fff', opacity: 0.7 }}/>

        {/* Eyebrow tag — left side */}
        <div className="page" style={{
          position: 'absolute', top: '20%', left: 0, right: 0, zIndex: 3,
        }}>
          <span style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#fff',
          }}>
            Yoga Studio
          </span>
        </div>

        {/* Centered massive headline */}
        <div className="page" style={{
          position: 'absolute', top: '50%', left: 0, right: 0,
          transform: 'translateY(-50%)', zIndex: 3,
        }}>
          <h1 style={{
            margin: 0,
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: '#fff',
            fontSize: 'clamp(40px, 6.6vw, 96px)',
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
          }}>
            The intelligent yoga<br/>experience that <em style={{ fontStyle: 'italic', fontWeight: 500 }}>adapts to you</em>.
          </h1>
          <p style={{
            margin: '24px 0 0 0',
            maxWidth: 640,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.5,
            color: 'rgba(255,255,255,0.88)',
          }}>
            One app brings the entire yoga world together. Powerful for teachers.
            Transformative for students. Revolutionary for practitioners.
          </p>
        </div>

        {/* Bottom row — caption left, CTA right */}
        <div className="page hero-bottom" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          paddingBottom: 36, paddingTop: 36,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 24, color: '#fff', zIndex: 3,
        }}>
          <p style={{
            margin: 0, maxWidth: 360,
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 14, lineHeight: 1.5,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.02em', textTransform: 'uppercase', fontWeight: 500,
          }}>
            Practice · Move · Grow — on your own terms
          </p>
          <a href="#pricing" className="btn-pill light">
            <span className="label">Get Started</span>
            <span className="arrow"><ArrowRight size={14}/></span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-bottom { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
window.Hero = Hero;
