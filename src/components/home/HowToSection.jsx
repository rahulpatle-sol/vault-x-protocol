import { galleryImages } from 'assets/remoteImages';

const STEPS = [
  { n: '01', t: 'Connect Wallet', d: 'Link MetaMask or another supported wallet to access the presale, portfolio modules, and account dashboard.' },
  { n: '02', t: 'Review Assets', d: 'Browse marketplace cards with location, occupancy, target yield, and funding progress before committing capital.' },
  { n: '03', t: 'Participate', d: 'Enter the VTX presale with transparent cap, rate, and buyer-position data directly inside the transaction flow.' },
  { n: '04', t: 'Manage Holdings', d: 'Track balances, staking, and token utility in a more professional UI designed for long-term product direction.' },
];

export default function HowToSection() {
  return (
    <section className="vx-section">
      <div className="vx-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr .9fr', gap: 34, alignItems: 'center', marginBottom: 42 }}>
          <div>
            <div className="vx-eyebrow" style={{ marginBottom: 16 }}>How it works</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(30px,4vw,52px)' }}>A simpler flow from discovery to participation.</h2>
          </div>
          <div className="vx-image-panel" style={{ backgroundImage: `url(${galleryImages[2]})`, minHeight: 240 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="vx-card card-lift" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: 110, backgroundImage: `url(${galleryImages[(i + 3) % galleryImages.length]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '24px 22px' }}>
                <div style={{ width: 42, height: 42, borderRadius: 14, border: '1px solid rgba(215,181,109,.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: '#182b25' }}>
                  <span className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-2)' }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.03em', margin: 0 }}>{s.t}</h3>
                <p className="vx-copy" style={{ margin: '12px 0 0', fontSize: 14 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:980px){section .vx-container>div:first-child{grid-template-columns:1fr!important}section .vx-container>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){section .vx-container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
