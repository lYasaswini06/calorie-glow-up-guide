
import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, Copy, RotateCcw, Languages } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import TranslationDisplay from './TranslationDisplay';
import { useToast } from '@/hooks/use-toast';

interface VoiceTranslatorProps {
  onTranslation?: (hasTranslation: boolean) => void;
}

const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({ onTranslation }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isTranslating, setIsTranslating] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Try Chrome or Edge.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = sourceLanguage === 'en' ? 'en-US' : 
                     sourceLanguage === 'es' ? 'es-ES' :
                     sourceLanguage === 'fr' ? 'fr-FR' :
                     sourceLanguage === 'de' ? 'de-DE' :
                     sourceLanguage === 'it' ? 'it-IT' :
                     sourceLanguage === 'pt' ? 'pt-PT' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Speech recognition started');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setOriginalText(transcript);
      console.log('Speech recognized:', transcript);
      toast({
        title: "Speech Recognized!",
        description: `"${transcript.substring(0, 50)}${transcript.length > 50 ? '...' : ''}"`,
      });
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      toast({
        title: "Speech Recognition Error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive"
      });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log('Speech recognition ended');
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [sourceLanguage, toast]);

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const translateText = async () => {
    if (!originalText.trim()) {
      toast({
        title: "No Text to Translate",
        description: "Please speak something first or enter text manually.",
        variant: "destructive"
      });
      return;
    }

    setIsTranslating(true);
    
    try {
      // Simulate translation API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock translation responses
      const mockTranslations: Record<string, Record<string, string>> = {
        'en-es': {
          'hello': 'hola',
          'how are you': 'cómo estás',
          'good morning': 'buenos días',
          'thank you': 'gracias',
          'goodbye': 'adiós'
        },
        'en-fr': {
          'hello': 'bonjour',
          'how are you': 'comment allez-vous',
          'good morning': 'bonjour',
          'thank you': 'merci',
          'goodbye': 'au revoir'
        },
        'en-de': {
          'hello': 'hallo',
          'how are you': 'wie geht es dir',
          'good morning': 'guten Morgen',
          'thank you': 'danke',
          'goodbye': 'auf Wiedersehen'
        }
      };

      const translationKey = `${sourceLanguage}-${targetLanguage}`;
      const lowerText = originalText.toLowerCase();
      
      let translated = mockTranslations[translationKey]?.[lowerText] || 
                      `[${targetLanguage.toUpperCase()}] ${originalText}`;
      
      setTranslatedText(translated);
      onTranslation?.(true);
      
      toast({
        title: "Translation Complete!",
        description: "Text has been successfully translated.",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Error",
        description: "Could not translate text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const speakTranslation = () => {
    if (!translatedText) {
      toast({
        title: "No Translation to Speak",
        description: "Please translate some text first.",
        variant: "destructive"
      });
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLanguage === 'es' ? 'es-ES' :
                      targetLanguage === 'fr' ? 'fr-FR' :
                      targetLanguage === 'de' ? 'de-DE' :
                      targetLanguage === 'it' ? 'it-IT' :
                      targetLanguage === 'pt' ? 'pt-PT' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      speechSynthesis.speak(utterance);
      
      toast({
        title: "Speaking Translation",
        description: "Playing translated text...",
      });
    } else {
      toast({
        title: "Text-to-Speech Not Supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    if (!translatedText) return;
    
    try {
      await navigator.clipboard.writeText(translatedText);
      toast({
        title: "Copied!",
        description: "Translation copied to clipboard.",
      });
    } catch (error) {
      console.error('Copy error:', error);
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setOriginalText('');
    setTranslatedText('');
    stopListening();
    toast({
      title: "Cleared",
      description: "All text has been cleared.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Language Selection */}
      <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Languages className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">Language Settings</h3>
          </div>
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSourceChange={setSourceLanguage}
            onTargetChange={setTargetLanguage}
          />
        </CardContent>
      </Card>

      {/* Voice Controls */}
      <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold mb-6">Voice Input</h3>
            
            <div className="flex justify-center gap-4">
              <Button
                onClick={isListening ? stopListening : startListening}
                disabled={isTranslating}
                size="lg"
                className={`h-16 w-16 rounded-full animate-glow ${
                  isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
                } transition-all duration-300 hover:scale-110`}
              >
                {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
              </Button>
              
              <Button
                onClick={translateText}
                disabled={!originalText || isTranslating}
                size="lg"
                className="h-16 px-8 animate-glow bg-green-500 hover:bg-green-600 transition-all duration-300 hover:scale-110"
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </Button>
              
              <Button
                onClick={speakTranslation}
                disabled={!translatedText}
                size="lg"
                className="h-16 w-16 rounded-full animate-glow bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-110"
              >
                <Volume2 className="h-8 w-8" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-2">
              <Button
                onClick={copyToClipboard}
                disabled={!translatedText}
                variant="outline"
                size="sm"
                className="glassmorphism border-none"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
                className="glassmorphism border-none"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
            
            {isListening && (
              <p className="text-sm text-muted-foreground animate-pulse">
                🎙️ Listening... Speak now!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Translation Display */}
      <TranslationDisplay
        originalText={originalText}
        translatedText={translatedText}
        sourceLanguage={sourceLanguage}
        targetLanguage={targetLanguage}
        onOriginalTextChange={setOriginalText}
      />
    </div>
  );
};

export default VoiceTranslator;
