import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SlamSidebar } from './FunElements';

export const CosmicWorld = ({ onBack, playSound }) => {
  const [messages] = useState([
    { id: 1, text: "You're a literal star, Sukanya.", x: '25%', y: '35%', size: '100px', color: '#ff2d75' },
    { id: 2, text: "The universe looks better with you.", x: '75%', y: '25%', size: '120px', color: '#9d50bb' },
    { id: 3, text: "Your smile outshines the sun.", x: '45%', y: '65%', size: '110px', color: '#6e48aa' },
    { id: 4, text: "Keep being magical.", x: '85%', y: '75%', size: '90px', color: '#ff2d75' },
    { id: 5, text: "You are made of stardust and dreams.", x: '20%', y: '85%', size: '130px', color: '#9d50bb' },
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#050010] text-white font-body overflow-hidden relative pb-40">
      {/* Immersive Nebula Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(255,45,117,0.15)_0%,_transparent_40%)]" />
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(157,80,187,0.15)_0%,_transparent_40%)]" />
         
         {Array.from({ length: 120 }).map((_, i) => (
           <div 
             key={i} 
             className="absolute bg-white rounded-full opacity-30 animate-pulse"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               width: `${Math.random() * 4}px`,
               height: `${Math.random() * 4}px`,
               boxShadow: `0 0 ${Math.random()*15}px ${['#ff2d75', '#9d50bb', '#fff'][i%3]}`,
               animationDelay: `${Math.random() * 5}s`
             }}
           />
         ))}
      </div>

       <nav className="relative z-10 flex justify-between items-center px-8 py-10 max-w-7xl mx-auto mb-20">
        <span className="font-display text-2xl sparkle-text">Cosmic Dreams</span>
        <button onClick={onBack} className="text-sm font-medium border-b border-white/30 hover:border-white transition-all">Universe</button>
      </nav>

      <div className="relative z-10 min-h-[500px] w-full mt-20 mb-32">
         <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center pointer-events-none text-center px-6">
            <h1 className="text-5xl md:text-7xl font-display text-white italic mb-4">Pull a star from the sky</h1>
            <p className="text-white/40 text-sm tracking-widest uppercase sparkle-text">Messages for a cosmic soul</p>
         </div>

         {messages.map((m) => (
           <motion.button
             key={m.id}
             onClick={() => { setSelected(m); playSound("success"); }}
             className="absolute glass rounded-full flex items-center justify-center p-4 hover:border-white/50 transition-all group"
             style={{ 
                left: m.x, 
                top: m.y, 
                width: m.size, 
                height: m.size,
                boxShadow: `0 0 30px ${m.color}33`,
                animation: `float ${4 + Math.random() * 3}s ease-in-out infinite alternate`
             }}
             whileHover={{ scale: 1.1 }}
           >
             <div 
                className="w-3 h-3 rounded-full shadow-[0_0_20px_#fff] group-hover:scale-150 transition-transform" 
                style={{ backgroundColor: m.color }}
             />
           </motion.button>
         ))}

         {/* Message Overlay */}
         <AnimatePresence>
         {selected && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-[150] px-6 bg-black/40 backdrop-blur-sm"
            >
               <div 
                 className="max-w-md w-full p-12 magical-glass rounded-[3.5rem] text-center relative overflow-hidden"
                 style={{ boxShadow: `0 0 100px ${selected.color}44` }}
               >
                  <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundColor: selected.color }} />
                  <p className="text-3xl font-display mb-10 leading-relaxed text-white relative z-10 italic">"{selected.text}"</p>
                  <button 
                    onClick={() => setSelected(null)}
                    className="relative z-10 btn-glow text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all"
                  >
                    Release back to Universe
                  </button>
               </div>
            </motion.div>
         )}
         </AnimatePresence>
      </div>

      <SlamSidebar playSound={playSound} />
    </div>
  );
};
