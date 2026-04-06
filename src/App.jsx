import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── PARTICLES ──────────────────────────────────────────────────────────────

function ParticleField({ variant = "lover" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 60;
    const particles = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random(),
      color: variant === "lover"
        ? `hsl(${340 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%)`
        : `hsl(${45 + Math.random() * 30}, 90%, ${65 + Math.random() * 15}%)`
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += (Math.random() - 0.5) * 0.02;
        p.alpha = Math.max(0.05, Math.min(0.7, p.alpha));
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [variant]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}

// ─── LANDING ─────────────────────────────────────────────────────────────

function Landing({ onSelect }) {
  const [showWarning, setShowWarning] = useState(false);
  const [showJoking, setShowJoking] = useState(false);

  const handleLoverClick = () => {
    setShowWarning(true);
  };

  const handleTakeRisk = () => {
    setShowWarning(false);
    setShowJoking(true);
    setTimeout(() => {
      setShowJoking(false);
      onSelect("lover");
    }, 2000);
  };

  return (
    <section className="landing">
      <ParticleField variant="lover" />
      
      {/* Warning Modal */}
      {showWarning && (
        <div className="modal-overlay fade-up">
          <div className="modal warning-modal">
            <h2>⚠️ WARNING</h2>
            <p>This is a concept. A beautiful "what if" that lives only here.</p>
            <p className="warning-text">Are you really sure you want to enter the butterfly realm? 🦋</p>
            <div className="modal-buttons">
              <button className="btn-secondary" onClick={() => setShowWarning(false)}>Nope, I'm scared</button>
              <button className="btn-primary" onClick={handleTakeRisk}>Yes, take the risk</button>
            </div>
          </div>
        </div>
      )}

      {/* Just Kidding Modal */}
      {showJoking && (
        <div className="modal-overlay fade-up">
          <div className="modal joking-modal">
            <h1 className="joking-text">just kidding 😄</h1>
            <p>let's dive in...</p>
          </div>
        </div>
      )}

      <div className="landing-inner">
        <div className="letter-header fade-up">
          <p className="salutation">Hey Sukanya,</p>
          <p className="letter-intro">
            This is just because after a long time, someone made me feel butterflies. 
            The kind that could have led somewhere real. 
            But maybe God has other plans, you know?
          </p>
        </div>

        <div className="landing-doors fade-up delay-1">
          <button className="door door-lover" onClick={handleLoverClick}>
            <div className="door-glow" />
            <span className="door-emoji">💕</span>
            <h2>The Butterfly<br />Version</h2>
            <p>What we could have been</p>
            <span className="door-arrow">→</span>
          </button>
          <button className="door door-friend" onClick={() => onSelect("friend")}>
            <div className="door-glow" />
            <span className="door-emoji">🌟</span>
            <h2>The Real<br />Version</h2>
            <p>How we actually are</p>
            <span className="door-arrow">→</span>
          </button>
        </div>

        <div className="hero-photos fade-up delay-2">
          {["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg"].map((src, i) => (
            <figure key={i} className={`hero-photo hero-photo-${i}`}>
              <img src={src} alt={`Photo ${i + 1}`} loading={i === 0 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>

        <div className="sos-button fade-up delay-3">
          <a href="tel:7001684412" className="btn-sos">
            🆘 SOS: 7001684412
          </a>
          <p className="sos-text">Straight up call me anytime</p>
        </div>
      </div>
    </section>
  );
}

// ─── LOVER WORLD ───────────────────────────────────────────────────────

function LoverWorld({ onBack }) {
  const [heartRate, setHeartRate] = useState(68);
  const [showHeartPulse, setShowHeartPulse] = useState(false);

  const raiseHeartRate = () => {
    setHeartRate(prev => Math.min(140, prev + 15));
    setShowHeartPulse(true);
    setTimeout(() => setShowHeartPulse(false), 600);
  };

  return (
    <div className="world world-lover">
      <ParticleField variant="lover" />
      <nav className="world-nav">
        <button className="back-btn" onClick={onBack}>← back</button>
      </nav>

      <section className="world-hero">
        <p className="eyebrow fade-up">what if...</p>
        <h1 className="fade-up delay-1">
          You, me, and<br />
          <em>the same people in different fonts</em>
        </h1>
      </section>

      <section className="interactive-heart">
        <div className={`heart-monitor ${showHeartPulse ? 'pulse' : ''}`}>
          <div className="heart-icon">❤️</div>
          <div className="heart-rate">{heartRate} bpm</div>
        </div>
        <button onClick={raiseHeartRate} className="btn-interaction">
          Click to see what happens when I'm near you
        </button>
      </section>

      <section className="lover-promises">
        <div className="promise-grid">
          <div className="promise-card fade-up delay-1">
            <span className="promise-emoji">☕</span>
            <h3>I'd make you chai</h3>
            <p>Not the rushed kind. The ones with extra time.</p>
          </div>
          <div className="promise-card fade-up delay-2">
            <span className="promise-emoji">📱</span>
            <h3>Guard your phone</h3>
            <p>So you can rest without checking every 3 seconds.</p>
          </div>
          <div className="promise-card fade-up delay-3">
            <span className="promise-emoji">🎵</span>
            <h3>Hear you sing</h3>
            <p>And mean it when I say you're the only song I need.</p>
          </div>
          <div className="promise-card fade-up delay-4">
            <span className="promise-emoji">🎂</span>
            <h3>Cook you silly</h3>
            <p>Even the experiments. Especially the disasters.</p>
          </div>
          <div className="promise-card fade-up delay-5">
            <span className="promise-emoji">🤝</span>
            <h3>Show up</h3>
            <p>Not just the pretty days. The messy ones too.</p>
          </div>
          <div className="promise-card fade-up delay-6">
            <span className="promise-emoji">🎭</span>
            <h3>Have fun</h3>
            <p>Because loving someone should feel like playing.</p>
          </div>
        </div>
      </section>

      <section className="delulu-section">
        <div className="delulu-card fade-up">
          <p className="delulu-text">Delulu is the only solulu. 🌙</p>
          <p className="delulu-note">So relax... this is just a concept. A beautiful "what if" that lives only here.</p>
        </div>
      </section>

      <div className="sos-button fade-up">
        <a href="tel:7001684412" className="btn-sos">
          🆘 SOS: 7001684412
        </a>
        <p className="sos-text">If you ever need me</p>
      </div>
    </div>
  );
}

// ─── FRIEND WORLD ──────────────────────────────────────────────────────

function FriendWorld({ onBack }) {
  const [water, setWater] = useState(0);
  const maxWater = 8;

  return (
    <div className="world world-friend">
      <ParticleField variant="friend" />
      <nav className="world-nav">
        <button className="back-btn" onClick={onBack}>← back</button>
      </nav>

      <section className="world-hero">
        <p className="eyebrow fade-up">real talk</p>
        <h1 className="fade-up delay-1">
          You're the<br />
          <em>sanest person I know</em>
        </h1>
      </section>

      <section className="tracker-section">
        <p className="section-title">how are you right now? 💧</p>
        <div className="water-tracker">
          <div className="water-glasses">
            {Array.from({ length: maxWater }).map((_, i) => (
              <button
                key={i}
                className={`glass ${i < water ? "glass-filled" : ""}`}
                onClick={() => setWater(i < water ? i : i + 1)}
                aria-label={`Glass ${i + 1}`}
              >
                💧
              </button>
            ))}
          </div>
          <p className="water-msg">
            {water === 0 && "drink something. now."}
            {water > 0 && water < 4 && `${water} down. keep going.`}
            {water >= 4 && water < 8 && `${water}. you're doing amazing.`}
            {water === 8 && "LEGEND. you actually listened. proud."}
          </p>
        </div>
      </section>

      <section className="friend-facts">
        <h2>things about you 🌟</h2>
        <div className="facts-grid">
          <div className="fact-card fade-up delay-1">
            <span className="fact-icon">🧠</span>
            <p>You hold people's emotions like it's your responsibility</p>
          </div>
          <div className="fact-card fade-up delay-2">
            <span className="fact-icon">⏰</span>
            <p>But you forget to feed yourself in the process</p>
          </div>
          <div className="fact-card fade-up delay-3">
            <span className="fact-icon">💪</span>
            <p>Your strength comes from resting, not running</p>
          </div>
          <div className="fact-card fade-up delay-4">
            <span className="fact-icon">📞</span>
            <p>When you need someone, call. No explanations needed.</p>
          </div>
        </div>
      </section>

      <section className="playlists-section">
        <h2>for the days you have 🎵</h2>
        <div className="playlist-grid">
          {[
            { emoji: "🌙", mood: "late nights", desc: "when your mind needs softer" },
            { emoji: "☀️", mood: "bright days", desc: "when you can actually dance" },
            { emoji: "🌊", mood: "calm drift", desc: "chai & quiet heartbeats" },
            { emoji: "💫", mood: "healing", desc: "no speeches, just songs" }
          ].map((p, i) => (
            <div key={i} className="playlist-card fade-up" style={{ "--i": i }}>
              <span className="playlist-emoji">{p.emoji}</span>
              <p className="playlist-mood">{p.mood}</p>
              <p className="playlist-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reminder-section">
        <h2>non-negotiable ✨</h2>
        <div className="reminders">
          {[
            "Eat. On time. Real food.",
            "Sleep more than you think you need",
            "Water before anything else",
            "Rest is not lazy. It's maintenance."
          ].map((rem, i) => (
            <div key={i} className="reminder-item fade-up" style={{ "--i": i }}>
              <span className="check">✓</span>
              <p>{rem}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="sos-button fade-up">
        <a href="tel:7001684412" className="btn-sos">
          🆘 SOS: 7001684412
        </a>
        <p className="sos-text">When it gets heavy, call me</p>
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("landing");

  return (
    <>
      {page === "landing" && <Landing onSelect={setPage} />}
      {page === "lover" && <LoverWorld onBack={() => setPage("landing")} />}
      {page === "friend" && <FriendWorld onBack={() => setPage("landing")} />}
    </>
  );
}
