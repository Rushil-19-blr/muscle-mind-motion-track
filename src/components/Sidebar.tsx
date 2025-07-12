import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Dumbbell, 
  Play, 
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Edit3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  onStartWorkout: () => void;
  onModifySchedule: () => void;
  onViewPlan: () => void;
  onViewProgress: () => void;
  onViewCalendar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onStartWorkout,
  onModifySchedule,
  onViewPlan,
  onViewProgress,
  onViewCalendar
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    { icon: Play, label: 'Start Workout', action: onStartWorkout, color: 'text-primary' },
    { icon: Calendar, label: 'View Calendar', action: onViewCalendar, color: 'text-blue-500' },
    { icon: BarChart3, label: 'View Progress', action: onViewProgress, color: 'text-green-500' },
    { icon: Target, label: 'View Plan', action: onViewPlan, color: 'text-purple-500' }
  ];

  const handleUpdateMetrics = () => {
    navigate('/update-metrics');
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  return (
    <div 
      className={`fixed right-0 top-0 h-full bg-gradient-to-b from-background/95 via-surface/90 to-surface-secondary/95 backdrop-blur-lg border-l border-border/50 shadow-2xl transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full p-3">
        {/* Quick Actions */}
        <div className="flex-1 space-y-3 mt-8">
          <div className={`transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            {isHovered && (
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-2">
                Quick Actions
              </h3>
            )}
          </div>
          
          {quickActions.map((action, index) => (
            <div key={index} className="relative group">
              <Button
                variant="ghost"
                onClick={action.action}
                className={`w-full justify-start transition-all duration-200 hover:bg-primary/10 ${
                  isHovered ? 'px-3' : 'px-2'
                }`}
              >
                <action.icon className={`w-5 h-5 ${action.color}`} />
                <span className={`ml-3 transition-all duration-200 ${
                  isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                }`}>
                  {action.label}
                </span>
                {isHovered && (
                  <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Button>
              
              {/* Tooltip for collapsed state */}
              {!isHovered && (
                <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {action.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Update Metrics Button */}
        <div className="relative group mb-3">
          <Button
            variant="ghost"
            onClick={handleUpdateMetrics}
            className={`w-full justify-start transition-all duration-200 hover:bg-secondary/10 ${
              isHovered ? 'px-3' : 'px-2'
            }`}
          >
            <Settings className="w-5 h-5 text-secondary" />
            <span className={`ml-3 transition-all duration-200 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}>
              Update Metrics
            </span>
            {isHovered && (
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>
          
          {!isHovered && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Update Metrics
            </div>
          )}
        </div>

        {/* Account Button */}
        <div className="relative group">
          <Button
            variant="ghost"
            onClick={handleAccountClick}
            className={`w-full justify-start transition-all duration-200 hover:bg-accent/10 ${
              isHovered ? 'px-3' : 'px-2'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className={`ml-3 transition-all duration-200 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            }`}>
              Account
            </span>
            {isHovered && (
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </Button>
          
          {!isHovered && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              Account
            </div>
          )}
        </div>
      </div>
    </div>
  );
};