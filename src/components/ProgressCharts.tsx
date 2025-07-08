import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Target, Calendar } from 'lucide-react';

export const ProgressCharts: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock data - in real app this would come from user's workout history
  const strengthData = [
    { week: 'Week 1', benchPress: 70, squat: 85, deadlift: 110, overheadPress: 45 },
    { week: 'Week 2', benchPress: 72, squat: 87, deadlift: 112, overheadPress: 46 },
    { week: 'Week 3', benchPress: 75, squat: 90, deadlift: 115, overheadPress: 47 },
    { week: 'Week 4', benchPress: 77, squat: 92, deadlift: 118, overheadPress: 48 },
    { week: 'Week 5', benchPress: 80, squat: 95, deadlift: 120, overheadPress: 50 },
    { week: 'Week 6', benchPress: 82, squat: 97, deadlift: 122, overheadPress: 51 },
  ];

  const volumeData = [
    { week: 'Week 1', totalVolume: 8500, upperBody: 4200, lowerBody: 4300 },
    { week: 'Week 2', totalVolume: 9200, upperBody: 4600, lowerBody: 4600 },
    { week: 'Week 3', totalVolume: 9800, upperBody: 4900, lowerBody: 4900 },
    { week: 'Week 4', totalVolume: 10500, upperBody: 5200, lowerBody: 5300 },
    { week: 'Week 5', totalVolume: 11200, upperBody: 5500, lowerBody: 5700 },
    { week: 'Week 6', totalVolume: 11800, upperBody: 5800, lowerBody: 6000 },
  ];

  const muscleGroupData = [
    { name: 'Chest', sessions: 12, color: '#3b82f6' },
    { name: 'Back', sessions: 14, color: '#10b981' },
    { name: 'Legs', sessions: 10, color: '#f59e0b' },
    { name: 'Shoulders', sessions: 8, color: '#ef4444' },
    { name: 'Arms', sessions: 6, color: '#8b5cf6' },
  ];

  const workoutConsistency = [
    { month: 'Jan', planned: 16, completed: 14 },
    { month: 'Feb', planned: 16, completed: 15 },
    { month: 'Mar', planned: 18, completed: 16 },
    { month: 'Apr', planned: 16, completed: 16 },
    { month: 'May', planned: 18, completed: 17 },
    { month: 'Jun', planned: 16, completed: 15 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Progress Charts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-glass/95 backdrop-blur-glass border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Progress Analytics
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[75vh] pr-4">
          <Tabs defaultValue="strength" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-glass/30 backdrop-blur-glass">
              <TabsTrigger value="strength">Strength</TabsTrigger>
              <TabsTrigger value="volume">Volume</TabsTrigger>
              <TabsTrigger value="consistency">Consistency</TabsTrigger>
              <TabsTrigger value="muscle-groups">Muscle Groups</TabsTrigger>
            </TabsList>

            <TabsContent value="strength" className="space-y-4">
              <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold">Strength Progress</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={strengthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--glass))', 
                        border: '1px solid hsl(var(--glass-border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="benchPress" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Bench Press (kg)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="squat" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      name="Squat (kg)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="deadlift" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      name="Deadlift (kg)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="overheadPress" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={2}
                      name="Overhead Press (kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Bench Press', current: 82, start: 70, color: 'primary' },
                  { name: 'Squat', current: 97, start: 85, color: 'secondary' },
                  { name: 'Deadlift', current: 122, start: 110, color: 'accent' },
                  { name: 'Overhead Press', current: 51, start: 45, color: 'warning' }
                ].map((lift, index) => (
                  <Card key={index} className="p-4 bg-glass/20 backdrop-blur-glass border-glass-border">
                    <h4 className="font-medium text-sm mb-2">{lift.name}</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Current</span>
                        <span className="font-bold">{lift.current} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <Badge variant="secondary" className="text-xs">
                          +{lift.current - lift.start} kg
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="volume" className="space-y-4">
              <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Training Volume</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--glass))', 
                        border: '1px solid hsl(var(--glass-border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="upperBody" fill="hsl(var(--primary))" name="Upper Body (kg)" />
                    <Bar dataKey="lowerBody" fill="hsl(var(--secondary))" name="Lower Body (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="consistency" className="space-y-4">
              <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold">Workout Consistency</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={workoutConsistency}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
                    <YAxis stroke="hsl(var(--foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--glass))', 
                        border: '1px solid hsl(var(--glass-border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="planned" fill="hsl(var(--muted))" name="Planned Workouts" />
                    <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed Workouts" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="muscle-groups" className="space-y-4">
              <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-semibold">Muscle Group Distribution</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={muscleGroupData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="sessions"
                      >
                        {muscleGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-3">
                    {muscleGroupData.map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-glass/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: group.color }}
                          />
                          <span className="font-medium">{group.name}</span>
                        </div>
                        <Badge variant="outline">{group.sessions} sessions</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};