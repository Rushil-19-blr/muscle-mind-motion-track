import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  Dumbbell, 
  Target, 
  Play, 
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface DashboardProps {
  userName?: string;
  onStartWorkout?: () => void;
  onModifySchedule?: () => void;
  onViewPlan?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userName = 'User',
  onStartWorkout,
  onModifySchedule,
  onViewPlan 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary ml-16">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="text-primary">{userName}</span>!
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Rest Day Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-glass/30 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Rest Day</h2>
          <p className="text-muted-foreground">
            No workout scheduled for today. Enjoy your rest!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Consistency */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">Consistency</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <Progress value={85} className="w-20 h-20 rounded-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">85%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Avg Duration */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="font-semibold">Avg Duration</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-1">55</div>
              <div className="text-sm text-muted-foreground">min</div>
              <div className="text-xs text-muted-foreground mt-1">Per workout</div>
            </div>
          </Card>

          {/* Total Exercises */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-5 h-5 text-accent" />
              <span className="font-semibold">Total Exercises</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-1">13</div>
              <div className="text-sm text-muted-foreground">exercises</div>
              <div className="text-xs text-muted-foreground mt-1">In your program</div>
            </div>
          </Card>

          {/* Program */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-semibold">Program</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">4-6</div>
              <div className="text-sm text-muted-foreground">weeks</div>
              <div className="text-xs text-muted-foreground mt-1">Duration</div>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Button 
                  className="w-full h-16 text-lg bg-primary/20 hover:bg-primary/30 border border-primary/30"
                  variant="outline"
                  onClick={onStartWorkout}
                >
                  <Play className="w-6 h-6 mr-3" />
                  No Workout Today
                </Button>
                <Button 
                  className="w-full h-12 bg-glass/20 hover:bg-glass/30"
                  variant="outline"
                  onClick={() => {/* Navigate to progress charts */}}
                >
                  <BarChart3 className="w-5 h-5 mr-3" />
                  View Progress Charts
                </Button>
              </div>
            </Card>
          </div>

          {/* Your Goals */}
          <div>
            <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
              <h3 className="text-xl font-bold mb-6">Your Goals</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-glass/20 rounded-lg">
                  <span className="font-medium">Increase Muscle Mass</span>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center justify-between p-3 bg-glass/20 rounded-lg">
                  <span className="font-medium">Improve Overall Strength</span>
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;