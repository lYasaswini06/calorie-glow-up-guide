
import React, { useState, useEffect } from 'react';

const EMOJIS = ['🥦', '💪', '🍎', '🍚', '🎯', '🥗', '🏃‍♂️', '🔥', '⚡', '🌟'];

interface FloatingEmoji {
  id: number;
  emoji: string;
  delay: number;
}

const FloatingEmojis: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    if (!enabled) {
      setEmojis([]);
      return;
    }

    const interval = setInterval(() => {
      const newEmoji: FloatingEmoji = {
        id: Date.now(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        delay: Math.random() * 2
      };
      
      setEmojis(prev => [...prev, newEmoji]);
      
      // Remove emoji after animation
      setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
      }, 15000);
    }, 3000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-4xl animate-float-emoji"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            animationDelay: `${emoji.delay}s`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingEmojis;
