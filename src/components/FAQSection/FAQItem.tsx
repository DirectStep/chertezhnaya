import type { FAQItemData } from '../../data/content';
import s from './FAQSection.module.css';

type Props = {
  item: FAQItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FAQItem({ item, index, isOpen, onToggle }: Props) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className={s.item}>
      <h3 className={s.question}>
        <button
          type="button"
          id={buttonId}
          className={s.trigger}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className={s.qNum} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={s.qText}>{item.question}</span>
          <span className={`${s.icon} ${isOpen ? s.iconOpen : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`${s.panel} ${isOpen ? s.panelOpen : ''}`}
      >
        <div className={s.panelInner}>
          <p className={s.answer}>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
