import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandImages, showcaseAssets } from 'assets/remoteImages';

gsap.registerPlugin(ScrollTrigger);

function MiniStat({ label, value }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 24px' }}>
      <div style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 300, color: '#f3eede', fontFamily: 'serif', letterSpacing: '-0.02em' }}>{value}</div>
      <div className="mono" style={{ marginTop: 6, fontSize: '9px', color: '#a39f93', letterSpacing: '.25em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);
  const assetRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 2. Text Entrance Reveal
      const chars = titleRef.current.querySelectorAll('.hero-char');
      gsap.fromTo(chars,
        { y: '130%', rotateZ: 2 },
        { y: '0%', rotateZ: 0, duration: 1.5, stagger: 0.012, ease: 'power4.out', delay: 0.1 }
      );

      gsap.fromTo([subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.2, ease: 'power3.out', delay: 0.6 }
      );

      // 3. Ultra-Premium Card Entrance (Initial Load)
      gsap.fromTo(assetRef.current,
        { opacity: 0, y: 180, scale: 0.9, rotateX: 15 },
        { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 2, ease: 'power4.out', delay: 0.4 }
      );

      // 4. Parallax Background Zoom
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 15,
        scale: 1.12,
        ease: 'none'
      });

      // 5. 💎 THE MASTERPIECE: Cinematic Scroll Animation for the lower Card Div
      gsap.fromTo(assetRef.current,
        { rotateX: 0, scale: 1, y: 0 },
        {
          scrollTrigger: {
            trigger: assetRef.current,
            start: 'top bottom', // Jab card screen ke bottom se enter karega
            end: 'center center', // Jab center me aayega
            scrub: 1, // Smooth interpolation with Lenis
          },
          scale: 1.05,
          rotateX: -5,
          z: 50,
          boxShadow: '0 50px 100px rgba(0,0,0,0.8)',
          ease: 'power1.out'
        }
      );

    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  const titleText = 'Tokenized Property Infrastructure for Serious Capital Markets';
  const titleChars = titleText.split(' ').map((word, wIdx) => (
    <span key={wIdx} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', verticalAlign: 'top', paddingBottom: '4px' }}>
      {word.split('').map((char, cIdx) => (
        <span key={cIdx} className="hero-char" style={{ display: 'inline-block', transform: 'translateY(130%)' }}>
          {char}
        </span>
      ))}
    </span>
  ));

  return (
    <section ref={sectionRef} style={{
      position: 'relative', minHeight: '150vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-start', alignItems: 'center', overflow: 'hidden', 
      background: '#050807', color: '#f3eede', padding: '180px 0 120px',
      perspective: '1200px' // Crucial for 3D rotations!
    }}>
      
      {/* Background Media Asset */}
      <div ref={bgRef} style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${brandImages.hero})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transformOrigin: 'center center', willChange: 'transform'
      }} />

      {/* Dark Luxury Overlay */}
      <div ref={overlayRef} style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, rgba(5,8,7,0.3) 0%, rgba(5,8,7,0.85) 75%, #050807 100%)',
      }} />

      <div className="vx-container" style={{
        position: 'relative', width: '90%', maxWidth: '1200px', margin: '0 auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 3
      }}>
        
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '10px', 
          fontSize: '10px', letterSpacing: '.3em', color: '#d7b56d', 
          marginBottom: '28px', textTransform: 'uppercase', fontWeight: 400
        }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#d7b56d', display: 'inline-block' }} />
          Institutional RWA Presale Live
        </div>

        <h1 ref={titleRef} style={{
          fontSize: 'clamp(46px, 6.8vw, 96px)', fontWeight: 300, 
          lineHeight: 1.02, letterSpacing: '-0.04em', maxWidth: '1080px',
          fontFamily: 'serif', margin: 0, color: '#f3eede'
        }}>
          {titleChars}
        </h1>

        <p ref={subtitleRef} style={{
          fontSize: 'clamp(16px, 1.3vw, 22px)', lineHeight: 1.6, 
          color: '#bcbaaf', maxWidth: '680px', margin: '36px 0 44px', fontWeight: 300
        }}>
          VaultX reframes raw real-world assets into an elegant, high-liquidity digital layer. Built for modern investment frameworks.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '100px' }}>
          <button onClick={() => navigate('/presale')} style={{
            padding: '20px 42px', background: '#d7b56d', color: '#050807', fontSize: '13px',
            fontWeight: 600, border: 'none', cursor: 'pointer', letterSpacing: '.08em', textTransform: 'uppercase',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(215,181,109,0.2)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'translateY(0px)'; e.target.style.boxShadow = 'none'; }}
          >
            Join VTX Presale
          </button>
          <button onClick={() => navigate('/gallery')} style={{
            padding: '20px 42px', background: 'rgba(243, 238, 222, 0.03)', color: '#f3eede', fontSize: '13px',
            border: '1px solid rgba(243, 238, 222, 0.25)', cursor: 'pointer', letterSpacing: '.08em', textTransform: 'uppercase',
            backdropFilter: 'blur(12px)', transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(243, 238, 222, 0.08)'; e.target.style.borderColor = '#f3eede'; }}
          onMouseLeave={(e) => { e.target.style.background = 'rgba(243, 238, 222, 0.03)'; e.target.style.borderColor = 'rgba(243, 238, 222, 0.25)'; }}
          >
            Explore Assets
          </button>
        </div>

        {/* 💎 FIXED LAYER: Niche dynamic asset div with 3D perspective wrapper */}
        <div ref={assetRef} style={{ 
          width: '100%', maxWidth: '720px', background: 'rgba(12, 18, 16, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(40px)',
          padding: '28px', marginBottom: '80px', transformStyle: 'preserve-3d',
          willChange: 'transform', textAlign: 'left'
        }}>
          <div style={{ position: 'relative', height: '340px', overflow: 'hidden', marginBottom: '24px' }}>
            <img src={showcaseAssets[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0c1210, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
              <div style={{ fontSize: '10px', color: '#d7b56d', letterSpacing: '.2em', textTransform: 'uppercase' }}>{showcaseAssets[0].id}</div>
              <h3 style={{ margin: '4px 0 0', fontSize: '32px', fontWeight: 300, fontFamily: 'serif', color: '#f3eede' }}>{showcaseAssets[0].name}</h3>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
            <div>
              <span style={{ fontSize: '9px', color: '#a39f93', textTransform: 'uppercase', letterSpacing: '.1em' }}>Asset Value</span>
              <div style={{ fontSize: '24px', fontFamily: 'serif', color: '#f3eede', marginTop: '2px' }}>{showcaseAssets[0].price}</div>
            </div>
            <button onClick={() => navigate('/presale')} style={{
              padding: '14px 32px', background: 'transparent', border: '1px solid #d7b56d',
              color: '#d7b56d', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '.1em',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#d7b56d'; e.target.style.color = '#050807'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#d7b56d'; }}
            >
              Fractionalize
            </button>
          </div>
        </div>

        {/* Separator Line & Stats */}
        <div ref={statsRef} style={{
          width: '100%', maxWidth: '840px', borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <MiniStat label="Target TVL" value="$284M+" />
          <MiniStat label="Avg. target APY" value="8.9%" />
          <MiniStat label="Presale rate" value="2M VTX" />
        </div>

      </div>
    </section>
  );
}