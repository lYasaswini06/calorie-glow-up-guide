
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import VoiceTranslator from '../components/VoiceTranslator';
import VoiceFloatingEmojis from '../components/VoiceFloatingEmojis';
import Confetti from '../components/Confetti';
import { Link } from 'react-router-dom';

const VoiceTranslatorContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [emojisEnabled, setEmojisEnabled] = useState(true);

  const handleTranslation = (hasTranslation: boolean) => {
    if (hasTranslation) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 dark:from-green-900 dark:via-blue-900 dark:to-purple-900">
      <VoiceFloatingEmojis enabled={emojisEnabled} />
      <Confetti trigger={showConfetti} />
      
      {/* Header with controls */}
      <div className="sticky top-0 z-40 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/">
            <Button
              variant="outline"
              size="sm"
              className="animate-glow glassmorphism border-none"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="animate-glow glassmorphism border-none"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              onClick={() => setEmojisEnabled(!emojisEnabled)}
              variant="outline"
              size="sm"
              className="glassmorphism border-none"
            >
              {emojisEnabled ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-float">
            Speak & Translate
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 animate-glow" style={{ animationDelay: '0.3s' }}>
            🗣️ Voice Translator ✨
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slideIn">
            Speak in one language, hear it in another! Real-time voice translation powered by AI.
          </p>
        </div>

        {/* Voice Translator */}
        <div className="max-w-4xl mx-auto">
          <VoiceTranslator onTranslation={handleTranslation} />
        </div>

        {/* Info Cards */}
        <div className="mt-20 space-y-8">
          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">How It Works 🔄</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-3xl mb-3">🎙️</div>
                  <h4 className="font-semibold mb-2">1. Speak</h4>
                  <p>Click the microphone and speak in your chosen language. Our AI listens and converts your speech to text.</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-3xl mb-3">🔄</div>
                  <h4 className="font-semibold mb-2">2. Translate</h4>
                  <p>Advanced AI translation instantly converts your text to the target language with high accuracy.</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-3xl mb-3">🔊</div>
                  <h4 className="font-semibold mb-2">3. Listen</h4>
                  <p>Hear the translation spoken aloud with natural pronunciation in the target language.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Perfect For 🌟</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    ✈️ Travel & Tourism
                  </h4>
                  <p>Navigate foreign countries with confidence. Ask for directions, order food, and communicate with locals effortlessly.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    📚 Language Learning
                  </h4>
                  <p>Practice pronunciation and get instant feedback. Learn how words sound in different languages.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    💼 Business Meetings
                  </h4>
                  <p>Break language barriers in international business. Communicate ideas clearly across language differences.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    👥 Social Connections
                  </h4>
                  <p>Connect with people from different cultures. Make new friends and expand your global network.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Note:</strong> This demo uses browser APIs for speech recognition and synthesis. 
                For production use, consider integrating with advanced translation services like Google Translate API.
              </p>
              <p className="text-xs text-muted-foreground">
                Built with ❤️ using React, TypeScript, Web Speech API, and Tailwind CSS
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const VoiceTranslatorPage = () => {
  return (
    <ThemeProvider>
      <VoiceTranslatorContent />
    </ThemeProvider>
  );
};

export default VoiceTranslatorPage;
