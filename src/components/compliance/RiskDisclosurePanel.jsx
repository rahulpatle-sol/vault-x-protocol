import { motion } from 'framer-motion';
import { RiBarChartBoxLine, RiWaterFlashLine, RiScalesLine, RiShieldCheckLine, RiSettings3Line, RiCrosshairLine } from 'react-icons/ri';

const RISKS = [
  {
    category: 'Market Risk',
    description: 'RWA token values may fluctuate based on underlying asset performance, market conditions, and investor demand. Past performance does not guarantee future results.',
    icon: RiBarChartBoxLine,
    severity: 'high',
  },
  {
    category: 'Liquidity Risk',
    description: 'Secondary market liquidity for tokenized real estate may be limited. Investors should be prepared to hold positions until maturity or a secondary market develops.',
    icon: RiWaterFlashLine,
    severity: 'high',
  },
  {
    category: 'Regulatory Risk',
    description: 'Changes in securities laws, tax treatment, or digital asset regulations may affect the legal status or operational viability of RWA tokenization structures.',
    icon: RiScalesLine,
    severity: 'medium',
  },
  {
    category: 'Smart Contract Risk',
    description: 'While contracts are audited, no software is without risk. Exploits, bugs, or upgrade vulnerabilities could affect token functionality or asset representation.',
    icon: RiShieldCheckLine,
    severity: 'medium',
  },
  {
    category: 'Operational Risk',
    description: 'Property management, SPV administration, and custodial arrangements depend on third-party service providers. Operational failures may impact returns.',
    icon: RiSettings3Line,
    severity: 'low',
  },
  {
    category: 'Concentration Risk',
    description: 'Portfolios may be concentrated in specific geographic regions, property types, or single assets, increasing exposure to localized market downturns.',
    icon: RiCrosshairLine,
    severity: 'low',
  },
];

const severityColors = {
  high: { bg: 'rgba(225,124,124,.12)', border: 'rgba(225,124,124,.25)', text: 'var(--red)' },
  medium: { bg: 'rgba(215,181,109,.12)', border: 'rgba(215,181,109,.25)', text: 'var(--gold-2)' },
  low: { bg: 'rgba(112,181,139,.12)', border: 'rgba(112,181,139,.25)', text: 'var(--green-2)' },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const riskVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 16 },
  },
};

export default function RiskDisclosurePanel() {
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
        Risk disclosure categories
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="vx-copy"
        style={{ marginBottom: 24 }}
      >
        Understanding the risks associated with RWA tokenization is essential before making any investment decision.
      </motion.p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
        {RISKS.map((risk) => {
          const Icon = risk.icon;
          const colors = severityColors[risk.severity];
          return (
            <motion.div
              key={risk.category}
              variants={riskVariants}
              whileHover={{
                y: -4,
                transition: { type: 'spring', stiffness: 200, damping: 14 },
              }}
              style={{
                padding: 22,
                borderRadius: 20,
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(215,181,109,.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 14,
                    background: colors.bg,
                    border: `1px solid ${colors.border}`,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={colors.text} />
                </motion.div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{risk.category}</span>
                    <div style={{
                      padding: '3px 10px',
                      borderRadius: 99,
                      background: colors.bg,
                      border: `1px solid ${colors.border}`,
                    }}>
                      <span className="mono" style={{ fontSize: 8, color: colors.text, letterSpacing: '.08em', fontWeight: 700, textTransform: 'uppercase' }}>
                        {risk.severity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
                {risk.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
