import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

const COLORS = ['#D7B56D', '#F5DEB0', '#70B58B', '#97D9B0', '#C9A84C', '#fff'];

function spawnParticles(x, y) {
  const container = document.getElementById('vx-particle-layer');
  if (!container) return;
  const count = 10 + Math.random() * 8;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = 2 + Math.random() * 4;
    const angle = Math.random() * Math.PI * 2;
    const dist = 20 + Math.random() * 60;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    p.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;
      width:${size}px;height:${size}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      background:${color};
      box-shadow:0 0 ${2 + Math.random() * 4}px ${color};
      pointer-events:none;z-index:999997;
      will-change:transform,opacity;
      animation:vxParticleFly ${0.4 + Math.random() * 0.4}s ease-out forwards;
      --dx:${dx}px;--dy:${dy}px;
    `;
    frag.appendChild(p);
  }
  container.appendChild(frag);
  setTimeout(() => {
    if (container) container.innerHTML = '';
  }, 1000);
}

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const trailRef = useRef([]);
  const rafRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseOver = useCallback((e) => {
    const target = e.target.closest('a, button, .vx-btn, .card-lift, .vx-card, .vx-card-strong, [data-cursor]');
    if (target && !hoveredRef.current) {
      hoveredRef.current = true;
      gsap.to(cursorRef.current, { scale: 2.2, opacity: 0.3, duration: 0.25, ease: 'power2.out' });
      gsap.to(ringRef.current, { scale: 3, opacity: 0.2, borderColor: 'rgba(215,181,109,0.6)', duration: 0.25, ease: 'power2.out' });
      gsap.to(glowRef.current, { scale: 4, opacity: 0.25, duration: 0.3, ease: 'power2.out' });
      const rect = target.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else if (!target && hoveredRef.current) {
      hoveredRef.current = false;
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(ringRef.current, { scale: 1, opacity: 0.4, borderColor: 'rgba(245,222,176,0.4)', duration: 0.25, ease: 'power2.out' });
      gsap.to(glowRef.current, { scale: 1, opacity: 0.12, duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  const onClick = useCallback((e) => {
    spawnParticles(e.clientX, e.clientY);
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver, true);
    document.addEventListener('click', onClick);

    const layer = document.createElement('div');
    layer.id = 'vx-particle-layer';
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999997;overflow:hidden;';
    document.body.appendChild(layer);

    const tick = () => {
      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      posRef.current.x += dx * 0.12;
      posRef.current.y += dy * 0.12;

      gsap.set(cursorRef.current, {
        x: mouseRef.current.x - 4,
        y: mouseRef.current.y - 4,
      });
      gsap.set(ringRef.current, {
        x: posRef.current.x - 18,
        y: posRef.current.y - 18,
      });
      gsap.set(glowRef.current, {
        x: posRef.current.x - 60,
        y: posRef.current.y - 60,
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver, true);
      document.removeEventListener('click', onClick);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    };
  }, [onMouseMove, onMouseOver, onClick]);

  if (isTouchDevice()) return null;

  return (
    <>
      <div
        ref={glowRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 120, height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(215,181,109,0.15), transparent 70%)',
          pointerEvents: 'none', zIndex: 999996,
          willChange: 'transform', opacity: 0.12,
        }}
      />
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'var(--gold-2)',
          pointerEvents: 'none', zIndex: 999999,
          mixBlendMode: 'difference',
          willChange: 'transform',
          boxShadow: '0 0 10px rgba(215,181,109,0.5)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(245,222,176,0.4)',
          pointerEvents: 'none', zIndex: 999998,
          willChange: 'transform',
          transition: 'border-color 0.2s',
          boxShadow: 'inset 0 0 20px rgba(215,181,109,0.05)',
        }}
      />
    </>
  );
}
