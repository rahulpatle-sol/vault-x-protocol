import Drawer from '@mui/material/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';
import vaultxMark from 'assets/images/vaultx-mark.svg';

const SideDrawer = ({ mainLinks, onClose, open, handleClickContracts }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNav = (e, href) => {
    e.preventDefault();
    navigate(href);
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 10000,
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          width: 300,
          background: 'linear-gradient(180deg, rgba(8,19,17,.98), rgba(10,24,21,.98))',
          borderRight: '1px solid rgba(215,181,109,.1)',
          boxShadow: '16px 0 80px rgba(0,0,0,.7)',
        },
      }}
      BackdropProps={{ style: { backgroundColor: 'rgba(4,10,9,.75)', backdropFilter: 'none' } }}
    >
      <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(215,181,109,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 20px 18px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={vaultxMark} alt="VaultX" style={{ width: 36, height: 36, borderRadius: 12 }} />
          <div>
            <div style={{ fontSize: 18, color: '#F5F1E7', fontWeight: 800, letterSpacing: '-.03em' }}>Vault<span style={{ color: 'var(--gold-2)' }}>X</span></div>
            <div className="mono" style={{ fontSize: 7, color: 'var(--gold)', letterSpacing: '.2em', textTransform: 'uppercase', marginTop: 4 }}>RWA CAPITAL LAYER</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10, width: 32, height: 32, cursor: 'pointer', color: 'var(--muted)', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
      </div>

      <div style={{ padding: '18px 14px' }}>
        <div className="vx-card" style={{ padding: 14, marginBottom: 14, boxShadow: 'none' }}>
          <div className="mono" style={{ fontSize: 8, color: 'var(--gold-2)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 6 }}>Platform status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="live-dot" />
            <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 700 }}>Presale and dashboard available</div>
          </div>
        </div>

        {mainLinks.map((l) => {
          const active = l.end ? pathname === l.href : pathname.startsWith(l.href);
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: '12px 14px',
                borderRadius: 14,
                marginBottom: 8,
                textDecoration: 'none',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 10,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: active ? '#081311' : 'var(--stone)',
                background: active ? 'linear-gradient(135deg, var(--gold-2), var(--gold))' : 'rgba(255,255,255,.03)',
                border: `1px solid ${active ? 'rgba(215,181,109,.4)' : 'rgba(255,255,255,.04)'}`,
                boxShadow: active ? '0 10px 28px rgba(215,181,109,.18)' : 'none',
              }}
            >
              <span>{l.label}</span>
              <span style={{ opacity: .6 }}>→</span>
            </a>
          );
        })}

        <button
          onClick={handleClickContracts}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 14px',
            borderRadius: 14,
            marginTop: 6,
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.04)',
            color: 'var(--stone)',
            cursor: 'pointer',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 10,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}
        >
          <span>Contracts</span>
          <span style={{ opacity: .6 }}>→</span>
        </button>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
