import { motion } from 'framer-motion';

export function FloatingButterflies() {
  const colors = ['#ff6b6b', '#ffa500', '#ff1493', '#667eea', '#764ba2', '#f093fb', '#f5576c'];

  return (
    <div className="floating-layer" aria-hidden="true">
      {[...Array(15)].map((_, index) => (
        <motion.div
          key={`butterfly-${index}`}
          initial={{ opacity: 0, y: 100, x: index * 20 - 150, rotate: -15, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0.3],
            y: [0, -200, -400, -600],
            x: [index * 12 - 80, index % 2 === 0 ? 60 : -40, index % 3 === 0 ? 120 : -80, index * 6],
            rotate: [0, 20, -15, 10],
            scale: [0.5, 1, 0.8, 0.3],
          }}
          transition={{
            duration: 8 + index * 0.4,
            repeat: Infinity,
            delay: index * 0.15,
            ease: 'easeInOut'
          }}
          className="floating-item butterfly"
          style={{
            color: colors[index % colors.length],
            filter: `drop-shadow(0 0 10px ${colors[index % colors.length]}40)`,
            fontSize: `${1 + (index % 3) * 0.5}rem`
          }}
        >
          🦋
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingFriendWorld() {
  const items = ['☁️', '✨', '♫', '🌼', '💧', '⭐'];

  return (
    <div className="floating-layer" aria-hidden="true">
      {[...Array(14)].map((_, index) => (
        <motion.div
          key={`friend-item-${index}`}
          initial={{ opacity: 0, y: 20, x: index * 16 }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            y: [0, -18, 0],
            x: [0, index % 2 === 0 ? 12 : -12, 0],
            rotate: [0, 4, -4, 0],
          }}
          transition={{ duration: 4 + (index % 5), repeat: Infinity, delay: index * 0.2 }}
          className="floating-item friend-emoji"
          style={{ top: `${8 + (index % 7) * 12}%`, left: `${4 + (index * 7) % 88}%` }}
        >
          {items[index % items.length]}
        </motion.div>
      ))}
    </div>
  );
}
