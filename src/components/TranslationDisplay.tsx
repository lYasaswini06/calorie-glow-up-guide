
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '../contexts/ThemeContext';

interface TranslationDisplayProps {
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  onOriginalTextChange: (text: string) => void;
}

const getLanguageName = (code: string) => {
  const names: Record<string, string> = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
  };
  return names[code] || code.toUpperCase();
};

const TranslationDisplay: React.FC<TranslationDisplayProps> = ({
  originalText,
  translatedText,
  sourceLanguage,
  targetLanguage,
  onOriginalTextChange
}) => {
  const { theme } = useTheme();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Original Text */}
      <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
            Original ({getLanguageName(sourceLanguage)})
          </h3>
          <Textarea
            value={originalText}
            onChange={(e) => onOriginalTextChange(e.target.value)}
            placeholder="Your spoken text will appear here, or you can type directly..."
            className="min-h-[120px] resize-none border-none bg-white/10 backdrop-blur-sm"
          />
          {originalText && (
            <div className="mt-3 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Pronunciation tip:</strong> 
                {sourceLanguage === 'en' && " Focus on clear consonants and vowel sounds."}
                {sourceLanguage === 'es' && " Roll your Rs and emphasize syllables evenly."}
                {sourceLanguage === 'fr' && " Use nasal sounds and silent final consonants."}
                {sourceLanguage === 'de' && " Pronounce each syllable clearly with strong consonants."}
                {!['en', 'es', 'fr', 'de'].includes(sourceLanguage) && " Speak clearly and at a moderate pace."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translated Text */}
      <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`} style={{ animationDelay: '0.2s' }}>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            Translation ({getLanguageName(targetLanguage)})
          </h3>
          <div className="min-h-[120px] p-4 bg-white/10 backdrop-blur-sm rounded-md border">
            {translatedText ? (
              <p className="text-lg leading-relaxed">{translatedText}</p>
            ) : (
              <p className="text-muted-foreground italic">Translation will appear here...</p>
            )}
          </div>
          {translatedText && (
            <div className="mt-3 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                🔊 <strong>How to say it:</strong> 
                {targetLanguage === 'es' && " Emphasize the penultimate syllable in most words."}
                {targetLanguage === 'fr' && " Stress the final syllable and use flowing pronunciation."}
                {targetLanguage === 'de' && " Pronounce each word clearly with precise articulation."}
                {targetLanguage === 'it' && " Use musical intonation with clear vowel sounds."}
                {!['es', 'fr', 'de', 'it'].includes(targetLanguage) && " Listen to the audio for proper pronunciation."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TranslationDisplay;
