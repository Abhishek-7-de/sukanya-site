import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { chatLogs } from '../data/siteData';

export default function TypewriterChat() {
  const [selectedChat, setSelectedChat] = useState('welcome');
  const [typedText, setTypedText] = useState('');

  const message = useMemo(() => (chatLogs[selectedChat] || []).join('\n\n'), [selectedChat]);

  useEffect(() => {
    let index = 0;
    setTypedText('');
    const interval = setInterval(() => {
      index += 1;
      setTypedText(message.slice(0, index));
      if (index >= message.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="card card-soft typewriter-card">
      <p className="eyebrow">chat logs</p>
      <p className="copy-muted slim-copy">Little things that would probably be said better in person, but the internet insisted on participating.</p>
      <div className="chip-row">
        {Object.keys(chatLogs).map((key) => (
          <button
            key={key}
            type="button"
            className={`chip ${selectedChat === key ? 'chip-active' : ''}`}
            onClick={() => setSelectedChat(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="terminal-window">
        {typedText}
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>
          |
        </motion.span>
      </div>
    </div>
  );
}
