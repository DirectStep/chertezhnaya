import { contacts } from '../../data/content';
import ContactForm from './ContactForm';
import PriceEstimator from './PriceEstimator';
import s from './ContactSection.module.css';

export default function ContactSection() {
  return (
    <section id="contact" data-theme="dark" className={`section ${s.section}`}>
      <div className="container">
        <div className={s.card}>
          <div className={s.head}>
            <p className="eyebrow">Контакты</p>
            <h2 className={s.title}>Обсудим ваш сайт</h2>
            <p className={s.subtitle}>Расскажите о задаче — предложим подход, сроки и шаги.</p>
          </div>
          <div className={s.inner}>
            <ContactForm />
            <PriceEstimator />
          </div>
          <div className={s.metaStrip}>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Email</span>
              <a href={`mailto:${contacts.email}`} className={s.metaValue}>
                {contacts.email}
              </a>
            </div>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Telegram</span>
              <a
                href={`https://t.me/${contacts.telegram.slice(1)}`}
                target="_blank"
                rel="noreferrer"
                className={s.metaValue}
              >
                {contacts.telegram}
              </a>
            </div>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Часы связи</span>
              <span className={s.metaValue}>{contacts.hours}</span>
            </div>
            <div className={s.metaItem}>
              <span className={s.metaLabel}>Ответ</span>
              <span className={s.metaValue}>В течение рабочего дня</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
