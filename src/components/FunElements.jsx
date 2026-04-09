import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Common Spotify Widget
export function SpotifyWidget({ trackId }) {
  if (!trackId) return null;
  return (
    <div className="fixed bottom-6 left-6 z-[200] group">
       <div className="w-[300px] rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-105 border border-white/10 magical-glass">
        <iframe
          style={{ borderRadius: "12px", border: "none" }}
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
          width="100%" height="80" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
       </div>
    </div>
  );
}

// Volume Toast
export function VolumeToast({ playSound }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("vol-shown")) return;
    const t1 = setTimeout(() => { setVisible(true); playSound("open"); }, 800);
    const t2 = setTimeout(() => { setVisible(false); localStorage.setItem("vol-shown", "1"); }, 4500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  
  if (!visible) return null;
  return (
    <motion.div 
      className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 magical-glass rounded-full text-white text-sm tracking-widest uppercase font-bold"
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
    >
      🔊 Turn your volume on ✨
    </motion.div>
  );
}

// Global SOS Button
export function GlobalSOS({ playSound }) {
  return (
    <a 
      href="tel:7001684412" 
      className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full flex items-center justify-center text-2xl btn-glow text-white shadow-2xl hover:scale-110 transition-transform" 
      title="Call anytime — SOS 7001684412"
      onClick={() => playSound("click")}
    >
      🆘
    </a>
  );
}

// Heartbeat Monitor
const HEART_MSGS = [
  "", "Steady. Safe. 68 bpm.",
  "A little warmer... 83 bpm.",
  "Oh she's here. 96 bpm.",
  "Heart's doing things. 109 bpm.",
  "Almost can't hide it. 122 bpm.",
  "Yeah. That. 135 bpm.",
  "Maximum honesty. 140 bpm. ❤️🔥"
];

export function HeartbeatMonitor({ playSound }) {
  const [bpm, setBpm] = useState(68);
  const [pumping, setPumping] = useState(false);
  const [clicks, setClicks] = useState(0);
  const canvasRef = useRef(null);
  const bpmRef = useRef(68);

  useEffect(() => { bpmRef.current = bpm; }, [bpm]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth; canvas.height = 100;
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
        if (p < 0.15) return Math.sin(p / 0.15 * Math.PI) * 12;
        if (p < 0.25) return -8 * Math.sin((p - 0.15) / 0.1 * Math.PI);
        if (p < 0.3) return 40 * Math.sin((p - 0.25) / 0.05 * Math.PI);
        if (p < 0.35) return -20 * Math.sin((p - 0.3) / 0.05 * Math.PI);
        if (p < 0.5) return 8 * Math.sin((p - 0.35) / 0.15 * Math.PI);
        return 0;
      })();
      ctx.beginPath(); ctx.moveTo(x, mid - ecgVal);
      ctx.lineTo(x + 2, mid - ecgVal * 1.05);
      ctx.strokeStyle = `hsl(350,90%,${55 + Math.abs(ecgVal)}%)`;
      ctx.lineWidth = 3; ctx.stroke();
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
    <div className="magical-glass p-8 rounded-[3rem] text-center border-white/10 group mb-12 max-w-2xl mx-auto">
      <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff2d75] mb-4 block">Interactive</span>
      <h3 className="text-3xl font-display mb-8 text-white">What happens to my heart</h3>
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-black/40 border border-white/5 py-4">
        <canvas ref={canvasRef} className="w-full h-[100px]" />
        <div className="absolute top-4 left-6 flex items-center gap-4">
          <div className={`text-4xl transition-transform ${pumping ? "scale-125" : ""}`}>❤️</div>
          <div className="text-left">
            <div className="text-3xl font-bold font-display text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>{bpm}</div>
            <div className="text-xs uppercase tracking-widest text-[#ff2d75]">bpm</div>
          </div>
        </div>
      </div>
      <button onClick={click} className="btn-glow px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white hover:scale-[1.05] transition-transform">
        {clicks === 0 ? "Click to see what happens 💓" : clicks < 4 ? "Again... 💗" : "You can stop now. Or don't. 💖"}
      </button>
      <p className="mt-6 text-white/70 italic min-h-[1.5rem]">{HEART_MSGS[msgIdx]}</p>
    </div>
  );
}

// Fun Water Tracker
const WATER_MSGS = [
  "hey. drink water. now.", "1 down! keep going darling 💧",
  "2! she's doing it 🌊", "halfway there! proud of you 💕",
  "4 glasses !! legend behaviour 🌸", "5! unstoppable ✨",
  "6 glasses omg 🌟", "7! you're basically a mermaid 🧜‍♀️",
  "ALL 8! 🎉 LEGENDARY. You actually listened!!"
];

export function FunWaterTracker({ playSound }) {
  const [water, setWater] = useState(0);

  const fill = (i) => {
    const newVal = i < water ? i : i + 1;
    setWater(newVal);
    playSound("water");
    if (newVal === 8) {
      playSound("success");
    }
  };

  return (
    <div className="magical-glass p-10 rounded-[3rem] border border-white/10 w-full max-w-md mx-auto relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff20] to-[#9d50bb20] opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-[#00d4ff] mb-2 block text-center">Water Alarm 💧</span>
      <h3 className="relative z-10 text-2xl font-display text-white text-center mb-8">Have you had your water today?</h3>
      
      <div className="relative z-10 grid grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <button 
            key={i}
            onClick={() => fill(i)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 overflow-hidden relative border ${i < water ? 'border-[#00d4ff]/50 bg-[#00d4ff]/20' : 'border-white/10 hover:border-white/30 hover:bg-white/5'}`}
          >
             <span className="relative z-10">{i < water ? '🌊' : '💧'}</span>
             {i < water && <div className="absolute bottom-0 left-0 w-full bg-[#00d4ff]/30 animate-[wave_2s_infinite_linear]" style={{ height: '70%' }} />}
          </button>
        ))}
      </div>
      <p className={`relative z-10 text-center uppercase tracking-widest text-xs font-bold ${water === 8 ? 'text-[#ff2d75] animate-pulse' : 'text-white/60'}`}>
        {WATER_MSGS[water]}
      </p>
    </div>
  );
}

// Personal Notepad
export function PersonalNotepad({ playSound }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("sukanya-notepad") || "";
    setText(stored);
  }, []);

  const save = () => {
    localStorage.setItem("sukanya-notepad", text);
    playSound("success");
  };

  return (
    <>
      <button 
        onClick={() => { setOpen(!open); playSound("click"); }}
        className="fixed bottom-24 right-6 z-[190] w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-xl hover:scale-110 transition-transform"
        title="Personal Diary"
      >
        📓
      </button>

      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9, y: 20 }}
             className="fixed bottom-40 right-6 z-[190] w-80 magical-glass rounded-3xl p-6 border border-white/10 shadow-2xl"
           >
              <div className="flex justify-between items-center mb-4">
                <span className="font-display text-white text-xl">My Diary ✨</span>
                <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white">✕</button>
              </div>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your secrets here... they are saved just for you."
                className="w-full h-40 bg-black/20 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#ff2d75] transition-colors resize-none mb-4"
              />
              <button onClick={save} className="w-full py-3 btn-glow rounded-xl text-xs font-bold uppercase tracking-widest text-white">
                Save Note
              </button>
           </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Slam Sidebar for Cosmic Realm
export function SlamSidebar({ playSound }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [mood, setMood] = useState("");
  const MOODS = ["💫", "🌊", "🔥", "🌙", "💕", "🪄"];

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    playSound("success");
    setName(""); setMsg(""); setMood("");
    setOpen(false);
  };

  return (
    <>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
         <button 
           onClick={() => { setOpen(true); playSound("click"); }}
           className="px-12 py-5 btn-glow text-white rounded-full text-sm font-bold shadow-[0_20px_50px_rgba(255,45,117,0.5)] hover:scale-110 active:scale-95 transition-all"
         >
            Leave a Message for Her ✍️
         </button>
      </div>

      <AnimatePresence>
         {open && (
           <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 className="w-full max-w-lg magical-glass p-8 rounded-[3rem] border border-white/10 relative"
              >
                 <button onClick={() => setOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white">✕</button>
                 <h3 className="text-3xl font-display text-white mb-2">Leave a Note ✨</h3>
                 <p className="text-white/60 text-sm mb-8">Send something out into her cosmos.</p>
                 
                 <form onSubmit={submit} className="flex flex-col gap-4">
                    <input 
                      required
                      placeholder="Your name" 
                      value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#9d50bb]"
                    />
                    <textarea 
                      required
                      placeholder="Your message..." 
                      value={msg} onChange={e => setMsg(e.target.value)}
                      className="w-full h-32 resize-none bg-black/20 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-[#9d50bb]"
                    />
                    <div className="flex justify-between items-center gap-2 mb-4 bg-black/20 p-2 rounded-2xl border border-white/10">
                       {MOODS.map(m => (
                         <button 
                           key={m} type="button" 
                           onClick={() => setMood(m)}
                           className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${mood === m ? 'bg-white/20 scale-110' : 'hover:bg-white/10'}`}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                    <button type="submit" className="btn-glow py-4 rounded-2xl font-bold uppercase tracking-widest text-xs text-white shadow-xl hover:scale-105 transition-all">
                       Send into the Cosmos →
                    </button>
                 </form>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </>
  );
}
