import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PHOTOS = [
  { src: "/1.jpeg", alt: "Sukanya smiling", caption: "The smile that makes every moment feel like a celebration." },
  { src: "/2.jpeg", alt: "Sukanya in blue", caption: "Grace and elegance in every shade of blue." },
  { src: "/3.jpeg", alt: "Sukanya close-up", caption: "Soft eyes that tell a thousand stories." },
  { src: "/4.jpeg", alt: "Sukanya monochrome", caption: "A moment of quiet poetry in monochrome." },
  { src: "/5.jpeg", alt: "Sukanya near leaves", caption: "The kind of beauty that grows quietly." },
];

const HIGHLIGHTS = [
  "A mind that holds people with unusual gentleness.",
  "A voice and rhythm that make music and movement feel effortless.",
  "A presence that turns ordinary moments warmer than they were.",
];

const LOVER_THINGS = [
  "I would have cared for your heart gently, never like it was something to win.",
  "I would have stayed easy on your mind, never adding pressure to a life already full.",
  "I would have rooted for your work, your peace, your singing, your dancing, your becoming.",
  "I would have shown up for ordinary days too, not only the dramatic or beautiful ones.",
  "I would have kept walking beside you for a long time, if life had opened that road.",
];

const WHY_YOU = [
  "Because after a very long time, you made wonder feel possible again.",
  "Because with you, admiration never felt loud. It felt clear.",
  "Because some people arrive softly and still rearrange the room inside you.",
];

const REMINDERS = [
  "Drink water before carrying the emotional climate of three different people.",
  "Eat on time. Healing everyone else is not a substitute for lunch.",
  "Rest is not laziness. Even the strong-hearted deserve to pause.",
  "You do not have to hold everything alone to still be the person people trust.",
];

const PLAYLISTS = [
  { title: "For late evenings when your mind deserves softer weather", mood: "gentle reset" },
  { title: "For dance-energy days that deserve better lighting", mood: "bright lift" },
  { title: "For window moments, chai, and a quieter heartbeat", mood: "calm drift" },
  { title: "For healing without speeches and comfort without noise", mood: "steady warmth" },
];

const SUPPORT_FEATURES = [
  { title: "Hydration checkpoint", text: "Because the girl who helps regulate everyone else should not run on dehydration and goodwill." },
  { title: "Playlist shelf", text: "Mood-based songs for tired days, bright days, and the quiet in-between hours." },
  { title: "Tiny notes", text: "Small reminders for breath, rest, food, boundaries, and not carrying the whole world at once." },
  { title: "Call me corner", text: "In case the person who steadies everyone else ever needs somewhere soft to land." },
];

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

// ─── LANDING ────────────────────────────────────────────────────────────────

function Landing({ onSelect }) {
  return (
    <section className="landing">
      <ParticleField variant="lover" />
      <div className="landing-inner">
        <div className="landing-text">
          <p className="eyebrow fade-up">for Sukanya</p>
          <h1 className="hero-title fade-up delay-1">
            Some people do not fit<br />
            <em>inside one honest version</em><br />
            of the story.
          </h1>
          <p className="hero-sub fade-up delay-2">
            So this was made as two worlds. One for the feeling that could have
            become love if timing had behaved itself. One for the care that can
            still stay, quietly and genuinely, in the real world.
          </p>
          <div className="highlight-pills fade-up delay-3">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="pill">{h}</div>
            ))}
          </div>
        </div>

        <div className="landing-doors fade-up delay-4">
          <button className="door door-lover" onClick={() => onSelect("lover")}>
            <div className="door-glow" />
            <span className="door-label">door one</span>
            <h2>Lover in the<br />virtual world</h2>
            <p>The dream-island version. Butterflies, almosts, unfinished tenderness, and the truth that maybe it really was right person, wrong time.</p>
            <span className="door-arrow">→</span>
          </button>
          <button className="door door-friend" onClick={() => onSelect("friend")}>
            <div className="door-glow" />
            <span className="door-label">door two</span>
            <h2>Friend in<br />the real one</h2>
            <p>The grounded version. Little support systems, water reminders, playlists, notes, and one clear promise: if it ever gets heavy, you can call.</p>
            <span className="door-arrow">→</span>
          </button>
        </div>

        <div className="hero-photos fade-up delay-5">
          {PHOTOS.map((p, i) => (
            <figure key={i} className={`hero-photo hero-photo-${i}`}>
              <img src={p.src} alt={p.alt} loading={i === 0 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PHOTO MOSAIC ───────────────────────────────────────────────────────────

function PhotoMosaic({ variant }) {
  return (
    <div className={`mosaic mosaic-${variant}`}>
      {PHOTOS.map((p, i) => (
        <figure key={i} className={`mosaic-item mosaic-item-${i}`}>
          <img src={p.src} alt={p.alt} loading="lazy" />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

// ─── LOVER WORLD ────────────────────────────────────────────────────────────

function LoverWorld({ onBack }) {
  return (
    <div className="world world-lover">
      <ParticleField variant="lover" />
      <nav className="world-nav">
        <button className="back-btn" onClick={onBack}>← back</button>
        <span className="world-tag">door one · lover in the virtual world</span>
      </nav>

      <section className="world-hero">
        <p className="eyebrow fade-up">the feeling that arrived clearly</p>
        <h1 className="fade-up delay-1">Right person.<br /><em>Wrong chapter.</em></h1>
        <p className="world-intro fade-up delay-2">
          Sometimes the right person arrives in the wrong chapter. Still, unfinished does not mean unreal. Some people are brief and still become important in full colour.
        </p>
      </section>

      <PhotoMosaic variant="lover" />

      <section className="cards-section">
        <p className="section-eyebrow">what I would have done</p>
        <h2 className="section-title">If the timing<br />had cooperated</h2>
        <div className="cards-grid">
          {LOVER_THINGS.map((text, i) => (
            <div key={i} className="card card-lover" style={{ "--i": i }}>
              <span className="card-num">0{i + 1}</span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <p className="section-eyebrow">why you, specifically</p>
        <h2 className="section-title">The honest reason</h2>
        <div className="why-list">
          {WHY_YOU.map((w, i) => (
            <div key={i} className="why-item" style={{ "--i": i }}>
              <span className="why-quote">"</span>
              <p>{w}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-card">
          <p className="eyebrow">still true</p>
          <blockquote>
            "Some people do not become less real just because the chapter closed early. You are one of those people."
          </blockquote>
        </div>
      </section>
    </div>
  );
}

// ─── FRIEND WORLD ───────────────────────────────────────────────────────────

function FriendWorld({ onBack }) {
  const [water, setWater] = useState(0);
  const maxWater = 8;

  return (
    <div className="world world-friend">
      <ParticleField variant="friend" />
      <nav className="world-nav">
        <button className="back-btn" onClick={onBack}>← back</button>
        <span className="world-tag">door two · friend in the real one</span>
      </nav>

      <section className="world-hero">
        <p className="eyebrow fade-up">the care that can stay</p>
        <h1 className="fade-up delay-1">Friendship is a<br /><em>serious kind of love.</em></h1>
        <p className="world-intro fade-up delay-2">
          Just without the dramatic title card. This side is for care that stays light, useful, and real. Also drink water. For once, let this be non-negotiable.
        </p>
      </section>

      <PhotoMosaic variant="friend" />

      {/* Water tracker */}
      <section className="tracker-section">
        <p className="section-eyebrow">hydration checkpoint</p>
        <h2 className="section-title">Because you forget.<br />Every single day.</h2>
        <div className="water-tracker">
          <div className="water-glasses">
            {Array.from({ length: maxWater }).map((_, i) => (
              <button
                key={i}
                className={`glass ${i < water ? "glass-filled" : ""}`}
                onClick={() => setWater(i < water ? i : i + 1)}
                aria-label={`Glass ${i + 1}`}
              >
                <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 8 L4 52 Q4 56 8 56 L32 56 Q36 56 36 52 L32 8 Z" stroke="currentColor" strokeWidth="2" fill={i < water ? "currentColor" : "none"} fillOpacity="0.3"/>
                </svg>
              </button>
            ))}
          </div>
          <p className="water-msg">
            {water === 0 && "tap a glass. start small."}
            {water > 0 && water < 4 && `${water} down. keep going.`}
            {water >= 4 && water < 8 && `${water} glasses. actually impressive.`}
            {water === 8 && "full. i'm proud of you. genuinely."}
          </p>
        </div>
      </section>

      {/* Playlists */}
      <section className="playlist-section">
        <p className="section-eyebrow">playlist shelf</p>
        <h2 className="section-title">Songs for every<br />kind of day you have</h2>
        <div className="playlist-grid">
          {PLAYLISTS.map((pl, i) => (
            <div key={i} className="playlist-card" style={{ "--i": i }}>
              <div className="playlist-icon">♫</div>
              <p className="playlist-mood">{pl.mood}</p>
              <p className="playlist-title">{pl.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reminders */}
      <section className="reminders-section">
        <p className="section-eyebrow">tiny notes</p>
        <h2 className="section-title">Things someone<br />should say more often</h2>
        <div className="reminders-list">
          {REMINDERS.map((r, i) => (
            <div key={i} className="reminder" style={{ "--i": i }}>
              <span className="reminder-dot" />
              <p>{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Support features */}
      <section className="features-section">
        <div className="features-grid">
          {SUPPORT_FEATURES.map((f, i) => (
            <div key={i} className="feature-card" style={{ "--i": i }}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-card">
          <p className="eyebrow">the promise</p>
          <blockquote>
            "You take so much stress from other people that someone should be available to hold some of yours. If one day it feels heavy — call me. No performance. No explaining everything perfectly. Just call."
          </blockquote>
        </div>
      </section>
    </div>
  );
}

// ─── APP ────────────────────────────────────────────────────────────────────

export default function App() {
  const [world, setWorld] = useState("landing");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [world]);

  if (world === "lover") return <LoverWorld onBack={() => setWorld("landing")} />;
  if (world === "friend") return <FriendWorld onBack={() => setWorld("landing")} />;
  return <Landing onSelect={setWorld} />;
}
