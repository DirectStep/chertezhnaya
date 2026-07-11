import { services } from '../../data/content';
import ServiceCard from './ServiceCard';
import s from './ServicesSection.module.css';

export default function ServicesSection() {
  return (
    <section id="services" data-theme="light" className={`section sectionLight ${s.section}`}>
      <div className="container">
        <div className={s.head} data-reveal>
          <p className="eyebrow">Услуги</p>
          <h2 className="sectionTitle">Чем занимаемся</h2>
        </div>
        <div className={s.grid} data-reveal>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
