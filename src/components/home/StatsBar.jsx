import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { label: 'Presale Allocation', value: '100M VTX', sub: 'Fixed public round' },
  { label: 'Real Asset Pipeline', value: '$284M+', sub: 'Curated RWA value' },
  { label: 'Investor Jurisdictions', value: '94', sub: 'Global wallet reach' },
  { label: 'Target Annual Yield', value: '8–10%', sub: 'Property-backed model' },
];

export default function StatsBar() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative', padding: '26px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'rgba(255,255,255,.035)',
    }}>
      <div className="vx-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            ref={el => cardsRef.current[i] = el}
            className="vx-card"
            style={{ padding: '20px 22px', boxShadow: 'none', borderRadius: 18 }}
          >
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
