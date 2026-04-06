import { motion } from 'framer-motion';
import { Heart, ChevronRight, Sparkles, Stars, Shell, MessageCircleHeart } from 'lucide-react';
import { galleryImages, landingHighlights } from '../data/siteData';

export default function HeroLanding({ onSelectWorld }) {
  return (
    <section className="landing-section">
      <div className="container landing-panel">
        <div className="landing-grid">
          <div className="landing-copy">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="eyebrow">for Sukanya</p>
              <h1 className="hero-title">
                Some people do not fit
                <span> inside one honest version of the story.</span>
              </h1>
              <p className="hero-copy">
                So this was made as two worlds. One for the feeling that could have become love if timing had behaved itself. One for the care that can still stay, quietly and genuinely, in the real world.
              </p>
              <div className="highlight-list">
                {landingHighlights.map((line) => (
                  <div key={line} className="highlight-chip">{line}</div>
                ))}
              </div>
            </motion.div>

            <div className="world-card-list">
              <button type="button" className="world-card" onClick={() => onSelectWorld('lover')}>
                <div className="world-card-head">
                  <div>
                    <p className="eyebrow inline-eyebrow"><Heart size={16} /> door one</p>
                    <h2>Lover in the virtual world</h2>
                    <p>
                      The dream-island version. Butterflies, almosts, unfinished tenderness, and the truth that maybe it really was right person, wrong time.
                    </p>
                  </div>
                  <ChevronRight />
                </div>
              </button>

              <button type="button" className="world-card" onClick={() => onSelectWorld('friend')}>
                <div className="world-card-head">
                  <div>
                    <p className="eyebrow inline-eyebrow"><Sparkles size={16} /> door two</p>
                    <h2>Friend in the real one</h2>
                    <p>
                      The grounded version. Little support systems, water reminders, playlists, notes, and one clear promise: if it ever gets heavy, you can call.
                    </p>
                  </div>
                  <ChevronRight />
                </div>
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="hero-visual"
          >
            <div className="hero-visual-grid hero-collage-grid">
              <figure className="hero-main-photo">
                <img src={galleryImages[0].src} alt={galleryImages[0].alt} />
                <figcaption>{galleryImages[0].caption}</figcaption>
              </figure>
              <div className="hero-mini-visual">
                <MessageCircleHeart />
                <span>mind</span>
              </div>
              <div className="hero-mini-visual">
                <Shell />
                <span>music</span>
              </div>
              <div className="hero-mini-visual">
                <Stars />
                <span>movement</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
