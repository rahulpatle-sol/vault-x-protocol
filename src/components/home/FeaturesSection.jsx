import { galleryImages } from 'assets/remoteImages';

const FEATURES = [
  { icon: '01', title: 'Asset-grade onboarding', desc: 'Property value, occupancy, expected yield, and allocation context are shown clearly before a user enters the presale.' },
  { icon: '02', title: 'Transparent presale flow', desc: 'Rate, cap, buyer position, claim, and refund states are grouped inside a focused transaction dashboard.' },
  { icon: '03', title: 'Smart-contract enforced', desc: 'Deposits, soft cap, hard cap, claim, and refund behavior remain attached to the Solidity contract flow.' },
  { icon: '04', title: 'Investor-ready presentation', desc: 'The interface now favors real property visuals, simple hierarchy, and less abstract glass styling.' },
];

export default function FeaturesSection() {
  return (
    <section className="vx-section">
      <div className="vx-container">
        <div style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 34, alignItems: 'center', marginBottom: 34 }}>
          <div>
            <div className="vx-eyebrow">Protocol experience</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(34px,4vw,58px)' }}>A cleaner frontend for an RWA capital market.</h2>
            <p className="vx-copy" style={{ marginTop: 18 }}>The redesigned interface presents VaultX as a serious tokenized-assets platform with visible image-driven sections instead of generic empty fields.</p>
          </div>
          <div className="vx-image-panel" style={{ backgroundImage: `url(${galleryImages[1]})`, minHeight: 330 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="vx-card card-lift" style={{ overflow: 'hidden' }}>
              <div style={{ height: 120, backgroundImage: `url(${galleryImages[i]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: 22 }}>
                <div className="mono" style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 14, background: '#182b25', border: '1px solid rgba(215,181,109,.22)', color: 'var(--gold-2)', fontWeight: 800, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ margin: 0, color: 'var(--text)', fontSize: 18, letterSpacing: '-.025em' }}>{f.title}</h3>
                <p className="vx-copy" style={{ margin: '12px 0 0', fontSize: 14 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:980px){section .vx-container>div:first-child{grid-template-columns:1fr!important}section .vx-container>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){section .vx-container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
