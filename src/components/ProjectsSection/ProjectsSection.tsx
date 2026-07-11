import { projects } from '../../data/content';
import ProjectCard from './ProjectCard';
import s from './ProjectsSection.module.css';

export default function ProjectsSection() {
  return (
    <section id="works" data-theme="light" className={`section sectionLight ${s.section}`}>
      <div className="container">
        <div className={s.head} data-reveal>
          <p className="eyebrow">Кейсы</p>
          <h2 className="sectionTitle">Проекты, где дизайн работает на заявку</h2>
        </div>
        <div className={s.list}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
