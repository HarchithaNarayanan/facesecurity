import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SecurityMetrics } from '@/components/SecurityMetrics';
import { TechDiagram } from '@/components/TechDiagram';
import { 
  Shield, 
  Scan, 
  UserPlus, 
  ChevronDown, 
  Eye, 
  Brain, 
  Lock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Face Recognition',
      description: 'Advanced neural networks analyze 128 unique facial landmarks for precise identification'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Gesture Authentication',
      description: 'User-defined facial gestures add a cognitive layer that\'s impossible to replicate'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Real-time machine learning ensures continuous verification and liveness detection'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Military-Grade Security',
      description: 'AES-256 encryption protects all biometric data with zero-knowledge architecture'
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl tracking-wider text-foreground">COGNISEC</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/enroll">
            <Button variant="glow" size="sm">Get Started</Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Next-Gen Biometric Authentication</span>
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Cognitive-Aware</span>
            <br />
            <span className="text-gradient glow-text">Login System</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Combine facial recognition with personalized gesture authentication for 
            <span className="text-primary"> unbreakable security</span> that adapts to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/enroll">
              <Button 
                variant="glow" 
                size="xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Enroll Now
                <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="glass" size="xl">
                <Scan className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Explore the technology</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary glow-text mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dual-factor cognitive authentication system provides unprecedented security 
              through the combination of biometric analysis and behavioral patterns.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card p-8 hover:border-primary/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:shadow-[0_0_30px_hsl(180_100%_50%/0.3)] transition-all">
                  {feature.icon}
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary glow-text mb-4">
              System Architecture
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-time processing pipeline from camera input to secure access control
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <TechDiagram />
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-primary glow-text mb-4">
              Security Metrics
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading performance metrics that set new standards for biometric authentication
            </p>
          </motion.div>

          <SecurityMetrics />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6">
        <motion.div 
          className="max-w-4xl mx-auto glass-card p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Ready to Secure Your Future?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the next generation of cognitive authentication. 
            Set up your profile in under 2 minutes.
          </p>
          <Link to="/enroll">
            <Button variant="glow" size="xl">
              <UserPlus className="w-5 h-5 mr-2" />
              Start Enrollment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display text-sm text-muted-foreground">COGNISEC</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Cognitive Authentication Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
