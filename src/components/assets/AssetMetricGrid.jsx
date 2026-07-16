import { useEffect, memo } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { HiTrendingUp, HiOfficeBuilding } from 'react-icons/hi';
import { RiCoinsLine, RiKey2Line } from 'react-icons/ri';

function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => `${Number(v).toFixed(decimals)}${suffix}`);
  const spring = useSpring(count, { stiffness: 80, damping: 18 });

  useEffect(() => {
    spring.set(parseFloat(value));
  }, [value, spring]);

  return <motion.span style={{ fontVariationSettings: "'wght' 800" }}>{rounded}</motion.span>;
}

function AnimatedProgressBar({ value }) {
  const width = useMotionValue(0);
  const spring = useSpring(width, { stiffness: 60, damping: 20 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div style={{ height: 8, borderRadius: 99, background: 'rgba(255,255,255,.06)', overflow: 'hidden', position: 'relative' }}>
      <motion.div
        style={{
          height: '100%',
          borderRadius: 99,
          background: 'linear-gradient(90deg, var(--gold), var(--green))',
          width: useTransform(spring, v => `${v}%`),
          boxShadow: '0 0 20px rgba(215,181,109,.25)',
          willChange: 'width',
        }}
      />
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent)',
          width: useTransform(spring, v => `${v}%`),
          borderRadius: 99,
        }}
      />
    </div>
  );
}

function StatCard({ label, value, suffix, decimals, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 16, mass: 0.8 }}
      whileHover={{ y: -3, scale: 1.02 }}
      style={{
        padding: '18px 16px',
        borderRadius: 18,
        background: 'rgba(255,255,255,.04)',
        border: '1px solid rgba(215,181,109,.1)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(215,181,109,.06), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        {icon}
        <span className="mono" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.12em', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', letterSpacing: '-.03em' }}>
        <AnimatedCounter value={value} suffix={suffix} decimals={decimals} />
      </div>
      <motion.div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(215,181,109,.2), transparent)',
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          willChange: 'transform',
        }}
        whileHover={{ scaleX: 1 }}
      />
    </motion.div>
  );
}

const AssetMetricGrid = memo(function AssetMetricGrid({ apy, occupancy, funded, min }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
      <StatCard label="Target APY" value={apy.replace('%', '')} suffix="%" icon={<HiTrendingUp size={18} color="var(--gold-2)" />} />
      <StatCard label="Occupancy" value={occupancy ? occupancy.replace('%', '') : '94'} suffix="%" icon={<HiOfficeBuilding size={18} color="var(--green-2)" />} />
      <StatCard label="Funding Progress" value={funded.toString()} suffix="%" icon={<RiCoinsLine size={18} color="var(--gold-2)" />} />
      <div style={{ padding: '18px 16px', borderRadius: 18, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(215,181,109,.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <RiKey2Line size={18} color="var(--gold-2)" />
          <span className="mono" style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.12em', textTransform: 'uppercase' }}>Min Participation</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold-2)', letterSpacing: '-.03em' }}>{min}</div>
      </div>
    </div>
  );
});

export default AssetMetricGrid;
export { AnimatedProgressBar };
