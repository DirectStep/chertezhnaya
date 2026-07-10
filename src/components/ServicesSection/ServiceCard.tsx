import type { Service } from '../../data/content';
import s from './ServicesSection.module.css';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className={s.card}>
      <h3 className={s.title}>{service.title}</h3>
      <p className={s.audience}>{service.audience}</p>
      <ul className={s.results}>
        {service.results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
      <div className={s.terms}>
        <div>
          <span className={s.termLabel}>Срок</span>
          <span className={s.termValue}>{service.duration}</span>
        </div>
        <div>
          <span className={s.termLabel}>Стоимость</span>
          <span className={s.termValue}>{service.price}</span>
        </div>
      </div>
      <a href="#contact" className={`btn btnGhost ${s.cta}`}>
        Обсудить
      </a>
    </article>
  );
}
