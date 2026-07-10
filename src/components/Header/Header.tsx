import { useEffect, useRef, useState } from 'react';
import { navLinks, services } from '../../data/content';
import { ORB_BLOB_D } from '../../data/orbShape';
import MobileMenu from '../MobileMenu/MobileMenu';
import s from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const themedSections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const value = entry.target.getAttribute('data-theme');
            if (value === 'light' || value === 'dark') setTheme(value);
          }
        }
      },
      { rootMargin: '-72px 0px -92% 0px', threshold: 0 },
    );
    themedSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  };

  const themeClass = theme === 'light' ? s.onLight : '';
  const scrolledClass = scrolled ? (theme === 'light' ? s.scrolledLight : s.scrolledDark) : '';

  return (
    <header className={`${s.header} ${themeClass} ${scrolledClass}`}>
      <div className={`container ${s.inner}`}>
        <a href="#top" className={s.logo}>
          <svg className={s.logoMark} viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <radialGradient id="logoOrbBase" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="56%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#14122a" />
              </radialGradient>
              <radialGradient id="logoOrbHighlight" cx="30%" cy="24%" r="48%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path className={s.logoMarkPath} d={ORB_BLOB_D} fill="url(#logoOrbBase)" />
            <path className={s.logoMarkPath} d={ORB_BLOB_D} fill="url(#logoOrbHighlight)" style={{ mixBlendMode: 'screen' }} />
          </svg>
          <span className={s.logoText}>ЧЕРТЁЖНАЯ</span>
        </a>
        <nav className={s.nav} aria-label="Основная навигация">
          <ul className={s.navList}>
            {navLinks.map((link) => {
              const isServices = link.href === '#services';

              return (
                <li key={link.href} className={isServices ? s.navItemServices : undefined}>
                  <a
                    href={link.href}
                    className={`${s.navLink} ${active === link.href ? s.navLinkActive : ''}`}
                    aria-haspopup={isServices ? 'true' : undefined}
                  >
                    {link.label}
                  </a>
                  {isServices && (
                    <div className={s.servicesDropdown}>
                      <div className={s.servicesPanel}>
                        {services.map((service, index) => (
                          <a
                            key={service.title}
                            href="#services"
                            className={`${s.servicePreview} ${s[`servicePreview${(index % 6) + 1}`]}`}
                          >
                            <span className={s.serviceTitle}>{service.title}</span>
                            <span className={s.serviceMeta}>{service.duration}</span>
                            <span className={s.serviceMark} aria-hidden="true" />
                            <span className={s.serviceArrow} aria-hidden="true">
                              →
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <a href="#contact" className={s.cta}>
          Оставить заявку
        </a>
        <button
          ref={burgerRef}
          type="button"
          className={`${s.burger} ${menuOpen ? s.burgerOpen : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}
