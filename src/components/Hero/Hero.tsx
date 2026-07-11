import { useRef } from 'react';
import HeroArtwork from '../HeroArtwork/HeroArtwork';
import s from './Hero.module.css';

export default function Hero() {
  const artRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = artRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 8;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    el.style.setProperty('--shift-x', `${x}px`);
    el.style.setProperty('--shift-y', `${y}px`);
  };

  return (
    <section id="top" data-theme="dark" className={s.hero} onMouseMove={onMouseMove}>
      <div className={`container ${s.inner}`}>
        <div className={s.content}>
          <p className="eyebrow">Разработка сайтов</p>
          <h1 className={s.title}>
            Проектируем <span className="accent">сайты</span>
            <br />
            и доводим их
            <br />
            до <span className="accent">релиза</span>
          </h1>
          <p className={s.lead}>
            Исследуем задачу, строим структуру и сценарии, делаем интерфейс и разработку,
            запускаем сайт и ведём его после старта.
          </p>
          <div className={s.actions}>
            <a href="#contact" className="btn btnPrimary">
              Обсудить проект
            </a>
            <a href="#works" className={s.worksLink}>
              Смотреть работы
            </a>
          </div>
        </div>
        <div className={s.art} ref={artRef}>
          <HeroArtwork />
        </div>
      </div>
    </section>
  );
}
