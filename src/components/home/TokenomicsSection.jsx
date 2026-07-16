import { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiCoinFill, RiFundsFill, RiTeamFill, RiWaterFlashFill, RiSafe2Fill, RiArrowRightUpLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const SEGMENTS = [
  { label: 'Property Reserve', pct: 35, color: '#D7B56D', desc: 'Backing for tokenized real estate assets', icon: RiCoinFill },
  { label: 'Public Presale', pct: 20, color: '#70B58B', desc: 'Initial DEX offering and public allocation', icon: RiFundsFill },
  { label: 'Ecosystem Incentives', pct: 20, color: '#97D9B0', desc: 'Staking rewards, liquidity mining, community', icon: RiTeamFill },
  { label: 'Treasury & Liquidity', pct: 15, color: '#F5DEB0', desc: 'DEX pools, market making, protocol reserves', icon: RiWaterFlashFill },
  { label: 'Operations Reserve', pct: 10, color: '#C9A84C', desc: 'Development, legal, and operational runway', icon: RiSafe2Fill },
];

const TOTAL = 100;
const CX = 140;
const CY = 140;
const R = 110;
const INNER = 62;

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function donutSegment(startDeg, endDeg, color, i) {
  const outer = arcPath(CX, CY, R, startDeg, endDeg);
  const inner = arcPath(CX, CY, INNER, startDeg, endDeg);
  const sInner = polar(CX, CY, INNER, startDeg);
  const eInner = polar(CX, CY, INNER, endDeg);
  return `M ${polar(CX, CY, R, startDeg).x} ${polar(CX, CY, R, startDeg).y} ${outer.slice(1)} L ${eInner.x} ${eInner.y} ${inner.slice(1)} Z`;
}

export default function TokenomicsSection() {
  const sectionRef = useRef(null);
  const chartRef = useRef(null);
  const legendRef = useRef([]);

  const segments = useMemo(() => {
    let deg = 0;
    return SEGMENTS.map((s, i) => {
      const pct = s.pct / TOTAL * 360;
      const seg = { ...s, startDeg: deg, endDeg: deg + pct, path: donutSegment(deg, deg + pct, s.color, i) };
      const midDeg = deg + pct / 2;
      const labelR = R + 22;
      const lp = polar(CX, CY, labelR, midDeg);
      seg.labelX = lp.x;
      seg.labelY = lp.y;
      deg += pct;
      return seg;
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = chartRef.current?.querySelectorAll('.seg-path');
      if (paths?.length) {
        gsap.fromTo(paths,
          { opacity: 0, scale: 0.8, transformOrigin: 'center' },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      gsap.fromTo(legendRef.current.filter(Boolean),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo('.tok-info-card, .tok-disclaimer',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="vx-section-soft">
      <div className="vx-container">
        <div style={{ marginBottom: 36 }}>
          <div className="vx-eyebrow">Token architecture</div>
          <h2 className="vx-title" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            VTX token distribution
          </h2>
          <p className="vx-copy" style={{ maxWidth: 500, marginTop: 10 }}>
            A transparent allocation model designed for long-term protocol sustainability, community alignment, and real-world asset backing.
          </p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
          alignItems: 'center',
        }}>
          <div ref={chartRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <svg width="280" height="280" viewBox="0 0 280 280">
              <defs>
                {SEGMENTS.map((s, i) => (
                  <filter key={i} id={`glow-${i}`}>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                ))}
              </defs>
              {segments.map((s, i) => (
                <g key={i}>
                  <path d={s.path} fill={s.color} opacity="0.9" className="seg-path" filter={`url(#glow-${i})`} />
                  <path d={s.path} fill="none" stroke={s.color} strokeWidth="0.5" opacity="0.3" />
                </g>
              ))}
              <circle cx={CX} cy={CY} r={INNER - 2} fill="var(--card-solid)" />
              <text x={CX} y={CY - 8} textAnchor="middle" fill="var(--gold-2)" fontSize="22" fontWeight="800" fontFamily="Manrope, sans-serif">1B</text>
              <text x={CX} y={CY + 12} textAnchor="middle" fill="var(--dim)" fontSize="8" fontFamily="IBM Plex Mono, monospace" letterSpacing=".1em">TOTAL SUPPLY</text>
              {segments.map((s, i) => (
                <text key={`l${i}`} x={s.labelX} y={s.labelY + 3}
                  textAnchor={s.labelX > CX ? 'start' : 'end'}
                  fill={s.color} fontSize="8" fontFamily="IBM Plex Mono, monospace" fontWeight="600"
                  className="seg-path">
                  {s.pct}%
                </text>
              ))}
            </svg>
          </div>

          <div>
            <div className="tok-info-card" style={{
              padding: 24, borderRadius: 20,
              background: 'var(--card)', border: '1px solid var(--border)',
              marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: segments[0].color, boxShadow: `0 0 10px ${segments[0].color}` }} />
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-.02em' }}>{segments[0].label}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--gold-2)', fontWeight: 600 }}>{segments[0].pct}%</span>
              </div>
              <p className="vx-copy" style={{ fontSize: 14, margin: 0 }}>{segments[0].desc}</p>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {segments.slice(1).map((s, i) => (
                <div key={s.label} ref={el => legendRef.current[i] = el}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border)',
                    cursor: 'default',
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.background = `${s.color}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: `${s.color}18`, border: `1px solid ${s.color}33`,
                    display: 'grid', placeItems: 'center',
                  }}>
                    <s.icon size={12} color={s.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.label}</span>
                      <span className="mono" style={{ fontSize: 10, color: s.color, fontWeight: 600 }}>{s.pct}%</span>
                    </div>
                    <div className="mono" style={{ fontSize: 8, color: 'var(--dim)', marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="tok-disclaimer" style={{
              marginTop: 20, padding: '14px 18px', borderRadius: 14,
              background: 'rgba(215,181,109,0.04)',
              border: '1px solid rgba(215,181,109,0.12)',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <RiArrowRightUpLine size={14} color="var(--gold-2)" style={{ flexShrink: 0, marginTop: 1 }} />
              <div className="mono" style={{ fontSize: 9, color: 'var(--muted)', lineHeight: 1.7 }}>
                Token allocations shown are based on the current protocol design. Final values will match deployed smart contract parameters and legal documentation at launch.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:960px){
          section .vx-container > div:last-child { grid-template-columns: 1fr !important; gap: 28px; }
          section .vx-container > div:last-child > div:first-child { order: -1; }
        }
      `}</style>
    </section>
  );
}
