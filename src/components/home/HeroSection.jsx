import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandImages, showcaseAssets } from 'assets/remoteImages';

gsap.registerPlugin(ScrollTrigger);

function MiniStat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.04em' }}>{value}</div>
      <div className="mono" style={{ marginTop: 6, fontSize: 10, color: 'var(--dim)', letterSpacing: '.11em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const assetRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = titleRef.current;
      const chars = title.querySelectorAll('.hero-char');

      gsap.fromTo(chars,
        { y: 120, opacity: 0, rotateX: -45 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 1.2,
          stagger: 0.025,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.0 }
      );

      gsap.fromTo(ctaRef.current?.children || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1.2 }
      );

      gsap.fromTo(statsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      gsap.fromTo(assetRef.current,
        { x: 80, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out', delay: 0.5 }
      );

      gsap.to(glowRef.current, {
        x: 'random(-40, 40)',
        y: 'random(-30, 30)',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(bgRef.current, { y: progress * 80, scale: 1 + progress * 0.06 });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = 'Tokenized property infrastructure for a serious capital market.';
  const titleChars = titleText.split('').map((char, i) => (
    <span key={i} className="hero-char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <section ref={sectionRef} style={{
      position: 'relative', minHeight: '100vh', padding: '132px 0 84px',
      overflow: 'hidden', background: 'var(--bg)',
    }}>
      <div ref={bgRef} style={{
        position: 'absolute', inset: -40,
        backgroundImage: `url(${brandImages.hero})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(8,19,17,.7) 0%, rgba(8,19,17,.35) 50%, rgba(8,19,17,.08) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 15% 18%, rgba(215,181,109,.15), transparent 30%), radial-gradient(circle at 82% 12%, rgba(112,181,139,.18), transparent 28%)',
      }} />
      <div ref={glowRef} style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,181,109,.08), transparent 70%)',
        top: '20%', left: '10%', pointerEvents: 'none',
        filter: 'blur(60px)',
      }} />

      <div ref={contentRef} className="vx-container" style={{
        position: 'relative', display: 'grid',
        gridTemplateColumns: 'minmax(0,1.02fr) minmax(360px,.78fr)',
        gap: 56, alignItems: 'center',
      }}>
        <div>
          <div className="vx-eyebrow" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <span className="live-dot" /> Institutional RWA presale · Live
          </div>
          <h1 ref={titleRef} className="vx-title" style={{
            fontSize: 'clamp(48px, 6.5vw, 90px)', maxWidth: 760,
            perspective: '800px', lineHeight: 0.98,
          }}>
            {titleChars}
          </h1>
          <p ref={subtitleRef} className="vx-copy" style={{
            maxWidth: 630, margin: '24px 0 34px', fontSize: 17,
          }}>
            VaultX reframes the original demo into a cleaner, more credible real-world assets experience. Browse curated property offerings, enter the VTX presale, and manage holder flows inside a professional investor-facing interface.
          </p>
          <div ref={ctaRef} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 48 }}>
            <button className="vx-btn" onClick={() => navigate('/presale')}>Join VTX Presale</button>
            <button className="vx-btn secondary" onClick={() => navigate('/gallery')}>View Asset Marketplace</button>
          </div>
          <div ref={statsRef} className="vx-card" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 20, padding: 24, maxWidth: 680,
          }}>
            <MiniStat label="Target TVL" value="$284M+" />
            <MiniStat label="Avg. target APY" value="8.9%" />
            <MiniStat label="Presale rate" value="2M VTX" />
          </div>
        </div>
        <div ref={assetRef}>
          <div className="vx-card-strong" style={{ overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: 320 }}>
              <img src={showcaseAssets[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,19,17,.72), rgba(8,19,17,.06) 56%, rgba(8,19,17,.08))' }} />
              <div style={{ position: 'absolute', top: 18, left: 18, right: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {showcaseAssets[0].tags.map(tag => (
                  <span key={tag} className="vx-eyebrow" style={{ padding: '7px 10px', fontSize: 9 }}>{tag}</span>
                ))}
              </div>
              <div style={{ position: 'absolute', left: 24, bottom: 24, right: 24 }}>
                <div className="mono" style={{ color: 'var(--gold-2)', fontSize: 11, letterSpacing: '.14em', marginBottom: 8 }}>{showcaseAssets[0].id}</div>
                <h3 style={{ margin: 0, fontSize: 28, lineHeight: 1.05, letterSpacing: '-.04em' }}>{showcaseAssets[0].name}</h3>
                <p style={{ margin: '9px 0 0', color: 'var(--muted)', fontSize: 14 }}>{showcaseAssets[0].location}</p>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                {[
                  ['Units', showcaseAssets[0].specs.units],
                  ['Occupancy', showcaseAssets[0].specs.occupancy],
                  ['Target APY', showcaseAssets[0].specs.yield],
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
                  <strong style={{ fontSize: 20 }}>{showcaseAssets[0].price}</strong>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ color: 'var(--dim)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>Token price</div>
                  <strong style={{ color: 'var(--gold-2)' }}>{showcaseAssets[0].tokenPrice}</strong>
                </div>
              </div>
              <button className="vx-btn" onClick={() => navigate('/presale')} style={{ width: '100%' }}>Enter Presale</button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:980px){section .vx-container{grid-template-columns:1fr!important}.vx-card{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
