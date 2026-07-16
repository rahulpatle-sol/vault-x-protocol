import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  const sectionRef = useRef(null);
  const numRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const particlesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(numRef.current,
        { y: -100, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
      );

      tl.fromTo(numRef.current,
        { textShadow: '0 0 0px rgba(215,181,109,0)' },
        { textShadow: '0 0 60px rgba(215,181,109,.3)', duration: 1.5, ease: 'sine.inOut' },
        '-=0.5'
      );

      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      );

      tl.fromTo(descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(btnRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        '-=0.1'
      );

      gsap.to(numRef.current, {
        y: 'random(-8, 8)',
        rotation: 'random(-3, 3)',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      particlesRef.current.forEach((p, i) => {
        if (!p) return;
        gsap.set(p, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.3,
        });
        gsap.to(p, {
          y: `-=${Math.random() * 200 + 100}`,
          x: `+=${(Math.random() - 0.5) * 100}`,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: 'none',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 40%, rgba(215,181,109,.06), transparent 50%), radial-gradient(circle at 50% 60%, rgba(112,181,139,.04), transparent 40%)',
        pointerEvents: 'none',
      }} />

      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: `rgba(215,181,109,${Math.random() * 0.3 + 0.1})`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 20px' }}>
        <div ref={numRef} style={{
          fontSize: 'clamp(120px, 20vw, 220px)',
          fontWeight: 800,
          color: 'var(--gold-2)',
          lineHeight: 1,
          letterSpacing: '-.06em',
          marginBottom: 8,
          fontFamily: 'Manrope, sans-serif',
          filter: 'drop-shadow(0 0 40px rgba(215,181,109,.15))',
        }}>
          404
        </div>

        <h1 ref={titleRef} className="vx-title" style={{
          fontSize: 'clamp(24px, 3.5vw, 44px)',
          marginTop: 0,
          marginBottom: 16,
        }}>
          This page drifted off the chain
        </h1>

        <p ref={descRef} className="vx-copy" style={{
          maxWidth: 480,
          margin: '0 auto 32px',
          fontSize: 16,
        }}>
          The route you're looking for doesn't exist or has been moved. Double-check the URL or head back to the dashboard.
        </p>

        <div ref={btnRef} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="vx-btn" onClick={() => navigate('/')}>
            <FiArrowLeft size={14} style={{ marginRight: 6 }} /> Back Home
          </button>
          <button className="vx-btn secondary" onClick={() => navigate('/gallery')}>
            Browse Assets
          </button>
        </div>
      </div>
    </section>
  );
}
