import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RiArrowUpSLine, RiCoinFill, RiBuilding2Fill, RiGlobalFill, RiLineChartFill } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const chartData = [
  { x: 0, y: 20, vol: 12 }, { x: 5, y: 35, vol: 18 }, { x: 10, y: 28, vol: 15 },
  { x: 15, y: 42, vol: 24 }, { x: 20, y: 38, vol: 20 }, { x: 25, y: 55, vol: 32 },
  { x: 30, y: 48, vol: 28 }, { x: 35, y: 62, vol: 36 }, { x: 40, y: 58, vol: 30 },
  { x: 45, y: 72, vol: 42 }, { x: 50, y: 65, vol: 38 }, { x: 55, y: 78, vol: 45 },
  { x: 60, y: 70, vol: 40 }, { x: 65, y: 85, vol: 52 }, { x: 70, y: 82, vol: 48 },
  { x: 75, y: 92, vol: 56 }, { x: 80, y: 88, vol: 50 }, { x: 85, y: 96, vol: 60 },
  { x: 90, y: 90, vol: 54 }, { x: 95, y: 100, vol: 66 },
];

const STATS = [
  { label: 'Presale Allocation', value: '100M VTX', change: '+12.4%', icon: RiCoinFill, color: '#D7B56D' },
  { label: 'Real Asset Pipeline', value: '$284M+', change: '+18.7%', icon: RiBuilding2Fill, color: '#97D9B0' },
  { label: 'Investor Jurisdictions', value: '94', change: '+8.2%', icon: RiGlobalFill, color: '#F5DEB0' },
  { label: 'Target Annual Yield', value: '8–10%', change: '+2.4%', icon: RiLineChartFill, color: '#70B58B' },
];

const W = 720;
const H = 220;
const PAD = { t: 16, r: 50, b: 26, l: 36 };
const MA_PERIOD = 5;

function ma(data, n) {
  return data.map((d, i) => {
    if (i < n - 1) return null;
    const sum = data.slice(i - n + 1, i + 1).reduce((a, b) => a + b.y, 0);
    return { x: d.x, y: sum / n };
  }).filter(Boolean);
}

function scale(data, w, h, pad) {
  const xs = (w - pad.l - pad.r) / 100;
  const ys = (h - pad.t - pad.b) / 100;
  return data.map(d => ({
    x: pad.l + d.x * xs,
    y: pad.t + (100 - d.y) * ys,
    vol: d.vol,
  }));
}

export default function StatsBar() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const maRef = useRef(null);
  const areaRef = useRef(null);
  const volRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef([]);
  const crosshairRef = useRef(null);
  const tooltipRef = useRef(null);
  const svgRef = useRef(null);
  const [hoverVal, setHoverVal] = useState(null);
  const [hoverX, setHoverX] = useState(0);

  const scaled = useMemo(() => scale(chartData, W, H, PAD), []);
  const maData = useMemo(() => {
    const filtered = ma(chartData, MA_PERIOD);
    return scale(filtered.map(d => ({ ...d, vol: 0 })), W, H, PAD);
  }, []);

  const lineD = useMemo(() => scaled.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(' '), [scaled]);
  const maD = useMemo(() => maData.map((d, i) => `${i === 0 ? 'M' : 'L'}${d.x.toFixed(1)},${d.y.toFixed(1)}`).join(' '), [maData]);
  const areaD = useMemo(() => {
    const bottom = H - PAD.b;
    return `${lineD}L${scaled[scaled.length - 1].x.toFixed(1)},${bottom}L${scaled[0].x.toFixed(1)},${bottom}Z`;
  }, [lineD, scaled]);
  const volBars = useMemo(() => {
    const maxVol = Math.max(...chartData.map(d => d.vol));
    return scaled.map((d, i) => {
      const bh = (d.vol / maxVol) * 36;
      const y = H - PAD.b - bh;
      const green = d.y > (i === 0 ? scaled[0].y : scaled[i - 1].y);
      return `<rect x="${d.x - 1.5}" y="${y}" width="3" height="${bh}" rx="1.5" fill="${green ? '#70B58B' : '#E17C7C'}" opacity="0.3"/>`;
    }).join('');
  }, [scaled]);

  const onSvgMove = useCallback((e) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mx = e.clientX - rect.left;
    const svgW = rect.width;
    const dataX = (mx / svgW) * W;
    const closest = scaled.reduce((a, b) => Math.abs(a.x - dataX) < Math.abs(b.x - dataX) ? a : b);
    setHoverVal(closest);
    setHoverX(mx);
  }, [scaled]);

  const onSvgLeave = useCallback(() => setHoverVal(null), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        const len = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0, duration: 2.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
        });
      }
      gsap.fromTo(areaRef.current,
        { opacity: 0 }, { opacity: 1, duration: 1.6, delay: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' } }
      );
      gsap.fromTo(volRef.current,
        { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', toggleActions: 'play none none reverse' } }
      );
      if (maRef.current) {
        gsap.set(maRef.current, { strokeDasharray: maRef.current.getTotalLength(), strokeDashoffset: maRef.current.getTotalLength() });
        gsap.to(maRef.current, {
          strokeDashoffset: 0, duration: 2, delay: 0.3, ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none reverse' },
        });
      }
      gsap.fromTo(statsRef.current.filter(Boolean),
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: 'relative', padding: '48px 0',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-2)', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 30%, rgba(215,181,109,0.04), transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(112,181,139,0.03), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div className="vx-container">
        <div style={{
          borderRadius: 24, background: 'var(--card-solid)',
          border: '1px solid var(--border)', padding: '28px 28px 24px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(215,181,109,0.15), transparent)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div className="mono" style={{ fontSize: 8, color: 'var(--dim)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 2 }}>
                Live market data
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', letterSpacing: '-.03em' }}>$VTX / USD</span>
                <span style={{
                  fontSize: 11, color: 'var(--green-2)', fontWeight: 700,
                  background: 'rgba(112,181,139,0.1)', padding: '2px 10px', borderRadius: 99,
                  border: '1px solid rgba(112,181,139,0.2)',
                  display: 'flex', alignItems: 'center', gap: 2,
                }}>
                  <RiArrowUpSLine size={13} />
                  +24.68%
                </span>
                <span className="mono" style={{ fontSize: 8, color: 'var(--dim)' }}>Vol $142.8M</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, padding: '4px 6px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              {['1H', '1D', '1W', '1M', '1Y', 'All'].map(p => (
                <span key={p} className="mono" style={{
                  fontSize: 8, padding: '4px 9px', borderRadius: 6, cursor: 'pointer',
                  color: p === '1M' ? '#081311' : 'var(--dim)',
                  background: p === '1M' ? 'var(--gold)' : 'transparent',
                  fontWeight: 600, transition: 'all 0.2s',
                }} onMouseEnter={e => { if (p !== '1M') { e.currentTarget.style.background = 'rgba(215,181,109,0.1)'; e.currentTarget.style.color = 'var(--text)'; } }}
                  onMouseLeave={e => { if (p !== '1M') { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--dim)'; } }}>{p}</span>
              ))}
            </div>
          </div>

          <div ref={gridRef} style={{ position: 'relative', transformOrigin: 'left' }}
            onMouseMove={onSvgMove} onMouseLeave={onSvgLeave}>
            <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
              <defs>
                <linearGradient id="areaGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D7B56D" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#D7B56D" stopOpacity="0.01" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3, 4].map(i => {
                const yy = PAD.t + i * ((H - PAD.t - PAD.b) / 4);
                return <line key={`h${i}`} x1={PAD.l} y1={yy} x2={W - PAD.r} y2={yy} stroke="rgba(215,181,109,0.06)" strokeWidth="1" />;
              })}
              {[0, 1, 2, 3].map(i => {
                const xx = PAD.l + i * ((W - PAD.l - PAD.r) / 3);
                return <line key={`v${i}`} x1={xx} y1={PAD.t} x2={xx} y2={H - PAD.b} stroke="rgba(215,181,109,0.06)" strokeWidth="1" />;
              })}
              {[0, 25, 50, 75, 100].map(v => (
                <text key={v} x={W - PAD.r + 6} y={PAD.t + (100 - v) * ((H - PAD.t - PAD.b) / 100) + 3}
                  fill="rgba(245,222,176,0.2)" fontSize="7" fontFamily="IBM Plex Mono, monospace">
                  {v.toFixed(1)}
                </text>
              ))}
              <g ref={volRef} dangerouslySetInnerHTML={{ __html: volBars }} />
              <path ref={areaRef} d={areaD} fill="url(#areaGrad2)" />
              <path ref={maRef} d={maD} fill="none" stroke="rgba(112,181,139,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
              <path ref={lineRef} d={lineD} fill="none" stroke="url(#areaGrad2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: '#D7B56D' }} />
              {scaled.filter((_, i) => i === 0 || i === scaled.length - 1 || i === Math.floor(scaled.length / 2)).map((d, i) => (
                <g key={i}>
                  <circle cx={d.x} cy={d.y} r="3" fill="#D7B56D" />
                  <circle cx={d.x} cy={d.y} r="7" fill="none" stroke="#D7B56D" strokeWidth="1" opacity="0.25" />
                </g>
              ))}
              {hoverVal && (
                <>
                  <line x1={hoverVal.x} y1={PAD.t} x2={hoverVal.x} y2={H - PAD.b}
                    stroke="rgba(215,181,109,0.25)" strokeWidth="1" strokeDasharray="3 2" />
                  <rect x={hoverVal.x + 6} y={hoverVal.y - 12} width={44} height={18} rx={4}
                    fill="rgba(215,181,109,0.15)" stroke="rgba(215,181,109,0.3)" />
                  <text x={hoverVal.x + 10} y={hoverVal.y + 1}
                    fill="var(--gold-2)" fontSize="8" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
                    {(100 - ((hoverVal.y - PAD.t) / ((H - PAD.t - PAD.b) / 100))).toFixed(1)}
                  </text>
                </>
              )}
            </svg>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
            marginTop: 20, position: 'relative',
          }}>
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} ref={el => statsRef.current[i] = el}
                  data-tilt
                  style={{
                    padding: '14px 16px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: 12, cursor: 'default',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${s.color}44`; e.currentTarget.style.boxShadow = `0 0 30px ${s.color}11`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: `${s.color}15`, border: `1px solid ${s.color}25`,
                    display: 'grid', placeItems: 'center',
                  }}>
                    <Icon size={14} color={s.color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 4 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-.02em' }}>{s.value}</span>
                      <span style={{
                        fontSize: 9, fontWeight: 600, color: 'var(--green-2)',
                        display: 'flex', alignItems: 'center', gap: 1,
                        fontFamily: '"IBM Plex Mono", monospace',
                      }}>
                        <RiArrowUpSLine size={12} />
                        {s.change}
                      </span>
                    </div>
                    <div className="mono" style={{ fontSize: 8, color: 'var(--dim)', letterSpacing: '.06em', marginTop: 2 }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){section .vx-container > div > div:last-child{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:560px){section .vx-container > div > div:last-child{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
