import { useEffect, useRef, useState } from 'react';

const CinematicHero = ({ onChoose }) => {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-transparent text-white font-body">

      {/* Navigation Bar */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-3xl tracking-tight font-display font-normal text-white cursor-default group">
          <span className="sparkle-text">✨</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })} className="text-sm font-medium text-white/60 transition-colors hover:text-white">Universe</button>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
          className="rounded-full px-6 py-2.5 text-sm btn-glow text-white transition-all hover:px-10"
        >
          Explore Worlds
        </button>
      </nav>

      {/* Hero Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingTop: 'calc(8rem - 75px)', paddingBottom: '6rem' }}
      >
        <h1 
          className="text-6xl sm:text-8xl md:text-9xl max-w-7xl font-display font-normal animate-fade-rise"
          style={{ 
            lineHeight: '0.85', 
            letterSpacing: '-2.46px',
            color: '#FFFFFF'
          }}
        >
          Hey, <span className="italic sparkle-text">Sukanya.</span>
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mt-8 leading-relaxed text-white/60 animate-fade-rise-delay">
          Something magical was made for you. Through the chaos, we've crafted three digital sanctuaries. 
          Which reality would you like to enter?
        </p>

        {/* The Three Portal Doors */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full animate-fade-rise-delay-2">
          {/* Portal 1: Personal */}
          <button 
            onClick={() => onChoose('love')}
            className="group relative flex flex-col items-center p-10 rounded-[3rem] magical-glass transition-all duration-700 hover:border-[#ff2d75]/50 hover:shadow-[0_0_60px_rgba(255,45,117,0.3)] active:scale-[0.98]"
          >
            <div className="text-4xl mb-6 love-heart">💌</div>
            <h3 className="text-2xl font-display font-normal text-white mb-2">Personal Realm</h3>
            <p className="text-sm text-white/50 leading-relaxed px-4">Deep feelings, honest secrets, and the softest side of things.</p>
            <div className="mt-8 text-xs font-bold tracking-[0.3em] uppercase text-white/20 group-hover:text-[#ff2d75] transition-colors">Enter Portal →</div>
          </button>

          {/* Portal 2: Her World */}
          <button 
            onClick={() => onChoose('moon')}
            className="group relative flex flex-col items-center p-10 rounded-[3rem] magical-glass transition-all duration-700 hover:border-[#9d50bb]/50 hover:shadow-[0_0_60px_rgba(157,80,187,0.3)] active:scale-[0.98]"
          >
            <div className="text-4xl mb-6 group-hover:rotate-12 transition-transform duration-500">🌸</div>
            <h3 className="text-2xl font-display font-normal text-white mb-2">Public Realm</h3>
            <p className="text-sm text-white/50 leading-relaxed px-4">Memories, vibes, people and the things she loves most.</p>
            <div className="mt-8 text-xs font-bold tracking-[0.3em] uppercase text-white/20 group-hover:text-[#9d50bb] transition-colors">Enter Portal →</div>
          </button>

          {/* Portal 3: Cosmic Dreams */}
          <button 
            onClick={() => onChoose('cosmic')}
            className="group relative flex flex-col items-center p-10 rounded-[3rem] magical-glass transition-all duration-700 hover:border-[#6e48aa]/50 hover:shadow-[0_0_60px_rgba(110,72,170,0.3)] active:scale-[0.98]"
          >
            <div className="text-4xl mb-6 animate-pulse">✨</div>
            <h3 className="text-2xl font-display font-normal text-white mb-2">Cosmic Realm</h3>
            <p className="text-sm text-white/50 leading-relaxed px-4">Floating messages and quiet thoughts from the universe.</p>
            <div className="mt-8 text-xs font-bold tracking-[0.3em] uppercase text-white/20 group-hover:text-[#6e48aa] transition-colors">Enter Portal →</div>
          </button>
        </div>
      </div>
    </div>
  );
};




export default CinematicHero;
