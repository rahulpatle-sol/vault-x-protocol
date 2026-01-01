import { useEffect, useRef } from 'react';
import PartnersSection from '../../components/home/PartnersSection';
import { brandImages } from 'assets/remoteImages';

const STATS = [
  { v: '$48M+', l: 'Tokenized assets' },
  { v: '9.4%', l: 'Target APY' },
  { v: '340+', l: 'Wallet holders' },
  { v: '24/7', l: 'On-chain access' },
];

const PRINCIPLES = [
  {
    title: 'Asset-first presentation',
    desc: 'Every page prioritizes property value, allocation, occupancy, yield assumptions, and investor context before decorative Web3 effects.',
  },
  {
    title: 'Contract transparency',
    desc: 'Presale, claim, refund, and token utility flows are presented as explicit smart-contract actions rather than vague marketing promises.',
  },
  {
    title: 'Professional capital-market tone',
    desc: 'The product language is structured for founders, operators, investors, and technical reviewers who need clarity quickly.',
  },
  {
    title: 'Modular product architecture',
    desc: 'The frontend keeps the current routes intact while presenting gallery, staking, swap, transactions, and account modules as one cohesive RWA platform.',
  },
];

const WORKFLOW = [
  ['01', 'Source', 'Identify income-producing real-world assets with measurable occupancy, valuation, and revenue characteristics.'],
  ['02', 'Structure', 'Map the asset into a compliant tokenization workflow with clear allocation and operational assumptions.'],
  ['03', 'Launch', 'Expose the presale, gallery, and holder dashboard through clean user flows and transparent contract interactions.'],
  ['04', 'Operate', 'Support ongoing holder visibility through account, transaction, staking, and marketplace-style screens.'],
];

const MODULES = [
  'Presale participation dashboard',
  'Curated property gallery',
  'VTX staking utility',
  'Cross-chain swap interface',
  'Wallet transaction history',
  'Smart-contract reference panel',
];

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.rv,.rv-l,.rv-r').forEach((node) => node.classList.add('in'));
        obs.unobserve(el);
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function About() {
  const statsRef = useReveal();
  const missionRef = useReveal();
  const workflowRef = useReveal();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>
      <div style={{ position: 'relative', paddingTop: 140, paddingBottom: 100, overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0 }} />
        <img src={brandImages.about} alt="VaultX institutional dashboard" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .86, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,19,17,.50) 28%, rgba(8,19,17,.40) 100%)' }} />
        <div style={{ position: 'absolute', left: '18%', top: '14%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(215,181,109,.12),transparent 68%)', pointerEvents: 'none' }} />

        <div className="vx-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="vx-eyebrow" style={{ marginBottom: 20 }}>About VaultX</div>
          <h1 className="vx-title" style={{ fontSize: 'clamp(52px,8vw,96px)', maxWidth: 820 }}>
            A clearer product layer for tokenized real-world assets.
          </h1>
          <p className="vx-copy" style={{ fontSize: 16, maxWidth: 650, marginTop: 22 }}>
            VaultX is positioned as an RWA dApp for asset discovery, presale participation, holder utility, and transparent contract interactions. This page now uses product content instead of profile/member cards.
          </p>
        </div>
      </div>

      <div ref={statsRef} style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,.025)' }}>
        <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {STATS.map((s, i) => (
            <div key={s.l} className="rv" style={{ padding: '30px 20px', borderRight: i !== STATS.length - 1 ? '1px solid rgba(255,255,255,.05)' : 'none', transitionDelay: `${i * .08}s` }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: 'var(--gold-2)', letterSpacing: '-.04em', lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.18em', textTransform: 'uppercase' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div ref={missionRef} className="vx-section">
        <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, alignItems: 'start' }}>
          <div className="rv">
            <div className="vx-eyebrow" style={{ marginBottom: 18 }}>Platform thesis</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(38px,5vw,64px)' }}>
              Real asset access should feel structured, explainable, and trustworthy.
            </h2>
            <p className="vx-copy" style={{ marginTop: 20 }}>
              The updated interface removes unnecessary profile imagery and focuses on stronger product positioning. Users should immediately understand what the dApp does, what each module is for, and how wallet actions connect to the underlying contracts.
            </p>
            <p className="vx-copy">
              The new content blocks are intentionally text-driven so the About page can be reviewed, edited, and expanded without relying on placeholder portraits or artificial member cards.
            </p>
          </div>
          <div className="rv-r" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="vx-card card-lift" style={{ padding: '22px 20px' }}>
                <div className="mono" style={{ fontSize: 9, color: 'var(--gold-2)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 12 }}>Principle</div>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 8, letterSpacing: '-.02em' }}>{item.title}</div>
                <div className="vx-copy" style={{ fontSize: 13 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={workflowRef} className="vx-section-soft">
        <div className="vx-container">
          <div className="rv" style={{ marginBottom: 42 }}>
            <div className="vx-eyebrow" style={{ marginBottom: 18 }}>Operating model</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(38px,5vw,64px)', maxWidth: 780 }}>
              From asset sourcing to investor dashboard.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 34 }}>
            {WORKFLOW.map(([n, title, desc], i) => (
              <div key={title} className="rv vx-card card-lift" style={{ padding: 24, transitionDelay: `${i * .07}s` }}>
                <div className="mono" style={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 14, background: 'rgba(215,181,109,.1)', border: '1px solid rgba(215,181,109,.22)', color: 'var(--gold-2)', marginBottom: 18 }}>{n}</div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 10 }}>{title}</div>
                <div className="vx-copy" style={{ fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>

          <div className="rv vx-card-strong" style={{ padding: 28 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--gold-2)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 18 }}>Core product modules</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
              {MODULES.map((item) => (
                <div key={item} style={{ padding: '15px 16px', borderRadius: 16, background: 'rgba(255,255,255,.045)', border: '1px solid rgba(255,255,255,.07)', color: 'var(--text)', fontWeight: 700 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PartnersSection />
      <style>{`
        @media(max-width:980px){.vx-container[style*='1fr 1fr'],.vx-container[style*='repeat(4, 1fr)'],.vx-container[style*='repeat(4,1fr)']{grid-template-columns:1fr!important}}
        @media(max-width:720px){.vx-card-strong div[style*='repeat(3,1fr)']{grid-template-columns:1fr!important}}
      `}</style>
    </div>
  );
}
