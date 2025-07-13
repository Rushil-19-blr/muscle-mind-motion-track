import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home, 
  Play, 
  Calendar, 
  Settings, 
  User, 
  BarChart3,
  Dumbbell,
  Target,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {
  onNavigate: (page: string) => void;
  userPhoto?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, userPhoto }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Add logout logic here
  };

  const handleUpdateMetrics = () => {
    onNavigate('update-metrics');
  };

  const handleAccountClick = () => {
    onNavigate('account');
  };

  const quickActions = [
    { icon: Home, label: 'Dashboard', action: () => onNavigate('dashboard') },
    { icon: Play, label: 'Start Workout', action: () => onNavigate('workout') },
    { icon: Calendar, label: 'Calendar', action: () => onNavigate('calendar') },
    { icon: Target, label: 'Modify Plan', action: () => onNavigate('modify-schedule') },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-glass/95 backdrop-blur-glass border-r border-glass-border shadow-elevated transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b border-glass-border/50">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            {isHovered && (
              <div className="ml-3 opacity-100 transition-opacity duration-300">
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  GymPro
                </h2>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex-1 py-4">
          <div className="space-y-2 px-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={action.action}
                className={`w-full justify-start h-12 transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  isHovered ? 'px-4' : 'px-0 justify-center'
                }`}
                title={!isHovered ? action.label : undefined}
              >
                <action.icon className="w-5 h-5" />
                {isHovered && (
                  <span className="ml-3 opacity-100 transition-opacity duration-300">
                    {action.label}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-glass-border/50 space-y-2">
          {/* Update Metrics Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpdateMetrics}
            className={`w-full justify-start h-12 transition-all duration-200 hover:bg-accent/10 hover:text-accent ${
              isHovered ? 'px-4' : 'px-0 justify-center'
            }`}
            title={!isHovered ? 'Update Metrics' : undefined}
          >
            <BarChart3 className="w-5 h-5" />
            {isHovered && (
              <span className="ml-3 opacity-100 transition-opacity duration-300">
                Update Metrics
              </span>
            )}
          </Button>

          {/* Account Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAccountClick}
            className={`w-full justify-start h-12 transition-all duration-200 hover:bg-secondary/10 hover:text-secondary ${
              isHovered ? 'px-4' : 'px-0 justify-center'
            }`}
            title={!isHovered ? 'Account' : undefined}
          >
            <div className="flex items-center">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover border-2 border-glass-border"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              {isHovered && (
                <span className="ml-3 opacity-100 transition-opacity duration-300">
                  Account
                </span>
              )}
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};