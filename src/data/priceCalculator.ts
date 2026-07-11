export type ServiceKey = 'dev' | 'brand' | 'concept' | 'support';

export const serviceOptions: { key: ServiceKey; label: string; base: number; monthly?: boolean }[] = [
  { key: 'dev', label: 'Разработка сайта', base: 30000 },
  { key: 'brand', label: 'Брендинг и фирменный стиль', base: 20000 },
  { key: 'concept', label: 'Формирование концепции', base: 20000 },
  { key: 'support', label: 'Поддержка после запуска', base: 15000, monthly: true },
];

export const volumeOptions = [
  { key: 'small', label: 'Маленький', multiplier: 1 },
  { key: 'medium', label: 'Средний', multiplier: 1.5 },
  { key: 'large', label: 'Крупный', multiplier: 2.2 },
];

export const urgencyOptions = [
  { key: 'standard', label: 'Стандартные сроки', multiplier: 1 },
  { key: 'urgent', label: 'Срочно (+25%)', multiplier: 1.25 },
];

export function formatPrice(value: number) {
  const rounded = Math.round(value / 5000) * 5000;
  return rounded.toLocaleString('ru-RU');
}
