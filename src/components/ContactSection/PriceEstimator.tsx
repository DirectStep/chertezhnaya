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
        <h3 className={s.title}>Прикиньте бюджет</h3>
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
        <label className={s.field}>
          <span>Объем проекта</span>
          <select value={volumeKey} onChange={(e) => setVolumeKey(e.target.value)}>
            {volumeOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

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
              <label key={addon.key} className={s.addon}>
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
        <span className={s.resultValue}>
          от {formatPrice(price)} ₽{service.monthly ? ' / мес' : ''}
        </span>
      </div>
    </div>
  );
}
