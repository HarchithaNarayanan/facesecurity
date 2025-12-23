import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFlow } from '@/components/AuthFlow';
import { Button } from '@/components/ui/button';
import { Shield, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loginComplete, setLoginComplete] = useState(false);

  useEffect(() => {
    // Check if user is enrolled
    const enrolled = localStorage.getItem('enrolled');
    setIsEnrolled(!!enrolled);
  }, []);

  const handleComplete = (success: boolean) => {
    if (success) {
      setLoginComplete(true);
      // Simulate redirect after successful login
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  if (!isEnrolled) {
    return (
      <div className="min-h-screen bg-background">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display text-xl tracking-wider text-foreground">COGNISEC</span>
          </Link>
        </nav>

        {/* Not Enrolled Message */}
        <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-accent" />
            </div>

            <h2 className="font-display text-2xl text-foreground mb-4">
              Not Enrolled Yet
            </h2>

            <p className="text-muted-foreground mb-8">
              You need to create a cognitive authentication profile before you can sign in.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/enroll">
                <Button variant="glow">
                  Enroll Now
                </Button>
              </Link>
              <Link to="/">
                <Button variant="glass">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <AuthFlow 
            mode="login" 
            onComplete={handleComplete}
            onCancel={() => navigate('/')}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Login;
