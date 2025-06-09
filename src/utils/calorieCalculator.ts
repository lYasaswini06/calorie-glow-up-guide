
export interface UserData {
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number; // cm
  weight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very' | 'super';
}

export interface CalorieResults {
  bmr: number;
  tdee: number;
  macros: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  super: 1.9
};

export const calculateCalories = (userData: UserData): CalorieResults => {
  // Mifflin-St Jeor Equation
  let bmr: number;
  
  if (userData.gender === 'male') {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
  } else {
    bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  }

  const tdee = bmr * ACTIVITY_MULTIPLIERS[userData.activityLevel];

  // Macro distribution (standard recommendations)
  const proteinCalories = tdee * 0.25; // 25% protein
  const fatCalories = tdee * 0.25; // 25% fat
  const carbCalories = tdee * 0.5; // 50% carbs

  const macros = {
    protein: Math.round(proteinCalories / 4), // 4 calories per gram
    fat: Math.round(fatCalories / 9), // 9 calories per gram
    carbs: Math.round(carbCalories / 4) // 4 calories per gram
  };

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    macros
  };
};

export const getHealthTips = (tdee: number, userData: UserData): string[] => {
  const tips: string[] = [];

  if (userData.activityLevel === 'sedentary') {
    tips.push("Try adding 30 minutes of walking to your daily routine 🚶‍♂️");
  }

  if (tdee > 2500) {
    tips.push("Consider eating frequent, smaller meals throughout the day 🍽️");
    tips.push("Stay hydrated with at least 3 liters of water daily 💧");
  } else if (tdee < 1800) {
    tips.push("Focus on nutrient-dense foods to meet your macro goals 🥗");
  }

  tips.push("Include a variety of colorful vegetables in your meals 🌈");
  tips.push("Aim for 7-9 hours of quality sleep each night 😴");

  return tips.slice(0, 3);
};

export const getMealSuggestions = (tdee: number): string[] => {
  if (tdee < 1800) {
    return [
      "Greek yogurt with berries and nuts",
      "Grilled chicken salad with olive oil",
      "Quinoa bowl with vegetables"
    ];
  } else if (tdee < 2200) {
    return [
      "Oatmeal with banana and almond butter",
      "Salmon with sweet potato and broccoli",
      "Lean beef stir-fry with brown rice"
    ];
  } else if (tdee < 2800) {
    return [
      "Protein smoothie with fruits and oats",
      "Chicken breast with quinoa and mixed vegetables",
      "Turkey sandwich with avocado and side salad"
    ];
  } else {
    return [
      "Large protein smoothie with peanut butter",
      "Grilled chicken with rice and vegetables",
      "Pasta with lean meat sauce and side salad",
      "Trail mix and protein bar for snacks"
    ];
  }
};
