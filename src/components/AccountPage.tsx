import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, LogOut, Mail, User, Calendar } from 'lucide-react';

interface AccountPageProps {
  userName: string;
  userEmail: string;
  onBack: () => void;
  onLogout: () => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ 
  userName, 
  userEmail, 
  onBack, 
  onLogout 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-surface-secondary p-4 ml-16">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>

        {/* Profile Card */}
        <Card className="p-8 bg-glass/30 backdrop-blur-glass border-glass-border shadow-elevated">
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{userName}</h2>
              <p className="text-muted-foreground">{userEmail}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-glass/20 rounded-lg">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{userName}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-glass/20 rounded-lg">
                <Mail className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{userEmail}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-glass/20 rounded-lg">
                <Calendar className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">Premium Member</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-glass/20 rounded-lg">
                <User className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-success">Active</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Edit Profile
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={onLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};