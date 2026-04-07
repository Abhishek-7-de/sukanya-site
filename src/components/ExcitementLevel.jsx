import { useState, useEffect, useRef } from 'react';

const EXCITEMENT_MSGS = [
  "",
  "Vibes: Calm. 🌙",
  "Vibes: Building up... ✨",
  "Vibes: Getting there... 🌊",
  "Vibes: Amazing energy! 🔥",
  "Vibes: Pure magic happening. 💫",
  "Vibes: Absolutely electric. ⚡",
  "Vibes: That's the ENERGY! 🚀❤️‍🔥"
];

export default function ExcitementLevel() {
  const [level, setLevel] = useState(0);
  const [pulsing, setPulsing] = useState(false);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef(null);
  const levelRef = useRef(0);
  const excitementPercent = Math.round((level / 7) * 100);

  useEffect(() => { levelRef.current = level; }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = 80;
    let x = 0, animId;

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,30,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const speed = (levelRef.current || 0) / 350;
      x += speed * canvas.width;
      if (x > canvas.width) x = 0;

      const mid = canvas.height / 2;
      const t = x / canvas.width;
      
      // Create wave pattern
      const waveVal = Math.sin(t * Math.PI * 2) * 15 + Math.sin(t * Math.PI * 4) * 8;
      
      ctx.beginPath();
      ctx.moveTo(x, mid - waveVal);
      ctx.lineTo(x + 2, mid - waveVal * 1.05);
      ctx.strokeStyle = `hsl(210,100%,${50 + Math.abs(waveVal)}%)`;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  const click = () => {
    const nl = Math.min(7, level + 1);
    setLevel(nl);
    setPulsing(true);
    setClicks(c => c + 1);
    setTimeout(() => setPulsing(false), 300);
  };

  const msgIdx = Math.min(clicks, EXCITEMENT_MSGS.length - 1);

  return (
    <section className="heartbeat-section content">
      <span className="section-eyebrow" style={{ color: "var(--moon-accent2)" }}>Friends zone interactive</span>
      <h2 className="section-title" style={{ color: "var(--moon-text)", marginBottom: "2rem" }}>
        Excitement meter
      </h2>
      <div className="heart-monitor-card">
        <canvas ref={canvasRef} className="ecg-canvas" />
        <div className="excitement-meter-topline">
          <span>How fun the vibe feels right now</span>
          <span>{excitementPercent}% charged</span>
        </div>
        <div className="excitement-rail" aria-hidden="true">
          <div className="excitement-rail-fill" style={{ width: `${excitementPercent}%` }} />
        </div>
        <div className="heart-display">
          <div className={`heart-icon-big${pulsing ? " pump" : ""}`}>⚡</div>
          <div>
            <div className="heart-bpm">{level}</div>
            <div className="heart-bpm-label">excitement score</div>
          </div>
        </div>
        <button className="btn-heartbeat" onClick={click}>
          {clicks === 0 ? "Click to raise the vibes 🌊" : clicks < 3 ? "More energy... ✨" : "Keep that energy! 🔥"}
        </button>
        <p className="heart-status-msg">{EXCITEMENT_MSGS[msgIdx]}</p>
      </div>
    </section>
  );
}
