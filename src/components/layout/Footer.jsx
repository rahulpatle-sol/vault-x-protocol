import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiGithubFill, RiTwitterXFill, RiDiscordFill, RiMediumFill, RiArrowRightUpLine, RiShieldCheckFill, RiFlashlightFill } from 'react-icons/ri';
import vaultxMark from 'assets/images/vaultx-mark.svg';

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  Platform: ['Presale', 'Marketplace', 'Staking', 'Swap'],
  Product: ['Gallery', 'Account', 'Transactions', 'Security Review'],
  Company: ['About', 'Compliance', 'Partners', 'Contact'],
};

const SOCIALS = [
  { icon: RiGithubFill, href: '#' },
  { icon: RiTwitterXFill, href: '#' },
  { icon: RiDiscordFill, href: '#' },
  { icon: RiMediumFill, href: '#' },
];

export default function Footer() {
  const sectionRef = useRef(null);
  const colsRef = useRef([]);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const go = (item) => {
    const routes = { Presale:'/presale', Marketplace:'/gallery', Staking:'/stake', Swap:'/swap', Gallery:'/gallery', Account:'/account', Transactions:'/transactions', About:'/about', Compliance:'/compliance', Contact:'/contact' };
    if (routes[item]) navigate(routes[item]);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = colsRef.current.filter(Boolean);
      gsap.fromTo(cols,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.3, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} style={{
      position: 'relative',
      borderTop: '1px solid var(--border)',
      background: 'linear-gradient(180deg, rgba(6,14,12,0.98), rgba(4,10,8,0.99))',
      padding: '64px 0 24px',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -120, right: -120, width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,181,109,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80, width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(112,181,139,0.03), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="vx-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr repeat(3, 1fr)',
          gap: 40,
          marginBottom: 36,
          position: 'relative',
          zIndex: 1,
        }}>
          <div ref={el => colsRef.current[0] = el}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14, padding: 3,
                background: 'linear-gradient(135deg, rgba(215,181,109,0.3), rgba(112,181,139,0.2))',
                position: 'relative',
              }}>
                <img src={vaultxMark} alt="VaultX" style={{ width: '100%', height: '100%', borderRadius: 11 }} />
                <div style={{
                  position: 'absolute', inset: -2, borderRadius: 'inherit',
                  background: 'linear-gradient(135deg, rgba(215,181,109,0.2), transparent, rgba(112,181,139,0.2))',
                  zIndex: -1, filter: 'blur(6px)',
                }} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.04em', lineHeight: 1 }}>
                  Vault<span style={{ color: 'var(--gold-2)' }}>X</span>
                </div>
                <div className="mono" style={{ fontSize: 8, color: 'var(--gold)', letterSpacing: '.24em', textTransform: 'uppercase', marginTop: 5 }}>
                  Tokenized Real Assets
                </div>
              </div>
            </div>
            <p className="vx-copy" style={{ maxWidth: 360, margin: '0 0 20px', lineHeight: 1.8, fontSize: 14 }}>
              Tokenized real-world asset infrastructure for serious capital markets. Permissioned, audited, and built for institutional-grade deployment.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {SOCIALS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                    width: 34, height: 34, borderRadius: 10,
                    display: 'grid', placeItems: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    color: 'var(--dim)',
                    transition: 'all 0.25s var(--ease-smooth)',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(215,181,109,0.1)'; e.currentTarget.style.borderColor = 'rgba(215,181,109,0.3)'; e.currentTarget.style.color = 'var(--gold-2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--dim)'; }}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(LINKS).map(([group, items], gi) => (
            <div key={group} ref={el => colsRef.current[gi + 1] = el}>
              <div className="mono" style={{
                fontSize: 10, fontWeight: 700, color: 'var(--gold-2)',
                letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 18,
                position: 'relative',
              }}>
                {group}
              </div>
              {items.map(item => (
                <button key={item} onClick={() => go(item)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'transparent', color: 'var(--muted)',
                    padding: '8px 0', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                    border: 'none', textAlign: 'left',
                    transition: 'color 0.2s var(--ease-smooth), gap 0.2s var(--ease-smooth)',
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.gap = '10px'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.gap = '6px'; }}
                >
                  {item}
                  <RiArrowRightUpLine size={11} style={{ opacity: 0.4, flexShrink: 0 }} />
                </button>
              ))}
            </div>
          ))}
        </div>

        <div ref={bottomRef} style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 14,
          position: 'relative',
          zIndex: 1,
        }}>
          <div className="mono" style={{
            fontSize: 9, color: 'var(--dim)',
            letterSpacing: '.1em',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <RiShieldCheckFill size={11} color="var(--green-2)" />
            &copy; 2026 VaultX Protocol. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="mono" style={{
              fontSize: 9, color: 'var(--dim)', letterSpacing: '.08em',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <RiFlashlightFill size={10} color="var(--gold)" />
              Secured by audited smart contracts
            </div>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--green-2)',
              boxShadow: '0 0 8px rgba(112,181,139,0.4)',
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:840px){footer .vx-container>div:first-child{grid-template-columns:1fr 1fr!important}}
        @media(max-width:560px){footer .vx-container>div:first-child{grid-template-columns:1fr!important}}
        footer button { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </footer>
  );
}
