import { useEffect, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AssetMetricGrid from './AssetMetricGrid';
import AssetRiskSummary from './AssetRiskSummary';
import AssetActionPanel from './AssetActionPanel';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const drawerVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 35,
      damping: 22,
      mass: 1.2,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 24,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 18 },
  },
};

function LetterAnimation({ text }) {
  return text.split('').map((char, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 14,
        delay: 0.02 * i + 0.1,
      }}
      style={{ display: 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));
}

const MemoLetterAnimation = memo(LetterAnimation);

export default function AssetDetailDrawer({ asset, open, onClose }) {
  const escHandler = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', escHandler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', escHandler);
      document.body.style.overflow = '';
    };
  }, [open, escHandler]);

  const statusColor = useMemo(() => ({
    Open: 'var(--green-2)',
    Allocation: 'var(--gold-2)',
    Priority: 'var(--gold)',
  }), []);

  return (
    <AnimatePresence>
      {open && asset && (
        <>
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6,14,12,.72)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 9998,
            }}
          />
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(520px, 92vw)',
                zIndex: 9999,
                background: 'linear-gradient(180deg, #0d1b18 0%, #0a1613 100%)',
                borderLeft: '1px solid rgba(215,181,109,.14)',
                boxShadow: '-28px 0 90px rgba(0,0,0,.48)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                willChange: 'transform',
              }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 0% 20%, rgba(215,181,109,.06), transparent 60%), radial-gradient(circle at 80% 80%, rgba(112,181,139,.04), transparent 50%)',
              pointerEvents: 'none',
              willChange: 'opacity',
            }} />

            <div style={{ position: 'relative', height: 220, overflow: 'hidden', flexShrink: 0, aspectRatio: '520/220' }}>
              <motion.img
                src={asset.img}
                alt={asset.name}
                initial={{ scale: 1.3, filter: 'blur(10px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(8,19,17,.85) 0%, rgba(8,19,17,.2) 50%, rgba(8,19,17,.1) 100%)',
              }} />
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  background: 'rgba(0,0,0,.4)',
                  border: '1px solid rgba(255,255,255,.1)',
                  color: '#fff',
                  fontSize: 18,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </motion.button>
              <div style={{ position: 'absolute', left: 22, bottom: 22, right: 22 }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mono"
                  style={{ fontSize: 9, color: 'var(--gold-2)', letterSpacing: '.16em', marginBottom: 8, textTransform: 'uppercase' }}
                >
                  {asset.id}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 14 }}
                  style={{ margin: 0, fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.04em', lineHeight: 1.05 }}
                >
                  <MemoLetterAnimation text={asset.name} />
                </motion.h2>
              </div>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '22px 22px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <motion.div variants={staggerItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <div style={{ padding: '6px 12px', borderRadius: 99, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(215,181,109,.12)' }}>
                    <span className="mono" style={{ fontSize: 9, color: 'var(--gold-2)', letterSpacing: '.08em' }}>{asset.type}</span>
                  </div>
                  <div style={{ padding: '6px 12px', borderRadius: 99, background: 'rgba(112,181,139,.08)', border: '1px solid rgba(112,181,139,.2)' }}>
                    <span className="mono" style={{ fontSize: 9, color: statusColor[asset.status] || 'var(--green-2)', letterSpacing: '.08em' }}>{asset.status}</span>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--muted)', marginLeft: 4 }}>{asset.location}</span>
                </div>
              </motion.div>

              <motion.div variants={staggerItem}>
                <AssetMetricGrid
                  apy={asset.apy}
                  occupancy={asset.occupancy}
                  funded={asset.funded}
                  min={asset.min}
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <AssetRiskSummary riskLevel={asset.riskLevel || 'medium'} memo={asset.memo} />
              </motion.div>

              <motion.div variants={staggerItem}>
                <AssetActionPanel asset={asset} />
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
