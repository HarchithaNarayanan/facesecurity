import { motion } from 'framer-motion';
import { Camera, Brain, Shield, Lock, Database, Cpu } from 'lucide-react';

export const TechDiagram = () => {
  const nodes = [
    { id: 'camera', icon: <Camera className="w-6 h-6" />, label: 'Camera Input', x: 10, y: 50 },
    { id: 'detection', icon: <Brain className="w-6 h-6" />, label: 'Face Detection', x: 30, y: 30 },
    { id: 'gesture', icon: <Cpu className="w-6 h-6" />, label: 'Gesture Analysis', x: 30, y: 70 },
    { id: 'encoding', icon: <Database className="w-6 h-6" />, label: 'Feature Encoding', x: 55, y: 50 },
    { id: 'verification', icon: <Shield className="w-6 h-6" />, label: 'Verification', x: 75, y: 50 },
    { id: 'access', icon: <Lock className="w-6 h-6" />, label: 'Access Control', x: 90, y: 50 },
  ];

  const connections = [
    { from: 'camera', to: 'detection' },
    { from: 'camera', to: 'gesture' },
    { from: 'detection', to: 'encoding' },
    { from: 'gesture', to: 'encoding' },
    { from: 'encoding', to: 'verification' },
    { from: 'verification', to: 'access' },
  ];

  return (
    <div className="relative w-full aspect-[2/1] glass-card p-8 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="hsl(180 100% 50% / 0.3)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}
        
        {/* Animated data flow */}
        {connections.map((conn, i) => {
          const from = nodes.find(n => n.id === conn.from)!;
          const to = nodes.find(n => n.id === conn.to)!;
          return (
            <motion.circle
              key={`flow-${i}`}
              r="4"
              fill="hsl(180 100% 50%)"
              filter="url(#glow)"
              initial={{ 
                cx: `${from.x}%`, 
                cy: `${from.y}%`,
                opacity: 0 
              }}
              animate={{ 
                cx: [`${from.x}%`, `${to.x}%`],
                cy: [`${from.y}%`, `${to.y}%`],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          );
        })}
        
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-card border border-primary/50 flex items-center justify-center text-primary shadow-[0_0_20px_hsl(180_100%_50%/0.2)]">
              {node.icon}
            </div>
            <span className="text-xs text-muted-foreground text-center whitespace-nowrap font-medium">
              {node.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
