
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import CalorieCalculator from '../components/CalorieCalculator';
import FloatingEmojis from '../components/FloatingEmojis';
import Confetti from '../components/Confetti';

const IndexContent = () => {
  const { theme, toggleTheme } = useTheme();
  const [showConfetti, setShowConfetti] = useState(false);
  const [emojisEnabled, setEmojisEnabled] = useState(true);

  const handleResults = (hasResults: boolean) => {
    if (hasResults) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' ? 'gradient-bg-dark' : 'gradient-bg'
    }`}>
      <FloatingEmojis enabled={emojisEnabled} />
      <Confetti trigger={showConfetti} />
      
      {/* Header with theme toggle and controls */}
      <div className="sticky top-0 z-40 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
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
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-bounce">
            Calorie & Macro
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-bounce" style={{ animationDelay: '0.2s' }}>
            Needs Estimator 🎯
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-slideIn">
            Discover your personalized daily calorie and macronutrient needs with our intelligent calculator
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto">
          <CalorieCalculator onResults={handleResults} />
        </div>

        {/* Footer Information */}
        <div className="mt-20 space-y-8">
          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">About This Tool 📖</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">How It Works:</h4>
                  <p>Our calculator uses the scientifically-proven Mifflin-St Jeor equation to calculate your Basal Metabolic Rate (BMR), then applies activity multipliers to determine your Total Daily Energy Expenditure (TDEE).</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Macro Distribution:</h4>
                  <p>We recommend a balanced approach: 50% carbohydrates for energy, 25% protein for muscle maintenance, and 25% healthy fats for hormone production and nutrient absorption.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Benefits of Using This Tool 🌟</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-2xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-2">Understand Your Needs</h4>
                  <p>Get personalized calorie and macro targets based on your unique profile</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-2xl mb-2">🍽️</div>
                  <h4 className="font-semibold mb-2">Plan Better Meals</h4>
                  <p>Receive tailored meal suggestions that fit your caloric requirements</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-white/10">
                  <div className="text-2xl mb-2">💪</div>
                  <h4 className="font-semibold mb-2">Improve Health</h4>
                  <p>Make informed decisions about your nutrition and fitness journey</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none`}>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                <strong>Disclaimer:</strong> This is a general guide based on standard equations. 
                For personalized medical advice, please consult with a qualified nutritionist or healthcare provider.
              </p>
              <p className="text-xs text-muted-foreground">
                Built with ❤️ using React, TypeScript, Tailwind CSS, and Recharts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <IndexContent />
    </ThemeProvider>
  );
};

export default Index;
