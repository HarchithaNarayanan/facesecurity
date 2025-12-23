import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFlow } from '@/components/AuthFlow';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { GestureType } from '@/components/GestureRecorder';

const Enroll = () => {
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [enrolledData, setEnrolledData] = useState<{ gesture: GestureType } | null>(null);

  const handleComplete = (success: boolean, data?: { gesture: GestureType }) => {
    if (success && data) {
      setIsComplete(true);
      setEnrolledData(data);
      // In a real app, save to backend
      localStorage.setItem('enrolled', JSON.stringify(data));
    }
  };

  const gestureNames: Record<GestureType, string> = {
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
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl tracking-wider text-foreground">COGNISEC</span>
        </Link>
        
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 py-12">
        {!isComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
          >
            <AuthFlow 
              mode="enroll" 
              onComplete={handleComplete}
              onCancel={() => navigate('/')}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-lg mx-auto"
          >
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>

            <h2 className="font-display text-2xl text-primary glow-text mb-4">
              Enrollment Complete!
            </h2>

            <p className="text-muted-foreground mb-6">
              Your cognitive authentication profile has been created successfully.
            </p>

            <div className="glass-card p-4 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your Security Gesture</p>
              <p className="font-display text-lg text-primary">
                {enrolledData && gestureNames[enrolledData.gesture]}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button variant="glow">
                  Test Login
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glass">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Enroll;
