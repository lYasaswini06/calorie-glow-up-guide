
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import MacroPieChart from './MacroPieChart';
import { UserData, calculateCalories, getHealthTips, getMealSuggestions } from '../utils/calorieCalculator';
import { useTheme } from '../contexts/ThemeContext';

interface CalorieCalculatorProps {
  onResults: (hasResults: boolean) => void;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ onResults }) => {
  const { theme } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    gender: 'male',
    age: 25,
    height: 170,
    weight: 70,
    activityLevel: 'moderate'
  });
  const [results, setResults] = useState<any>(null);
  const [tips, setTips] = useState<string[]>([]);
  const [meals, setMeals] = useState<string[]>([]);

  const handleCalculate = () => {
    const calculatedResults = calculateCalories(userData);
    const healthTips = getHealthTips(calculatedResults.tdee, userData);
    const mealSuggestions = getMealSuggestions(calculatedResults.tdee);
    
    setResults(calculatedResults);
    setTips(healthTips);
    setMeals(mealSuggestions);
    onResults(true);
  };

  const handleReset = () => {
    setResults(null);
    setTips([]);
    setMeals([]);
    onResults(false);
    setUserData({
      gender: 'male',
      age: 25,
      height: 170,
      weight: 70,
      activityLevel: 'moderate'
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enter Your Details 📊
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={userData.gender}
                onValueChange={(value: 'male' | 'female' | 'other') => 
                  setUserData(prev => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                value={userData.age}
                onChange={(e) => setUserData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={userData.height}
                onChange={(e) => setUserData(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={userData.weight}
                onChange={(e) => setUserData(prev => ({ ...prev, weight: parseInt(e.target.value) }))}
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select
              value={userData.activityLevel}
              onValueChange={(value: any) => 
                setUserData(prev => ({ ...prev, activityLevel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="very">Very active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="super">Super active (very hard exercise, physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleCalculate}
              className="flex-1 animate-float hover:scale-105 transition-transform"
            >
              Calculate 🔥
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex-1 animate-float hover:scale-105 transition-transform"
              style={{ animationDelay: '0.2s' }}
            >
              Reset 🔄
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <>
          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Your Calorie & Macro Needs 🎯
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {results.tdee}
                    </div>
                    <div className="text-lg text-muted-foreground">Daily Calories</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <div className="font-bold text-blue-600 dark:text-blue-400">{results.macros.carbs}g</div>
                      <div className="text-sm">Carbs</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <div className="font-bold text-green-600 dark:text-green-400">{results.macros.protein}g</div>
                      <div className="text-sm">Protein</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                      <div className="font-bold text-yellow-600 dark:text-yellow-400">{results.macros.fat}g</div>
                      <div className="text-sm">Fat</div>
                    </div>
                  </div>
                </div>
                
                <MacroPieChart data={results.macros} />
              </div>
            </CardContent>
          </Card>

          {/* Health Tips */}
          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`}>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Recommended Tips 💡
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tips.map((tip, index) => (
                  <Badge key={index} variant="secondary" className="block p-3 text-left">
                    {tip}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meal Suggestions */}
          <Card className={`${theme === 'dark' ? 'glassmorphism-dark' : 'glassmorphism'} border-none animate-slideIn`}>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Your Plate is Ready! 🍽️
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {meals.map((meal, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <span className="text-2xl">🍽️</span>
                    <span>{meal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CalorieCalculator;
