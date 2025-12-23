import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Fingerprint, Brain, Zap } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  delay?: number;
}

const MetricCard = ({ icon, title, value, description, delay = 0 }: MetricCardProps) => (
  <motion.div
    className="glass-card p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="font-display text-2xl text-primary glow-text mb-2">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  </motion.div>
);

export const SecurityMetrics = () => {
  const metrics = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security Level',
      value: '99.7%',
      description: 'Multi-factor biometric authentication'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Encryption',
      value: 'AES-256',
      description: 'End-to-end encrypted biometric data'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Face Recognition',
      value: '< 0.1%',
      description: 'False acceptance rate'
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: 'Gesture Match',
      value: '99.5%',
      description: 'Gesture recognition accuracy'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Model',
      value: 'Active',
      description: 'Real-time cognitive analysis'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Response Time',
      value: '< 500ms',
      description: 'Average authentication time'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          {...metric}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};
