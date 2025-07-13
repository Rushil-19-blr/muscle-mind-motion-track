import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountProps {
  onBack: () => void;
  userData?: {
    name: string;
    email?: string;
    joinDate?: string;
    membershipType?: string;
  };
}

export const Account: React.FC<AccountProps> = ({ onBack, userData }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Add actual logout logic here
    onBack();
  };

  const handleEditProfile = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Profile editing will be available soon.",
    });
  };

  const mockUserData = {
    name: userData?.name || "John Doe",
    email: userData?.email || "john.doe@example.com",
    joinDate: userData?.joinDate || "January 2024",
    membershipType: userData?.membershipType || "Premium"
  };

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
            Account Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-3xl font-bold">{mockUserData.name}</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {mockUserData.membershipType}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{mockUserData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since {mockUserData.joinDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditProfile}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Account Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Workouts</h3>
              <p className="text-3xl font-bold text-primary">94</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
              <p className="text-3xl font-bold text-secondary">7 days</p>
            </div>
          </Card>
          
          <Card className="p-6 bg-glass/30 backdrop-blur-glass border-glass-border shadow-glass">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Consistency</h3>
              <p className="text-3xl font-bold text-accent">94%</p>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};