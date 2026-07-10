import { useEffect, useRef, useState } from 'react';
import PriceCalculator from './PriceCalculator';
import s from './HeroArtwork.module.css';

type OrbitDot = {
  id: string;
  top: string;
  left: string;
  color: string;
  size: number;
  label: string;
  kind: 'calc' | 'link';
  href?: string;
};

const outerDots: OrbitDot[] = [
  { id: 'calc', top: '0.5%', left: '50%', color: '#a855f7', size: 22, label: 'Калькулятор', kind: 'calc' },
  { id: 'apply', top: '63.75%', left: '98.59%', color: '#38bdf8', size: 16, label: 'Заявка', kind: 'link', href: '#contact' },
  { id: 'works', top: '78.4%', left: '9.44%', color: '#eab308', size: 16, label: 'Кейсы', kind: 'link', href: '#works' },
];

const ACTIVATION_RADIUS = 220;
const MAX_SCALE = 2.125;

const ORB_BLOB_D =
  'M 186.95 100.00 C 185.10 110.21 174.43 119.86 168.42 128.34 C 162.41 136.82 157.49 144.00 150.90 150.90 C 144.31 157.80 137.37 165.30 128.89 169.74 C 120.41 174.19 110.27 176.02 100.00 177.56 C 89.73 179.10 77.26 181.94 67.28 178.99 C 57.31 176.04 45.46 168.56 40.15 159.85 C 34.84 151.14 36.94 136.73 35.41 126.75 C 33.88 116.78 32.81 109.69 30.95 100.00 C 29.10 90.31 22.69 78.54 24.29 68.64 C 25.90 58.74 33.11 47.76 40.59 40.59 C 48.07 33.42 59.29 28.79 69.19 25.62 C 79.09 22.45 90.37 20.02 100.00 21.56 C 109.63 23.10 118.57 30.20 126.98 34.86 C 135.39 39.53 141.70 44.18 150.46 49.54 C 159.22 54.91 173.45 58.65 179.54 67.05 C 185.62 75.46 188.81 89.79 186.95 100.00 Z';

export default function HeroArtwork() {
  const [calcOpen, setCalcOpen] = useState(false);
  const dotRefs = useRef<HTMLSpanElement[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      const { x, y } = mouseRef.current;
      for (const el of dotRefs.current) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(x - cx, y - cy);
        const proximity = Math.max(0, 1 - dist / ACTIVATION_RADIUS);
        const scale = 1 + proximity * (MAX_SCALE - 1);
        el.style.transform = `scale(${scale})`;
        el.style.boxShadow = proximity > 0 ? `0 0 ${16 * proximity}px currentColor` : '';
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const setDotRef = (el: HTMLSpanElement | null) => {
    if (el && !dotRefs.current.includes(el)) dotRefs.current.push(el);
  };

  return (
    <div className={s.scene}>
      <div className={s.glowViolet} aria-hidden="true" />
      <div className={s.glowCyan} aria-hidden="true" />

      <svg className={s.ringOuter} viewBox="0 0 480 480" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="heroRingGrad" x1="0" y1="0" x2="480" y2="480" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <circle cx="240" cy="240" r="237.6" stroke="url(#heroRingGrad)" strokeWidth="1.5" strokeDasharray="3 12" />
      </svg>

      <svg className={s.ringInner} viewBox="0 0 480 480" fill="none" aria-hidden="true">
        <circle
          cx="240"
          cy="240"
          r="168"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
          strokeDasharray="1 9"
        />
      </svg>

      <svg className={s.orb} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <radialGradient id="orbBase" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="56%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#14122a" />
          </radialGradient>
          <radialGradient id="orbCyan" cx="72%" cy="20%" r="42%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbViolet" cx="24%" cy="82%" r="46%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbHighlight" cx="30%" cy="24%" r="45%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className={s.orbPath} d={ORB_BLOB_D} fill="url(#orbBase)" />
        <path className={s.orbPath} d={ORB_BLOB_D} fill="url(#orbCyan)" style={{ mixBlendMode: 'screen' }} />
        <path className={s.orbPath} d={ORB_BLOB_D} fill="url(#orbViolet)" style={{ mixBlendMode: 'screen' }} />
        <path className={s.orbPath} d={ORB_BLOB_D} fill="url(#orbHighlight)" style={{ mixBlendMode: 'screen' }} />
      </svg>
      <div className={s.shadow} aria-hidden="true" />

      <div className={s.orbitOuter}>
        {outerDots.map((dot) => (
          <div key={dot.id} className={s.orbitDotWrap} style={{ top: dot.top, left: dot.left }}>
            <div className={s.orbitCounterOuter}>
              {dot.kind === 'calc' ? (
                <button
                  type="button"
                  className={s.dotHit}
                  onClick={() => setCalcOpen((v) => !v)}
                  aria-expanded={calcOpen}
                  aria-label="Открыть калькулятор стоимости"
                >
                  <span
                    ref={setDotRef}
                    className={s.dotVisual}
                    style={{ background: dot.color, width: dot.size, height: dot.size, color: dot.color }}
                  />
                  <span className={s.pill}>{dot.label}</span>
                </button>
              ) : (
                <a href={dot.href} className={s.dotHit}>
                  <span
                    ref={setDotRef}
                    className={s.dotVisual}
                    style={{ background: dot.color, width: dot.size, height: dot.size, color: dot.color }}
                  />
                  <span className={s.pill}>{dot.label}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {calcOpen && <PriceCalculator onClose={() => setCalcOpen(false)} />}
    </div>
  );
}
