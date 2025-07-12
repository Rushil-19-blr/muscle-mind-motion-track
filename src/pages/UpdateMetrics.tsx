import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const UpdateMetrics: React.FC = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize with existing data from localStorage or defaults
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('userOnboardingData');
    return savedData ? JSON.parse(savedData) : {
      weight: '',
      height: '',
      bodyFat: '',
      muscleMass: '',
      benchPress: '',
      squat: '',
      deadlift: '',
      overheadPress: '',
      pullUps: '',
      rows: '',
      primaryGoal: '',
      secondaryGoal: '',
      weeklyAvailability: '',
      dailyCalories: '',
      proteinIntake: ''
    };
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage
    const existingData = JSON.parse(localStorage.getItem('userOnboardingData') || '{}');
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem('userOnboardingData', JSON.stringify(updatedData));
    
    setIsUpdating(false);
    setShowSuccess(true);
    
    toast.success("Metrics updated successfully!");
    
    // Auto-redirect after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary flex items-center justify-center p-4">
        <Card className="p-8 max-w-md mx-auto text-center bg-gradient-to-r from-green-500/10 to-primary/10 border-green-500/20">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Metrics Updated!</h2>
          <p className="text-muted-foreground mb-6">
            Your personal metrics have been successfully updated. 
            You'll be redirected to the dashboard shortly.
          </p>
          <Button onClick={() => navigate('/')} className="w-full">
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Metrics
          </h1>
        </div>

        {/* Physical Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Physical Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="70"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="175"
              />
            </div>
            <div>
              <Label htmlFor="bodyFat">Body Fat (%)</Label>
              <Input
                id="bodyFat"
                type="number"
                value={formData.bodyFat}
                onChange={(e) => handleInputChange('bodyFat', e.target.value)}
                placeholder="15"
              />
            </div>
            <div>
              <Label htmlFor="muscleMass">Muscle Mass</Label>
              <Select value={formData.muscleMass} onValueChange={(value) => handleInputChange('muscleMass', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select muscle mass level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="very-high">Very High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Strength Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Strength Metrics (kg)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="benchPress">Bench Press</Label>
              <Input
                id="benchPress"
                type="number"
                value={formData.benchPress}
                onChange={(e) => handleInputChange('benchPress', e.target.value)}
                placeholder="80"
              />
            </div>
            <div>
              <Label htmlFor="squat">Squat</Label>
              <Input
                id="squat"
                type="number"
                value={formData.squat}
                onChange={(e) => handleInputChange('squat', e.target.value)}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="deadlift">Deadlift</Label>
              <Input
                id="deadlift"
                type="number"
                value={formData.deadlift}
                onChange={(e) => handleInputChange('deadlift', e.target.value)}
                placeholder="120"
              />
            </div>
            <div>
              <Label htmlFor="overheadPress">Overhead Press</Label>
              <Input
                id="overheadPress"
                type="number"
                value={formData.overheadPress}
                onChange={(e) => handleInputChange('overheadPress', e.target.value)}
                placeholder="50"
              />
            </div>
            <div>
              <Label htmlFor="pullUps">Pull-ups (reps)</Label>
              <Input
                id="pullUps"
                type="number"
                value={formData.pullUps}
                onChange={(e) => handleInputChange('pullUps', e.target.value)}
                placeholder="10"
              />
            </div>
            <div>
              <Label htmlFor="rows">Rows (kg)</Label>
              <Input
                id="rows"
                type="number"
                value={formData.rows}
                onChange={(e) => handleInputChange('rows', e.target.value)}
                placeholder="70"
              />
            </div>
          </div>
        </Card>

        {/* Goals & Training */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Goals & Training</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="primaryGoal">Primary Goal</Label>
              <Select value={formData.primaryGoal} onValueChange={(value) => handleInputChange('primaryGoal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Build Muscle">Build Muscle</SelectItem>
                  <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                  <SelectItem value="Increase Strength">Increase Strength</SelectItem>
                  <SelectItem value="Improve Endurance">Improve Endurance</SelectItem>
                  <SelectItem value="General Fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="weeklyAvailability">Weekly Training Days</Label>
              <Select value={formData.weeklyAvailability} onValueChange={(value) => handleInputChange('weeklyAvailability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select training frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days per week</SelectItem>
                  <SelectItem value="4">4 days per week</SelectItem>
                  <SelectItem value="5">5 days per week</SelectItem>
                  <SelectItem value="6">6 days per week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dailyCalories">Daily Calories</Label>
                <Input
                  id="dailyCalories"
                  type="number"
                  value={formData.dailyCalories}
                  onChange={(e) => handleInputChange('dailyCalories', e.target.value)}
                  placeholder="2500"
                />
              </div>
              <div>
                <Label htmlFor="proteinIntake">Protein Intake (g)</Label>
                <Input
                  id="proteinIntake"
                  type="number"
                  value={formData.proteinIntake}
                  onChange={(e) => handleInputChange('proteinIntake', e.target.value)}
                  placeholder="150"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Update Button */}
        <Button 
          onClick={handleUpdate} 
          disabled={isUpdating}
          className="w-full"
          size="lg"
        >
          {isUpdating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Updating Metrics...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Update Metrics
            </>
          )}
        </Button>
      </div>
    </div>
  );
};