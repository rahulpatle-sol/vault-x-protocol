import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiBankLine, RiShieldCheckLine, RiCloudLine, RiFileSearchLine, RiExchangeCnyLine, RiFlashlightLine, RiLineChartLine, RiStackLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const TRACK_ONE = [
  { name: 'Asset Servicing', icon: RiBankLine },
  { name: 'Transfer Agent', icon: RiShieldCheckLine },
  { name: 'Custody Layer', icon: RiCloudLine },
  { name: 'Compliance Engine', icon: RiFileSearchLine },
];

const TRACK_TWO = [
  { name: 'Oracle Feeds', icon: RiExchangeCnyLine },
  { name: 'Settlement Rails', icon: RiFlashlightLine },
  { name: 'Capital Markets', icon: RiLineChartLine },
  { name: 'Reporting Stack', icon: RiStackLine },
];

function TrackCard({ name, icon: Icon }) {
  return (
    <div style={{
      flex: '0 0 auto',
      width: 240,
      padding: '18px 24px',
      marginRight: 16,
      borderRadius: 16,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: 'linear-gradient(180deg, var(--gold), var(--green))',
        opacity: 0.5,
      }} />
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'rgba(215,181,109,0.1)',
        border: '1px solid rgba(215,181,109,0.15)',
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>
        <Icon size={16} color="var(--gold-2)" />
      </div>
      <span className="mono" style={{
        fontSize: 11, fontWeight: 600, color: 'var(--text)',
        letterSpacing: '0.04em', whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
    </div>
  );
}

export default function PartnersSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { width: '85%', maxWidth: '1000px' },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
          width: '100%',
          maxWidth: '1440px',
          ease: 'none',
        }
      );

      const chars = headerRef.current?.querySelectorAll('.title-char');
      if (chars?.length) {
        gsap.fromTo(chars,
          { y: '100%', opacity: 0 },
          {
            y: '0%', opacity: 1, duration: 1, stagger: 0.015,
            ease: 'power4.out', delay: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(descRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const marquee1 = track1Ref.current;
      const marquee2 = track2Ref.current;
      if (!marquee1 || !marquee2) return;

      const w1 = marquee1.scrollWidth / 2;
      const w2 = marquee2.scrollWidth / 2;

      gsap.to(marquee1, {
        x: -w1,
        duration: 20,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const n = parseFloat(x);
            return n <= -w1 ? 0 : n;
          }),
        },
      });

      gsap.to(marquee2, {
        x: -w2 + 50,
        duration: 22,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => {
            const n = parseFloat(x);
            return n <= -w2 - 50 ? 50 : n;
          }),
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          const v = self.progress;
          gsap.to(marquee1, { timeScale: 0.5 + v * 1.5, overwrite: 'auto' });
          gsap.to(marquee2, { timeScale: 0.5 + v * 1.5, overwrite: 'auto' });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleWords = 'Built for institutional-grade integration across the RWA stack.'.split(' ').map((word, wIdx) => (
    <span key={wIdx} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em', verticalAlign: 'top' }}>
      {word.split('').map((char, cIdx) => (
        <span key={cIdx} className="title-char" style={{ display: 'inline-block', transform: 'translateY(100%)' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  ));

  return (
    <section ref={sectionRef} className="vx-section-soft" style={{ overflow: 'hidden' }}>
      <div ref={containerRef} className="vx-container" style={{
        position: 'relative', margin: '0 auto',
        transition: 'width 0.1s ease',
      }}>
        <div ref={headerRef} className="vx-eyebrow" style={{ marginBottom: 12 }}>
          Ecosystem infrastructure
        </div>

        <h2 className="vx-title" style={{
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          maxWidth: 720,
          lineHeight: 1.05,
        }}>
          {titleWords}
        </h2>

        <p ref={descRef} className="vx-copy" style={{
          maxWidth: 520, marginTop: 14, marginBottom: 48,
        }}>
          Modular infrastructure that interfaces with standard data endpoints, security baselines, and execution layers.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div ref={track1Ref} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
              {TRACK_ONE.map(p => <TrackCard key={p.name} {...p} />)}
              {TRACK_ONE.map(p => <TrackCard key={`dup-${p.name}`} {...p} />)}
            </div>
          </div>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div ref={track2Ref} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
              {TRACK_TWO.map(p => <TrackCard key={p.name} {...p} />)}
              {TRACK_TWO.map(p => <TrackCard key={`dup-${p.name}`} {...p} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
