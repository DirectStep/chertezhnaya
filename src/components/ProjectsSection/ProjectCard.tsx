import type { Project } from '../../data/content';
import s from './ProjectsSection.module.css';

type Props = { project: Project };

export default function ProjectCard({ project }: Props) {
  return (
    <article className={`${s.card} ${s[`card_${project.id}`]}`} data-case={project.id} data-reveal>
      <a href={`#/case/${project.id}`} className={s.cardButton}>
        <img className={s.visualLayer} src={project.cover} alt="" loading="lazy" />
        <div className={s.top}>
          <h3 className={s.cardTitle}>
            {project.id === 'yaroslavl-restaurant' ? (
              <>
                {project.title.split(' ')[0]}{' '}
                <span className={s.titleNoBreak}>{project.title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              project.title
            )}
          </h3>
          <span className={s.year}>{project.year}</span>
        </div>
        <div className={s.body}>
          <p className={s.category}>{project.category}</p>
          <p className={s.desc}>{project.description}</p>
        </div>
        <span className={s.more}>
          Смотреть проект
          <span className={s.moreArrow} aria-hidden="true"> →</span>
        </span>
      </a>
    </article>
  );
}
