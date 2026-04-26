function Pricing() {
  const [cycle, setCycle] = React.useState('annual');

  const plans = [
    {
      id: 'monthly', label: 'Monthly', tagline: 'Try it first',
      monthly: { price: '$14.99', sub: '/ month', note: 'Billed monthly' },
      annual:  { price: '$10.83', sub: '/ month', note: 'Upgrade anytime' },
      perks: [], featured: false,
    },
    {
      id: 'quarterly', label: 'Quarterly', tagline: 'Most popular',
      monthly: { price: '$42.99', sub: '/ quarter', note: 'Save 50% now' },
      annual:  { price: '$32.49', sub: '/ quarter', note: 'Best mid-term value' },
      perks: ['Kaira Monthly digital magazine', 'Private community access', 'Price locked for life'],
      featured: true,
    },
    {
      id: 'yearly', label: 'Yearly', tagline: 'Best value',
      monthly: { price: '$129.99', sub: '/ year', note: '$10.83 / month' },
      annual:  { price: '$129.99', sub: '/ year', note: 'That\'s $10.83 / month' },
      perks: ['Kaira Monthly digital magazine', 'Private community access', 'Price locked for life'],
      featured: false,
    },
  ];

  const baseFeatures = [
    'Intelligent Sequence Builder',
    'Sequence Player with voice & video',
    'Pre-Made Flows · 10–90 minutes',
    'Pose Library with alignment cues',
    'Multi-Style support',
  ];

  return (
    <section id="pricing" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto', padding: '8px 0 32px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Pricing</div>
          <h2 className="display-md" style={{ margin: 0, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.18, fontWeight: 600, letterSpacing: '-0.015em' }}>
            Flexible plans for every body — every current and future feature
            included, no tiers, no gates.
          </h2>

          <div style={{
            display: 'inline-flex', marginTop: 28,
            background: 'var(--card)', borderRadius: 999, padding: 4,
            border: '1px solid var(--rule-2)',
          }}>
            {[
              { id: 'monthly', label: 'Monthly' },
              { id: 'annual',  label: 'Annual · Save 50%' },
            ].map(c => (
              <button key={c.id} onClick={() => setCycle(c.id)}
                style={{
                  padding: '11px 22px', fontSize: 12,
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
                  borderRadius: 999, cursor: 'pointer',
                  background: cycle === c.id ? 'var(--ink)' : 'transparent',
                  color: cycle === c.id ? '#fff' : 'var(--ink-3)',
                  transition: 'background .25s ease, color .25s ease',
                }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pricing-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(14px, 1.6vw, 22px)',
        }}>
          {plans.map(p => {
            const view = cycle === 'annual' ? p.annual : p.monthly;
            const featured = p.featured;
            return (
              <article key={p.id} style={{
                background: featured ? 'var(--ink)' : 'var(--card)',
                color: featured ? '#fff' : 'var(--ink)',
                borderRadius: 18, padding: 'clamp(26px, 2.6vw, 36px)',
                display: 'flex', flexDirection: 'column', gap: 18,
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
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span className="display" style={{ fontSize: 'clamp(40px, 4.4vw, 60px)', fontWeight: 700, letterSpacing: '-0.025em' }}>
                      {view.price}
                    </span>
                    <span className="small" style={{ color: featured ? 'rgba(255,255,255,0.75)' : undefined }}>{view.sub}</span>
                  </div>
                  <div className="small" style={{ marginTop: 4, color: featured ? 'rgba(255,255,255,0.7)' : undefined }}>{view.note}</div>
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
                    <span className="label">Choose {p.label}</span>
                    <span className="arrow"><ArrowRight size={14}/></span>
                  </a>
                ) : (
                  <a href="#" className="btn-ghost" style={{ marginTop: 'auto', justifyContent: 'space-between' }}>
                    Choose {p.label}
                    <ArrowRight size={12}/>
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="small" style={{ textAlign: 'center', marginTop: 22, color: 'var(--ink-3)' }}>
          Cancel anytime · No commitments · Save 15–30% vs. app stores
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
