function CTA() {
  return (
    <section id="cta" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 920, margin: '0 auto', padding: '8px 0 40px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Begin</div>
          <h2 className="display-cap" style={{
            margin: 0, fontSize: 'clamp(36px, 5.2vw, 80px)',
            letterSpacing: '0.005em', lineHeight: 1.02,
          }}>
            STOP FOLLOWING.<br/>START DESIGNING.
          </h2>
        </div>

        <div style={{
          position: 'relative', borderRadius: 8, overflow: 'hidden',
          aspectRatio: '21 / 9', minHeight: 320, background: '#1f1d1a',
        }}>
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=2200&q=80&auto=format&fit=crop"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55))' }}/>
          <div style={{
            position: 'absolute', left: 'clamp(24px, 4vw, 56px)', right: 'clamp(24px, 4vw, 56px)',
            bottom: 'clamp(24px, 4vw, 48px)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, color: '#fff', flexWrap: 'wrap',
          }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.92)', maxWidth: 460 }}>
              Build your first sequence in under five minutes.
              Cancel anytime. Web subscribers save 15–30%.
            </p>
            <a href="#pricing" className="btn-pill inverted">
              <span className="label">Start Free Trial</span>
              <span className="arrow"><ArrowRight size={14}/></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
window.CTA = CTA;
