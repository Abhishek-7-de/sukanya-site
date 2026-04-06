import { ArrowLeft, Heart } from 'lucide-react';
import { FloatingButterflies } from '../components/FloatingDecor';
import PhotoMosaic from '../components/PhotoMosaic';
import SectionCard from '../components/SectionCard';
import { loverPromises, loverReasons } from '../data/siteData';

export default function LoverWorld({ onBack }) {
  return (
    <section className="world-section lover-background">
      <FloatingButterflies />
      <div className="container world-content">
        <div className="world-topbar">
          <button type="button" className="back-button glass-button" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="world-pill glass-pill">virtual world</div>
        </div>

        <div className="two-col-grid hero-world-grid">
          <SectionCard className="card glass-card big-card">
            <p className="eyebrow">dream-island entry</p>
            <h1 className="hero-title world-title">
              After a very long time,
              <span> you gave me the good kind of butterflies.</span>
            </h1>
            <p className="hero-copy world-copy">
              The kind that do not feel dramatic. Just startlingly alive. The kind that make a person notice softness again. Maybe it was brief. Maybe life did not leave enough room for the story to become what it could have been. But it mattered. Deeply.
            </p>
            <p className="hero-copy world-copy tighter-copy">
              If timing had been kinder, I would have wanted to know you slowly. To take care of you without crowding your life. To stand beside your ambitions, your gentleness, your music, your movement, your difficult days, your ordinary ones too.
            </p>
          </SectionCard>

          <SectionCard delay={0.08} className="card glass-card mosaic-holder">
            <PhotoMosaic variant="lover" />
          </SectionCard>
        </div>

        <div className="three-col-grid reason-grid">
          {loverReasons.map((item, index) => (
            <SectionCard key={item} delay={0.08 + index * 0.05} className="card glass-card reason-card">
              <p className="eyebrow">why it stayed</p>
              <p className="reason-copy">{item}</p>
            </SectionCard>
          ))}
        </div>

        <div className="two-col-grid bottom-grid">
          <SectionCard delay={0.12} className="card card-dark">
            <p className="eyebrow eyebrow-dark">unsent truth</p>
            <h2 className="card-title dark-title">
              Maybe it really was
              <span> right person, wrong time.</span>
            </h2>
            <p className="copy-dark">
              We did not make it together. That part is true. But it does not cancel what was beautiful. A soft corner still exists. Not heavy. Not demanding. Just warm, and quietly real.
            </p>
          </SectionCard>

          <SectionCard delay={0.16} className="card glass-card">
            <p className="eyebrow">what I would have done</p>
            <div className="promise-list">
              {loverPromises.map((item) => (
                <div key={item} className="promise-card">
                  <Heart size={16} />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard delay={0.2} className="card glass-card centered-card">
          <p className="eyebrow">last thing from the island</p>
          <h2 className="card-title centered-title">
            Some stories do not stay.
            <span> They still leave the heart a little brighter.</span>
          </h2>
          <p className="hero-copy center-copy">
            So even if life chose a different road, I am still grateful that, for a while, it crossed mine with yours.
          </p>
        </SectionCard>
      </div>
    </section>
  );
}
