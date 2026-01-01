import PhaseI from '../../components/pre-sale/PhaseI/Renderer';
import { brandImages, galleryImages } from 'assets/remoteImages';

const STEPS = [
  { n: '01', t: 'Connect wallet', d: 'Use MetaMask or an injected browser wallet to access the presale contract.' },
  { n: '02', t: 'Review terms', d: 'Check rate, cap, claim/refund status, and your wallet position.' },
  { n: '03', t: 'Deposit ETH', d: 'Buy VTX through the contract-enforced presale flow.' },
  { n: '04', t: 'Claim or refund', d: 'Claim VTX on success, or withdraw ETH if the sale fails.' },
];

const FACTS = [
  ['Round', 'Public Presale'],
  ['Allocation', '100,000,000 VTX'],
  ['Rate', '2,000,000 VTX / ETH'],
  ['Hard cap', '100 ETH'],
];

export default function PreSale() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 86 }}>
      <section style={{ position: 'relative', padding: '70px 0 42px', overflow: 'hidden' }}>
        <img src={brandImages.hero} alt="VaultX presale" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .72 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,19,17,.62) 0%, rgba(8,19,17,.24) 100%)' }} />
        <div className="vx-container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr .86fr', gap: 36, alignItems: 'end' }}>
          <div>
            <div className="vx-eyebrow"><span className="live-dot" /> Round one active</div>
            <h1 className="vx-title" style={{ fontSize: 'clamp(46px,6vw,82px)', maxWidth: 760 }}>Acquire VTX before exchange listing.</h1>
            <p className="vx-copy" style={{ maxWidth: 620, marginTop: 22, fontSize: 16 }}>
              A professional presale dashboard for a tokenized real-world asset platform. Review the sale terms, connect your wallet, and interact directly with the smart contract.
            </p>
          </div>
          <div className="vx-card" style={{ padding: 22 }}>
            <div className="mono" style={{ color: 'var(--gold-2)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 16 }}>Sale snapshot</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {FACTS.map(([k, v]) => (
                <div key={k} style={{ padding: 16, borderRadius: 16, background: '#172b25', border: '1px solid rgba(227,214,181,.14)' }}>
                  <div className="mono" style={{ color: 'var(--dim)', fontSize: 9, letterSpacing: '.11em', textTransform: 'uppercase' }}>{k}</div>
                  <strong style={{ display: 'block', marginTop: 7, fontSize: 15 }}>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '28px 0 96px' }}>
        <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: '.78fr 1fr', gap: 36, alignItems: 'start' }}>
          <aside>
            <div className="vx-card-strong" style={{ overflow: 'hidden', marginBottom: 18 }}>
              <div style={{ height: 210, backgroundImage: `url(${galleryImages[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: 28 }}>
                <div className="vx-eyebrow" style={{ marginBottom: 18 }}>How it works</div>
                {STEPS.map((s) => (
                  <div key={s.n} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 16, padding: '18px 0', borderBottom: '1px solid rgba(227,214,181,.1)' }}>
                    <div className="mono" style={{ width: 38, height: 38, borderRadius: 13, display: 'grid', placeItems: 'center', color: 'var(--gold-2)', background: '#172b25', border: '1px solid rgba(215,181,109,.2)', fontWeight: 800 }}>{s.n}</div>
                    <div>
                      <h3 style={{ margin: '0 0 7px', fontSize: 16 }}>{s.t}</h3>
                      <p className="vx-copy" style={{ margin: 0, fontSize: 13.5 }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: 18, borderRadius: 18, border: '1px solid rgba(229,111,111,.22)', background: '#211716' }}>
              <div className="mono" style={{ color: '#ffadad', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>Risk disclosure</div>
              <p style={{ margin: 0, color: '#ffd2d2', lineHeight: 1.7, fontSize: 13 }}>Crypto and RWA investments carry risk. Confirm contract addresses, network, legal terms, and token documentation before any production deployment.</p>
            </div>
          </aside>
          <main>
            <PhaseI />
          </main>
        </div>
      </section>
      <style>{`@media(max-width:980px){.vx-container{grid-template-columns:1fr!important}}@media(max-width:560px){.vx-card div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
