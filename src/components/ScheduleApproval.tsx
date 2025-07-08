import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle, XCircle, Edit3, Calendar, Clock, Target, Sparkles } from 'lucide-react';
import { WorkoutPlan } from '@/services/GoogleAIService';
import { googleAIService } from '@/services/GoogleAIService';
import { useToast } from '@/hooks/use-toast';

interface ScheduleApprovalProps {
  workoutPlan: WorkoutPlan;
  onApprove: (plan: WorkoutPlan) => void;
  onModify: (plan: WorkoutPlan) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleApproval: React.FC<ScheduleApprovalProps> = ({
  workoutPlan,
  onApprove,
  onModify,
  isOpen,
  onClose
}) => {
  const [isModifying, setIsModifying] = useState(false);
  const [modifications, setModifications] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleApprove = () => {
    onApprove(workoutPlan);
    onClose();
    toast({
      title: "Plan Approved! 🎉",
      description: "Your personalized workout plan is now active.",
    });
  };

  const handleModify = async () => {
    if (!modifications.trim()) {
      toast({
        title: "Please enter modifications",
        description: "Tell us what you'd like to change about your plan.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const modifiedPlan = await googleAIService.adaptWorkoutPlan(workoutPlan, modifications);
      onModify(modifiedPlan);
      setIsModifying(false);
      setModifications('');
      toast({
        title: "Plan Modified! ✨",
        description: "Your workout plan has been updated based on your feedback.",
      });
    } catch (error) {
      toast({
        title: "Error modifying plan",
        description: "Please try again or approve the current plan.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-glass/95 backdrop-blur-glass border-glass-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            Your AI-Generated Workout Plan
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Plan Overview */}
            <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <h3 className="text-xl font-bold mb-3">{workoutPlan.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{workoutPlan.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Training Days</p>
                    <p className="font-medium">{workoutPlan.days.length} days/week</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Goals</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {workoutPlan.goals.map((goal, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Schedule Preview */}
            <Card className="p-4 bg-glass/30 backdrop-blur-glass border-glass-border">
              <h4 className="font-semibold mb-3">Weekly Schedule</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {workoutPlan.days.map((day, index) => (
                  <div key={index} className="p-3 bg-glass/20 rounded-lg border border-glass-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-primary">{day.day}</span>
                      <span className="text-xs text-muted-foreground">{day.duration}min</span>
                    </div>
                    <p className="text-sm font-medium">{day.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {day.exercises.length} exercises
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Program Notes */}
            {workoutPlan.notes && (
              <Card className="p-4 bg-accent/10 border-accent/20">
                <h4 className="font-semibold text-accent mb-2">Program Notes</h4>
                <p className="text-sm text-muted-foreground">{workoutPlan.notes}</p>
              </Card>
            )}

            {/* Modification Section */}
            {isModifying && (
              <Card className="p-4 bg-glass/30 backdrop-blur-glass border-glass-border">
                <h4 className="font-semibold mb-3">Modify Your Plan</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="modifications">
                      What would you like to change about this plan?
                    </Label>
                    <Textarea
                      id="modifications"
                      placeholder="E.g., I want more cardio, replace deadlifts with rack pulls, add more arm exercises, train 5 days instead of 4..."
                      value={modifications}
                      onChange={(e) => setModifications(e.target.value)}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleModify} 
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate Modified Plan
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsModifying(false)}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-glass-border">
          <Button 
            variant="outline" 
            onClick={() => setIsModifying(true)}
            disabled={isModifying || isLoading}
            className="flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Modify Plan
          </Button>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>
            <Button 
              variant="accent" 
              onClick={handleApprove}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Approve & Start
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};