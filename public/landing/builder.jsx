// Builder — centered intro, big builder card with library + player, both white, minimal
function Builder() {
  const allPoses = [
    { id: 'mt',   name: "Mountain",      sk: 'Tadasana',      dur: 30, style: 'Vinyasa' },
    { id: 'fwd',  name: "Forward Fold",  sk: 'Uttanasana',    dur: 45, style: 'Vinyasa' },
    { id: 'lng',  name: "Low Lunge",     sk: 'Anjaneyasana',  dur: 60, style: 'Vinyasa' },
    { id: 'wr1',  name: "Warrior I",     sk: 'Virabhadrasana',dur: 60, style: 'Vinyasa' },
    { id: 'wr2',  name: "Warrior II",    sk: 'Virabhadra II', dur: 60, style: 'Vinyasa' },
    { id: 'tri',  name: "Triangle",      sk: 'Trikonasana',   dur: 45, style: 'Vinyasa' },
    { id: 'pgn',  name: "Pigeon",        sk: 'Eka Pada',      dur: 90, style: 'Yin'     },
    { id: 'chl',  name: "Child's Pose",  sk: 'Balasana',      dur: 60, style: 'Restore' },
    { id: 'svs',  name: "Savasana",      sk: 'Corpse',        dur: 180,style: 'Restore' },
  ];
  const filters = ['All', 'Vinyasa', 'Yin', 'Restore'];
  const [filter, setFilter] = React.useState('All');
  const [seq, setSeq] = React.useState(['mt','fwd','lng','wr1','wr2']);
  const [playing, setPlaying] = React.useState(false);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [tick, setTick] = React.useState(0);

  const filtered = allPoses.filter(p => filter === 'All' || p.style === filter);
  const seqPoses = seq.map(id => allPoses.find(p => p.id === id)).filter(Boolean);
  const totalSec = seqPoses.reduce((s,p) => s + p.dur, 0);
  const totalMin = Math.round(totalSec / 60);

  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setTick(x => x + 1);
      setCurrentIdx(i => i >= seqPoses.length - 1 ? (setPlaying(false), 0) : i + 1);
    }, 1400);
    return () => clearTimeout(t);
  }, [playing, tick]);

  const togglePose = (id) => setSeq(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const fmtDur = (s) => { const m = Math.floor(s/60), r = s%60; return m ? `${m}:${String(r).padStart(2,'0')}` : `${r}s`; };

  return (
    <section id="builder" className="frame">
      <div className="page" style={{ position: 'relative' }}>
        <span className="reg-mark" style={{ top: 0, left: 8 }} />
        <span className="reg-mark" style={{ top: 0, right: 8 }} />

        <div style={{ textAlign: 'center', maxWidth: 920, margin: '0 auto', padding: '8px 0 56px 0' }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>— Sequence Builder</div>
          <h2 className="display-md" style={{
            margin: 0, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1.18,
            fontWeight: 600, letterSpacing: '-0.015em',
          }}>
            Build a complete flow in under five minutes — filtered by style,
            chakra, or intent, and stitched together with smart transitions.
          </h2>
        </div>

        <div className="builder-grid" style={{
          display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(14px, 1.6vw, 22px)',
        }}>
          <div style={{ background: 'var(--card)', borderRadius: 18, padding: 'clamp(22px, 2.4vw, 32px)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 18 }}>
              <span className="mono" style={{ color: 'var(--ink-3)' }}>POSE LIBRARY</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {filters.map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={filter === f ? 'pill dark' : 'pill outline'}
                    style={{ padding: '6px 12px', fontSize: 11 }}>{f}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }} className="pose-list">
              {filtered.map(p => {
                const inSeq = seq.includes(p.id);
                return (
                  <button key={p.id} onClick={() => togglePose(p.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                      padding: '12px 14px', borderRadius: 12,
                      background: inSeq ? 'var(--ink)' : 'var(--bg)',
                      color: inSeq ? '#fff' : 'var(--ink)',
                      transition: 'background .2s ease, color .2s ease',
                      textAlign: 'left', minWidth: 0, cursor: 'pointer',
                    }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <div style={{ fontSize: 11, opacity: 0.65, fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.sk}</div>
                    </div>
                    <span style={{
                      width: 22, height: 22, borderRadius: 999,
                      display: 'grid', placeItems: 'center',
                      background: inSeq ? '#fff' : 'transparent',
                      color: inSeq ? 'var(--ink)' : 'var(--ink-3)',
                      border: inSeq ? 'none' : '1px solid var(--rule)', flex: '0 0 auto',
                    }}>
                      {inSeq ? <Check size={12}/> : <Plus size={12}/>}
                    </span>
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid var(--rule-2)', paddingTop: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="mono" style={{ color: 'var(--ink-3)' }}>YOUR SEQUENCE · {seq.length} POSES</span>
                <span className="mono" style={{ color: 'var(--ink-3)' }}>{totalMin} MIN</span>
              </div>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }} className="h-scroll">
                {seqPoses.map((p, i) => (
                  <div key={i} style={{
                    flex: '0 0 auto', minWidth: 96,
                    padding: '10px 12px', borderRadius: 10,
                    background: i === currentIdx && playing ? 'var(--blush)' : 'var(--bg)',
                    transition: 'background .3s ease',
                  }}>
                    <div className="mono" style={{ color: 'var(--ink-3)' }}>0{i+1}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{p.name}</div>
                    <div className="small" style={{ marginTop: 2 }}>{fmtDur(p.dur)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Player */}
          <div style={{
            background: 'var(--card)', borderRadius: 18, padding: 'clamp(22px, 2.4vw, 32px)',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span className="mono" style={{ color: 'var(--ink-3)' }}>PLAYER</span>
              <span className="pill outline" style={{ fontSize: 11 }}>
                <Mic size={12}/> Voice cues
              </span>
            </div>

            <div style={{
              flex: 1, borderRadius: 6, overflow: 'hidden',
              background: '#1f1d1a', position: 'relative', minHeight: 280,
            }}>
              <img
                src="https://images.unsplash.com/photo-1593810451137-5dc55105dace?w=1200&q=80&auto=format&fit=crop"
                alt="Current pose"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55))' }}/>
              <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
                <div className="mono" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  POSE {String(currentIdx+1).padStart(2,'0')} / {String(seqPoses.length).padStart(2,'0')}
                </div>
                <div className="mono" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  {seqPoses[currentIdx] ? fmtDur(seqPoses[currentIdx].dur) : '—'}
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, color: '#fff' }}>
                <div className="display" style={{ fontSize: 28, fontWeight: 700 }}>
                  {seqPoses[currentIdx]?.name || 'Add a pose'}
                </div>
                <div className="small" style={{ color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
                  {seqPoses[currentIdx]?.sk}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <button className="icon-btn" onClick={() => setCurrentIdx(i => Math.max(0, i-1))} aria-label="Previous">
                <ArrowLeft size={14}/>
              </button>
              <button className="btn-pill sm"
                onClick={() => { setPlaying(p => !p); if(!playing) setTick(t=>t+1); }}
                style={{ flex: 1 }}>
                <span className="label" style={{ flex: 1 }}>
                  {playing ? 'Pause Flow' : 'Play Flow'}
                </span>
                <span className="arrow">{playing ? <Pause size={12}/> : <Play size={12}/>}</span>
              </button>
              <button className="icon-btn" onClick={() => setCurrentIdx(i => Math.min(seqPoses.length-1, i+1))} aria-label="Next">
                <ArrowRight size={14}/>
              </button>
            </div>

            <div className="small" style={{ marginTop: 14, color: 'var(--ink-3)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12}/> {totalMin} min total · {seqPoses.length} poses · transitions auto-suggested
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .builder-grid { grid-template-columns: 1fr !important; }
          .pose-list { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
window.Builder = Builder;
