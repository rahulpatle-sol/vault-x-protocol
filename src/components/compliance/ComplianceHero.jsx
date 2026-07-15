import { motion } from 'framer-motion';

export default function ComplianceHero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '140px 0 80px',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(215,181,109,.08), transparent 50%), radial-gradient(circle at 80% 60%, rgba(112,181,139,.06), transparent 45%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 25% 45%, rgba(215,181,109,.03) 0%, transparent 50%), radial-gradient(circle at 70% 20%, rgba(112,181,139,.03) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div className="vx-container" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.1 }}
        >
          <span className="vx-eyebrow" style={{ marginBottom: 20, display: 'inline-flex' }}>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-2)', display: 'block' }}
            />
            Compliance Center · RWA Framework
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}
          className="vx-title"
          style={{ fontSize: 'clamp(42px, 6vw, 80px)', maxWidth: 820, margin: '16px 0 0' }}
        >
          Institutional compliance{' '}
          <motion.span
            animate={{ color: ['var(--gold-2)', 'var(--gold)', 'var(--gold-2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            reimagined
          </motion.span>
          <br />for the on-chain era.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="vx-copy"
          style={{ maxWidth: 620, margin: '20px 0 32px', fontSize: 17 }}
        >
          VaultX provides a transparent compliance framework for real-world asset investors.
          Review jurisdictional readiness, risk disclosures, and document status — all on-chain
          and independently verifiable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 60, damping: 16 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            alignItems: 'center',
          }}
        >
          <div style={{
            padding: '14px 20px',
            borderRadius: 16,
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(215,181,109,.12)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span className="mono" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.12em', textTransform: 'uppercase' }}>VaultX Address</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--gold-2)' }}>0xBb56...1cc5</span>
          </div>
          <div style={{
            padding: '8px 16px',
            borderRadius: 99,
            background: 'rgba(112,181,139,.08)',
            border: '1px solid rgba(112,181,139,.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-2)', display: 'block' }}
            />
            <span className="mono" style={{ fontSize: 9, color: 'var(--green-2)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Framework Active</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
