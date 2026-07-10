import { processSteps } from '../../data/content';
import s from './ProcessSection.module.css';

export default function ProcessSection() {
  return (
    <section id="process" data-theme="dark" className={`section sectionDark2 ${s.section}`}>
      <div className="container">
        <div className={s.head} data-reveal>
          <p className="eyebrow">Процесс</p>
          <h2 className="sectionTitle">От задачи до релиза и поддержки</h2>
        </div>
        <div className={s.rail}>
          {processSteps.map((step, i) => (
            <div key={step.num} className={`${s.row} ${i % 2 === 1 ? s.rowReverse : ''}`} data-reveal>
              <div className={s.ghostWrap}>
                <span className={s.ghostNum}>{step.num}</span>
              </div>
              <div className={s.text}>
                <h3 className={s.title}>{step.title}</h3>
                <p className={s.desc}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
