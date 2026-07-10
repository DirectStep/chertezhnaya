import { useEffect, useRef, useState } from 'react';
import { ORB_BLOB_D } from '../../data/orbShape';
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
