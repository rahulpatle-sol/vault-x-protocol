import { motion } from 'framer-motion';

const NOTICES = [
  {
    region: 'United States',
    status: 'Pending SEC Review',
    statusColor: 'var(--gold-2)',
    statusBg: 'rgba(215,181,109,.1)',
    detail: 'VaultX is monitoring the SEC regulatory framework for digital asset securities. Accredited investor verification will be required for US-based participants.',
  },
  {
    region: 'European Union',
    status: 'MiCA Alignment',
    statusColor: 'var(--green-2)',
    statusBg: 'rgba(112,181,139,.1)',
    detail: 'Preliminary alignment with the Markets in Crypto-Assets (MiCA) regulation. Final compliance review pending formal legal assessment.',
  },
  {
    region: 'United Kingdom',
    status: 'FCA Framework',
    statusColor: 'var(--gold-2)',
    statusBg: 'rgba(215,181,109,.1)',
    detail: 'Engaging with FCA guidance on tokenized assets. UK participants may be subject to additional disclosure requirements.',
  },
  {
    region: 'Asia Pacific',
    status: 'Jurisdictional Review',
    statusColor: 'var(--cyan)',
    statusBg: 'rgba(158,210,190,.1)',
    detail: 'Multi-jurisdictional assessment in progress. Singapore, Hong Kong, and Japan are the initial focus markets.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

export default function JurisdictionNoticePanel() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      variants={containerVariants}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="vx-title"
        style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', marginBottom: 8 }}
      >
        Jurisdiction readiness
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="vx-copy"
        style={{ marginBottom: 24 }}
      >
        Current jurisdictional assessment status for VaultX RWA investment access. These are preliminary assessments and do not constitute legal advice.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {NOTICES.map((notice) => (
          <motion.div
            key={notice.region}
            variants={cardVariants}
            whileHover={{
              y: -6,
              transition: { type: 'spring', stiffness: 200, damping: 14 },
            }}
            style={{
              padding: 24,
              borderRadius: 20,
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(215,181,109,.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{notice.region}</span>
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  padding: '5px 12px',
                  borderRadius: 99,
                  background: notice.statusBg,
                  border: `1px solid ${notice.statusColor}33`,
                }}
              >
                <span className="mono" style={{ fontSize: 8, color: notice.statusColor, letterSpacing: '.1em', fontWeight: 700 }}>{notice.status}</span>
              </motion.div>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
              {notice.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
