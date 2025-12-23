import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SecurityMetrics } from '@/components/SecurityMetrics';
import { 
  Shield, 
  LogOut, 
  User, 
  Clock, 
  MapPin, 
  Smartphone,
  CheckCircle2,
  Activity,
  Settings,
  Bell
} from 'lucide-react';

interface LoginEvent {
  id: string;
  timestamp: Date;
  location: string;
  device: string;
  success: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [enrolledData, setEnrolledData] = useState<{ gesture: string } | null>(null);
  const [loginEvents] = useState<LoginEvent[]>([
    {
      id: '1',
      timestamp: new Date(),
      location: 'San Francisco, CA',
      device: 'Chrome on MacOS',
      success: true
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 3600000),
      location: 'San Francisco, CA',
      device: 'Safari on iPhone',
      success: true
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 86400000),
      location: 'New York, NY',
      device: 'Firefox on Windows',
      success: false
    }
  ]);

  useEffect(() => {
    const enrolled = localStorage.getItem('enrolled');
    if (enrolled) {
      setEnrolledData(JSON.parse(enrolled));
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const gestureNames: Record<string, string> = {
    'blink': 'Double Blink',
    'wink-left': 'Left Wink',
    'wink-right': 'Right Wink',
    'smile': 'Smile',
    'nod': 'Head Nod',
    'custom': 'Custom Gesture'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl tracking-wider text-foreground">COGNISEC</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
          <Button variant="glass" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Your cognitive authentication dashboard
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div 
            className="glass-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-xl text-foreground mb-1">Authenticated User</h2>
                <p className="text-muted-foreground mb-3">Cognitive Profile Active</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Face ID Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4 text-primary" />
                    <span>Gesture: {enrolledData ? gestureNames[enrolledData.gesture] : 'Not Set'}</span>
                  </div>
                </div>
              </div>
              <Link to="/enroll">
                <Button variant="glass">
                  Update Profile
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Security Metrics */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-display text-xl text-foreground mb-4">Security Overview</h2>
            <SecurityMetrics />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-xl text-foreground mb-4">Recent Login Activity</h2>
            <div className="glass-card overflow-hidden">
              <div className="divide-y divide-border/50">
                {loginEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="p-4 flex items-center gap-4 hover:bg-secondary/20 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      event.success ? 'bg-green-500/20 text-green-500' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {event.success ? <CheckCircle2 className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium">
                        {event.success ? 'Successful Login' : 'Failed Attempt'}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.timestamp.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Smartphone className="w-3 h-3" />
                          {event.device}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
