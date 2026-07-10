import { useEffect, useRef } from 'react';
import { navLinks } from '../../data/content';
import s from './MobileMenu.module.css';

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    ref.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      className={s.menu}
      role="dialog"
      aria-modal="true"
      aria-label="Меню"
    >
      <nav aria-label="Мобильная навигация">
        <ul className={s.list}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={s.link} onClick={onClose}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <a href="#contact" className="btn btnPrimary" onClick={onClose}>
        Обсудить проект
      </a>
    </div>
  );
}
