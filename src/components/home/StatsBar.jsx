const STATS = [
  { label: 'Presale Allocation', value: '100M VTX', sub: 'Fixed public round' },
  { label: 'Real Asset Pipeline', value: '$284M+', sub: 'Curated RWA value' },
  { label: 'Investor Jurisdictions', value: '94', sub: 'Global wallet reach' },
  { label: 'Target Annual Yield', value: '8–10%', sub: 'Property-backed model' },
];

export default function StatsBar() {
  return (
    <section style={{ position: 'relative', padding: '26px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,.035)' }}>
      <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {STATS.map((s) => (
          <div key={s.label} className="vx-card" style={{ padding: '20px 22px', boxShadow: 'none', borderRadius: 18 }}>
            <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-.04em', color: 'var(--gold-2)' }}>{s.value}</div>
            <div className="mono" style={{ marginTop: 8, fontSize: 10, color: 'var(--text)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ marginTop: 6, color: 'var(--muted)', fontSize: 13 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:900px){section .vx-container{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:560px){section .vx-container{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
