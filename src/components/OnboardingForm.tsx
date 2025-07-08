import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Target, Dumbbell, User, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserData } from '@/pages/Index';

interface OnboardingFormProps {
  onComplete: (userData: UserData) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    name: '', age: '', height: '', weight: '', gender: '',
    bodyFat: '', muscleMass: '',
    dietStyle: '', dailyMeals: '', dailyCalories: '', proteinIntake: '',
    currentProgram: '',
    benchPress: '', squat: '', deadlift: '', overheadPress: '', pullUps: '', rows: '',
    primaryGoal: '', secondaryGoal: '', weeklyAvailability: '', preferredDays: []
  });
  
  const { toast } = useToast();
  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateUserData = (field: keyof UserData, value: string | string[]) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Profile Complete!",
      description: "Generating your personalized workout plan...",
    });
    onComplete(userData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-bold">Basic Information</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={(e) => updateUserData('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={userData.age}
                  onChange={(e) => updateUserData('age', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={userData.height}
                  onChange={(e) => updateUserData('height', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={userData.weight}
                  onChange={(e) => updateUserData('weight', e.target.value)}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={userData.gender} onValueChange={(value) => updateUserData('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Utensils className="w-12 h-12 mx-auto text-secondary" />
              <h2 className="text-2xl font-bold">Nutrition & Body Composition</h2>
              <p className="text-muted-foreground">Help us understand your current state</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bodyFat">Body Fat % (Optional)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  placeholder="15"
                  value={userData.bodyFat}
                  onChange={(e) => updateUserData('bodyFat', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="muscleMass">Muscle Mass (Optional)</Label>
                <Input
                  id="muscleMass"
                  placeholder="e.g., 60kg"
                  value={userData.muscleMass}
                  onChange={(e) => updateUserData('muscleMass', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dietStyle">Dietary Style</Label>
                <Select value={userData.dietStyle} onValueChange={(value) => updateUserData('dietStyle', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="paleo">Paleo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dailyMeals">Daily Meals</Label>
                <Input
                  id="dailyMeals"
                  type="number"
                  placeholder="3"
                  value={userData.dailyMeals}
                  onChange={(e) => updateUserData('dailyMeals', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dailyCalories">Daily Calories (Estimate)</Label>
                <Input
                  id="dailyCalories"
                  type="number"
                  placeholder="2000"
                  value={userData.dailyCalories}
                  onChange={(e) => updateUserData('dailyCalories', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="proteinIntake">Daily Protein (g)</Label>
                <Input
                  id="proteinIntake"
                  type="number"
                  placeholder="120"
                  value={userData.proteinIntake}
                  onChange={(e) => updateUserData('proteinIntake', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Dumbbell className="w-12 h-12 mx-auto text-accent" />
              <h2 className="text-2xl font-bold">Current Training</h2>
              <p className="text-muted-foreground">Tell us about your current workout routine</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentProgram">Current Workout Program</Label>
                <Textarea
                  id="currentProgram"
                  placeholder="Describe your current workout split, or upload a program if you have one..."
                  value={userData.currentProgram}
                  onChange={(e) => updateUserData('currentProgram', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Dumbbell className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-bold">Strength Benchmarks</h2>
              <p className="text-muted-foreground">What are your current best lifts?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="benchPress">Bench Press (kg)</Label>
                <Input
                  id="benchPress"
                  type="number"
                  placeholder="60"
                  value={userData.benchPress}
                  onChange={(e) => updateUserData('benchPress', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="squat">Squat (kg)</Label>
                <Input
                  id="squat"
                  type="number"
                  placeholder="80"
                  value={userData.squat}
                  onChange={(e) => updateUserData('squat', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadlift">Deadlift (kg)</Label>
                <Input
                  id="deadlift"
                  type="number"
                  placeholder="100"
                  value={userData.deadlift}
                  onChange={(e) => updateUserData('deadlift', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="overheadPress">Overhead Press (kg)</Label>
                <Input
                  id="overheadPress"
                  type="number"
                  placeholder="40"
                  value={userData.overheadPress}
                  onChange={(e) => updateUserData('overheadPress', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pullUps">Pull-ups (reps)</Label>
                <Input
                  id="pullUps"
                  type="number"
                  placeholder="8"
                  value={userData.pullUps}
                  onChange={(e) => updateUserData('pullUps', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rows">Rows (kg)</Label>
                <Input
                  id="rows"
                  type="number"
                  placeholder="50"
                  value={userData.rows}
                  onChange={(e) => updateUserData('rows', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 mx-auto text-accent" />
              <h2 className="text-2xl font-bold">Your Goals</h2>
              <p className="text-muted-foreground">What do you want to achieve?</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal">Primary Goal</Label>
                <Select value={userData.primaryGoal} onValueChange={(value) => updateUserData('primaryGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose-fat">Lose Fat / Cut</SelectItem>
                    <SelectItem value="gain-muscle">Gain Lean Muscle</SelectItem>
                    <SelectItem value="increase-strength">Increase Strength</SelectItem>
                    <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                    <SelectItem value="recomposition">Body Recomposition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryGoal">Secondary Goal (Optional)</Label>
                <Select value={userData.secondaryGoal} onValueChange={(value) => updateUserData('secondaryGoal', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select secondary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="lose-fat">Lose Fat / Cut</SelectItem>
                    <SelectItem value="gain-muscle">Gain Lean Muscle</SelectItem>
                    <SelectItem value="increase-strength">Increase Strength</SelectItem>
                    <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                    <SelectItem value="recomposition">Body Recomposition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weeklyAvailability">Weekly Training Availability</Label>
                <Select value={userData.weeklyAvailability} onValueChange={(value) => updateUserData('weeklyAvailability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="How many days per week?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days per week</SelectItem>
                    <SelectItem value="4">4 days per week</SelectItem>
                    <SelectItem value="5">5 days per week</SelectItem>
                    <SelectItem value="6">6 days per week</SelectItem>
                    <SelectItem value="7">7 days per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
import { UserData } from '@/pages/Index';
            </div>
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
    </div>
  );
};

export default OnboardingForm;