import { motion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Connect Wallet',
    description: 'Link your browser wallet to verify your identity and begin the qualification process.',
    icon: '🔗',
    color: 'rgba(215,181,109,.12)',
    borderColor: 'rgba(215,181,109,.25)',
    accent: 'var(--gold-2)',
  },
  {
    step: '02',
    title: 'Request Access',
    description: 'Submit an access request indicating your investor profile and jurisdictional location.',
    icon: '📋',
    color: 'rgba(112,181,139,.12)',
    borderColor: 'rgba(112,181,139,.25)',
    accent: 'var(--green-2)',
  },
  {
    step: '03',
    title: 'Review Disclosures',
    description: 'Read and acknowledge all risk disclosures, asset memos, and legal terms before participating.',
    icon: '📄',
    color: 'rgba(215,181,109,.12)',
    borderColor: 'rgba(215,181,109,.25)',
    accent: 'var(--gold-2)',
  },
  {
    step: '04',
    title: 'Wait for Approval',
    description: 'Your eligibility will be reviewed against jurisdictional requirements and investor criteria.',
    icon: '⏳',
    color: 'rgba(112,181,139,.12)',
    borderColor: 'rgba(112,181,139,.25)',
    accent: 'var(--green-2)',
  },
  {
    step: '05',
    title: 'Participate',
    description: 'Once approved, you can access investment opportunities and participate in asset allocations.',
    icon: '✅',
    color: 'rgba(215,181,109,.12)',
    borderColor: 'rgba(215,181,109,.25)',
    accent: 'var(--gold)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 16,
    },
  },
};

export default function InvestorAccessSteps() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="vx-title"
        style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: 8 }}
      >
        Investor access workflow
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="vx-copy"
        style={{ marginBottom: 12 }}
      >
        Five simple steps to begin participating in VaultX real-world asset opportunities.
      </motion.p>
      {STEPS.map((step, i) => (
        <motion.div
          key={step.step}
          variants={stepVariants}
          whileHover={{
            x: 8,
            transition: { type: 'spring', stiffness: 200, damping: 14 },
          }}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 18,
            padding: '20px 22px',
            borderRadius: 20,
            background: step.color,
            border: `1px solid ${step.borderColor}`,
            backdropFilter: 'blur(6px)',
            cursor: 'default',
            transition: 'background .2s ease',
          }}
        >
          <motion.div
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${step.accent}22, ${step.accent}11)`,
              border: `1px solid ${step.borderColor}`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {step.icon}
          </motion.div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span className="mono" style={{ fontSize: 9, color: step.accent, letterSpacing: '.14em', fontWeight: 700 }}>{step.step}</span>
              <div style={{ width: 24, height: 1, background: step.borderColor }} />
              <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{step.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {step.description}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,.04)',
              border: `1px solid ${step.borderColor}`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              color: step.accent,
              flexShrink: 0,
            }}
          >
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
