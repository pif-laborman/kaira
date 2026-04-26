function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: 'rgba(247, 245, 241, 0.85)',
      backdropFilter: 'saturate(140%) blur(10px)',
      WebkitBackdropFilter: 'saturate(140%) blur(10px)',
    }}>
      <div className="page" style={{ paddingTop: 22, paddingBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <a href="#top" className="display" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Kaira
        </a>
        <a href="#pricing" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontSize: 12, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          Menu <Plus size={14}/>
        </a>
      </div>
    </header>
  );
}
window.Nav = Nav;
