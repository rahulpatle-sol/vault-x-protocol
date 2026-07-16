import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { RiCheckFill, RiTimeLine, RiFlashlightFill } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    phase: 'Phase 1', title: 'Frontend cleanup',
    items: ['Professional navigation redesign', 'Brand logo refinement', 'Hero and card refresh'],
    done: true, desc: 'Foundation layer — establishing visual identity and core UX patterns.',
    stat: 'Q1 2026',
  },
  {
    phase: 'Phase 2', title: 'Asset presentation',
    items: ['Outside property imagery', 'Gallery consistency', 'Clearer image sections'],
    done: true, desc: 'Visual storytelling — bringing real-world assets to the forefront.',
    stat: 'Q2 2026',
  },
  {
    phase: 'Phase 3', title: 'Investor UX',
    items: ['Presale credibility pass', 'Dashboard language', 'Staking/swap styling polish'],
    active: true, desc: 'Trust layer — building investor confidence through premium interaction design.',
    stat: 'Q3 2026',
  },
  {
    phase: 'Phase 4', title: 'Production prep',
    items: ['Content review', 'Real data binding', 'QA across routes'],
    desc: 'Launch readiness — hardening the platform for mainnet deployment.',
    stat: 'Q4 2026',
  },
  {
    phase: 'Phase 5', title: 'Ecosystem expansion',
    items: ['Cross-chain bridging', 'DAO governance UI', 'Advanced analytics dashboard'],
    desc: 'Scaling the protocol with community-driven features and multi-chain support.',
    stat: '2027+',
  },
];

export default function RoadmapSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const autoStarted = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current?.children || [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (swiper && !autoStarted.current) {
            autoStarted.current = true;
            swiper.params.autoplay.delay = 2500;
            swiper.autoplay.start();
          }
        },
        onLeave: () => {
          if (swiper) swiper.autoplay.stop();
        },
        onEnterBack: () => {
          if (swiper) swiper.autoplay.start();
        },
        onLeaveBack: () => {
          if (swiper) swiper.autoplay.stop();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [swiper]);

  return (
    <section ref={sectionRef} className="vx-section-soft" style={{ overflow: 'hidden' }}>
      <div className="vx-container">
        <div ref={headerRef} style={{ marginBottom: 48 }}>
          <div className="vx-eyebrow" style={{ marginBottom: 12 }}>Development roadmap</div>
          <h2 className="vx-title" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            From vision to reality
          </h2>
          <p className="vx-copy" style={{ maxWidth: 520, marginTop: 12 }}>
            Five phases of protocol evolution — each milestone brings us closer to a fully decentralized RWA capital market.
          </p>
        </div>

        <Swiper
          onSwiper={setSwiper}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.2,
            slideShadows: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, EffectCoverflow, Pagination]}
          autoplay={false}
          speed={700}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          style={{ padding: '20px 0 50px' }}
        >
          {PHASES.map((p, i) => (
            <SwiperSlide key={p.phase} style={{ maxWidth: 380, height: 'auto' }}>
              {({ isActive }) => (
                <div
                  data-tilt
                  style={{
                    padding: 28,
                    borderRadius: 24,
                    minHeight: 320,
                    position: 'relative',
                    overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    background: isActive
                      ? 'linear-gradient(145deg, rgba(20,38,32,0.95), rgba(13,26,23,0.98))'
                      : 'var(--card-solid)',
                    border: isActive
                      ? '1.5px solid rgba(215,181,109,0.3)'
                      : '1px solid var(--border)',
                    boxShadow: isActive
                      ? '0 24px 80px rgba(215,181,109,0.12), inset 0 1px 0 rgba(215,181,109,0.08)'
                      : 'var(--shadow-md)',
                    transition: 'all 0.4s var(--ease-smooth)',
                  }}
                >
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: 'linear-gradient(90deg, transparent, var(--gold), var(--green), transparent)',
                      boxShadow: '0 0 20px rgba(215,181,109,0.3)',
                    }} />
                  )}

                  {isActive && (
                    <div style={{
                      position: 'absolute', top: -60, right: -60, width: 200, height: 200,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(215,181,109,0.06), transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span className="mono" style={{
                      fontSize: 9, fontWeight: 700,
                      color: p.done ? 'var(--green-2)' : p.active ? 'var(--gold-2)' : 'var(--dim)',
                      letterSpacing: '.16em', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      {p.done && <RiCheckFill size={12} />}
                      {p.active && <RiFlashlightFill size={12} />}
                      {!p.done && !p.active && <RiTimeLine size={12} />}
                      {p.phase}
                    </span>
                    <span className="mono" style={{
                      fontSize: 8, color: 'var(--dim)', letterSpacing: '.1em',
                      padding: '3px 10px', borderRadius: 99,
                      background: isActive ? 'rgba(215,181,109,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? 'rgba(215,181,109,0.2)' : 'var(--border)'}`,
                    }}>
                      {p.stat}
                    </span>
                  </div>

                  <h3 style={{
                    margin: 0, fontSize: 20, fontWeight: 700,
                    lineHeight: 1.1, letterSpacing: '-.03em',
                    color: isActive ? 'var(--gold-2)' : 'var(--text)',
                    transition: 'color 0.3s',
                  }}>
                    {p.title}
                  </h3>

                  <p className="vx-copy" style={{
                    fontSize: 13, marginTop: 8, marginBottom: 18,
                    color: isActive ? 'var(--muted)' : 'var(--dim)',
                  }}>
                    {p.desc}
                  </p>

                  <div style={{
                    height: 1, background: 'linear-gradient(90deg, var(--border), transparent)',
                    marginBottom: 16,
                  }} />

                  <div style={{ display: 'grid', gap: 10 }}>
                    {p.items.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                        <div style={{
                          marginTop: 6, width: 6, height: 6, borderRadius: 99,
                          background: p.done ? 'var(--green-2)' : p.active ? 'var(--gold)' : 'var(--dim)',
                          boxShadow: p.done ? '0 0 8px rgba(112,181,139,0.4)' : p.active ? '0 0 8px rgba(215,181,109,0.4)' : 'none',
                          flexShrink: 0,
                        }} />
                        <span className="vx-copy" style={{
                          fontSize: 14, lineHeight: 1.5,
                          color: p.done ? 'var(--muted)' : p.active ? 'var(--text)' : 'var(--dim)',
                        }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {p.active && (
                    <div style={{
                      marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
                      fontFamily: '"IBM Plex Mono", monospace', fontSize: 9,
                      color: 'var(--gold-2)', letterSpacing: '.08em',
                    }}>
                      <RiFlashlightFill size={10} />
                      In progress
                    </div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: var(--gold) !important;
          opacity: 0.3 !important;
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: linear-gradient(90deg, var(--gold), var(--green)) !important;
          width: 24px !important;
          border-radius: 99px !important;
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
        .swiper-slide {
          transition: opacity 0.4s var(--ease-smooth) !important;
        }
        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.5;
        }
        @media(max-width:640px) {
          .swiper-slide { max-width: 300px !important; }
          .swiper-slide:not(.swiper-slide-active) { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
