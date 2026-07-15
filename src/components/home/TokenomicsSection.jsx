import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandImages } from 'assets/remoteImages';

gsap.registerPlugin(ScrollTrigger);

export default function TokenomicsSection() {
  const sectionRef = useRef(null);
  const barRefs = useRef([]);
  const pctRefs = useRef([]);

  const segments = [
    { label: 'Property reserve', pct: 35 },
    { label: 'Public presale', pct: 20 },
    { label: 'Ecosystem incentives', pct: 20 },
    { label: 'Treasury & liquidity', pct: 15 },
    { label: 'Operations reserve', pct: 10 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bars = barRefs.current.filter(Boolean);
      const pcts = pctRefs.current.filter(Boolean);

      gsap.fromTo(bars,
        { width: '0%' },
        {
          width: (i) => `${segments[i].pct}%`,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(pcts,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0,
          duration: 0.4,
          stagger: 0.12,
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-section-soft">
      <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 42, alignItems: 'center' }}>
        <div>
          <div className="vx-eyebrow">Token architecture</div>
          <h2 className="vx-title" style={{ fontSize: 'clamp(34px,4vw,56px)' }}>VTX aligns asset access, liquidity, and holder utility.</h2>
          <p className="vx-copy" style={{ marginTop: 18 }}>The tokenomics panel now uses a stronger dashboard block with a visible property-capital image.</p>
          <div className="vx-image-panel" style={{ backgroundImage: `url(${brandImages.dashboard})`, marginTop: 26, minHeight: 260 }} />
        </div>
        <div className="vx-card-strong" style={{ padding: 30 }}>
          {segments.map((s, i) => (
            <div key={s.label} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>{s.label}</span>
                <span ref={el => pctRefs.current[i] = el} className="mono" style={{ color: 'var(--gold-2)' }}>{s.pct}%</span>
              </div>
              <div style={{ height: 12, borderRadius: 999, background: '#1b2f29', overflow: 'hidden' }}>
                <div
                  ref={el => barRefs.current[i] = el}
                  style={{ width: '0%', height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--green), var(--gold))' }}
                />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: 18, borderRadius: 18, background: '#152824', border: '1px solid rgba(100,176,132,.22)', color: 'var(--muted)', lineHeight: 1.7, fontSize: 14 }}>
            Token allocations shown here are frontend presentation values. Final values should match the deployed contract and legal/token documentation before production launch.
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){section .vx-container{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
