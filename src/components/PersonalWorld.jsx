import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const COMPLIMENTS = [
  "You make ordinary moments feel like poetry 🌸",
  "The way you listen — it's actually rare, and you don't even know it 💫",
  "Your words carry more weight than you think ✨",
  "You're the kind of person people write songs about without realising they're doing it 🎵",
  "Your gestures say more than most people's paragraphs 💌",
  "There's something about your energy that just — stays 🌙",
  "You're not just pretty by looks. By words. By gestures. By actions. All of it. 💕",
];

import { HeartbeatMonitor, PersonalNotepad } from './FunElements.jsx';

export const PersonalWorld = ({ onBack, playSound }) => {
  const [step, setStep] = useState('warning');
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const tryPassword = () => {
    if (pw === "4412") {
      playSound("success");
      setStep("content");
    } else {
      setPwError(true);
      playSound("click");
      setTimeout(() => setPwError(false), 1000);
    }
  };

  if (step === 'warning') {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center p-6 font-body text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d751a] to-[#9d50bb1a] z-0" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center z-10 magical-glass p-10 rounded-[3rem]"
        >
          <span className="text-secondary uppercase tracking-[0.2em] text-[10px] font-bold sparkle-text">Personal Realm</span>
          <h2 className="text-4xl font-display mt-4 mb-6 text-white">Hold on a second.</h2>
          <p className="text-white/70 leading-relaxed mb-8">
            This section is honest, soft, and maybe a tiny bit embarrassing for me. It's meant for your eyes only.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => { playSound("click"); setStep("password"); }}
              className="btn-glow text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-transform hover:scale-[1.05]"
            >
              I'm okay with that →
            </button>
            <button 
              onClick={onBack}
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              Take me back
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (step === 'password') {
    return (
      <div className="min-h-screen bg-[#0f0a1e] flex items-center justify-center p-6 font-body text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9d50bb1a] to-[#6e48aa1a] z-0" />
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center z-10 magical-glass p-12 rounded-[3rem]"
        >
          <div className="text-4xl mb-6 love-heart">🔑</div>
          <h2 className="text-4xl font-display mb-8">One small secret...</h2>
          <p className="text-white/60 mb-8">You know the password. It's yours. 💌</p>
          <input 
            type="password"
            autoFocus
            className={`w-full bg-transparent border-b-2 border-white/10 py-4 text-center text-3xl focus:border-[#ff2d75] outline-none transition-all ${pwError ? 'text-red-500 animate-shake' : 'text-white'}`}
            placeholder="••••"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && tryPassword()}
          />
          <button 
            onClick={tryPassword}
            className="mt-12 btn-glow text-white px-12 py-5 rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:px-16"
          >
            Open Heart
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0a1e] font-body pb-32 text-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[#ff2d7515] to-transparent z-0" />
      
       <nav className="relative z-10 flex justify-between items-center px-8 py-10 max-w-7xl mx-auto">
        <span className="font-display text-2xl sparkle-text">The Personal Side</span>
        <button onClick={onBack} className="text-sm font-medium border-b border-white/30 hover:border-white transition-colors">Universe</button>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-8 mt-20">
        <motion.section 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="mb-40 text-center"
        >
          <span className="text-[#ff2d75] uppercase tracking-[0.2em] text-[10px] font-bold mb-6 block">A realization</span>
          <h2 className="text-5xl sm:text-7xl font-display leading-tight">After a long time, someone made me feel butterflies—</h2>
          {!revealed ? (
            <button 
              onClick={() => { setRevealed(true); playSound("heart"); }}
              className="mt-12 group flex flex-col items-center gap-6 mx-auto"
            >
              <div className="btn-glow w-20 h-20 rounded-full flex items-center justify-center text-3xl love-heart">🦋</div>
              <span className="text-xl italic font-display text-white/60 group-hover:text-white transition-colors">Tap to see who</span>
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-12">
              <span className="text-7xl sm:text-9xl font-display italic sparkle-text">You.</span>
              <p className="mt-8 text-white/70 text-lg leading-relaxed max-w-md mx-auto">But maybe not the right time.<br/>So let's just pause it right there.</p>
            </motion.div>
          )}
        </motion.section>

        <section className="mb-40">
          <p className="font-display text-3xl sm:text-4xl mb-16 italic text-center text-white/80">"Maybe in a parallel universe—we are meant to be."</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((v) => (
              <div key={v} className="aspect-[3/4] bg-white/5 overflow-hidden rounded-[2rem] border border-white/10 group relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1e] to-transparent opacity-60 z-10" />
                 <img src={`/${v}.jpeg`} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" onError={e => e.target.style.display = 'none'} />
                 <div className="absolute bottom-6 left-6 z-20 font-display italic text-xl">Scene {v}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center mb-40">
          <span className="text-[#ff2d75] uppercase tracking-[0.2em] text-[10px] font-bold mb-12 block">Things you should hear more often</span>
          <div className="flex flex-wrap justify-center gap-4">
            {COMPLIMENTS.map((c, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 45, 117, 0.2)' }}
                className="px-8 py-5 magical-glass rounded-[2rem] cursor-default text-sm border-white/5"
              >
                {c}
              </motion.div>
            ))}
          </div>
        </section>

        <HeartbeatMonitor playSound={playSound} />
      </div>

      <PersonalNotepad playSound={playSound} />
    </div>
  );
};
