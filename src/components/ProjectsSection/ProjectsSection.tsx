import { useState } from 'react';
import { projects, type Project } from '../../data/content';
import ProjectCard from './ProjectCard';
import ProjectDialog from './ProjectDialog';
import s from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="works" data-theme="light" className="section sectionLight">
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
              onOpen={() => setOpenProject(project)}
            />
          ))}
        </div>
      </div>
      <ProjectDialog project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
