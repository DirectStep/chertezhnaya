import { useMemo, useState } from 'react';
import {
  type ServiceKey,
  formatPrice,
  serviceOptions,
  urgencyOptions,
  volumeOptions,
} from '../../data/priceCalculator';
import s from './PriceEstimator.module.css';

type AddonKey = 'crm' | 'design' | 'i18n' | 'priority';

const addonOptions: { key: AddonKey; label: string; multiplier: number }[] = [
  { key: 'crm', label: 'Интеграция с CRM и аналитикой', multiplier: 0.15 },
  { key: 'design', label: 'Уникальный UI-дизайн с нуля', multiplier: 0.2 },
  { key: 'i18n', label: 'Мультиязычность', multiplier: 0.1 },
  { key: 'priority', label: 'Приоритетная поддержка', multiplier: 0.1 },
];

export default function PriceEstimator() {
  const [serviceKey, setServiceKey] = useState<ServiceKey>('dev');
  const [volumeKey, setVolumeKey] = useState(volumeOptions[0].key);
  const [urgencyKey, setUrgencyKey] = useState(urgencyOptions[0].key);
  const [addons, setAddons] = useState<AddonKey[]>([]);

  const service = serviceOptions.find((o) => o.key === serviceKey)!;
  const volume = volumeOptions.find((o) => o.key === volumeKey)!;
  const urgency = urgencyOptions.find((o) => o.key === urgencyKey)!;
  const volumeIndex = volumeOptions.findIndex((o) => o.key === volumeKey);
  const volumeProgress = (volumeIndex / (volumeOptions.length - 1)) * 100;

  const toggleAddon = (key: AddonKey) => {
    setAddons((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const addonMultiplier = useMemo(
    () => addons.reduce((sum, key) => sum + (addonOptions.find((a) => a.key === key)?.multiplier ?? 0), 1),
    [addons],
  );

  const price = useMemo(
    () => service.base * volume.multiplier * urgency.multiplier * addonMultiplier,
    [service, volume, urgency, addonMultiplier],
  );

  return (
    <div className={s.panel}>
      <div className={s.head}>
        <p className={s.eyebrow}>Калькулятор</p>
        <h3 className={s.title}>Соберём проект по слоям</h3>
      </div>

      <label className={s.field}>
        <span>Тип услуги</span>
        <select value={serviceKey} onChange={(e) => setServiceKey(e.target.value as ServiceKey)}>
          {serviceOptions.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      <div className={s.row}>
        <div className={`${s.field} ${s.volumeField}`}>
          <span>Объем проекта</span>
          <div className={s.rangeBox}>
            <input
              type="range"
              className={s.range}
              min="0"
              max={volumeOptions.length - 1}
              step="1"
              value={volumeOptions.findIndex((o) => o.key === volumeKey)}
              onChange={(e) => setVolumeKey(volumeOptions[Number(e.target.value)].key)}
              aria-label="Объем проекта"
              style={{
                background: `linear-gradient(90deg, var(--violet-bright) ${volumeProgress}%, rgba(255, 255, 255, 0.14) ${volumeProgress}%)`,
              }}
            />
            <div className={s.rangeMarks} aria-hidden="true">
              {volumeOptions.map((option, index) => (
                <span key={option.key} className={index <= volumeIndex ? s.rangeMarkActive : ''} />
              ))}
            </div>
          </div>
          <div className={s.rangeLabels} aria-label="Уровень объема проекта">
            {volumeOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                className={`${s.rangeLabel} ${volumeKey === option.key ? s.rangeLabelActive : ''}`}
                onClick={() => setVolumeKey(option.key)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <label className={s.field}>
          <span>Сроки</span>
          <select value={urgencyKey} onChange={(e) => setUrgencyKey(e.target.value)}>
            {urgencyOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={s.addons}>
        <span className={s.addonsLabel}>Дополнительно</span>
        <div className={s.addonsGrid}>
          {addonOptions.map((addon) => {
            const checked = addons.includes(addon.key);
            return (
              <label key={addon.key} className={`${s.addon} ${checked ? s.addonActive : ''}`}>
                <span className={s.checkboxWrap}>
                  <input
                    type="checkbox"
                    className={s.checkboxInput}
                    checked={checked}
                    onChange={() => toggleAddon(addon.key)}
                  />
                  <span className={`${s.checkboxBox} ${checked ? s.checkboxBoxChecked : ''}`} aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
                <span>{addon.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={s.result}>
        <span className={s.resultLabel}>Приблизительно</span>
        <span key={price} className={s.resultValue}>
          от {formatPrice(price)} ₽{service.monthly ? ' / мес' : ''}
        </span>
        <span className={s.resultNote}>
          Расчёт предварительный — точную смету подготовим после обсуждения задачи.
        </span>
      </div>
    </div>
  );
}
