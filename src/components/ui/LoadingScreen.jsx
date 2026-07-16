import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setShow(false),
    });

    tl.to('.loader-block', {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(2)',
    });

    tl.to('.loader-dot', {
      scale: 1.5,
      opacity: 0.4,
      duration: 0.4,
      repeat: 3,
      yoyo: true,
      ease: 'power2.inOut',
    });

    tl.to('.loader-block', {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
      delay: 0.1,
    });

    tl.to('.loader-root', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    return () => tl.kill();
  }, []);

  if (!show) return null;

  return (
    <div className="loader-root" style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: 32,
    }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div
            key={i}
            className="loader-block"
            style={{
              width: 10,
              height: 10,
              borderRadius: 3,
              background: 'linear-gradient(135deg, var(--gold-2), var(--gold))',
              boxShadow: '0 0 20px rgba(215,181,109,0.2)',
              transform: 'scale(0)',
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: 28, fontWeight: 800, color: 'var(--text)',
          letterSpacing: '-0.04em', marginBottom: 4,
        }}>
          Vault<span style={{ color: 'var(--gold-2)' }}>X</span>
        </div>
        <div className="mono" style={{
          fontSize: 9, color: 'var(--gold)', letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          Initializing Protocol
          <span className="loader-dot" style={{
            display: 'inline-block', marginLeft: 2,
          }}>.</span>
          <span className="loader-dot" style={{
            display: 'inline-block',
          }}>.</span>
          <span className="loader-dot" style={{
            display: 'inline-block',
          }}>.</span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 40,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 4, height: 4, borderRadius: '50%',
          background: 'var(--green-2)',
          animation: 'vxPing 1.8s ease-out infinite',
        }} />
        <span className="mono" style={{
          fontSize: 8, color: 'rgba(245,241,231,0.3)',
          letterSpacing: '0.12em',
        }}>
          REAL WORLD ASSETS · ON-CHAIN
        </span>
      </div>
    </div>
  );
}
