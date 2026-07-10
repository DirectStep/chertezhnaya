import type { Project } from '../../data/content';
import s from './ProjectsSection.module.css';

export default function ProjectMockup({ layout }: { layout: Project['layout'] }) {
  return (
    <div className={`${s.mockup} ${s[`mockup_${layout}`]}`} aria-hidden="true">
      <div className={s.mockupBar}>
        <span />
        <span />
        <span />
        <div className={s.mockupAddress} />
      </div>
      <div className={s.mockupBody}>
        {layout === 'landing' && (
          <>
            <div className={s.mNav} />
            <div className={s.mHero}>
              <span className={s.mLineLg} />
              <span className={s.mLineSm} />
              <span className={s.mPill} />
            </div>
            <div className={s.mRow}>
              <div className={s.mCard} />
              <div className={s.mCard} />
              <div className={s.mCard} />
            </div>
          </>
        )}
        {layout === 'grid' && (
          <>
            <div className={s.mNav} />
            <div className={s.mMasonry}>
              <div className={`${s.mTile} ${s.mTileTall}`} />
              <div className={s.mTile} />
              <div className={s.mTile} />
              <div className={s.mTile} />
              <div className={`${s.mTile} ${s.mTileWide}`} />
            </div>
          </>
        )}
        {layout === 'dashboard' && (
          <div className={s.mDashboard}>
            <div className={s.mSidebar}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={s.mMain}>
              <div className={s.mStatRow}>
                <div className={s.mStat} />
                <div className={s.mStat} />
                <div className={s.mStat} />
              </div>
              <div className={s.mChart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
