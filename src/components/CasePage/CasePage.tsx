import { useEffect, useState } from 'react';
import { projects, type ProjectId } from '../../data/content';
import s from './CasePage.module.css';

export default function CasePage({ projectId }: { projectId: ProjectId }) {
  const project = projects.find((item) => item.id === projectId)!;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightbox]);

  const openImage = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <main className={s.page} data-case={project.id}>
      <div className="container">
        <a href="#works" className={s.back}>
          <span aria-hidden="true">←</span> Все кейсы
        </a>

        <section className={s.hero}>
          <div className={s.heroCopy}>
            <p className={s.eyebrow}>CASE / {project.year}</p>
            <h1 className={project.id === 'yaroslavl-restaurant' ? s.heroTitleLong : undefined}>
              {project.id === 'yaroslavl-restaurant' ? (
                <>
                  {project.title.split(' ')[0]}{' '}
                  <span className={s.heroTitleNoBreak}>{project.title.split(' ').slice(1).join(' ')}</span>
                </>
              ) : (
                project.title
              )}
            </h1>
            <p className={s.lead}>{project.description}</p>
          </div>
          <div className={s.heroMedia}>
            <button
              type="button"
              className={s.mediaButton}
              onClick={() => openImage(project.cover, `${project.title} — ${project.category}`)}
              aria-label={`Увеличить изображение: ${project.title}`}
            >
              <img src={project.cover} alt={`${project.title} — ${project.category}`} />
            </button>
          </div>
        </section>

        <dl className={s.metaGrid}>
          <div>
            <dt>Клиент</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Что сделали</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Формат</dt>
            <dd>{project.category}</dd>
          </div>
        </dl>

        <section className={s.story}>
          <div className={s.sectionLabel}>Задача и подход</div>
          <div className={s.storyText}>
            {project.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section
          className={`${s.gallery} ${project.id === 'yaroslavl-restaurant' ? s.galleryYaroslavl : ''}`}
          aria-label={`Материалы проекта ${project.title}`}
        >
          {project.gallery.map((image, index) => (
            <figure
              key={image}
              className={`${s.galleryItem} ${index === 0 ? s.galleryFeatured : ''} ${
                project.id === 'yaroslavl-restaurant' ? s[`galleryYaroslavlItem${index + 1}`] : ''
              }`}
            >
              <button
                type="button"
                className={s.mediaButton}
                onClick={() => openImage(image, `${project.title}, материал ${index + 1}`)}
                aria-label={`Увеличить материал ${index + 1}`}
              >
                <img src={image} alt={`${project.title}, материал ${index + 1}`} loading="lazy" />
              </button>
            </figure>
          ))}
        </section>

        {project.videos && project.videos.length > 0 && (
          <section className={s.videos} aria-label="Видео проекта">
            <div className={s.sectionLabel}>В работе</div>
            <div className={s.videoGrid}>
              {project.videos.map((video) => (
                <video key={video} className={s.video} controls muted playsInline preload="metadata">
                  <source src={video} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              ))}
            </div>
          </section>
        )}

        <section className={s.result}>
          <p className={s.sectionLabel}>Результат</p>
          <p className={s.resultText}>{project.result}</p>
          <a href="#contact" className="btn btnPrimary">
            Обсудить похожий проект
          </a>
        </section>
      </div>

      {lightbox && (
        <div
          className={s.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className={s.lightboxClose}
            onClick={() => setLightbox(null)}
            aria-label="Закрыть изображение"
          >
            ×
          </button>
          <img
            className={s.lightboxImage}
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
