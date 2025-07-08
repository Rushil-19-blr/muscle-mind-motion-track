import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDRoqdVubMzyZeK0dB0kX0wBK5vAAaGiXU';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface WorkoutPlan {
  id: string;
  name: string;
  duration: string;
  days: WorkoutDay[];
  goals: string[];
  notes: string;
}

export interface WorkoutDay {
  day: string;
  name: string;
  exercises: Exercise[];
  duration: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
  restTime: string;
  notes: string;
  muscleGroups: string[];
}

export interface UserData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  bodyFat: string;
  muscleMass: string;
  dietStyle: string;
  dailyMeals: string;
  dailyCalories: string;
  proteinIntake: string;
  currentProgram: string;
  benchPress: string;
  squat: string;
  deadlift: string;
  overheadPress: string;
  pullUps: string;
  rows: string;
  primaryGoal: string;
  secondaryGoal: string;
  weeklyAvailability: string;
  preferredDays: string[];
}

export class GoogleAIService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  async generateWorkoutPlan(userData: UserData): Promise<WorkoutPlan> {
    const prompt = `
      Create a detailed workout plan for a user with the following profile:
      
      Personal Info:
      - Name: ${userData.name}
      - Age: ${userData.age}
      - Height: ${userData.height}
      - Weight: ${userData.weight}
      - Gender: ${userData.gender}
      - Body Fat: ${userData.bodyFat}%
      - Muscle Mass: ${userData.muscleMass}
      
      Fitness Info:
      - Primary Goal: ${userData.primaryGoal}
      - Secondary Goal: ${userData.secondaryGoal}
      - Weekly Availability: ${userData.weeklyAvailability}
      - Preferred Days: ${userData.preferredDays.join(', ')}
      
      Current Strength Levels:
      - Bench Press: ${userData.benchPress}
      - Squat: ${userData.squat}
      - Deadlift: ${userData.deadlift}
      - Overhead Press: ${userData.overheadPress}
      - Pull-ups: ${userData.pullUps}
      - Rows: ${userData.rows}
      
      Diet Info:
      - Diet Style: ${userData.dietStyle}
      - Daily Meals: ${userData.dailyMeals}
      - Daily Calories: ${userData.dailyCalories}
      - Protein Intake: ${userData.proteinIntake}g
      
      Please create a comprehensive workout plan with specific exercises, sets, reps, and weights. 
      Format the response as a JSON object with the following structure:
      {
        "id": "unique-id",
        "name": "Plan Name",
        "duration": "4-6 weeks",
        "days": [
          {
            "day": "Monday",
            "name": "Upper Body Power",
            "exercises": [
              {
                "name": "Bench Press",
                "sets": 4,
                "reps": "6-8",
                "weight": "80% of max",
                "restTime": "2-3 minutes",
                "notes": "Focus on form",
                "muscleGroups": ["chest", "triceps", "shoulders"]
              }
            ],
            "duration": 60
          }
        ],
        "goals": ["strength", "muscle"],
        "notes": "Progressive overload every week"
      }
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const planData = JSON.parse(jsonMatch[0]);
        return {
          id: `plan-${Date.now()}`,
          ...planData
        };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error generating workout plan:', error);
      return this.getFallbackPlan(userData);
    }
  }

  async adaptWorkoutPlan(currentPlan: WorkoutPlan, modifications: string): Promise<WorkoutPlan> {
    const prompt = `
      Modify the following workout plan based on user feedback:
      
      Current Plan: ${JSON.stringify(currentPlan)}
      
      User Modifications: ${modifications}
      
      Please adapt the plan accordingly and return the modified plan in the same JSON format.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const planData = JSON.parse(jsonMatch[0]);
        return {
          ...currentPlan,
          ...planData,
          id: `plan-${Date.now()}`
        };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error adapting workout plan:', error);
      return currentPlan;
    }
  }

  private getFallbackPlan(userData: UserData): WorkoutPlan {
    return {
      id: `fallback-${Date.now()}`,
      name: "Beginner Strength Program",
      duration: "4-6 weeks",
      days: [
        {
          day: "Monday",
          name: "Upper Body",
          exercises: [
            {
              name: "Bench Press",
              sets: 3,
              reps: "8-10",
              weight: "Start with 60% of max",
              restTime: "2 minutes",
              notes: "Focus on form",
              muscleGroups: ["chest", "triceps", "shoulders"]
            },
            {
              name: "Rows",
              sets: 3,
              reps: "8-10",
              weight: "Moderate",
              restTime: "2 minutes",
              notes: "Squeeze shoulder blades",
              muscleGroups: ["back", "biceps"]
            }
          ],
          duration: 45
        },
        {
          day: "Wednesday",
          name: "Lower Body",
          exercises: [
            {
              name: "Squats",
              sets: 3,
              reps: "8-10",
              weight: "Start with 60% of max",
              restTime: "2-3 minutes",
              notes: "Full depth",
              muscleGroups: ["quads", "glutes", "hamstrings"]
            },
            {
              name: "Deadlifts",
              sets: 3,
              reps: "5-8",
              weight: "Start with 60% of max",
              restTime: "3 minutes",
              notes: "Keep back straight",
              muscleGroups: ["hamstrings", "glutes", "back"]
            }
          ],
          duration: 45
        }
      ],
      goals: [userData.primaryGoal, userData.secondaryGoal],
      notes: "Progressive overload weekly. Increase weight by 2.5-5% when you can complete all reps."
    };
  }
}

export const googleAIService = new GoogleAIService();