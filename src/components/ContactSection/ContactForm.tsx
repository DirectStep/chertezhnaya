import { useState } from 'react';
import { budgetOptions } from '../../data/content';
import s from './ContactSection.module.css';

type LeadData = {
  name: string;
  contact: string;
  message: string;
  budget: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof LeadData, string>>;

const emptyLead: LeadData = {
  name: '',
  contact: '',
  message: '',
  budget: '',
  consent: false,
};

function validate(data: LeadData): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2) {
    errors.name = 'Введите имя';
  }
  const contact = data.contact.trim();
  const phoneOk = /^\+?[\d\s()-]{7,}$/.test(contact);
  const telegramOk = /^@?[a-zA-Z0-9_]{4,}$/.test(contact);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  if (!contact) {
    errors.contact = 'Укажите Telegram, телефон или почту';
  } else if (!phoneOk && !telegramOk && !emailOk) {
    errors.contact = 'Похоже на опечатку — проверьте контакт';
  }
  if (data.message.trim().length < 10) {
    errors.message = 'Расскажите о задаче хотя бы в паре предложений';
  }
  if (!data.consent) {
    errors.consent = 'Нужно согласие на обработку данных';
  }
  return errors;
}

const WEB3FORMS_ACCESS_KEY = '114bdbf5-61cd-4c16-b6f9-7d54a1a7c4b7';

async function submitLead(data: LeadData): Promise<boolean> {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Новая заявка с сайта ЧЕРТЁЖНАЯ',
        name: data.name,
        contact: data.contact,
        budget: data.budget || 'Не указан',
        message: data.message,
      }),
    });
    const result = await res.json();
    return Boolean(result.success);
  } catch {
    return false;
  }
}

export default function ContactForm() {
  const [data, setData] = useState<LeadData>(emptyLead);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = <K extends keyof LeadData>(key: K, value: LeadData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setStatus('submitting');
    const ok = await submitLead(data);
    setStatus(ok ? 'success' : 'error');
  };

  if (status === 'success') {
    return (
      <div className={s.success} role="status">
        <h3 className={s.successTitle}>Заявка отправлена</h3>
        <p className={s.successText}>
          Спасибо! Мы изучим задачу и вернёмся с ответом в течение рабочего дня.
        </p>
        <button
          type="button"
          className="btn btnGhost"
          onClick={() => {
            setData(emptyLead);
            setStatus('idle');
          }}
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <div className={s.row}>
        <div className={s.field}>
          <label htmlFor="lead-name">Имя</label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            value={data.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
          />
          {errors.name && (
            <p id="lead-name-error" className={s.error}>
              {errors.name}
            </p>
          )}
        </div>

        <div className={s.field}>
          <label htmlFor="lead-contact">Telegram, телефон или почта</label>
          <input
            id="lead-contact"
            type="text"
            autoComplete="tel"
            placeholder="@nickname, +7 900 000-00-00 или email"
            value={data.contact}
            onChange={(e) => set('contact', e.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'lead-contact-error' : undefined}
          />
          {errors.contact && (
            <p id="lead-contact-error" className={s.error}>
              {errors.contact}
            </p>
          )}
        </div>
      </div>

      <div className={s.field}>
        <label htmlFor="lead-message">Кратко о задаче</label>
        <textarea
          id="lead-message"
          rows={2}
          value={data.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'lead-message-error' : undefined}
        />
        {errors.message && (
          <p id="lead-message-error" className={s.error}>
            {errors.message}
          </p>
        )}
      </div>

      <div className={s.field}>
        <span>Бюджет</span>
        <div className={s.chips} role="group" aria-label="Бюджет">
          {budgetOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`${s.chip} ${data.budget === option ? s.chipActive : ''}`}
              onClick={() => set('budget', data.budget === option ? '' : option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={s.footer}>
        <label className={s.consent} htmlFor="lead-consent">
          <span className={s.checkboxWrap}>
            <input
              id="lead-consent"
              type="checkbox"
              className={s.checkboxInput}
              checked={data.consent}
              onChange={(e) => set('consent', e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? 'lead-consent-error' : undefined}
            />
            <span className={`${s.checkboxBox} ${data.consent ? s.checkboxBoxChecked : ''}`} aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6.5 12L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span>
            Даю согласие на обработку персональных данных и ознакомлен(а) с{' '}
            <a href="#/privacy" className={s.consentLink} onClick={(e) => e.stopPropagation()}>
              Политикой конфиденциальности и обработки персональных данных
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          className={`btn btnPrimary ${s.submit}`}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
        </button>
      </div>
      {errors.consent && (
        <p id="lead-consent-error" className={s.error}>
          {errors.consent}
        </p>
      )}
      {status === 'error' && (
        <p className={s.error} role="alert">
          Не получилось отправить заявку. Попробуйте ещё раз или напишите нам напрямую в Telegram.
        </p>
      )}
    </form>
  );
}
