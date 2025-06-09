
import React, { useEffect, useState } from 'react';

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const VOICE_EMOJIS = ['🌍', '🗣️', '✈️', '💬', '🧠', '🎙️', '🔊', '📱', '💭', '🎯'];

const VoiceFloatingEmojis: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    if (!enabled) {
      setEmojis([]);
      return;
    }

    const generateEmojis = () => {
      const newEmojis: FloatingEmoji[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        emoji: VOICE_EMOJIS[Math.floor(Math.random() * VOICE_EMOJIS.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 10
      }));
      setEmojis(newEmojis);
    };

    generateEmojis();
    const interval = setInterval(generateEmojis, 20000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-2xl animate-float-emoji opacity-70"
          style={{
            left: `${emoji.left}%`,
            top: `${emoji.top}%`,
            animationDelay: `${emoji.delay}s`,
            animationDuration: `${emoji.duration}s`
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
};

export default VoiceFloatingEmojis;
