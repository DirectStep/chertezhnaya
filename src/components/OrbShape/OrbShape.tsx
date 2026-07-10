import { useId } from 'react';
import { ORB_BLOB_D } from '../../data/orbShape';
import s from './OrbShape.module.css';

export default function OrbShape({ size, className }: { size: number; className?: string }) {
  const uid = useId();
  const baseId = `orbBase-${uid}`;
  const highlightId = `orbHighlight-${uid}`;

  return (
    <svg
      className={`${s.orb} ${className ?? ''}`}
      viewBox="0 0 200 200"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={baseId} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="56%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#14122a" />
        </radialGradient>
        <radialGradient id={highlightId} cx="30%" cy="24%" r="48%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path className={s.orbPath} d={ORB_BLOB_D} fill={`url(#${baseId})`} />
      <path className={s.orbPath} d={ORB_BLOB_D} fill={`url(#${highlightId})`} style={{ mixBlendMode: 'screen' }} />
    </svg>
  );
}
