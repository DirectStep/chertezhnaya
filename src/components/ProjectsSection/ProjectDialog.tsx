import { useEffect, useRef } from 'react';
import type { Project } from '../../data/content';
import s from './ProjectsSection.module.css';

type Props = { project: Project | null; onClose: () => void };

export default function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={project ? `Проект ${project.title}` : undefined}
    >
      {project && (
        <div className={s.dialogInner}>
          <button
            type="button"
            className={s.dialogClose}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
          <p className={s.meta}>
            {project.category} · {project.year}
          </p>
          <h3 className={s.dialogTitle}>{project.title}</h3>
          <p className={s.dialogText}>{project.details}</p>
          <a href="#contact" className="btn btnPrimary" onClick={onClose}>
            Обсудить похожий проект
          </a>
        </div>
      )}
    </dialog>
  );
}
