import { motion } from 'framer-motion';
import { FunWaterTracker } from './FunElements.jsx';

export const PublicWorld = ({ onBack, playSound }) => {
  return (
    <div className="min-h-screen bg-[#0f0a1e] font-body pb-32 text-white relative overflow-hidden">
      {/* Aurora Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#9d50bb20] rounded-full blur-[120px] z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6e48aa20] rounded-full blur-[100px] z-0" />
      
       <nav className="relative z-10 flex justify-between items-center px-8 py-10 max-w-7xl mx-auto">
        <span className="font-display text-2xl sparkle-text">Her World</span>
        <button onClick={onBack} className="text-sm font-medium border-b border-white/30 hover:border-white transition-colors">Universe</button>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-8 mt-20">
        <header className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl font-display leading-[0.85] tracking-tighter"
          >
            Memories, Vibes <br/>& <span className="sparkle-text italic">Her People.</span>
          </motion.h1>
          <p className="mt-12 text-white/60 max-w-xl leading-relaxed text-lg">
            A celebration of the vibrant magic that makes your world turn. 
            From the people who stay to the colorful moments that matter.
          </p>
        </header>

        {/* Tools Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          <FunWaterTracker playSound={playSound} />
          
          <div className="p-10 magical-glass rounded-[3rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[#9d50bb1a] transition-all" onClick={() => { playSound("success"); }}>
             <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff2d75] mb-8">Tarot Card 🃏</span>
             <div className="text-7xl mb-6 transition-transform group-hover:rotate-12 group-hover:scale-110">🎴</div>
             <p className="text-sm italic text-white/80">"The stars are aligning for your joy today."</p>
          </div>

          <div className="p-10 magical-glass rounded-[3rem] flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-[#6e48aa1a] transition-all" onClick={() => window.open('https://open.spotify.com', '_blank')}>
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">Mood Playlist 🎵</span>
             <div className="text-7xl mb-6 transition-transform group-hover:scale-110">🎧</div>
             <p className="text-sm italic text-white/80">Rhythms for a vibrant soul.</p>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="mb-40">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-5xl font-display text-white">The Gallery</h2>
            <span className="text-sm text-white/40 uppercase tracking-widest hidden sm:block">Collection Vol. 01 — Vibrant Souls</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-white/5 rounded-[2rem] overflow-hidden relative group border border-white/10 hover:border-[#ff2d75]/50 transition-all shadow-xl">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end justify-center text-white pb-6 text-xs font-bold tracking-widest uppercase">
                    View Memory ✨
                 </div>
                 <img src={`/${i}.jpeg`} alt={`Memory ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" onError={e => e.target.style.display = 'none'} />
              </div>
            ))}
          </div>
        </section>

        {/* Timeline / Vibes */}
        <section className="max-w-3xl mx-auto py-20 border-t border-white/10">
           <div className="space-y-32">
              <div className="flex gap-12 items-start group">
                 <span className="font-display text-5xl text-[#ff2d75] italic group-hover:scale-110 transition-transform">01</span>
                 <div>
                    <h3 className="text-2xl font-display mb-4 sparkle-text">The First Connection</h3>
                    <p className="text-white/60 leading-relaxed text-lg">It wasn't something grand. It was just an honest conversation that felt like a burst of color in a gray world.</p>
                 </div>
              </div>
              <div className="flex gap-12 items-start group">
                 <span className="font-display text-5xl text-[#9d50bb] italic group-hover:scale-110 transition-transform">02</span>
                 <div>
                    <h3 className="text-2xl font-display mb-4 sparkle-text">Neon Nights</h3>
                    <p className="text-white/60 leading-relaxed text-lg">Late nights where we talked until the stars faded, and every secret felt like a new constellation.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};
