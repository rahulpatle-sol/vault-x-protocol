import { motion } from 'framer-motion';
import ComplianceHero from '../../components/compliance/ComplianceHero';
import InvestorAccessSteps from '../../components/compliance/InvestorAccessSteps';
import JurisdictionNoticePanel from '../../components/compliance/JurisdictionNoticePanel';
import RiskDisclosurePanel from '../../components/compliance/RiskDisclosurePanel';
import DocumentReadinessPanel from '../../components/compliance/DocumentReadinessPanel';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

function Section({ children, className, style, ...props }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={sectionVariants}
      className={className}
      style={style}
      {...props}
    >
      <div className="vx-container">
        {children}
      </div>
    </motion.section>
  );
}

export default function CompliancePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ComplianceHero />

      <Section className="vx-section" style={{ paddingTop: 40 }}>
        <InvestorAccessSteps />
      </Section>

      <Section className="vx-section-soft">
        <JurisdictionNoticePanel />
      </Section>

      <Section className="vx-section">
        <RiskDisclosurePanel />
      </Section>

      <Section className="vx-section-soft" style={{ marginBottom: 0 }}>
        <DocumentReadinessPanel />
      </Section>
    </div>
  );
}
