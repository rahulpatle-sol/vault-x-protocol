import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { brandImages, showcaseAssets } from 'assets/remoteImages';

function MiniStat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.04em' }}>{value}</div>
      <div className="mono" style={{ marginTop: 6, fontSize: 10, color: 'var(--dim)', letterSpacing: '.11em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

function AssetCard({ asset, active, setActive }) {
  const navigate = useNavigate();
  return (
    <div className="vx-card-strong" style={{ overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 320 }}>
        <img src={asset.img} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,19,17,.72) 0%, rgba(8,19,17,.06) 56%, rgba(8,19,17,.08) 100%)' }} />
        <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {asset.tags.map(tag => <span key={tag} className="vx-eyebrow" style={{ padding: '7px 10px', fontSize: 9 }}>{tag}</span>)}
          </div>
          <div className="vx-eyebrow" style={{ padding: '7px 10px', color: 'var(--green-2)', borderColor: 'rgba(151,217,176,.22)', background: 'rgba(112,181,139,.08)' }}>{asset.raise} funded</div>
        </div>
        <div style={{ position: 'absolute', left: 24, bottom: 24, right: 24 }}>
          <div className="mono" style={{ color: 'var(--gold-2)', fontSize: 11, letterSpacing: '.14em', marginBottom: 8 }}>{asset.id}</div>
          <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.05, letterSpacing: '-.04em' }}>{asset.name}</h3>
          <p style={{ margin: '9px 0 0', color: 'var(--muted)', fontSize: 14 }}>{asset.location}</p>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
          {[
            ['Units', asset.specs.units],
            ['Occupancy', asset.specs.occupancy],
            ['Target APY', asset.specs.yield],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: 14, borderRadius: 16, background: '#172b25', border: '1px solid rgba(227,214,181,.1)' }}>
              <div style={{ fontWeight: 800 }}>{v}</div>
              <div className="mono" style={{ marginTop: 4, color: 'var(--dim)', fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase' }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 22 }}>
          <div>
            <div className="mono" style={{ color: 'var(--dim)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>Asset value</div>
            <strong style={{ fontSize: 20 }}>{asset.price}</strong>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="mono" style={{ color: 'var(--dim)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>Token price</div>
            <strong style={{ color: 'var(--gold-2)' }}>{asset.tokenPrice}</strong>
          </div>
        </div>
        <button className="vx-btn" onClick={() => navigate('/presale')} style={{ width: '100%' }}>Enter Presale</button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 18 }}>
          {showcaseAssets.map((_, i) => (
            <button
              key={i}
              aria-label={`Select asset ${i + 1}`}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 28 : 8,
                height: 8,
                borderRadius: 99,
                background: active === i ? 'var(--gold)' : 'rgba(255,255,255,.18)',
                cursor: 'pointer',
                transition: '.2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const asset = showcaseAssets[active];

  useEffect(() => {
    const id = setInterval(() => setActive(v => (v + 1) % showcaseAssets.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', padding: '132px 0 84px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: .86, backgroundImage: `url(${brandImages.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(95deg, rgba(8,19,17,.58) 0%, rgba(8,19,17,.38) 48%, rgba(8,19,17,.08) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 15% 18%, rgba(215,181,109,.12), transparent 24%), radial-gradient(circle at 82% 12%, rgba(112,181,139,.14), transparent 22%)' }} />

      <div className="vx-container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1.02fr) minmax(360px,.78fr)', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="vx-eyebrow"><span className="live-dot" /> Institutional RWA presale · Live</div>
          <h1 className="vx-title" style={{ fontSize: 'clamp(48px, 6.5vw, 90px)', maxWidth: 760 }}>
            Tokenized property infrastructure for a serious capital market.
          </h1>
          <p className="vx-copy" style={{ maxWidth: 630, margin: '24px 0 34px', fontSize: 17 }}>
            VaultX reframes the original demo into a cleaner, more credible real-world assets experience. Browse curated property offerings, enter the VTX presale, and manage holder flows inside a professional investor-facing interface.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="vx-btn" onClick={() => navigate('/presale')}>Join VTX Presale</button>
            <button className="vx-btn secondary" onClick={() => navigate('/gallery')}>View Asset Marketplace</button>
          </div>
          <div className="vx-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, padding: 24, maxWidth: 680 }}>
            <MiniStat label="Target TVL" value="$284M+" />
            <MiniStat label="Avg. target APY" value="8.9%" />
            <MiniStat label="Presale rate" value="2M VTX" />
          </div>
        </div>
        <AssetCard asset={asset} active={active} setActive={setActive} />
      </div>
      <style>{`@media(max-width:980px){section .vx-container{grid-template-columns:1fr!important}.vx-card{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
