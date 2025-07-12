import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut, ArrowLeft, Mail, Calendar, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.clear();
    // Navigate to home
    navigate('/');
    // Reload to reset app state
    window.location.reload();
  };

  const handleBack = () => {
    navigate('/');
  };

  // Mock user data - in a real app this would come from context/API
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    currentGoal: "Build Muscle & Strength"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={handleBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Account Settings
          </h1>
        </div>

        {/* Profile Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20 backdrop-blur-glass">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData.name}</h2>
              <p className="text-muted-foreground">Fitness Enthusiast</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Member Since</p>
                <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <Target className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">Current Goal</p>
                <p className="text-sm text-muted-foreground">{userData.currentGoal}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/update-metrics')}
            >
              <User className="w-4 h-4 mr-2" />
              Update Personal Metrics
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};