import Drawer from '@mui/material/Drawer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiX, FiArrowRight } from 'react-icons/fi';
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
          width: 310,
          background: 'linear-gradient(180deg, rgba(7,18,15,0.98), rgba(10,24,21,0.98))',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(215,181,109,0.08)',
          boxShadow: '20px 0 100px rgba(0,0,0,0.6)',
        },
      }}
      BackdropProps={{ style: { backgroundColor: 'rgba(4,10,9,0.7)', backdropFilter: 'blur(4px)' } }}
    >
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(215,181,109,0.06), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 250, height: 250, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(112,181,139,0.05), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '24px 22px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={vaultxMark} alt="VaultX" style={{ width: 38, height: 38, borderRadius: 12 }} />
          <div>
            <div style={{ fontSize: 19, color: '#F5F1E7', fontWeight: 800, letterSpacing: '-0.03em' }}>
              Vault<span style={{ color: 'var(--gold-2)' }}>X</span>
            </div>
            <div className="mono" style={{
              fontSize: 7, color: 'var(--gold)', letterSpacing: '0.2em',
              textTransform: 'uppercase', marginTop: 4,
            }}>
              RWA Capital Layer
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer', color: 'var(--muted)', fontSize: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <FiX size={16} />
        </button>
      </div>

      <div style={{ padding: '18px 16px' }}>
        <div style={{
          padding: 14, borderRadius: 16, marginBottom: 16,
          background: 'rgba(112,181,139,0.04)',
          border: '1px solid rgba(112,181,139,0.1)',
        }}>
          <div className="mono" style={{
            fontSize: 8, color: 'var(--green-2)', letterSpacing: '0.16em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span className="live-dot" style={{ width: 6, height: 6 }} />
              Network Status
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="live-dot" />
            <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 700 }}>Ethereum · Connected</div>
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
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 16px', borderRadius: 14, marginBottom: 6,
                textDecoration: 'none',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: active ? '#081311' : 'rgba(245,241,231,0.6)',
                background: active
                  ? 'linear-gradient(135deg, var(--gold-2), var(--gold))'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${active ? 'rgba(215,181,109,0.3)' : 'rgba(255,255,255,0.03)'}`,
                boxShadow: active ? '0 10px 28px rgba(215,181,109,0.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span>{l.label}</span>
              <FiArrowRight size={12} style={{ opacity: 0.5 }} />
            </a>
          );
        })}
 
        <button
          onClick={handleClickContracts}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', padding: '13px 16px',
            borderRadius: 14, marginTop: 8,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.03)',
            color: 'rgba(245,241,231,0.6)',
            cursor: 'pointer',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 10, letterSpacing: '0.12em',
            textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >
          <span>Contracts</span>
          <FiArrowRight size={12} style={{ opacity: 0.5 }} />
        </button>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
