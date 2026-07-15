import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      gsap.fromTo(cards,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-section-soft">
      <div className="vx-container" style={{ textAlign: 'center' }}>
        <div className="vx-eyebrow" style={{ marginBottom: 20 }}>Ecosystem positioning</div>
        <h2 className="vx-title" style={{ fontSize: 'clamp(30px,4vw,52px)', maxWidth: 780, margin: '0 auto' }}>
          Built to look credible in front of investors, operators, and technical reviewers.
        </h2>
        <p className="vx-copy" style={{ maxWidth: 700, margin: '18px auto 34px' }}>
          The refreshed homepage now uses a cleaner component system, more suitable real-estate imagery, and a calmer visual language across hero sections, cards, and data modules.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {PARTNERS.map((p, i) => (
            <div
              key={p}
              ref={el => cardsRef.current[i] = el}
              className="vx-card card-lift"
              style={{ padding: '22px 18px', boxShadow: 'none' }}
            >
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
