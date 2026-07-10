import { useState } from 'react';
import { faqItems } from '../../data/content';
import FAQItem from './FAQItem';
import s from './FAQSection.module.css';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" data-theme="light" className="section sectionLight">
      <div className="container">
        <div className={s.inner}>
          <div className={s.head} data-reveal>
            <span className={s.watermark} aria-hidden="true">
              ?
            </span>
            <p className="eyebrow">Вопросы</p>
            <h2 className="sectionTitle">Часто задаваемые вопросы</h2>
          </div>
          <div className={s.list} data-reveal>
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
