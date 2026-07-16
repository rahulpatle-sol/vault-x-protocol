import { motion } from 'framer-motion';
import { RiFileTextLine, RiScalesLine, RiFilePaper2Line, RiErrorWarningLine, RiBarChartBoxLine, RiClipboardLine } from 'react-icons/ri';

const DOCUMENTS = [
  {
    title: 'Asset Summary Memo',
    type: 'Placeholder',
    description: 'Comprehensive overview of asset characteristics, financial projections, and investment thesis.',
    icon: RiFileTextLine,
    status: 'pending',
  },
  {
    title: 'Legal Wrapper & SPV Structure',
    type: 'Placeholder',
    description: 'Special purpose vehicle formation documents, governing law, and legal ownership structure.',
    icon: RiScalesLine,
    status: 'pending',
  },
  {
    title: 'Token Terms & Conditions',
    type: 'Placeholder',
    description: 'Token holder rights, transfer restrictions, redemption mechanics, and governance provisions.',
    icon: RiFilePaper2Line,
    status: 'pending',
  },
  {
    title: 'Risk Disclosure Statement',
    type: 'Placeholder',
    description: 'Detailed risk factors, disclaimers, and investor acknowledgment requirements.',
    icon: RiErrorWarningLine,
    status: 'pending',
  },
  {
    title: 'Valuation & Appraisal Report',
    type: 'Placeholder',
    description: 'Third-party valuation assessment, appraisal methodology, and supporting market comparables.',
    icon: RiBarChartBoxLine,
    status: 'pending',
  },
  {
    title: 'Operating Agreement',
    type: 'Placeholder',
    description: 'SPV operating agreement detailing management, distributions, and investor rights.',
    icon: RiClipboardLine,
    status: 'pending',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const docVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

export default function DocumentReadinessPanel() {
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
        Document readiness
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="vx-copy"
        style={{ marginBottom: 24 }}
      >
        Required documentation for VaultX RWA investment offerings. Documents will be published as they become available.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        {DOCUMENTS.map((doc) => {
          const Icon = doc.icon;
          return (
            <motion.div
              key={doc.title}
              variants={docVariants}
              whileHover={{
                y: -5,
                transition: { type: 'spring', stiffness: 200, damping: 14 },
              }}
              style={{
                padding: 22,
                borderRadius: 20,
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(215,181,109,.1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(215,181,109,.15), transparent)',
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 14,
                    background: 'rgba(215,181,109,.08)',
                    border: '1px solid rgba(215,181,109,.15)',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="var(--gold-2)" />
                </motion.div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{doc.title}</span>
                    <div style={{
                      padding: '3px 10px',
                      borderRadius: 99,
                      background: 'rgba(215,181,109,.1)',
                      border: '1px solid rgba(215,181,109,.2)',
                    }}>
                      <span className="mono" style={{ fontSize: 8, color: 'var(--gold-2)', letterSpacing: '.08em', fontWeight: 700, textTransform: 'uppercase' }}>
                        {doc.type}
                      </span>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                    {doc.description}
                  </p>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                style={{
                  marginTop: 14,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(215,181,109,.1), transparent)',
                  transformOrigin: 'left',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
