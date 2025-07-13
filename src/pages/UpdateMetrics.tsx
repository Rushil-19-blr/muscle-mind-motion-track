import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UpdateMetricsProps {
  onBack: () => void;
  userData?: any;
}

export const UpdateMetrics: React.FC<UpdateMetricsProps> = ({ onBack, userData }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    height: userData?.height || '',
    weight: userData?.weight || '',
    bodyFat: userData?.bodyFat || '',
    muscleMass: userData?.muscleMass || '',
    dietStyle: userData?.dietStyle || '',
    dailyCalories: userData?.dailyCalories || '',
    proteinIntake: userData?.proteinIntake || '',
    benchPress: userData?.benchPress || '',
    squat: userData?.squat || '',
    deadlift: userData?.deadlift || '',
    overheadPress: userData?.overheadPress || '',
    primaryGoal: userData?.primaryGoal || '',
    secondaryGoal: userData?.secondaryGoal || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setShowSuccess(true);
      toast({
        title: "✅ Metrics Updated Successfully!",
        description: "Your metrics have been updated and saved.",
      });

      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated text-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-success to-success-light rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-success-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-success">Success!</h2>
              <p className="text-muted-foreground">Your metrics have been updated successfully.</p>
            </div>
            <div className="w-full bg-success/20 rounded-full h-2">
              <div className="bg-success h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Metrics
          </h1>
          <p className="text-lg text-muted-foreground">
            Keep your profile up-to-date for the best workout recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Physical Metrics */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Physical Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bodyFat">Body Fat (%)</Label>
                <Input
                  id="bodyFat"
                  type="number"
                  placeholder="15"
                  value={formData.bodyFat}
                  onChange={(e) => handleInputChange('bodyFat', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="muscleMass">Muscle Mass (%)</Label>
                <Input
                  id="muscleMass"
                  type="number"
                  placeholder="45"
                  value={formData.muscleMass}
                  onChange={(e) => handleInputChange('muscleMass', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
            </div>
          </Card>

          {/* Nutrition */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Nutrition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dietStyle">Diet Style</Label>
                <Select value={formData.dietStyle} onValueChange={(value) => handleInputChange('dietStyle', value)}>
                  <SelectTrigger className="bg-glass/20 border-glass-border">
                    <SelectValue placeholder="Select diet style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="high-protein">High Protein</SelectItem>
                    <SelectItem value="low-carb">Low Carb</SelectItem>
                    <SelectItem value="keto">Keto</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyCalories">Daily Calories</Label>
                <Input
                  id="dailyCalories"
                  type="number"
                  placeholder="2200"
                  value={formData.dailyCalories}
                  onChange={(e) => handleInputChange('dailyCalories', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="proteinIntake">Protein Intake (g)</Label>
                <Input
                  id="proteinIntake"
                  type="number"
                  placeholder="150"
                  value={formData.proteinIntake}
                  onChange={(e) => handleInputChange('proteinIntake', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
            </div>
          </Card>

          {/* Strength Metrics */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Current Lifts (kg)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="benchPress">Bench Press</Label>
                <Input
                  id="benchPress"
                  type="number"
                  placeholder="80"
                  value={formData.benchPress}
                  onChange={(e) => handleInputChange('benchPress', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="squat">Squat</Label>
                <Input
                  id="squat"
                  type="number"
                  placeholder="100"
                  value={formData.squat}
                  onChange={(e) => handleInputChange('squat', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadlift">Deadlift</Label>
                <Input
                  id="deadlift"
                  type="number"
                  placeholder="120"
                  value={formData.deadlift}
                  onChange={(e) => handleInputChange('deadlift', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="overheadPress">Overhead Press</Label>
                <Input
                  id="overheadPress"
                  type="number"
                  placeholder="50"
                  value={formData.overheadPress}
                  onChange={(e) => handleInputChange('overheadPress', e.target.value)}
                  className="bg-glass/20 border-glass-border"
                />
              </div>
            </div>
          </Card>

          {/* Goals */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
            <h3 className="text-xl font-semibold mb-4">Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal">Primary Goal</Label>
                <Select value={formData.primaryGoal} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
                  <SelectTrigger className="bg-glass/20 border-glass-border">
                    <SelectValue placeholder="Select primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryGoal">Secondary Goal</Label>
                <Select value={formData.secondaryGoal} onValueChange={(value) => handleInputChange('secondaryGoal', value)}>
                  <SelectTrigger className="bg-glass/20 border-glass-border">
                    <SelectValue placeholder="Select secondary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="general-fitness">General Fitness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              variant="accent"
              disabled={isSubmitting}
              className="flex items-center gap-2 min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Update Metrics
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};