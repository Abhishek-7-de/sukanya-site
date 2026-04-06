import { ArrowLeft, Phone } from 'lucide-react';
import { FloatingFriendWorld } from '../components/FloatingDecor';
import SectionCard from '../components/SectionCard';
import WaterTracker from '../components/WaterTracker';
import PlaylistShelf from '../components/PlaylistShelf';
import TypewriterChat from '../components/TypewriterChat';
import PhotoMosaic from '../components/PhotoMosaic';
import { friendAffirmations, friendNotes, friendTools, supportNumber } from '../data/siteData';

export default function FriendWorld({ onBack }) {
  return (
    <section className="world-section friend-background">
      <FloatingFriendWorld />
      <div className="container world-content">
        <div className="world-topbar">
          <button type="button" className="back-button solid-button" onClick={onBack}>
            <ArrowLeft size={16} /> Back
          </button>
          <div className="world-pill solid-pill">real world</div>
        </div>

        <div className="two-col-grid hero-world-grid">
          <SectionCard className="card card-gradient big-card">
            <p className="eyebrow">friend in the real one</p>
            <h1 className="hero-title world-title">
              You hold so much
              <span> of other people’s stress.</span>
            </h1>
            <p className="hero-copy world-copy">
              So this side exists for one simple reason. In case the person who steadies everyone else ever needs somewhere soft to land, she should know she can call me. No pressure. No polished explanation. No perfect words required.
            </p>

            <div className="callout-box">
              <div>
                <p className="mini-eyebrow">call me corner</p>
                <p className="call-number">{supportNumber}</p>
                <p className="copy-muted">For bad days, tired days, overthinking days, and the random ones too.</p>
              </div>
              <a href={`tel:${supportNumber.replace(/\s+/g, '')}`} className="pill-button dark-pill call-link">
                <Phone size={16} /> Call me
              </a>
            </div>

            <div className="affirmation-row">
              {friendAffirmations.map((item) => (
                <span key={item} className="affirmation-pill">{item}</span>
              ))}
            </div>
          </SectionCard>

          <SectionCard delay={0.08} className="card card-soft mosaic-holder">
            <PhotoMosaic />
          </SectionCard>
        </div>

        <div className="two-col-grid bottom-grid">
          <SectionCard delay={0.1}><WaterTracker /></SectionCard>

          <SectionCard delay={0.14} className="card card-dark">
            <p className="eyebrow eyebrow-dark">smart little tools</p>
            <div className="tool-list">
              {friendTools.map((tool) => (
                <div key={tool.title} className="dark-list-item align-start">
                  <div>
                    <p className="dark-list-title">{tool.title}</p>
                    <p className="dark-list-subtitle dark-copy">{tool.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="two-col-grid bottom-grid">
          <SectionCard delay={0.16}><TypewriterChat /></SectionCard>

          <SectionCard delay={0.2} className="card card-soft">
            <p className="eyebrow">songs and tiny notes</p>
            <PlaylistShelf />
            <div className="note-box">
              <p className="note-title">Tiny notes</p>
              <ul className="note-list">
                {friendNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>

        <SectionCard delay={0.24} className="card card-gradient centered-card">
          <p className="eyebrow">where this lands</p>
          <h2 className="card-title centered-title">
            Friendship is not the smaller feeling.
            <span> Sometimes it is the one built to last.</span>
          </h2>
          <p className="hero-copy center-copy">
            So if life gave us the wrong timing for one version of closeness, it can still give us something real, steady, and worth keeping in another.
          </p>
        </SectionCard>
      </div>
    </section>
  );
}
