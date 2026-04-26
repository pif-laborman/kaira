function Pricing() {
  const plans = [
    {
      id: 'monthly', label: 'Monthly', tagline: 'Try it first',
      price: '$14.99', sub: '/ month', note: 'Billed monthly. Cancel anytime.',
      perks: [], featured: false,
    },
    {
      id: 'quarterly', label: 'Quarterly', tagline: 'Most popular',
      price: '$34.99', sub: '/ quarter',
      note: '$11.66 / month. Save 22%.',
      perks: ['Kaira Monthly digital magazine', 'Private community access', 'Price locked for life'],
      featured: true,
    },
    {
      id: 'yearly', label: 'Yearly', tagline: 'Best value',
      price: '$99.99', sub: '/ year',
      note: '$8.33 / month. Save 44%.',
      perks: ['Kaira Monthly digital magazine', 'Private community access', 'Price locked for life'],
      featured: false,
    },
  ];

  const baseFeatures = [
    'Intelligent Sequence Builder',
    'Sequence Player with voice & video',
    'Pre-Made Flows, 10 to 90 minutes',
    'Pose Library with alignment cues',
    'Multi-Style support',
  ];

  return (
    <section id="pricing" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', padding: '8px 0 clamp(32px, 4vw, 48px) 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Pricing</div>
          <h2 className="display-md" style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.18, fontWeight: 600, letterSpacing: '-0.015em' }}>
            Practice on your terms. Every feature included.
          </h2>
          <p className="body-lg" style={{ marginTop: 16, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
            All plans include every current and future feature. No tiers, no gates. Choose the billing cycle that works for you.
          </p>
        </div>

        <div className="pricing-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(14px, 1.6vw, 22px)',
        }}>
          {plans.map(p => {
            const featured = p.featured;
            return (
              <article key={p.id} style={{
                background: featured ? 'var(--ink)' : 'var(--card)',
                color: featured ? '#fff' : 'var(--ink)',
                borderRadius: 18, padding: 'clamp(26px, 2.6vw, 36px)',
                display: 'flex', flexDirection: 'column', gap: 18,
                border: featured ? 'none' : '1px solid var(--rule-2)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono" style={{ color: featured ? 'rgba(255,255,255,0.7)' : 'var(--ink-3)' }}>
                    {p.label.toUpperCase()}
                  </span>
                  {featured && (
                    <span className="pill" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 10, padding: '4px 10px' }}>
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  {p.strikePrice && (
                    <div style={{ fontSize: 14, textDecoration: 'line-through', color: featured ? 'rgba(255,255,255,0.4)' : 'var(--ink-3)', marginBottom: 2 }}>
                      {p.strikePrice}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="display" style={{ fontSize: 'clamp(40px, 4.4vw, 60px)', fontWeight: 700, letterSpacing: '-0.025em' }}>
                      {p.price}
                    </span>
                    <span className="small" style={{ color: featured ? 'rgba(255,255,255,0.75)' : undefined }}>{p.sub}</span>
                  </div>
                  <div className="small" style={{ marginTop: 4, color: featured ? 'rgba(255,255,255,0.7)' : undefined }}>{p.note}</div>
                </div>

                <div style={{ borderTop: '1px solid', borderColor: featured ? 'rgba(255,255,255,0.18)' : 'var(--rule-2)', paddingTop: 16 }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {baseFeatures.map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
                        <span style={{ marginTop: 2, opacity: 0.7 }}><Check size={14}/></span>
                        <span>{f}</span>
                      </li>
                    ))}
                    {p.perks.map(f => (
                      <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14 }}>
                        <span style={{ marginTop: 2 }}><Sparkle size={14}/></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {featured ? (
                  <a href="#" className="btn-pill inverted" style={{ marginTop: 'auto' }}>
                    <span className="label">Get {p.label} Access</span>
                    <span className="arrow"><ArrowRight size={14}/></span>
                  </a>
                ) : (
                  <a href="#" className="btn-ghost" style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
                    Get {p.label} Access
                    <ArrowRight size={12}/>
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="small" style={{ textAlign: 'center', marginTop: 22, color: 'var(--ink-3)' }}>
          Cancel anytime · No commitments · Save 15-30% vs. app stores
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.Pricing = Pricing;
