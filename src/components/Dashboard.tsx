import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Dumbbell, 
  Play, 
  BarChart3,
  Flame,
  Trophy,
  Clock,
  Zap
} from 'lucide-react';
import dashboardIcons from '@/assets/dashboard-icons.jpg';

interface DashboardProps {
  userName: string;
  onStartWorkout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onStartWorkout }) => {
  // Mock data - in real app this would come from API/database
  const stats = {
    workoutsThisWeek: 3,
    workoutsGoal: 4,
    currentStreak: 7,
    totalWorkouts: 24,
    weeklyVolume: 12500, // kg
    avgWorkoutTime: 65, // minutes
  };

  const weeklyProgress = (stats.workoutsThisWeek / stats.workoutsGoal) * 100;

  const todaysWorkout = {
    name: "Upper Body Power",
    exercises: 6,
    estimatedTime: 60,
    mainLifts: ["Bench Press", "Pull-ups", "Overhead Press"]
  };

  const recentPRs = [
    { exercise: "Bench Press", weight: 75, unit: "kg", date: "2 days ago" },
    { exercise: "Squat", weight: 95, unit: "kg", date: "5 days ago" },
    { exercise: "Deadlift", weight: 120, unit: "kg", date: "1 week ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Today's Workout Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 backdrop-blur-glass shadow-elevated">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary">Today's Workout</span>
              </div>
              <h2 className="text-2xl font-bold">{todaysWorkout.name}</h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {todaysWorkout.exercises} exercises
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  ~{todaysWorkout.estimatedTime} min
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {todaysWorkout.mainLifts.map((lift, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-lg"
                  >
                    {lift}
                  </span>
                ))}
              </div>
            </div>
            <Button 
              size="lg" 
              variant="accent" 
              onClick={onStartWorkout}
              className="flex items-center gap-2 min-w-[140px]"
            >
              <Play className="w-5 h-5" />
              Start Workout
            </Button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Weekly Progress */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">This Week</span>
                </div>
                <span className="text-2xl font-bold text-secondary">
                  {stats.workoutsThisWeek}/{stats.workoutsGoal}
                </span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {stats.workoutsGoal - stats.workoutsThisWeek} workouts remaining
              </p>
            </div>
          </Card>

          {/* Current Streak */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Current Streak</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-accent">{stats.currentStreak}</span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
              <p className="text-xs text-muted-foreground">Keep it going! 🔥</p>
            </div>
          </Card>

          {/* Total Workouts */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                <span className="text-sm font-medium">Total Workouts</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-warning">{stats.totalWorkouts}</span>
                <span className="text-sm text-muted-foreground">completed</span>
              </div>
              <p className="text-xs text-muted-foreground">All time record</p>
            </div>
          </Card>

          {/* Weekly Volume */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass hover:shadow-elevated transition-all duration-300">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Weekly Volume</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">
                  {(stats.weeklyVolume / 1000).toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">tons</span>
              </div>
              <p className="text-xs text-muted-foreground">Weight lifted this week</p>
            </div>
          </Card>
        </div>

        {/* Recent Progress and PRs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent PRs */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <h3 className="text-lg font-semibold">Recent Personal Records</h3>
              </div>
              
              <div className="space-y-3">
                {recentPRs.map((pr, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                    <div>
                      <p className="font-medium">{pr.exercise}</p>
                      <p className="text-sm text-muted-foreground">{pr.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-success">
                        {pr.weight} {pr.unit}
                      </p>
                      <p className="text-xs text-success">New PR! 🎉</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Progress Charts
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="secondary" className="justify-start h-12" onClick={onStartWorkout}>
                  <Play className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Start Today's Workout</p>
                    <p className="text-xs opacity-70">{todaysWorkout.name}</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-12">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">View Schedule</p>
                    <p className="text-xs opacity-70">Check upcoming workouts</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-12">
                  <Target className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Update Goals</p>
                    <p className="text-xs opacity-70">Modify your targets</p>
                  </div>
                </Button>
                
                <Button variant="outline" className="justify-start h-12">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">Progress Report</p>
                    <p className="text-xs opacity-70">Detailed analytics</p>
                  </div>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Motivational Quote */}
        <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20 backdrop-blur-glass text-center">
          <blockquote className="text-lg font-medium italic text-foreground">
            "The groundwork for all happiness is good health."
          </blockquote>
          <p className="text-sm text-muted-foreground mt-2">— Leigh Hunt</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;