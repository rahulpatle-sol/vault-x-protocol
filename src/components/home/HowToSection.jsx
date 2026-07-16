import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryImages } from 'assets/remoteImages';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { n: '01', t: 'Connect Wallet', d: 'Link MetaMask or another supported wallet to access the presale, portfolio modules, and account dashboard.' },
  { n: '02', t: 'Review Assets', d: 'Browse marketplace cards with location, occupancy, target yield, and funding progress before committing capital.' },
  { n: '03', t: 'Participate', d: 'Enter the VTX presale with transparent cap, rate, and buyer-position data directly inside the transaction flow.' },
  { n: '04', t: 'Manage Holdings', d: 'Track balances, staking, and token utility in a more professional UI designed for long-term product direction.' },
];

export default function HowToSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const lineRef = useRef(null);

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

      const steps = stepsRef.current.filter(Boolean);
      gsap.fromTo(steps,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1, ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 40%',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-section" style={{ position: 'relative' }}>
      <div className="vx-container">
        <div ref={headerRef} style={{
          display: 'grid', gridTemplateColumns: '1fr .9fr',
          gap: 34, alignItems: 'center', marginBottom: 42,
        }}>
          <div>
            <div className="vx-eyebrow" style={{ marginBottom: 16 }}>How it works</div>
            <h2 className="vx-title" style={{ fontSize: 'clamp(30px,4vw,52px)' }}>A simpler flow from discovery to participation.</h2>
          </div>
          <div className="vx-image-panel" style={{ backgroundImage: `url(${galleryImages[2]})`, minHeight: 240 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, position: 'relative' }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              ref={el => stepsRef.current[i] = el}
              className="vx-card card-lift" data-tilt
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ height: 110, backgroundImage: `url(${galleryImages[(i + 3) % galleryImages.length]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ padding: '24px 22px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 14,
                  border: '1px solid rgba(215,181,109,.24)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, background: '#182b25',
                }}>
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
