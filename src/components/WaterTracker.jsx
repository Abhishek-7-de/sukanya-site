import { useState, useRef, useEffect } from 'react';

const WATER_MSGS = [
  "hey. drink water. now.", "1 down! keep going darling 💧",
  "2! she's doing it 🌊", "halfway there! proud of you 💕",
  "4 glasses !! legend behaviour 🌸", "5! unstoppable ✨",
  "6 glasses omg 🌟", "7! you're basically a mermaid 🧜‍♀️",
  "ALL 8! 🎉 LEGENDARY."
];

export const PremiumWaterTracker = () => {
  const [water, setWater] = useState(0);
  const [justFilled, setJustFilled] = useState(-1);

  const fill = (i) => {
    const newVal = i < water ? i : i + 1;
    setWater(newVal);
    setJustFilled(i);
    setTimeout(() => setJustFilled(-1), 500);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <button
            key={i}
            onClick={() => fill(i)}
            className={`w-10 h-14 rounded-lg border transition-all duration-500 flex items-center justify-center
              ${i < water 
                ? "bg-black border-black text-white" 
                : "bg-transparent border-black/10 text-black/20 hover:border-black/30"
              }
              ${justFilled === i ? "scale-110" : "scale-100"}
            `}
          >
            {i < water ? "💧" : "◌"}
          </button>
        ))}
      </div>
      <p className="text-sm font-display font-normal text-secondary italic text-center">
        {WATER_MSGS[water]}
      </p>
    </div>
  );
};
