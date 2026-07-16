import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);

  const onMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onMouseOver = useCallback((e) => {
    const target = e.target.closest('a, button, .vx-btn, .card-lift, [data-cursor]');
    if (target && !hoveredRef.current) {
      hoveredRef.current = true;
      gsap.to(cursorRef.current, { scale: 1.8, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
      gsap.to(ringRef.current, { scale: 2.5, opacity: 0.15, duration: 0.3, ease: 'power2.out' });
    } else if (!target && hoveredRef.current) {
      hoveredRef.current = false;
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(ringRef.current, { scale: 1, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver, true);

    const raf = () => {
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

      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver, true);
    };
  }, [onMouseMove, onMouseOver]);

  if (isTouchDevice()) return null;

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--gold-2)',
          pointerEvents: 'none',
          zIndex: 999999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(245,222,176,0.4)',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform',
          transition: 'border-color 0.2s',
        }}
      />
    </>
  );
}
