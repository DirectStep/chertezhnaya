import { projects, testimonials } from '../../data/content';
import s from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t !== featured);
  const getProject = (projectId: typeof featured.projectId) => projects.find((project) => project.id === projectId);
  const featuredProject = getProject(featured.projectId);

  return (
    <section data-theme="light" className={`section sectionLight ${s.section}`}>
      <div className="container">
        <div className={s.head} data-reveal>
          <p className="eyebrow">Отзывы</p>
          <h2 className="sectionTitle">Что говорят клиенты</h2>
        </div>

        <blockquote className={s.pullQuote} data-case={featured.projectId} data-reveal>
          <p className={s.pullText}>{featured.text}</p>
          <footer className={s.pullPerson}>
            <span className={s.avatar} data-case={featured.projectId} data-shape="squircle" aria-hidden="true">
              {featured.initials}
            </span>
            <div>
              <p className={s.name}>{featured.name}</p>
              <p className={s.role}>
                {featured.role}, {featured.company}
              </p>
              {featuredProject && (
                <a href={`#/case/${featured.projectId}`} className={s.caseLink} data-case={featured.projectId}>
                  <span className={s.caseDot} aria-hidden="true" />
                  Кейс: {featuredProject.title}
                </a>
              )}
            </div>
          </footer>
        </blockquote>

        <ul className={s.grid} data-reveal>
          {rest.map((t, i) => {
            const project = getProject(t.projectId);

            return (
            <li key={t.name} className={s.card} data-case={t.projectId}>
              <p className={s.quote}>{t.text}</p>
              <div className={s.person}>
                <span className={s.avatar} data-case={t.projectId} data-shape={i % 2 ? 'circle' : 'squircle'} aria-hidden="true">
                  {t.initials}
                </span>
                <div>
                  <p className={s.name}>{t.name}</p>
                  <p className={s.role}>
                    {t.role}, {t.company}
                  </p>
                  {project && (
                    <a href={`#/case/${t.projectId}`} className={s.caseLink} data-case={t.projectId}>
                      <span className={s.caseDot} aria-hidden="true" />
                      Кейс: {project.title}
                    </a>
                  )}
                </div>
              </div>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
