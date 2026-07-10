import type { Project } from '../../data/content';
import s from './ProjectsSection.module.css';

type Props = { project: Project; onOpen: () => void };

export default function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className={`${s.card} ${s[`card_${project.id}`]}`} data-reveal>
      <button type="button" className={s.cardButton} onClick={onOpen}>
        <span className={s.visualLayer} aria-hidden="true" />
        <div className={s.top}>
          <h3 className={s.cardTitle}>{project.title}</h3>
          <span className={s.year}>{project.year}</span>
        </div>
        <div className={s.body}>
          <p className={s.category}>{project.category}</p>
          <p className={s.desc}>{project.description}</p>
        </div>
        <span className={s.more}>
          Смотреть проект
          <span aria-hidden="true"> →</span>
        </span>
      </button>
    </article>
  );
}
