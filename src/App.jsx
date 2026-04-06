import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroLanding from './sections/HeroLanding';
import LoverWorld from './sections/LoverWorld';
import FriendWorld from './sections/FriendWorld';

export default function App() {
  const [world, setWorld] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="app-shell">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!world ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <HeroLanding onSelectWorld={setWorld} />
          </motion.div>
        ) : world === 'lover' ? (
          <motion.div
            key="lover"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LoverWorld onBack={() => setWorld(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="friend"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FriendWorld onBack={() => setWorld(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
