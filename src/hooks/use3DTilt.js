import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function use3DTilt() {
  const hoveredRef = useRef(null);

  useEffect(() => {
    const onEnter = (e) => {
      const card = e.currentTarget;
      hoveredRef.current = card;
    };

    const onMove = (e) => {
      const card = hoveredRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const rx = dy * -8;
      const ry = dx * 8;

      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = (e) => {
      const card = e.currentTarget;
      hoveredRef.current = null;
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(c => {
      c.addEventListener('mouseenter', onEnter);
      c.addEventListener('mousemove', onMove);
      c.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cards.forEach(c => {
        c.removeEventListener('mouseenter', onEnter);
        c.removeEventListener('mousemove', onMove);
        c.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
