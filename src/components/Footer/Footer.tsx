import { contacts, navLinks } from '../../data/content';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.brand}>
          <span className={s.logo}>ЧЕРТЁЖНАЯ</span>
          <span className={s.copy}>© {new Date().getFullYear()}</span>
        </div>
        <nav aria-label="Навигация в подвале">
          <ul className={s.nav}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={s.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.contacts}>
          <a href={`mailto:${contacts.email}`} className={s.link}>
            {contacts.email}
          </a>
          <a
            href={`https://t.me/${contacts.telegram.slice(1)}`}
            target="_blank"
            rel="noreferrer"
            className={s.link}
          >
            {contacts.telegram}
          </a>
        </div>
        <nav className={s.legal} aria-label="Документы сайта">
          <a href="#/details" className={s.policy}>
            Реквизиты ООО «ЧЕРТЁЖНАЯ»
          </a>
          <a href="#/privacy" className={s.policy}>
            Политика конфиденциальности и обработки ПДн
          </a>
          <a href="#/consent" className={s.policy}>
            Согласие на обработку персональных данных
          </a>
        </nav>
      </div>
    </footer>
  );
}
