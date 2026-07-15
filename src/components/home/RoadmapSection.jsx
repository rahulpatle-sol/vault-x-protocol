import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandImages } from 'assets/remoteImages';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { phase: 'Phase 1', title: 'Frontend cleanup', items: ['Professional navigation redesign', 'Brand logo refinement', 'Hero and card refresh'], done: true },
  { phase: 'Phase 2', title: 'Asset presentation', items: ['Outside property imagery', 'Gallery consistency', 'Clearer image sections'], done: true },
  { phase: 'Phase 3', title: 'Investor UX', items: ['Presale credibility pass', 'Dashboard language', 'Staking/swap styling polish'], active: true },
  { phase: 'Phase 4', title: 'Production prep', items: ['Content review', 'Real data binding', 'QA across routes'] },
];

export default function RoadmapSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(cardsRef.current.filter(Boolean),
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-section-soft" style={{ overflow: 'hidden' }}>
      <div className="vx-container">
        <div ref={headerRef} style={{
          display: 'grid', gridTemplateColumns: '.9fr 1.1fr',
          gap: 34, alignItems: 'center', marginBottom: 44,
        }}>
          <div>
            <div className="vx-eyebrow" style={{ marginBottom: 16 }}>Design direction</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(30px,4vw,52px)' }}>
              The UI now uses image-led sections instead of empty placeholder fields.
            </h2>
          </div>
          <div className="vx-image-panel" style={{ backgroundImage: `url(${brandImages.hero})`, minHeight: 260 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, position: 'relative' }}>
          {PHASES.map((p, i) => (
            <div
              key={p.phase}
              ref={el => cardsRef.current[i] = el}
              className="vx-card card-lift"
              style={{ padding: 24, minHeight: 240, position: 'relative' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span className="mono" style={{
                  fontSize: 9, color: p.done ? 'var(--green-2)' : p.active ? 'var(--gold-2)' : 'var(--dim)',
                  letterSpacing: '.16em', textTransform: 'uppercase',
                }}>{p.phase}</span>
                <span style={{
                  width: 10, height: 10, borderRadius: 999,
                  background: p.done ? 'var(--green-2)' : p.active ? 'var(--gold)' : '#33423d',
                }} />
              </div>
              <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.1, letterSpacing: '-.03em' }}>{p.title}</h3>
              <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
                {p.items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ marginTop: 7, width: 6, height: 6, borderRadius: 99, background: p.done ? 'var(--green-2)' : p.active ? 'var(--gold)' : 'var(--dim)' }} />
                    <span className="vx-copy" style={{ fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:980px){section .vx-container>div:first-child,section .vx-container>div:last-child{grid-template-columns:1fr 1fr!important}}@media(max-width:640px){section .vx-container>div:first-child,section .vx-container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
