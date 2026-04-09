import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import "./premium.css";

/* ═══════════════════════════════════════════════
   SOUND ENGINE
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
   OPENING LETTER POPUP
═══════════════════════════════════════════════ */
function OpeningLetter({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="letter-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="letter-modal"
          initial={{ opacity: 0, y: 60, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="letter-top-deco">✉️</div>
          <p className="letter-text">
            Hey — Ik it's kinda cliche but well, I am like that.
          </p>
          <p className="letter-text">
            Sorry if you find this creepy but that wasn't my intention at all..
          </p>
          <p className="letter-text">
            You'll be leaving the city in a month and probably we'll stay in touch but you know, maybe not so much — we'll have our own different lives to carry on.
          </p>
          <p className="letter-text">
            So this will be a small memory whenever we look back. And well, maybe not everyone comes into your life to stay — but definitely, as long as they are there, they make life feel like living and being happy.
          </p>
          <p className="letter-text" style={{ fontStyle: "italic", opacity: 0.75 }}>
            So ya !! 🌸
          </p>
          <button className="letter-close-btn" onClick={() => { playSound("click"); onClose(); }}>
            Step inside ✨
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
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
    const t2 = setTimeout(() => { setVisible(false); localStorage.setItem("vol-shown", "1"); }, 4500);
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
   SECRET VAULT (EASTER EGG)
═══════════════════════════════════════════════ */
function SecretVault({ onClose }) {
  return (
    <motion.div
      className="vault-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <motion.div
        className="vault-modal"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <button className="vault-close" onClick={() => { playSound("click"); onClose(); }}>✕</button>
        <h3 style={{ fontFamily: "var(--ff-display)", fontSize: "1.8rem", color: "var(--moon-accent1)", marginBottom: "1rem" }}>
          Midnight Vault 🌙
        </h3>
        <p style={{ color: "var(--moon-text)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
          You tapped 5 times. You broke the simulation.<br/>
          This is a secret space. Just for us.
        </p>
        <div className="vault-secret" style={{ padding: "1.5rem", background: "rgba(0,0,0,0.4)", borderRadius: "12px", border: "1px dashed var(--moon-accent1)", fontStyle: "italic", color: "var(--moon-text-soft)" }}>
          "Some people you just don't forget. No matter the distance, no matter the silence, their frequency stays with you."
        </div>
        <p className="vault-sub" style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "gray", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Keep this hidden.
        </p>
      </motion.div>
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
   SLAM SIDEBAR
═══════════════════════════════════════════════ */
const SIDEBAR_MOODS = ["💫", "🌊", "🔥", "🌙", "💕", "⚡"];
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
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {done ? (
              <div className="sidebar-success">
                <div className="sidebar-success-icon">🌟</div>
                <p style={{ color: "var(--cosmic-text-soft)", marginTop: "0.5rem" }}>Your note is in the cosmos!</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3>✨ Leave a Note</h3>
                <p>Tell her something she deserves to hear.</p>
                <input className="sidebar-form-input" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
                <textarea className="sidebar-form-input" placeholder="Your message..." value={msg} onChange={e => setMsg(e.target.value)} rows={3} required style={{ resize: "none" }} />
                <div className="sidebar-mood-row">
                  {SIDEBAR_MOODS.map(m => (
                    <button key={m} type="button"
                      className={`sidebar-mood-btn${mood === m ? " active" : ""}`}
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
      <div className="slam-sidebar-tab" onClick={() => { setOpen(o => !o); playSound("click"); }}>
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
        onClick={() => { setOpen(o => !o); playSound("click"); }}
      >📓</button>
      <AnimatePresence>
        {open && (
          <motion.div className="notepad-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
          style={{ width: 8 - i * 0.6, height: 8 - i * 0.6, background: color, opacity: 1 - (i / NUM) * 0.85 }}
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
  const mouseRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 60;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 60;
    };
    window.addEventListener("mousemove", handleMouseMove);

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
      parallaxFactor: Math.random() * 1.5 + 0.5,
      color: variant === "cosmic"
        ? (Math.random() > 0.7 ? `hsl(190,100%,${70 + Math.random() * 20}%)` : Math.random() > 0.5 ? `hsl(45,100%,${65 + Math.random() * 20}%)` : "#fff")
        : `hsl(${240 + Math.random() * 60},80%,${80 + Math.random() * 15}%)`,
    }));
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); t += 0.01;
      
      mouseRef.current.currentX += (mouseRef.current.targetX - mouseRef.current.currentX) * 0.05;
      mouseRef.current.currentY += (mouseRef.current.targetY - mouseRef.current.currentY) * 0.05;

      stars.forEach(s => {
        s.alpha = 0.3 + 0.5 * Math.abs(Math.sin(t * s.speed * 50 + s.x));
        // Infinite tiling handling for x and parallax combined is tricky, so we just clamp or let it overlap
        // A simple wrap around:
        let px = s.x + mouseRef.current.currentX * s.parallaxFactor;
        let py = s.y + mouseRef.current.currentY * s.parallaxFactor;
        if (px > canvas.width + 10) px -= canvas.width + 20;
        if (px < -10) px += canvas.width + 20;
        if (py > canvas.height + 10) py -= canvas.height + 20;
        if (py < -10) py += canvas.height + 20;

        ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color; ctx.globalAlpha = s.alpha; ctx.fill();
      });
      ctx.globalAlpha = 1; animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { 
      cancelAnimationFrame(animId); 
      window.removeEventListener("resize", resize); 
      window.removeEventListener("mousemove", handleMouseMove);
    };
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
    setBpm(nb); setPumping(true); setClicks(c => c + 1);
    playSound("heart");
    setTimeout(() => setPumping(false), 300);
  };

  const msgIdx = Math.min(clicks, HEART_MSGS.length - 1);

  return (
    <section className="heartbeat-section content" id="heartbeat">
      <span className="section-eyebrow" style={{ color: "var(--moon-accent1)" }}>Interactive</span>
      <h2 className="section-title" style={{ color: "var(--moon-text)", marginBottom: "2rem" }}>
        What happens to my heart
      </h2>
      <div className={`heart-monitor-card ${bpm > 100 ? "high-bpm" : ""}`}>
        <canvas ref={canvasRef} className="ecg-canvas" />
        <div className="heart-display">
          <div className={`heart-icon-big${pumping ? " pump" : ""}`} style={{ color: bpm > 110 ? "var(--blossom-coral)" : "inherit" }}>❤️</div>
          <div>
            <div className="heart-bpm" style={{ color: bpm > 110 ? "var(--blossom-coral)" : "var(--moon-text)" }}>{bpm}</div>
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
   WATER TRACKER
═══════════════════════════════════════════════ */
const WATER_MSGS = [
  "hey. drink water. now.", "1 down! keep going darling 💧",
  "2! she's doing it 🌊", "halfway there! proud of you 💕",
  "4 glasses !! legend behaviour 🌸", "5! unstoppable ✨",
  "6 glasses omg 🌟", "7! you're basically a mermaid 🧜‍♀️",
  "ALL 8! 🎉 LEGENDARY. You actually listened!!"
];
const CONFETTI_COLORS = ["#ff6b6b", "#f4c2a0", "#ffd700", "#a855f7", "#00d4ff", "#ff85b3"];

function FunWaterTracker() {
  const [water, setWater] = useState(0);
  const [justFilled, setJustFilled] = useState(-1);
  const [showConfetti, setShowConfetti] = useState(false);
  const confetti = useRef([]);

  const fill = (i) => {
    const newVal = i < water ? i : i + 1;
    setWater(newVal); setJustFilled(i);
    playSound("water");
    setTimeout(() => setJustFilled(-1), 500);
    if (newVal === 8) {
      setShowConfetti(true); playSound("success");
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
      <h2 className="section-title" style={{ color: "var(--blossom-text)", marginBottom: "1rem" }}>
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
          {Array.from({ length: 8 }).map((_, i) => (<div key={i} className="water-label">#{i + 1}</div>))}
        </div>
        <div className="water-gauge-row">
          {Array.from({ length: 8 }).map((_, i) => (
            <button key={i}
              className={`water-glass-btn${i < water ? " filled" : ""}${justFilled === i ? " just-filled" : ""}`}
              onClick={() => fill(i)}
              aria-label={`Glass ${i + 1}`}
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
   NEUTRAL LANDING (HOME)
═══════════════════════════════════════════════ */
function LandingPage({ onChoose }) {
  const [fade, setFade] = useState(1);
  const v1 = useRef();
  const v2 = useRef();

  useEffect(() => {
    const vid1 = v1.current;
    if (!vid1) return;

    let rafId;
    const check = () => {
      const duration = vid1.duration;
      if (duration > 0) {
        const remaining = duration - vid1.currentTime;
        if (remaining < 0.6) {
          setFade(remaining / 0.6);
        } else if (vid1.currentTime < 0.6) {
          setFade(vid1.currentTime / 0.6);
        } else {
          setFade(1);
        }
        
        if (remaining < 0.01) {
          vid1.currentTime = 0;
          vid1.play().catch(() => {});
        }
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-landing world-fade-enter" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <div 
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          zIndex: -1, pointerEvents: 'none',
          filter: "brightness(0.75) contrast(1.15)"
        }}
      >
        <video
          ref={v1}
          autoPlay muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: fade }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(15, 10, 30, 0.9))' }} />
      </div>
      <StarCanvas variant="moon" />
      <CursorTrail color="hsla(264,100%,75%,0.8)" />

      <div className="landing-center">
        <motion.div
          className="landing-letter-deco"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          ✨
        </motion.div>

        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hey, <em>Sukanya</em>.
        </motion.h1>

        <motion.p
          className="landing-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Something small was made for you.<br />Where do you want to go?
        </motion.p>

        <div className="landing-ticker-wrap">
          <div className="landing-ticker">
            {"✨ made for you · 💌 honest & soft · 🌸 something small · 💫 just for you · 🦋 butterflies · 🌙 late night energy · ".repeat(6)}
          </div>
        </div>

        <motion.div
          className="landing-choices"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            className="landing-choice-btn landing-choice-love"
            onClick={() => { playSound("click"); onChoose("love"); }}
          >
            <span className="choice-icon">💌</span>
            <span className="choice-label">The Personal Side</span>
            <span className="choice-hint">A little honest, a little soft</span>
          </button>

          <button
            className="landing-choice-btn landing-choice-friends"
            onClick={() => { playSound("click"); onChoose("moon"); }}
          >
            <span className="choice-icon">🌸</span>
            <span className="choice-label">Her World</span>
            <span className="choice-hint">Memories, vibes &amp; her people</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   LOVE PAGE — password gated
═══════════════════════════════════════════════ */
function LovePage({ onBack, onNavigate }) {
  const [step, setStep] = useState("warning"); // warning | password | content
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [butterfliesRevealed, setButterfliesRevealed] = useState(false);
  const [showCompliment, setShowCompliment] = useState(null);
  
  // Easter Egg Logic
  const [logoClicks, setLogoClicks] = useState(0);
  const [vaultOpen, setVaultOpen] = useState(false);

  const handleLogoClick = () => {
    const newClicks = logoClicks + 1;
    setLogoClicks(newClicks);
    if (newClicks >= 5) {
      playSound("open");
      setVaultOpen(true);
      setLogoClicks(0);
    } else {
      playSound("click");
    }
  };

  const COMPLIMENTS = [
    "You make ordinary moments feel like poetry 🌸",
    "The way you listen — it's actually rare, and you don't even know it 💫",
    "Your words carry more weight than you think ✨",
    "You're the kind of person people write songs about without realising they're doing it 🎵",
    "Your gestures say more than most people's paragraphs 💌",
    "There's something about your energy that just — stays 🌙",
    "You're not just pretty by looks. By words. By gestures. By actions. All of it. 💕",
  ];

  const tryPassword = () => {
    if (pw === "4412") {
      playSound("success");
      setStep("content");
      setPwError(false);
    } else {
      setPwError(true);
      playSound("click");
      setTimeout(() => setPwError(false), 1200);
    }
  };

  if (step === "warning") {
    return (
      <div className="love-gate world-fade-enter">
        <StarCanvas variant="moon" />
        <motion.div
          className="love-warning-box"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="love-warning-icon">⚠️</div>
          <h2 className="love-warning-title">Hold on a second</h2>
          <p className="love-warning-text">
            This section is a little personal. It's honest and soft and maybe a tiny bit embarrassing for me.
          </p>
          <p className="love-warning-text" style={{ opacity: 0.7, fontSize: "0.9rem" }}>
            No pressure. You can always go back.
          </p>
          <div className="love-warning-btns">
            <button className="love-warning-proceed" onClick={() => { playSound("click"); setStep("password"); }}>
              I'm okay with that →
            </button>
            <button className="love-warning-back" onClick={() => { playSound("click"); onBack(); }}>
              ← Take me back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === "password") {
    return (
      <div className="love-gate world-fade-enter">
        <StarCanvas variant="moon" />
        <motion.div
          className="love-warning-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="love-warning-icon">🔒</div>
          <h2 className="love-warning-title">One small thing</h2>
          <p className="love-warning-text">
            You know the password. It's yours. 💌
          </p>
          <input
            className={`love-pw-input${pwError ? " shake" : ""}`}
            type="password"
            placeholder="Enter password..."
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === "Enter" && tryPassword()}
            maxLength={10}
            autoFocus
          />
          {pwError && <p className="love-pw-error">That's not it 🌸 think again...</p>}
          <div className="love-warning-btns">
            <button className="love-warning-proceed" onClick={tryPassword}>
              Enter →
            </button>
            <button className="love-warning-back" onClick={() => { playSound("click"); setStep("warning"); }}>
              ← Go back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // CONTENT — the actual love page
  return (
    <div className="w-moon world-fade-enter">
      <CursorTrail color="hsla(350,100%,75%,0.8)" />
      <StarCanvas variant="moon" />

      <nav className="moon-nav content">
        <div className="moon-logo" onClick={handleLogoClick} style={{ cursor: "pointer", userSelect: "none" }}>💌 For You</div>
        <button className="back-btn" onClick={() => { playSound("click"); onBack(); }}>← Back</button>
      </nav>

      {/* BUTTERFLIES SECTION */}
      <section className="butterflies-section content">
        <motion.span className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Something I noticed
        </motion.span>
        <motion.h2
          className="section-title"
          style={{ color: "var(--moon-text)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          After a long time, someone made me feel butterflies —
        </motion.h2>
        <motion.p
          style={{ color: "var(--moon-text-soft)", fontSize: "1.1rem", marginBottom: "2rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          You know who?
        </motion.p>

        {!butterfliesRevealed ? (
          <motion.button
            className="btn-who"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => { playSound("heart"); setButterfliesRevealed(true); }}
          >
            Who? 🦋
          </motion.button>
        ) : (
          <motion.div
            className="butterflies-reveal"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="butterflies-name">You. 🦋</div>
            <p className="butterflies-pause">
              But maybe not the right time.<br />
              So let's just pause it right there.
            </p>
            <p className="butterflies-dots">. . .</p>
          </motion.div>
        )}
      </section>

      {/* FLOATING MEMORIES — THE NEXT LEVEL PARALLEL */}
      <section className="parallel-section content">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <span className="section-eyebrow">Parallel Realities</span>
          <p className="parallel-line" style={{ display: "block", marginBottom: "3rem" }}>
            Maybe in another world, we never had to say goodbye.
          </p>
        </motion.div>
        
        <div className="floating-memories-wrap">
          {[
            { src: "/1.jpeg", rot: -5 },
            { src: "/2.jpeg", rot: 3 },
            { src: "/3.jpeg", rot: -2 },
            { src: "/1.jpeg", rot: 6 },
            { src: "/2.jpeg", rot: -4 }
          ].map((m, i) => (
            <motion.div
              key={i}
              className="memory-polaroid"
              style={{ "--rot": `${m.rot}deg` }}
              whileHover={{ scale: 1.15, rotate: 0 }}
              drag dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            >
              <img src={m.src} alt="" onError={e => e.target.src = "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?auto=format&fit=crop&q=80&w=200"} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTIMACY TIMELINE */}
      <section className="content" style={{ padding: "5rem 0" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span className="section-eyebrow">Little Things</span>
          <h2 className="section-title">The words that stayed</h2>
        </div>
        
        <div className="intimacy-timeline">
          {[
            { icon: "✨", t: "The Listening", d: "How you actually hear what's not being said. It's rare." },
            { icon: "💌", t: "The Gestures", d: "The way you notice small details that others miss." },
            { icon: "🦋", t: "The Warmth", d: "A comfort that doesn't need to be explained in words." }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="timeline-mark"
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.25, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, backgroundColor: "hsla(240,43%,25%,0.6)" }}
            >
              <div className="timeline-mark-icon">{item.icon}</div>
              <div className="timeline-mark-content">
                <h4>{item.t}</h4>
                <p>{item.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMPLIMENTS */}
      <section className="compliments-section content">
        <span className="section-eyebrow" style={{ color: "var(--moon-accent1)" }}>For real though</span>
        <h2 className="section-title" style={{ color: "var(--moon-text)", marginBottom: "0.5rem" }}>
          Things you should hear more often
        </h2>
        <p style={{ color: "var(--moon-text-soft)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Tap any to read it.
        </p>
        <div className="compliments-grid">
          {COMPLIMENTS.map((c, i) => (
            <motion.button
              key={i}
              className={`compliment-bubble${showCompliment === i ? " active" : ""}`}
              onClick={() => { playSound("click"); setShowCompliment(showCompliment === i ? null : i); }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <AnimatePresence mode="wait">
                {showCompliment === i ? (
                  <motion.span key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {c}
                  </motion.span>
                ) : (
                  <motion.span key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    ✨ Tap me
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </section>

      {/* HEARTBEAT ON LOVE PAGE */}
      <div id="heartbeat"><HeartbeatMonitor /></div>

      {/* ALWAYS GOT YOUR BACK */}
      <section className="got-your-back content">
        <motion.div
          className="gotback-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gotback-icon">🫂</div>
          <h2 className="gotback-title">You always got my back.</h2>
          <p className="gotback-sub">
            And for that — this whole thing, all of it, was worth making.
          </p>
          <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
        </motion.div>
      </section>

      {/* NAV TO OTHER WORLDS */}
      <div style={{ textAlign: "center", padding: "2rem", paddingBottom: "4rem" }}>
        <button className="blossom-back-home" onClick={() => { playSound("click"); onNavigate("moon"); }}>
          See Her World →
        </button>
      </div>

      {/* EASTER EGG RENDER */}
      <AnimatePresence>
        {vaultOpen && <SecretVault onClose={() => setVaultOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   GUIDE PAGE
═══════════════════════════════════════════════ */
function GuidePage({ onClose }) {
  const features = [
    { icon: "💌", title: "The Personal Side", desc: "A private space with honest feelings. You'll need the password to enter — you know it." },
    { icon: "🌸", title: "Her World", desc: "Vibes, memories, timeline, photos and a water tracker because hydration matters." },
    { icon: "💧", title: "Water Alarm", desc: "Track 8 glasses. Click the cups. Get judged lovingly if you don't." },
    { icon: "🎴", title: "Tarot Vibes", desc: "A little cosmic card pull — just for fun." },
    { icon: "🎵", title: "Playlist", desc: "Songs that match the mood of each world." },
    { icon: "✨", title: "Slam Book", desc: "Her friends can leave messages, memories and love. Lives here forever." },
    { icon: "📓", title: "Notepad", desc: "The little 📓 button — your own private notes. Stored only on your phone." },
    { icon: "✉️", title: "Leave a Note", desc: "The floating sidebar — tell her something she deserves to hear." },
    { icon: "🆘", title: "SOS", desc: "One tap call. Available anytime, no questions asked." },
    { icon: "🎴", title: "Cosmic Dreams", desc: "A slam book world where people send her messages that float like stars." },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="guide-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="guide-modal"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="guide-header">
            <h2>✨ What's in here?</h2>
            <p>A quick tour of everything built for you.</p>
            <button className="guide-close" onClick={() => { playSound("click"); onClose(); }}>✕</button>
          </div>
          <div className="guide-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="guide-item"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <span className="guide-item-icon">{f.icon}</span>
                <div>
                  <div className="guide-item-title">{f.title}</div>
                  <div className="guide-item-desc">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="letter-close-btn" style={{ marginTop: "1.5rem" }} onClick={() => { playSound("click"); onClose(); }}>
            Got it! ✨
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════
   TAROT CARD
═══════════════════════════════════════════════ */
const TAROT_CARDS = [
  { name: "The Star", emoji: "⭐", meaning: "Hope is not naive. It's brave. Keep going." },
  { name: "The Moon", emoji: "🌙", meaning: "Trust your instincts. Even the unclear path is yours." },
  { name: "The Sun", emoji: "☀️", meaning: "Good things are coming. You are the warmth." },
  { name: "Strength", emoji: "🦁", meaning: "You're stronger than you've been giving yourself credit for." },
  { name: "The World", emoji: "🌍", meaning: "A chapter is completing. You've grown more than you know." },
  { name: "The Fool", emoji: "🌈", meaning: "A beautiful beginning. Trust the leap." },
  { name: "The High Priestess", emoji: "🔮", meaning: "Your intuition knows. Listen to it quietly." },
  { name: "Ace of Cups", emoji: "💫", meaning: "Something new and tender is opening in you." },
];

function TarotCard() {
  const [drawn, setDrawn] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const draw = () => {
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setDrawn(card); setFlipped(false);
    playSound("click");
    setTimeout(() => setFlipped(true), 200);
  };

  return (
    <div className="tarot-wrap">
      <span className="section-eyebrow" style={{ color: "var(--moon-accent1)" }}>🎴 Tarot Vibes</span>
      <h3 className="tarot-heading">Pull a card for the day</h3>
      {!drawn ? (
        <button className="tarot-draw-btn" onClick={draw}>Draw a Card 🔮</button>
      ) : (
        <motion.div
          className={`tarot-card${flipped ? " flipped" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="tarot-emoji">{drawn.emoji}</div>
          <div className="tarot-name">{drawn.name}</div>
          <div className="tarot-meaning">{drawn.meaning}</div>
          <button className="tarot-again" onClick={draw}>Draw again ✨</button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MINI PLAYLIST
═══════════════════════════════════════════════ */
const PLAYLIST = [
  { title: "Aaj Ki Raat", artist: "AR Rahman", id: "0cYohCh24y1aMjJmcS9RBl" },
  { title: "Tum Se Hi", artist: "Mohit Chauhan", id: "2znooFkKzDQ3mC8sWCFuG6" },
  { title: "Iktara", artist: "Kavita Seth", id: "0cYohCh24y1aMjJmcS9RBl" },
  { title: "Khaabon Ke Parinday", artist: "Mohit Chauhan", id: "2znooFkKzDQ3mC8sWCFuG6" },
];

function MiniPlaylist() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(null);

  return (
    <div className="mini-playlist-wrap">
      <button className="mini-playlist-toggle" onClick={() => { setOpen(o => !o); playSound("click"); }}>
        🎵 Playlist {open ? "▲" : "▼"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mini-playlist-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {PLAYLIST.map((track, i) => (
              <div
                key={i}
                className={`mini-track${playing === i ? " playing" : ""}`}
                onClick={() => { setPlaying(i); playSound("click"); }}
              >
                <span className="mini-track-icon">{playing === i ? "▶" : "♪"}</span>
                <div>
                  <div className="mini-track-title">{track.title}</div>
                  <div className="mini-track-artist">{track.artist}</div>
                </div>
              </div>
            ))}
            {playing !== null && (
              <div style={{ padding: "0.5rem 0 0.3rem" }}>
                <iframe
                  style={{ borderRadius: "8px" }}
                  src={`https://open.spotify.com/embed/track/${PLAYLIST[playing].id}?utm_source=generator&theme=0`}
                  width="100%" height="80" frameBorder="0" allowFullScreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WORLD 1 — MOONLIGHT REVERIE (her friends' world)
═══════════════════════════════════════════════ */
const photos = ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg"];
const photoLabels = ["Her energy", "Candid gold", "Just her", "That look", "Real one"];

const VIBES = [
  { emoji: "🎵", title: "Her playlist taste", desc: "Picks songs that feel like daydreams on a bus ride." },
  { emoji: "☕", title: "Chai hours", desc: "Best conversations happen over slow, unhurried cups." },
  { emoji: "🌙", title: "Late night energy", desc: "When the world quiets down, she gets more real." },
  { emoji: "📱", title: "Text response speed", desc: "Reads in 2s. Replies when she's ready. Respectable." },
  { emoji: "🌸", title: "Softness as strength", desc: "Never mistake gentle for weak. Never." },
  { emoji: "💬", title: "How she listens", desc: "Actually listens. The rarest thing in humans." },
];

const TIMELINE = [
  { date: "The first time", title: "A feeling without a name", desc: "Some encounters change the air in a room. This was one of those." },
  { date: "After a while", title: "Realizing you were different", desc: "Not grand. In the small way — the way you notice a song changes everything." },
  { date: "Right now", title: "Building this instead of saying nothing", desc: "Code is how some people speak. This is that — honest and clumsy and real." },
  { date: "Hopefully someday", title: "Chai and an actual conversation", desc: "The slow kind. No rushing. Just talking like there's no agenda at all." },
  { date: "Always", title: "A number you can call", desc: "7001684412 — no explanation needed, no questions asked. Just available." },
];

const FLIP_CAPTIONS = [
  { title: "That look", desc: "When you're only half listening but fully there." },
  { title: "Candid", desc: "The unguarded ones are always the best ones." },
  { title: "Just because", desc: "No reason needed at all." },
  { title: "The real one", desc: "The one you don't notice yourself making." },
  { title: "Here", desc: "In this moment. Exactly here." },
];

function MoonlightWorld({ onNavigate }) {
  return (
    <div className="w-moon world-fade-enter">
      <CursorTrail color="hsla(264,100%,75%,0.8)" />
      <StarCanvas variant="moon" />
      <nav className="moon-nav content">
        <div className="moon-logo">✨ Sukanya</div>
        <ul className="moon-nav-links">
          <li><a href="#vibes">Her Vibes</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#heartbeat">Heartbeat</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="moon-hero">
        <div className="moon-hero-inner">
          <motion.div className="moon-hero-badge" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span>🌸</span> Her World
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Everything worth<br /><em>remembering</em>.
          </motion.h1>
          <motion.p className="moon-hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
            Friends, vibes, memories, water reminders. This is her space.
          </motion.p>
        </div>
      </section>

      {/* TICKER STRIP */}
      <div className="moon-ticker-wrap">
        <div className="moon-ticker">
          {"🌸 her world · ✨ real moments · 💫 vibes only · 🌙 candid gold · 💕 softness is strength · 🎵 good playlists · ☕ chai hours · ".repeat(5)}
        </div>
      </div>
      <div className="moon-ticker-wrap" style={{ marginTop: "1px" }}>
        <div className="moon-ticker moon-ticker-reverse">
          {"💌 she deserves this · 🦋 just like that · 🌊 late nights · ⭐ one of one · 🎴 tarot vibes · 💬 actually listens · ".repeat(5)}
        </div>
      </div>

      {/* FRIENDS TOOLS — small icon row */}
      <section className="friends-tools-section content" id="tools">
        <span className="section-eyebrow" style={{ color: "var(--moon-accent1)" }}>For Her Friends</span>
        <h2 className="section-title" style={{ color: "var(--moon-text)", marginBottom: "1.5rem" }}>Little things that pop</h2>

        <div className="friends-icons-row">
          <div className="friend-icon-card">
            <FunWaterTracker />
          </div>
          <div className="friend-icon-card">
            <TarotCard />
          </div>
          <div className="friend-icon-card">
            <MiniPlaylist />
          </div>
        </div>
      </section>

      {/* VIBES */}
      <section className="blossom-vibes" id="vibes">
        <span className="section-eyebrow" style={{ color: "var(--blossom-coral)" }}>Things about her 🌸</span>
        <h2 className="section-title" style={{ color: "var(--moon-text)" }}>Her energy in cards</h2>
        <div className="vibes-grid">
          {VIBES.map((v, i) => (
            <motion.div key={i} className="vibe-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="vibe-emoji">{v.emoji}</span>
              <h4>{v.title}</h4>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="blossom-timeline">
        <span className="section-eyebrow" style={{ color: "var(--blossom-coral)" }}>Timeline</span>
        <h2 className="section-title" style={{ color: "var(--moon-text)" }}>How we got here</h2>
        <div className="timeline-list">
          {TIMELINE.map((item, i) => (
            <motion.div key={i} className="timeline-item" style={{ "--i": i }}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALLERY — flip cards */}
      <section className="blossom-gallery" id="gallery">
        <span className="section-eyebrow" style={{ color: "var(--blossom-coral)" }}>Gallery</span>
        <h2 className="section-title" style={{ color: "var(--moon-text)" }}>Hover to reveal ✨</h2>
        <div className="blossom-gallery-grid">
          {photos.map((src, i) => (
            <div key={i} className="flip-card">
              <div className="flip-inner">
                <div className="flip-front">
                  <img src={src} alt={`Photo ${i + 1}`} onError={e => {
                    e.target.style.display = "none";
                    const pb = e.target.parentElement.querySelector(".flip-placeholder");
                    if (pb) pb.style.display = "flex";
                  }} />
                  <div className="flip-placeholder" style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: "3rem", background: "linear-gradient(135deg,hsl(20,80%,95%),hsl(0,80%,93%))" }}>📸</div>
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

      {/* HEARTBEAT */}
      <div id="heartbeat"><HeartbeatMonitor /></div>

      {/* GOT YOUR BACK ENDING */}
      <section className="got-your-back content">
        <motion.div
          className="gotback-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gotback-icon">🫂</div>
          <h2 className="gotback-title">You always got my back.</h2>
          <p className="gotback-sub">That's the whole point of this.</p>
          <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
        </motion.div>
      </section>

      {/* GO TO COSMIC */}
      <div style={{ textAlign: "center", padding: "2rem 1rem 4rem" }}>
        <button className="blossom-back-home" onClick={() => { playSound("click"); onNavigate("cosmic"); }}>
          ✨ Leave her a cosmic message →
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WORLD 3 — COSMIC DREAMS
═══════════════════════════════════════════════ */
const SLAM_LEVELS = [
  { id: 1, label: "Level 1", title: "Quick Hello" },
  { id: 2, label: "Level 2", title: "Personal Touch" },
  { id: 3, label: "Level 3", title: "Rich Memory" },
  { id: 4, label: "Level 4", title: "Deep Dive" },
  { id: 5, label: "Level 5", title: "Full Archive" },
];
const MOODS = ["💫 Inspired", "🌊 Calm", "🔥 Energetic", "🌙 Nostalgic", "💕 Warm", "⚡ Excited"];
const RELATIONS = ["Friend", "Close Friend", "Admirer", "Colleague", "Family", "Stranger with love"];

function SlamBookForm({ level, onSuccess }) {
  const [data, setData] = useState({ name: "", message: "", mood: "", relation: "", story: "", visibility: "public", spotifyLink: "", location: "", tags: "" });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
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
        <input className="form-input" placeholder="What should she call you?" value={data.name} onChange={e => set("name", e.target.value)} required />
      </div>
      <div className="form-group">
        <label>One-liner ✨</label>
        <input className="form-input" placeholder="One thing you want her to know..." value={data.message} onChange={e => set("message", e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Your Mood</label>
        <div className="mood-selector">
          {MOODS.map(m => (
            <button key={m} type="button" className={`mood-btn${data.mood === m ? " selected" : ""}`} onClick={() => set("mood", m)}>{m}</button>
          ))}
        </div>
      </div>
      {level >= 2 && (
        <>
          <div className="form-group">
            <label>Your Story / Memory</label>
            <textarea className="form-input" placeholder="A memory, a feeling (up to 500 chars)..." maxLength={500} value={data.story} onChange={e => set("story", e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Relationship</label>
              <select className="form-input" value={data.relation} onChange={e => set("relation", e.target.value)}>
                <option value="">Select...</option>
                {RELATIONS.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Visibility</label>
              <div className="visibility-toggle">
                {["public", "private"].map(v => (
                  <button key={v} type="button" className={`vis-btn${data.visibility === v ? " active" : ""}`} onClick={() => set("visibility", v)}>
                    {v === "public" ? "🌏 Public" : "🔒 Private"}
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
            <input className="form-input" placeholder="e.g. Kolkata, March 2025" value={data.location} onChange={e => set("location", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tags</label>
            <input className="form-input" placeholder="e.g. chai, music" value={data.tags} onChange={e => set("tags", e.target.value)} />
          </div>
        </div>
      )}
      {level >= 4 && (
        <div className="form-group">
          <label>Spotify Song 🎵</label>
          <input className="form-input" placeholder="https://open.spotify.com/track/..." value={data.spotifyLink} onChange={e => set("spotifyLink", e.target.value)} />
        </div>
      )}
      {level >= 5 && (
        <div className="form-group">
          <label>Birthday Reminder</label>
          <input className="form-input" type="date" />
          <small style={{ color: "var(--cosmic-text-soft)", fontSize: "0.78rem", marginTop: "0.3rem", display: "block" }}>We'll remind you ✨</small>
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
        <button className="back-btn" style={{ color: "var(--cosmic-text-soft)" }} onClick={() => { playSound("click"); onBack(); }}>← Back</button>
      </nav>
      <section className="cosmic-hero">
        <div className="cosmic-hero-inner">
          <motion.span className="section-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Cosmic Dreams</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            Leave her a <em>cosmic message</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            Words that float like stars. Messages that stay. This is the slam book she deserves.
          </motion.p>
        </div>
      </section>
      <section className="slambook-section content">
        <span className="section-eyebrow">Slam Book</span>
        <h2 className="section-title">Write your entry</h2>
        <p style={{ color: "var(--cosmic-text-soft)", marginBottom: "0.5rem" }}>
          Choose your depth — all levels are equally valid. ✨
        </p>
        <div className="level-tabs">
          {SLAM_LEVELS.map(l => (
            <button key={l.id} className={`level-tab${level === l.id ? " active" : ""}`}
              onClick={() => { setLevel(l.id); setSubmitted(false); playSound("click"); }}
            >{l.label}: {l.title}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success" className="slam-form success-screen"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            >
              <div className="success-icon">🌟</div>
              <h2>Sent into the cosmos!</h2>
              <p>Your message is preserved forever — like a star.</p>
              <button className="btn-cosmic-ghost" onClick={() => setSubmitted(false)}>Write Another ✨</button>
            </motion.div>
          ) : (
            <motion.div key={`form-${level}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SlamBookForm level={level} onSuccess={() => setSubmitted(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      {entries.filter(e => e.visibility !== "private").length > 0 && (
        <section className="entries-section content">
          <span className="section-eyebrow" style={{ color: "var(--cosmic-gold)" }}>Messages from the cosmos</span>
          <h2 className="section-title" style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>What people say about her ✨</h2>
          {entries.filter(e => e.visibility !== "private").map((e, i) => (
            <motion.div key={i} className="entry-card entry-glow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="entry-header">
                <div className="entry-avatar">{e.name?.[0]?.toUpperCase() || "✨"}</div>
                <div className="entry-meta">
                  <div className="entry-name">{e.name || "Anonymous"}</div>
                  <div className="entry-mood">{e.mood} · {e.relation || "A well-wisher"} · Level {e.level}</div>
                </div>
              </div>
              <p className="entry-message">{e.message}</p>
              {e.story && <p className="entry-message" style={{ marginTop: "0.7rem", opacity: 0.8, fontSize: "0.9rem" }}>{e.story}</p>}
              {e.location && <p style={{ fontSize: "0.78rem", color: "var(--cosmic-gold)", marginTop: "0.5rem" }}>📍 {e.location}</p>}
            </motion.div>
          ))}
        </section>
      )}
      <div className="cosmic-sos content">
        <p>Need her right now?</p>
        <a href="tel:7001684412" className="btn-sos" onClick={() => playSound("click")}>🆘 SOS: 7001684412</a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
const SPOTIFY_TRACKS = {
  landing: null,
  love: "0cYohCh24y1aMjJmcS9RBl",
  moon: "2znooFkKzDQ3mC8sWCFuG6",
  cosmic: "0cYohCh24y1aMjJmcS9RBl",
};

import Lenis from '@studio-freight/lenis';

export default function App() {
  const [world, setWorld] = useState("landing");
  const [showLetter, setShowLetter] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.06), transparent 40%)`;
      }
    };
    window.addEventListener("mousemove", handleMove);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div className="film-grain" />
      <div className="spotlight-cursor" ref={spotlightRef} />
      {/* OPENING LETTER — shows once on load */}
      <AnimatePresence>
        {showLetter && <OpeningLetter onClose={() => setShowLetter(false)} />}
      </AnimatePresence>

      {/* GUIDE */}
      <AnimatePresence>
        {showGuide && <GuidePage onClose={() => setShowGuide(false)} />}
      </AnimatePresence>

      <VolumeToast />
      <GlobalSOS />
      <SlamSidebar />
      <PersonalNotepad />

      {/* GUIDE BUTTON */}
      <button
        className="guide-fab"
        title="What's in here?"
        onClick={() => { setShowGuide(true); playSound("click"); }}
      >
        ?
      </button>

      {/* GLOBAL BACK BUTTON */}
      {world !== "landing" && (
        <button
          className="global-back-fab"
          onClick={() => { playSound("click"); setWorld(world === "cosmic" ? "moon" : "landing"); }}
        >
          ← Back
        </button>
      )}

      {world !== "landing" && <SpotifyWidget key={world} trackId={SPOTIFY_TRACKS[world]} />}

      <AnimatePresence mode="wait">
        {world === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LandingPage onChoose={setWorld} />
          </motion.div>
        )}
        {world === "love" && (
          <motion.div key="love" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <LovePage onBack={() => setWorld("landing")} onNavigate={setWorld} />
          </motion.div>
        )}
        {world === "moon" && (
          <motion.div key="moon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <MoonlightWorld onNavigate={setWorld} />
          </motion.div>
        )}
        {world === "cosmic" && (
          <motion.div key="cosmic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <CosmicWorld onBack={() => setWorld("moon")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
