import { motion } from 'framer-motion';
import { useWeb3React } from '@web3-react/core';
import { FiLock } from 'react-icons/fi';

const btnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  width: '100%',
  minHeight: 50,
  padding: '0 24px',
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: '.01em',
  cursor: 'pointer',
  border: 'none',
  transition: 'transform .2s ease, box-shadow .2s ease',
};

const primaryBtn = {
  ...btnBase,
  background: 'linear-gradient(135deg, var(--gold), #a57f3a)',
  color: '#0a1411',
  boxShadow: '0 14px 36px rgba(215,181,109,.16)',
};

const secondaryBtn = {
  ...btnBase,
  background: 'rgba(255,255,255,.04)',
  color: 'var(--text)',
  border: '1px solid rgba(215,181,109,.18)',
};

const disabledBtn = {
  ...btnBase,
  background: 'rgba(255,255,255,.03)',
  color: 'var(--dim)',
  cursor: 'not-allowed',
  border: '1px solid rgba(255,255,255,.06)',
  pointerEvents: 'none',
};

const MotionButton = motion.button;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 16, delay: 0.1 * i },
  }),
};

export default function AssetActionPanel({ asset }) {
  const { account, library } = useWeb3React();
  const connected = Boolean(account && library);

  const buttons = [
    { label: 'View Details', primary: true, action: 'details' },
    { label: connected ? 'Request Access' : 'Connect Wallet Required', primary: false, disabled: !connected, action: 'access' },
    { label: connected ? 'Go To Presale' : 'Connect Wallet Required', primary: false, disabled: !connected, action: 'presale' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {!connected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ type: 'spring', stiffness: 100, damping: 16 }}
          style={{
            padding: '12px 16px',
            borderRadius: 14,
            background: 'rgba(225,124,124,.08)',
            border: '1px solid rgba(225,124,124,.18)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <FiLock size={14} color="var(--red)" />
          <span className="mono" style={{ fontSize: 10, color: 'var(--red)', letterSpacing: '.06em' }}>
            Connect your wallet to access investment actions
          </span>
        </motion.div>
      )}
      {buttons.map((btn, i) => (
        <MotionButton
          key={btn.label}
          custom={i}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover={!btn.disabled ? { scale: 1.02, y: -2 } : {}}
          whileTap={!btn.disabled ? { scale: 0.98 } : {}}
          style={btn.disabled ? disabledBtn : btn.primary ? primaryBtn : secondaryBtn}
          onClick={() => {
            if (btn.disabled) return;
          }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 * i + 0.3 }}
          >
            {btn.label}
          </motion.span>
        </MotionButton>
      ))}
    </div>
  );
}
