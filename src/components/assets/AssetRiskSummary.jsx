import { motion } from 'framer-motion';
import { memo } from 'react';

const RISK_COLORS = {
  low: { bg: 'rgba(112,181,139,.12)', border: 'rgba(112,181,139,.3)', text: 'var(--green-2)', dot: 'var(--green-2)' },
  medium: { bg: 'rgba(215,181,109,.12)', border: 'rgba(215,181,109,.3)', text: 'var(--gold-2)', dot: 'var(--gold-2)' },
  high: { bg: 'rgba(225,124,124,.12)', border: 'rgba(225,124,124,.3)', text: 'var(--red)', dot: 'var(--red)' },
};

const RISK_LABELS = { low: 'Low Risk', medium: 'Medium Risk', high: 'High Risk' };

const MEMO_TEXT = 'This RWA asset has undergone preliminary due diligence. Full legal review, title verification, and jurisdictional compliance assessment are pending finalization. Investors should review all disclosures before committing capital.';

const AssetRiskSummary = memo(function AssetRiskSummary({ riskLevel = 'medium', memo: memoText = MEMO_TEXT }) {
  const level = riskLevel.toLowerCase();
  const colors = RISK_COLORS[level] || RISK_COLORS.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.2 }}
      style={{
        padding: 20,
        borderRadius: 20,
        background: 'rgba(255,255,255,.03)',
        border: '1px solid rgba(215,181,109,.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.3 }}
          style={{
            padding: '8px 16px',
            borderRadius: 99,
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 8, height: 8, borderRadius: '50%', background: colors.dot, display: 'block' }}
          />
          <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: colors.text, letterSpacing: '.12em' }}>
            {RISK_LABELS[level]}
          </span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mono"
          style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.1em', textTransform: 'uppercase' }}
        >
          Risk Assessment
        </motion.span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}
      >
        {memoText}
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
        style={{
          marginTop: 14,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(215,181,109,.2), transparent)',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
});

export default AssetRiskSummary;
