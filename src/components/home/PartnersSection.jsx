const PARTNERS = [
  'Asset Servicing',
  'Transfer Agent',
  'Custody Layer',
  'Compliance Engine',
  'Oracle Feeds',
  'Settlement Rails',
  'Capital Markets',
  'Reporting Stack',
];

export default function PartnersSection() {
  return (
    <section className="vx-section-soft">
      <div className="vx-container" style={{ textAlign: 'center' }}>
        <div className="vx-eyebrow" style={{ marginBottom: 20 }}>Ecosystem positioning</div>
        <h2 className="vx-title" style={{ fontSize: 'clamp(30px,4vw,52px)', maxWidth: 780, margin: '0 auto' }}>
          Built to look credible in front of investors, operators, and technical reviewers.
        </h2>
        <p className="vx-copy" style={{ maxWidth: 700, margin: '18px auto 34px' }}>
          The refreshed homepage now uses a cleaner component system, more suitable real-estate imagery, and a calmer visual language across hero sections, cards, and data modules.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {PARTNERS.map((p) => (
            <div key={p} className="vx-card card-lift" style={{ padding: '22px 18px', boxShadow: 'none' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--gold-2)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 8 }}>Module</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{p}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:980px){section .vx-container>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){section .vx-container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
