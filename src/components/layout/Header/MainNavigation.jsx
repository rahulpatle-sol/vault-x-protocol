import { Fragment, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../providers/ThemeProvider';
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
  { label: 'Compliance', href: '/compliance' },
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
        background: 'transparent',
        padding: 0,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 14, padding: 3,
        background: 'linear-gradient(135deg, rgba(215,181,109,0.3), rgba(112,181,139,0.2))',
        position: 'relative',
      }}>
        <img src={vaultxMark} alt="VaultX" style={{
          width: '100%', height: '100%', borderRadius: 11,
          boxShadow: '0 12px 34px rgba(215,181,109,0.12)',
        }} />
        <div style={{
          position: 'absolute', inset: -2, borderRadius: 'inherit',
          background: 'linear-gradient(135deg, rgba(215,181,109,0.2), transparent, rgba(112,181,139,0.2))',
          zIndex: -1, filter: 'blur(6px)',
        }} />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{
          fontSize: 19, fontWeight: 800, color: '#F5F1E7',
          lineHeight: 1, letterSpacing: '-0.03em',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          Vault<span style={{ color: 'var(--gold-2)' }}>X</span>
          <span style={{
            fontSize: 7, padding: '2px 6px', borderRadius: 4,
            background: 'rgba(112,181,139,0.12)',
            color: 'var(--green-2)', marginLeft: 6,
            fontWeight: 600, letterSpacing: '0.04em',
          }}>PoC</span>
        </div>
        <div className="mono" style={{
          fontSize: 7, color: 'rgba(215,181,109,0.6)',
          letterSpacing: '0.24em', textTransform: 'uppercase', marginTop: 4,
        }}>
          RWA Capital Layer
        </div>
      </div>
    </button>
  );
}

function NavLink({ item, isActive, onClick }) {
  return (
    <a
      href={item.href}
      onClick={(e) => { e.preventDefault(); onClick(item.href); }}
      style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        padding: '9px 16px',
        borderRadius: 999,
        cursor: 'pointer',
        color: isActive ? '#0a1411' : 'rgba(245,241,231,0.6)',
        background: isActive ? 'linear-gradient(135deg, var(--gold-2), var(--gold))' : 'transparent',
        boxShadow: isActive ? '0 8px 24px rgba(215,181,109,0.18)' : 'none',
        position: 'relative',
        transition: 'all 0.25s var(--ease-smooth)',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = '#F5F1E7';
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.color = 'rgba(245,241,231,0.6)';
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {item.label}
    </a>
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
  const { theme, toggle } = useTheme();

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

  const handleNav = useCallback((href) => {
    navigate(href);
  }, [navigate]);

  return (
    <Fragment>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        transform: vis ? 'translateY(0)' : 'translateY(-120%)',
        transition: 'transform 0.4s var(--ease-smooth)',
      }}>
        <div style={{
          background: scrolled
            ? 'rgba(7,18,15,0.78)'
            : 'rgba(7,18,15,0.3)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(215,181,109,0.1)' : 'rgba(245,241,231,0.04)'}`,
          boxShadow: scrolled ? '0 20px 60px rgba(0,0,0,0.35)' : 'none',
          transition: 'background 0.4s var(--ease-smooth), border-color 0.4s var(--ease-smooth), box-shadow 0.4s var(--ease-smooth)',
        }}>
          <div style={{
            maxWidth: 1280, margin: '0 auto', padding: '0 28px',
            minHeight: 76, display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <button
              onClick={() => setMob(p => !p)}
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer', color: 'var(--stone)', fontSize: 18,
              }}
              className="vx-mob-btn"
            >
              <span style={{ lineHeight: 1 }}>≡</span>
            </button>

            <Logo />

            <div className="vx-nav-wrap" style={{
              flex: 1, display: 'flex', justifyContent: 'center',
            }}>
              <nav style={{
                display: 'flex', gap: 4, padding: 4,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
              }}>
                {NAV.map(l => {
                  const isActive = l.end ? pathname === l.href : pathname.startsWith(l.href);
                  return (
                    <NavLink
                      key={l.href}
                      item={l}
                      isActive={isActive}
                      onClick={handleNav}
                    />
                  );
                })}
                <button
                  onClick={() => setContracts(p => !p)}
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    padding: '9px 16px',
                    borderRadius: 999,
                    color: 'rgba(245,241,231,0.6)',
                    cursor: 'pointer',
                    transition: 'all 0.25s var(--ease-smooth)',
                    background: 'transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#F5F1E7'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,241,231,0.6)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  Contracts
                </button>
              </nav>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={toggle}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  width: 34, height: 34, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--stone)',
                  cursor: 'pointer',
                  transition: 'all 0.25s var(--ease-smooth)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(215,181,109,0.1)'; e.currentTarget.style.color = 'var(--gold-2)'; e.currentTarget.style.borderColor = 'rgba(215,181,109,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--stone)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
              </button>
              <div className="vx-live" style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '6px 12px 6px 8px',
                border: '1px solid rgba(151,217,176,0.15)',
                borderRadius: 999,
                background: 'rgba(112,181,139,0.06)',
                backdropFilter: 'blur(8px)',
              }}>
                <div className="live-dot" style={{ width: 6, height: 6 }} />
                <span className="mono" style={{
                  fontSize: 8, color: '#97D9B0', letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}>
                  ETH Live
                </span>
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
        @media(max-width:560px){header>div>div{padding:0 16px!important}}
      `}</style>
    </Fragment>
  );
}
