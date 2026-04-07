import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

/* ═══════════════════════════════════════════════
   SOUND ENGINE (Web Audio API — no files needed)
═══════════════════════════════════════════════ */
function playSound(type) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    if (type === "open") {
      [523, 659, 784, 1047].forEach((freq, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "sine"; o.frequency.value = freq;
        g.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.35);
        o.start(ctx.currentTime + i * 0.1);
        o.stop(ctx.currentTime + i * 0.1 + 0.4);
      });
    } else {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      if (type === "click") {
        o.type = "sine"; o.frequency.value = 880;
        g.gain.setValueAtTime(0.06, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        o.start(); o.stop(ctx.currentTime + 0.09);
      } else if (type === "water") {
        o.type = "sine";
        o.frequency.setValueAtTime(440, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        g.gain.setValueAtTime(0.12, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
        o.start(); o.stop(ctx.currentTime + 0.3);
      } else if (type === "heart") {
        o.type = "sine"; o.frequency.value = 180;
        g.gain.setValueAtTime(0.18, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        o.start(); o.stop(ctx.currentTime + 0.2);
      } else if (type === "success") {
        [523, 659, 784].forEach((f, i) => {
          const oo = ctx.createOscillator(), gg = ctx.createGain();
          oo.connect(gg); gg.connect(ctx.destination);
          oo.frequency.value = f;
          gg.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.1);
          gg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.3);
          oo.start(ctx.currentTime + i * 0.1);
          oo.stop(ctx.currentTime + i * 0.1 + 0.35);
        });
      }
    }
  } catch (_) {}
}

/* ═══════════════════════════════════════════════
   SPOTIFY WIDGET
═══════════════════════════════════════════════ */
function SpotifyWidget({ trackId }) {
  if (!trackId) return null;
  return (
    <div className="spotify-widget">
      <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%" height="80" frameBorder="0" allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VOLUME TOAST
═══════════════════════════════════════════════ */
function VolumeToast() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("vol-shown")) return;
    const t1 = setTimeout(() => { setVisible(true); playSound("open"); }, 800);
    const t2 = setTimeout(() => { setVisible(false); localStorage.setItem("vol-shown","1"); }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (!visible) return null;
  return (
    <motion.div className="volume-toast"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    >
      🔊 Turn your volume on ✨
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   GLOBAL SOS BUTTON
═══════════════════════════════════════════════ */
function GlobalSOS() {
  return (
    <a href="tel:7001684412" className="global-sos" title="Call anytime — SOS 7001684412"
      onClick={() => playSound("click")}
    >🆘</a>
  );
}

/* ═══════════════════════════════════════════════
   OMNIPRESENT SLAM BOOK SIDEBAR
═══════════════════════════════════════════════ */
const SIDEBAR_MOODS = ["💫","🌊","🔥","🌙","💕","⚡"];
function SlamSidebar() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [mood, setMood] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    const entries = JSON.parse(localStorage.getItem("slambook") || "[]");
    entries.unshift({ name, message: msg, mood, level: 1, visibility: "public", timestamp: Date.now() });
    localStorage.setItem("slambook", JSON.stringify(entries));
    playSound("success");
    setDone(true);
    setTimeout(() => { setDone(false); setName(""); setMsg(""); setMood(""); }, 3000);
  };

  return (
    <div className="slam-sidebar">
      <AnimatePresence>
        {open && (
          <motion.div className="slam-sidebar-panel"
            initial={{ x: 320 }} animate={{ x: 0 }} exit={{ x: 320 }}
            transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
          >
            {done ? (
              <div className="sidebar-success">
                <div className="sidebar-success-icon">🌟</div>
                <p style={{ color: "var(--cosmic-text-soft)", marginTop:"0.5rem" }}>Your note is in the cosmos!</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3>✨ Leave a Note</h3>
                <p>Tell her something she deserves to hear.</p>
                <input className="sidebar-form-input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required />
                <textarea className="sidebar-form-input" placeholder="Your message..." value={msg} onChange={e=>setMsg(e.target.value)} rows={3} required style={{ resize:"none" }} />
                <div className="sidebar-mood-row">
                  {SIDEBAR_MOODS.map(m => (
                    <button key={m} type="button"
                      className={`sidebar-mood-btn${mood===m?" active":""}`}
                      onClick={() => setMood(m)}
                    >{m}</button>
                  ))}
                </div>
                <button type="submit" className="btn-sidebar-submit" onClick={() => playSound("click")}>
                  Send into the cosmos →
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="slam-sidebar-tab" onClick={() => { setOpen(o=>!o); playSound("click"); }}>
        {open ? "✕ Close" : "✨ Leave a Note"}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PERSONAL NOTEPAD
═══════════════════════════════════════════════ */
function PersonalNotepad() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sukanya-notepad") || "";
    setText(stored);
  }, []);

  const save = () => {
    localStorage.setItem("sukanya-notepad", text);
    setSaved(true);
    playSound("success");
    setTimeout(() => setSaved(false), 1500);
  };

  const clear = () => {
    if (confirm("Clear everything? 🌸")) {
      setText(""); localStorage.removeItem("sukanya-notepad");
    }
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <>
      <button className="notepad-toggle" title="Your personal notepad 📓"
        onClick={() => { setOpen(o=>!o); playSound("click"); }}
      >📓</button>
      <AnimatePresence>
        {open && (
          <motion.div className="notepad-panel"
            initial={{ opacity:0, y:20, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }}
            exit={{ opacity:0, y:20, scale:0.95 }}
            transition={{ duration: 0.3, ease:[0.16,1,0.3,1] }}
          >
            <div className="notepad-header">
              <h4>📓 My Thoughts</h4>
              <div className="notepad-header-actions">
                <button className="notepad-action-btn" onClick={save}>
                  {saved ? "Saved ✓" : "Save"}
                </button>
                <button className="notepad-action-btn" onClick={clear}>Clear</button>
                <button className="notepad-action-btn" onClick={() => setOpen(false)}>✕</button>
              </div>
            </div>
            <textarea
              className="notepad-textarea"
              placeholder="Write anything... it's just for you 🌸"
              value={text}
              onChange={e => setText(e.target.value)}
              autoFocus
            />
            <div className="notepad-footer">{words} word{words !== 1 ? "s" : ""} · auto-saved locally 🔒</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════
   CUSTOM CURSOR TRAIL
═══════════════════════════════════════════════ */
function CursorTrail({ color }) {
  const dots = useRef([]);
  const mouse = useRef({ x: -200, y: -200 });
  const NUM = 8;
  useEffect(() => {
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    dots.current.forEach((d, i) => {
      if (!d) return;
      let x = mouse.current.x, y = mouse.current.y;
      const raf = () => {
        if (!d) return;
        x += (mouse.current.x - x) * 0.12;
        y += (mouse.current.y - y) * 0.12;
        d.style.left = x + "px"; d.style.top = y + "px";
        requestAnimationFrame(raf);
      };
      setTimeout(() => requestAnimationFrame(raf), i * 30);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      {Array.from({ length: NUM }).map((_, i) => (
        <div key={i} ref={el => (dots.current[i] = el)} className="cursor-dot"
          style={{ width: 8 - i * 0.6, height: 8 - i * 0.6, background: color, opacity: 1 - (i/NUM)*0.85 }}
        />
      ))}
    </>
  );
}

/* ═══════════════════════════════════════════════
   STAR CANVAS
═══════════════════════════════════════════════ */
function StarCanvas({ variant = "moon" }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const COUNT = variant === "cosmic" ? 180 : 120;
    const stars = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.2, alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.001,
      color: variant === "cosmic"
        ? (Math.random() > 0.7 ? `hsl(190,100%,${70+Math.random()*20}%)` : Math.random() > 0.5 ? `hsl(45,100%,${65+Math.random()*20}%)` : "#fff")
        : `hsl(${240+Math.random()*60},80%,${80+Math.random()*15}%)`,
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); t += 0.01;
      stars.forEach(s => {
        s.alpha = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed * 50 + s.x));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = s.alpha; ctx.fill();
      });
      ctx.globalAlpha = 1; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [variant]);
  return <canvas ref={canvasRef} className={variant === "cosmic" ? "cosmic-canvas" : "canvas-bg"} aria-hidden />;
}

/* ═══════════════════════════════════════════════
   HEARTBEAT MONITOR
═══════════════════════════════════════════════ */
const HEART_MSGS = [
  "", "Steady. Safe. 68 bpm.",
  "A little warmer... 83 bpm.",
  "Oh she's here. 96 bpm.",
  "Heart's doing things. 109 bpm.",
  "Almost can't hide it. 122 bpm.",
  "Yeah. That. 135 bpm.",
  "Maximum honesty. 140 bpm. ❤️‍🔥"
];
function HeartbeatMonitor() {
  const [bpm, setBpm] = useState(68);
  const [pumping, setPumping] = useState(false);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef(null);
  const bpmRef = useRef(68);
  const frameRef = useRef(0);

  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth; canvas.height = 80;
    let x = 0, animId;
    const beat = () => {
      ctx.fillStyle = "rgba(10,10,30,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const speed = bpmRef.current / 400;
      x += speed * canvas.width;
      if (x > canvas.width) x = 0;
      const mid = canvas.height / 2;
      const t = x / canvas.width;
      const ecgVal = (() => {
        const p = (t % 1);
        if (p < 0.15) return Math.sin(p / 0.15 * Math.PI) * 8;
        if (p < 0.25) return -5 * Math.sin((p - 0.15) / 0.1 * Math.PI);
        if (p < 0.3) return 35 * Math.sin((p - 0.25) / 0.05 * Math.PI);
        if (p < 0.35) return -15 * Math.sin((p - 0.3) / 0.05 * Math.PI);
        if (p < 0.5) return 6 * Math.sin((p - 0.35) / 0.15 * Math.PI);
        return 0;
      })();
      ctx.beginPath(); ctx.moveTo(x, mid - ecgVal);
      ctx.lineTo(x + 2, mid - ecgVal * 1.05);
      ctx.strokeStyle = `hsl(350,90%,${55 + Math.abs(ecgVal)}%)`;
      ctx.lineWidth = 2.5; ctx.stroke();
      animId = requestAnimationFrame(beat);
    };
    beat();
    return () => cancelAnimationFrame(animId);
  }, []);

  const click = () => {
    const nb = Math.min(140, bpm + 14);
    setBpm(nb);
    setPumping(true);
    setClicks(c => c + 1);
    playSound("heart");
    setTimeout(() => setPumping(false), 300);
  };

  const msgIdx = Math.min(clicks, HEART_MSGS.length - 1);

  return (
    <section className="heartbeat-section content">
      <span className="section-eyebrow" style={{ color: "var(--moon-accent1)" }}>Interactive</span>
      <h2 className="section-title" style={{ color: "var(--moon-text)", marginBottom:"2rem" }}>
        What happens to my heart
      </h2>
      <div className="heart-monitor-card">
        <canvas ref={canvasRef} className="ecg-canvas" />
        <div className="heart-display">
          <div className={`heart-icon-big${pumping ? " pump" : ""}`}>❤️</div>
          <div>
            <div className="heart-bpm">{bpm}</div>
            <div className="heart-bpm-label">bpm</div>
          </div>
        </div>
        <button className="btn-heartbeat" onClick={click}>
          {clicks === 0 ? "Click to see what happens 💕" : clicks < 4 ? "Again... 💓" : "You can stop now. Or don't. 💘"}
        </button>
        <p className="heart-status-msg">{HEART_MSGS[msgIdx]}</p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FUN WATER TRACKER
═══════════════════════════════════════════════ */
const WATER_MSGS = [
  "hey. drink water. now.", "1 down! keep going darling 💧",
  "2! she's doing it 🌊", "halfway there! proud of you 💕",
  "4 glasses !! legend behaviour 🌸", "5! unstoppable ✨",
  "6 glasses omg 🌟", "7! you're basically a mermaid 🧜‍♀️",
  "ALL 8! 🎉 LEGENDARY. You actually listened!!"
];
const CONFETTI_COLORS = ["#ff6b6b","#f4c2a0","#ffd700","#a855f7","#00d4ff","#ff85b3"];

function FunWaterTracker() {
  const [water, setWater] = useState(0);
  const [justFilled, setJustFilled] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const confetti = useRef([]);

  const fill = (i) => {
    const newVal = i < water ? i : i + 1;
    setWater(newVal);
    setJustFilled(i);
    playSound("water");
    setTimeout(() => setJustFilled(-1), 500);
    if (newVal === 8) {
      setShowConfetti(true);
      playSound("success");
      setTimeout(() => setShowConfetti(false), 2500);
    }
  };

  confetti.current = Array.from({ length: 20 }, (_, i) => ({
    left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%`,
    background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    animationDelay: `${Math.random() * 0.5}s`,
    transform: `rotate(${Math.random() * 360}deg)`,
  }));

  return (
    <section className="fun-tracker-section">
      <span className="section-eyebrow" style={{ color: "var(--blossom-coral)" }}>Water Alarm 💧</span>
      <h2 className="section-title" style={{ color: "var(--blossom-text)", marginBottom:"1rem" }}>
        Have you had your water today?
      </h2>
      <div className="fun-tracker-card">
        {showConfetti && (
          <div className="confetti-burst">
            {confetti.current.map((s, i) => (
              <div key={i} className="confetti-piece" style={s} />
            ))}
          </div>
        )}
        <div className="water-label-row">
          {Array.from({length:8}).map((_,i)=>(<div key={i} className="water-label">#{i+1}</div>))}
        </div>
        <div className="water-gauge-row">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i}
              className={`water-glass-btn${i < water ? " filled" : ""}${justFilled === i ? " just-filled" : ""}`}
              onClick={() => fill(i)}
              aria-label={`Glass ${i+1}`}
            />
          ))}
        </div>
        <p className={`water-msg${water === 8 ? " water-complete" : ""}`}>
          {WATER_MSGS[water]}
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WORLD 1 — MOONLIGHT REVERIE
═══════════════════════════════════════════════ */
const photos = ["/1.jpeg","/2.jpeg","/3.jpeg","/4.jpeg","/5.jpeg"];
const photoLabels = ["Her energy","Candid gold","Just her","That look","Real one"];

function MoonlightWorld({ onNavigate }) {
  return (
    <div className="w-moon world-fade-enter">
      <CursorTrail color="hsla(264,100%,75%,0.8)" />
      <StarCanvas variant="moon" />
      <nav className="moon-nav content">
        <div className="moon-logo">✨ Sukanya</div>
        <ul className="moon-nav-links">
          <li><a href="#worlds">Enter a World</a></li>
          <li><a href="#heartbeat">Heartbeat</a></li>
          <li><a href="#gallery">Gallery</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="moon-hero">
        <div className="moon-hero-inner">
          <motion.div className="moon-hero-badge" initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <span>🌙</span> A World Built For Her
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.1 }}>
            Hey, <em>Sukanya</em>.<br />This is for you.
          </motion.h1>
          <motion.p className="moon-hero-sub" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.2 }}>
            A quiet little world built from real feelings. Not grand. Not perfect.
            Just honest — the way you deserve things to be.
          </motion.p>
          {/* PROMINENT ENTER REALM CTA */}
          <motion.div className="hero-realm-cta" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}>
            <a href="#worlds" className="btn-enter-realm" onClick={() => playSound("click")}>
              ✨ Enter Her Worlds ✨
            </a>
          </motion.div>
        </div>
      </section>

      {/* WORLD PORTALS — prominent, right after hero */}
      <section className="worlds-section content" id="worlds">
        <span className="section-eyebrow" style={{ color:"var(--moon-accent1)" }}>Choose</span>
        <h2 className="section-title" style={{ color:"var(--moon-text)" }}>Enter a Realm</h2>
        <div className="worlds-grid">
          {[
            { cls:"portal-moon", icon:"🌙", tag:"World 1 — You're here", title:"Moonlight Reverie", world:null,
              desc:"The quiet, dreamy landing. Stars, silvered thoughts, and everything between." },
            { cls:"portal-blossom", icon:"🌸", tag:"World 2 — Memories", title:"Blossom Chronicles", world:"blossom",
              desc:"A warm, coral-lit world of memories, golden afternoons, and who she really is." },
            { cls:"portal-cosmic", icon:"✨", tag:"World 3 — Slam Book", title:"Cosmic Dreams", world:"cosmic",
              desc:"Celestial, glowing. Where messages live forever like stars in the sky." },
          ].map(p => (
            <button key={p.title} className={`world-portal ${p.cls}`}
              onClick={() => { if(p.world) { playSound("click"); onNavigate(p.world); } }}
            >
              <span className="portal-icon">{p.icon}</span>
              <span className="portal-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span className="portal-enter">{p.world ? "Enter Realm →" : "✓ You're here"}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="moon-about content" id="about">
        <div className="moon-about-img">
          <img src="/1.jpeg" alt="Sukanya" onError={e => e.target.style.display="none"} />
        </div>
        <div className="moon-about-text fade-up">
          <span className="section-eyebrow">About Her</span>
          <h2 className="section-title">Someone you feel<br />before you understand.</h2>
          <p>She carries whole universes in her silences. The kind of person who makes ordinary Tuesday afternoons feel like they matter. Sharp, soft, and more than any label — she deserves a world that says exactly that.</p>
          <div className="moon-facts">
            {[{ num:"∞", label:"Reasons to admire" },{ num:"7:01", label:"SOS available" },{ num:"3", label:"Worlds for her" },{ num:"💕", label:"Pure intentions" }].map((f,i) => (
              <div key={i} className="moon-fact">
                <div className="moon-fact-num">{f.num}</div>
                <div className="moon-fact-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEARTBEAT */}
      <div id="heartbeat"><HeartbeatMonitor /></div>

      {/* GALLERY — all 5 photos */}
      <section className="moon-gallery content" id="gallery">
        <span className="section-eyebrow" style={{ color:"var(--moon-accent1)" }}>Gallery</span>
        <h2 className="section-title" style={{ color:"var(--moon-text)" }}>Moments worth keeping</h2>
        <div className="moon-gallery-grid">
          {photos.map((src, i) => (
            <figure key={i} className="photo-item">
              <img src={src} alt={photoLabels[i]} onError={e => {
                e.target.style.display="none";
                e.target.nextSibling && (e.target.nextSibling.style.display="flex");
              }} />
              <div className="photo-placeholder" style={{ display:"none" }}>
                📸<span>{photoLabels[i]}</span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className="moon-sos content">
        <p>Available anytime — day or night, no explanation needed.</p>
        <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WORLD 2 — BLOSSOM CHRONICLES
═══════════════════════════════════════════════ */
const TIMELINE = [
  { date:"The first time", title:"A feeling without a name", desc:"Some encounters change the air in a room. This was one of those. You probably didn't know." },
  { date:"After a while", title:"Realizing you were different", desc:"Not grand. In the small way — the way you notice a song changes everything when it comes on." },
  { date:"Right now", title:"Building this instead of saying nothing", desc:"Code is how some people speak. This is that — an honest, clumsy, real gesture." },
  { date:"Hopefully someday", title:"Chai and an actual conversation", desc:"The slow kind. No rushing. Just talking like there's no agenda at all." },
  { date:"Always", title:"A number you can call", desc:"7001684412 — no explanation needed, no questions asked. Just available." },
];
const FLIP_CAPTIONS = [
  { title:"That look", desc:"When you're only half listening but fully there." },
  { title:"Candid", desc:"The unguarded ones are always the best ones." },
  { title:"Just because", desc:"No reason needed at all." },
  { title:"The real one", desc:"The one you don't notice yourself making." },
  { title:"Here", desc:"In this moment. Exactly here." },
];
const VIBES = [
  { emoji:"🎵", title:"Her playlist taste", desc:"Picks songs that feel like daydreams on a bus ride." },
  { emoji:"☕", title:"Chai hours", desc:"Best conversations happen over slow, unhurried cups." },
  { emoji:"🌙", title:"Late night energy", desc:"When the world quiets down, she gets more real." },
  { emoji:"📱", title:"Text response speed", desc:"Reads in 2s. Replies when she's ready. Respectable." },
  { emoji:"🌸", title:"Softness as strength", desc:"Never mistake gentle for weak. Never." },
  { emoji:"💬", title:"How she listens", desc:"Actually listens. The rarest thing in humans." },
];

function BlossomWorld({ onBack, onNavigate }) {
  return (
    <div className="w-blossom world-fade-enter" style={{ position:"relative", overflow:"hidden" }}>
      {[{e:"🌸",s:{top:"5%",left:"3%",animationDelay:"0s"}},{e:"✨",s:{top:"20%",right:"5%",animationDelay:"1.5s"}},{e:"🌺",s:{bottom:"30%",left:"2%",animationDelay:"3s"}}].map((f,i)=>(
        <div key={i} className="emoji-float" style={f.s}>{f.e}</div>
      ))}

      <nav className="blossom-nav">
        <div className="blossom-logo">🌸 Blossom</div>
        <button className="back-btn" onClick={() => { playSound("click"); onBack(); }}>← Moonlight</button>
      </nav>

      <section className="blossom-hero">
        <motion.span className="section-eyebrow" initial={{ opacity:0 }} animate={{ opacity:1 }}>
          World 2 — Blossom Chronicles
        </motion.span>
        <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.1 }}>
          Warm days &amp; <em>golden memories</em>
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
          Not everything needs to be written. Some things are better lived, remembered, and felt.
        </motion.p>
      </section>

      {/* FUN FACT BAR */}
      <div style={{ padding:"0 clamp(1.5rem,5vw,4rem)", maxWidth:"900px", margin:"0 auto" }}>
        <div className="fun-fact-bar">
          "She's the kind of person you write songs about without realising you're doing it." 🎶
        </div>
      </div>

      {/* VIBES */}
      <section className="blossom-vibes">
        <span className="section-eyebrow" style={{ color:"var(--blossom-coral)" }}>Things about her 🌸</span>
        <h2 className="section-title" style={{ color:"var(--blossom-text)" }}>Her energy in cards</h2>
        <div className="vibes-grid">
          {VIBES.map((v,i) => (
            <motion.div key={i} className="vibe-card"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
            >
              <span className="vibe-emoji">{v.emoji}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WATER TRACKER */}
      <FunWaterTracker />

      {/* TIMELINE */}
      <section className="blossom-timeline">
        <span className="section-eyebrow" style={{ color:"var(--blossom-coral)" }}>Timeline</span>
        <h2 className="section-title" style={{ color:"var(--blossom-text)" }}>How we got here</h2>
        <div className="timeline-list">
          {TIMELINE.map((item,i) => (
            <motion.div key={i} className="timeline-item" style={{ "--i":i }}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLIP GALLERY — all 5 photos */}
      <section className="blossom-gallery">
        <span className="section-eyebrow" style={{ color:"var(--blossom-coral)" }}>Gallery</span>
        <h2 className="section-title" style={{ color:"var(--blossom-text)" }}>Hover to reveal ✨</h2>
        <div className="blossom-gallery-grid">
          {photos.map((src, i) => (
            <div key={i} className="flip-card">
              <div className="flip-inner">
                <div className="flip-front">
                  <img src={src} alt={`Photo ${i+1}`} onError={e => {
                    e.target.style.display="none";
                    const pb = e.target.parentElement.querySelector(".flip-placeholder");
                    if(pb) pb.style.display="flex";
                  }} />
                  <div className="flip-placeholder" style={{ display:"none", width:"100%", height:"100%", alignItems:"center", justifyContent:"center", fontSize:"3rem", background:"linear-gradient(135deg,hsl(20,80%,95%),hsl(0,80%,93%))" }}>📸</div>
                </div>
                <div className="flip-back">
                  <h4>{FLIP_CAPTIONS[i].title}</h4>
                  <p>{FLIP_CAPTIONS[i].desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="blossom-sos">
        <button className="blossom-back-home" onClick={() => { playSound("click"); onNavigate("cosmic"); }}>
          ✨ Go to Cosmic Dreams →
        </button>
        <br />
        <p style={{ color:"var(--blossom-text-soft)", marginTop:"1.5rem" }}>
          When it gets heavy — just call.
        </p>
        <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WORLD 3 — COSMIC DREAMS
═══════════════════════════════════════════════ */
const SLAM_LEVELS = [
  { id:1, label:"Level 1", title:"Quick Hello" },
  { id:2, label:"Level 2", title:"Personal Touch" },
  { id:3, label:"Level 3", title:"Rich Memory" },
  { id:4, label:"Level 4", title:"Deep Dive" },
  { id:5, label:"Level 5", title:"Full Archive" },
];
const MOODS = ["💫 Inspired","🌊 Calm","🔥 Energetic","🌙 Nostalgic","💕 Warm","⚡ Excited"];
const RELATIONS = ["Friend","Close Friend","Admirer","Colleague","Family","Stranger with love"];

function SlamBookForm({ level, onSuccess }) {
  const [data, setData] = useState({ name:"", message:"", mood:"", relation:"", story:"", visibility:"public", spotifyLink:"", location:"", tags:"" });
  const set = (k, v) => setData(d => ({ ...d, [k]:v }));
  const submit = (e) => {
    e.preventDefault();
    const entries = JSON.parse(localStorage.getItem("slambook") || "[]");
    entries.unshift({ ...data, level, timestamp: Date.now() });
    localStorage.setItem("slambook", JSON.stringify(entries));
    playSound("success");
    onSuccess();
  };
  return (
    <form className="slam-form" onSubmit={submit}>
      <div className="form-group">
        <label>Your Name</label>
        <input className="form-input" placeholder="What should she call you?" value={data.name} onChange={e=>set("name",e.target.value)} required />
      </div>
      <div className="form-group">
        <label>One-liner ✨</label>
        <input className="form-input" placeholder="One thing you want her to know..." value={data.message} onChange={e=>set("message",e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Your Mood</label>
        <div className="mood-selector">
          {MOODS.map(m => (
            <button key={m} type="button" className={`mood-btn${data.mood===m?" selected":""}`} onClick={()=>set("mood",m)}>{m}</button>
          ))}
        </div>
      </div>
      {level >= 2 && (
        <>
          <div className="form-group">
            <label>Your Story / Memory</label>
            <textarea className="form-input" placeholder="A memory, a feeling (up to 500 chars)..." maxLength={500} value={data.story} onChange={e=>set("story",e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Relationship</label>
              <select className="form-input" value={data.relation} onChange={e=>set("relation",e.target.value)}>
                <option value="">Select...</option>
                {RELATIONS.map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Visibility</label>
              <div className="visibility-toggle">
                {["public","private"].map(v=>(
                  <button key={v} type="button" className={`vis-btn${data.visibility===v?" active":""}`} onClick={()=>set("visibility",v)}>
                    {v==="public" ? "🌏 Public" : "🔒 Private"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
      {level >= 3 && (
        <div className="form-row">
          <div className="form-group">
            <label>Location / Date</label>
            <input className="form-input" placeholder="e.g. Kolkata, March 2025" value={data.location} onChange={e=>set("location",e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input className="form-input" placeholder="e.g. chai, music" value={data.tags} onChange={e=>set("tags",e.target.value)} />
          </div>
        </div>
      )}
      {level >= 4 && (
        <div className="form-group">
          <label>Spotify Song 🎵</label>
          <input className="form-input" placeholder="https://open.spotify.com/track/..." value={data.spotifyLink} onChange={e=>set("spotifyLink",e.target.value)} />
        </div>
      )}
      {level >= 5 && (
        <div className="form-group">
          <label>Birthday Reminder</label>
          <input className="form-input" type="date" />
          <small style={{ color:"var(--cosmic-text-soft)", fontSize:"0.78rem", marginTop:"0.3rem", display:"block" }}>We'll remind you ✨</small>
        </div>
      )}
      <button type="submit" className="btn-cosmic-submit" onClick={() => playSound("click")}>
        ✨ Send Into the Cosmos
      </button>
    </form>
  );
}

function CosmicWorld({ onBack }) {
  const [level, setLevel] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    setEntries(JSON.parse(localStorage.getItem("slambook") || "[]"));
  }, [submitted]);

  return (
    <div className="w-cosmic world-fade-enter">
      <CursorTrail color="hsla(190,100%,55%,0.8)" />
      <StarCanvas variant="cosmic" />
      <nav className="cosmic-nav content">
        <div className="cosmic-logo">✨ Cosmic</div>
        <button className="back-btn" style={{ color:"var(--cosmic-text-soft)" }} onClick={() => { playSound("click"); onBack(); }}>← Moonlight</button>
      </nav>
      <section className="cosmic-hero">
        <div className="cosmic-hero-inner">
          <motion.span className="section-eyebrow" initial={{ opacity:0 }} animate={{ opacity:1 }}>World 3 — Cosmic Dreams</motion.span>
          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.1 }}>
            Leave her a <em>cosmic message</em>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.25 }}>
            Words that float like stars. Messages that stay. This is the slam book she deserves.
          </motion.p>
        </div>
      </section>
      <section className="slambook-section content">
        <span className="section-eyebrow">Slam Book</span>
        <h2 className="section-title">Write your entry</h2>
        <p style={{ color:"var(--cosmic-text-soft)", marginBottom:"0.5rem" }}>
          Choose your depth — all levels are equally valid. ✨
        </p>
        <div className="level-tabs">
          {SLAM_LEVELS.map(l => (
            <button key={l.id} className={`level-tab${level===l.id?" active":""}`}
              onClick={() => { setLevel(l.id); setSubmitted(false); playSound("click"); }}
            >{l.label}: {l.title}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" className="slam-form success-screen"
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            >
              <div className="success-icon">🌟</div>
              <h2>Sent into the cosmos!</h2>
              <p>Your message is preserved forever — like a star.</p>
              <button className="btn-cosmic-ghost" onClick={() => setSubmitted(false)}>Write Another ✨</button>
            </motion.div>
          ) : (
            <motion.div key={`form-${level}`} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}>
              <SlamBookForm level={level} onSuccess={() => setSubmitted(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {entries.filter(e=>e.visibility!=="private").length > 0 && (
        <section className="entries-section content">
          <span className="section-eyebrow" style={{ color:"var(--cosmic-gold)" }}>Messages from the cosmos</span>
          <h2 className="section-title" style={{ fontSize:"1.8rem", marginBottom:"2rem" }}>What people say about her ✨</h2>
          {entries.filter(e=>e.visibility!=="private").map((e,i) => (
            <motion.div key={i} className="entry-card entry-glow"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.07 }}
            >
              <div className="entry-header">
                <div className="entry-avatar">{e.name?.[0]?.toUpperCase() || "✨"}</div>
                <div className="entry-meta">
                  <div className="entry-name">{e.name || "Anonymous"}</div>
                  <div className="entry-mood">{e.mood} · {e.relation || "A well-wisher"} · Level {e.level}</div>
                </div>
              </div>
              <p className="entry-message">{e.message}</p>
              {e.story && <p className="entry-message" style={{ marginTop:"0.7rem", opacity:0.8, fontSize:"0.9rem" }}>{e.story}</p>}
              {e.location && <p style={{ fontSize:"0.78rem", color:"var(--cosmic-gold)", marginTop:"0.5rem" }}>📍 {e.location}</p>}
            </motion.div>
          ))}
        </section>
      )}
      <div className="cosmic-sos content">
        <p>Need her right now? She gave permission to share this.</p>
        <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
const SPOTIFY_TRACKS = {
  moon: "0cYohCh24y1aMjJmcS9RBl",
  blossom: "2znooFkKzDQ3mC8sWCFuG6",
  cosmic: "0cYohCh24y1aMjJmcS9RBl",
};

export default function App() {
  const [world, setWorld] = useState("moon");
  return (
    <>
      <VolumeToast />
      <GlobalSOS />
      <SlamSidebar />
      <PersonalNotepad />
      <SpotifyWidget key={world} trackId={SPOTIFY_TRACKS[world]} />
      <AnimatePresence mode="wait">
        {world === "moon" && (
          <motion.div key="moon" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
            <MoonlightWorld onNavigate={setWorld} />
          </motion.div>
        )}
        {world === "blossom" && (
          <motion.div key="blossom" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
            <BlossomWorld onBack={() => setWorld("moon")} onNavigate={setWorld} />
          </motion.div>
        )}
        {world === "cosmic" && (
          <motion.div key="cosmic" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.4 }}>
            <CosmicWorld onBack={() => setWorld("moon")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
