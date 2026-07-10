import { useMemo, useState } from 'react';
import { type ServiceKey, formatPrice, serviceOptions, urgencyOptions, volumeOptions } from '../../data/priceCalculator';
import s from './PriceCalculator.module.css';

export default function PriceCalculator({ onClose }: { onClose: () => void }) {
  const [serviceKey, setServiceKey] = useState<ServiceKey>('dev');
  const [volumeKey, setVolumeKey] = useState(volumeOptions[0].key);
  const [urgencyKey, setUrgencyKey] = useState(urgencyOptions[0].key);

  const service = serviceOptions.find((o) => o.key === serviceKey)!;
  const volume = volumeOptions.find((o) => o.key === volumeKey)!;
  const urgency = urgencyOptions.find((o) => o.key === urgencyKey)!;

  const price = useMemo(
    () => service.base * volume.multiplier * urgency.multiplier,
    [service, volume, urgency],
  );

  return (
    <div className={s.overlay} role="dialog" aria-label="Калькулятор стоимости">
      <div className={s.panel}>
        <div className={s.header}>
          <span className={s.title}>Калькулятор стоимости</span>
          <button type="button" className={s.close} onClick={onClose} aria-label="Закрыть калькулятор">
            ×
          </button>
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

        <div className={s.result}>
          <span className={s.resultLabel}>Приблизительно</span>
          <span className={s.resultValue}>
            от {formatPrice(price)} ₽{service.monthly ? ' / мес' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
