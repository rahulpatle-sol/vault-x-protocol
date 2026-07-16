import { useCallback, useRef } from 'react';

const COLORS = ['#D7B56D', '#F5DEB0', '#70B58B', '#97D9B0', '#C9A84C', '#fff'];
const PARTICLE_COUNT = 16;

export default function usePixelBurst(containerRef) {
  const particlesRef = useRef(null);

  const burst = useCallback((x, y) => {
    const container = containerRef.current;
    if (!container) return;

    if (!particlesRef.current) {
      particlesRef.current = document.createElement('div');
      particlesRef.current.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;overflow:hidden;';
      document.body.appendChild(particlesRef.current);
    }

    const frag = document.createDocumentFragment();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement('div');
      const size = 3 + Math.random() * 5;
      const angle = Math.random() * Math.PI * 2;
      const dist = 30 + Math.random() * 70;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      p.style.cssText = `
        position:fixed;
        left:${x}px;top:${y}px;
        width:${size}px;height:${size}px;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        background:${color};
        box-shadow:0 0 ${2 + Math.random() * 4}px ${color};
        pointer-events:none;
        will-change:transform,opacity;
        animation:vxParticleFly ${0.5 + Math.random() * 0.4}s ease-out forwards;
        --dx:${dx}px;--dy:${dy}px;
      `;
      frag.appendChild(p);
    }
    particlesRef.current.appendChild(frag);

    setTimeout(() => {
      if (particlesRef.current) particlesRef.current.innerHTML = '';
    }, 1200);
  }, [containerRef]);

  return burst;
}
