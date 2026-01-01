import { Fragment, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Account from '../../account';
import SideDrawer from './SideDrawer';
import Contracts from '../../shared/Contracts';
import vaultxMark from 'assets/images/vaultx-mark.svg';

const NAV = [
  { label: 'Home', href: '/', end: true },
  { label: 'Pre-Sale', href: '/presale' },
  { label: 'Stake', href: '/stake' },
  { label: 'Swap', href: '/swap' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
];

function Logo() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
        cursor: 'pointer',
        background: 'transparent',
        padding: 0,
      }}
    >
      <div style={{ width: 42, height: 42, borderRadius: 14, padding: 3, background: 'linear-gradient(135deg, rgba(215,181,109,.26), rgba(112,181,139,.18))' }}>
        <img src={vaultxMark} alt="VaultX" style={{ width: '100%', height: '100%', borderRadius: 11, boxShadow: '0 12px 34px rgba(215,181,109,.12)' }} />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#F5F1E7', lineHeight: 1, letterSpacing: '-.03em' }}>
          Vault<span style={{ color: 'var(--gold-2)' }}>X</span>
        </div>
        <div className="mono" style={{ fontSize: 7, color: 'rgba(215,181,109,.62)', letterSpacing: '.24em', textTransform: 'uppercase', marginTop: 4 }}>
          RWA CAPITAL LAYER
        </div>
      </div>
    </button>
  );
}

export default function MainNavigation() {
  const [mob, setMob] = useState(false);
  const [contracts, setContracts] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [vis, setVis] = useState(true);
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 28);
      setVis(y < lastY.current || y < 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(href);
  };

  return (
    <Fragment>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, transform: vis ? 'translateY(0)' : 'translateY(-110%)', transition: 'transform .38s cubic-bezier(.2,1,.4,1)' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), var(--green), transparent)', opacity: scrolled ? 1 : .45, transition: 'opacity .3s' }} />
        <div
          style={{
            background: scrolled ? 'rgba(8,19,17,.82)' : 'rgba(8,19,17,.42)',
            backdropFilter: 'none',
            borderBottom: `1px solid ${scrolled ? 'rgba(215,181,109,.16)' : 'rgba(245,241,231,.06)'}`,
            boxShadow: scrolled ? '0 20px 60px rgba(0,0,0,.34)' : 'none',
            transition: 'background .35s, border .35s, box-shadow .35s',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', minHeight: 78, display: 'flex', alignItems: 'center', gap: 18 }}>
            <button onClick={() => setMob(p => !p)} style={{ display: 'none', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 14, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', cursor: 'pointer', color: 'var(--stone)', fontSize: 16 }} className="vx-mob-btn">☰</button>
            <Logo />

            <div className="vx-nav-wrap" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <nav style={{ display: 'flex', gap: 6, padding: 6, borderRadius: 999, background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.05)' }} className="vx-nav">
                {NAV.map(l => {
                  const isActive = l.end ? pathname === l.href : pathname.startsWith(l.href);
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => handleNav(e, l.href)}
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '.11em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        padding: '10px 14px',
                        borderRadius: 999,
                        cursor: 'pointer',
                        color: isActive ? '#0a1411' : 'var(--stone)',
                        background: isActive ? 'linear-gradient(135deg,var(--gold-2),var(--gold))' : 'transparent',
                        boxShadow: isActive ? '0 12px 30px rgba(215,181,109,.16)' : 'none',
                        transition: 'all .18s',
                      }}
                    >
                      {l.label}
                    </a>
                  );
                })}
                <button
                  onClick={() => setContracts(p => !p)}
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '.1em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '10px 14px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: 999,
                    color: 'var(--stone)',
                    cursor: 'pointer',
                    transition: 'color .18s',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color = '#F5F1E7'; }}
                  onMouseOut={e => { e.currentTarget.style.color = 'var(--stone)'; }}
                >
                  Contracts
                </button>
              </nav>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="vx-live" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px 7px 9px', border: '1px solid rgba(151,217,176,.2)', borderRadius: 999, background: 'rgba(112,181,139,.08)' }}>
                <div className="live-dot" />
                <span className="mono" style={{ fontSize: 8, color: '#97D9B0', letterSpacing: '.18em', textTransform: 'uppercase' }}>Market Live</span>
              </div>
              <Account />
            </div>
          </div>
        </div>
      </header>

      <SideDrawer
        mainLinks={NAV}
        onClose={() => setMob(false)}
        open={mob}
        handleClickContracts={() => { setContracts(p => !p); setMob(false); }}
      />
      <Contracts open={contracts} handleClose={() => setContracts(false)} />

      <style>{`
        @media(max-width:980px){.vx-mob-btn{display:flex!important}.vx-nav-wrap,.vx-live{display:none!important}}
        @media(max-width:560px){header>div:nth-child(2)>div{padding:0 16px!important}}
      `}</style>
    </Fragment>
  );
}
