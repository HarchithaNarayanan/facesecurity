import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Smile, Frown, Hand, Sparkles } from 'lucide-react';

export type GestureType = 'blink' | 'wink-left' | 'wink-right' | 'smile' | 'nod' | 'custom';

interface GestureOption {
  id: GestureType;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface GestureRecorderProps {
  selectedGesture: GestureType | null;
  onSelectGesture: (gesture: GestureType) => void;
  isRecording?: boolean;
}

const gestureOptions: GestureOption[] = [
  { id: 'blink', name: 'Double Blink', icon: <Eye className="w-6 h-6" />, description: 'Blink twice quickly' },
  { id: 'wink-left', name: 'Left Wink', icon: <EyeOff className="w-6 h-6" />, description: 'Wink with your left eye' },
  { id: 'wink-right', name: 'Right Wink', icon: <EyeOff className="w-6 h-6 scale-x-[-1]" />, description: 'Wink with your right eye' },
  { id: 'smile', name: 'Smile', icon: <Smile className="w-6 h-6" />, description: 'Show a natural smile' },
  { id: 'nod', name: 'Head Nod', icon: <Hand className="w-6 h-6" />, description: 'Nod your head up and down' },
  { id: 'custom', name: 'Custom', icon: <Sparkles className="w-6 h-6" />, description: 'Record a custom gesture' },
];

export const GestureRecorder = ({ 
  selectedGesture, 
  onSelectGesture,
  isRecording = false 
}: GestureRecorderProps) => {
  const [hoveredGesture, setHoveredGesture] = useState<GestureType | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gestureOptions.map((gesture, index) => (
          <motion.button
            key={gesture.id}
            onClick={() => onSelectGesture(gesture.id)}
            onMouseEnter={() => setHoveredGesture(gesture.id)}
            onMouseLeave={() => setHoveredGesture(null)}
            className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
              selectedGesture === gesture.id
                ? 'border-primary bg-primary/10 shadow-[0_0_30px_hsl(180_100%_50%/0.3)]'
                : 'border-border bg-card/40 hover:border-primary/50 hover:bg-card/60'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Selection Indicator */}
            {selectedGesture === gesture.id && (
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-primary"
                layoutId="gesture-selection"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Icon */}
            <div className={`mb-3 ${
              selectedGesture === gesture.id ? 'text-primary' : 'text-muted-foreground'
            } transition-colors`}>
              {gesture.icon}
            </div>

            {/* Name */}
            <h3 className={`font-display text-sm uppercase tracking-wide mb-1 ${
              selectedGesture === gesture.id ? 'text-primary' : 'text-foreground'
            }`}>
              {gesture.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground">
              {gesture.description}
            </p>

            {/* Recording Indicator */}
            {isRecording && selectedGesture === gesture.id && (
              <motion.div
                className="absolute top-3 right-3 w-3 h-3 rounded-full bg-destructive"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Gesture Description Panel */}
      {selectedGesture && (
        <motion.div
          className="mt-6 p-4 rounded-xl glass-card"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {gestureOptions.find(g => g.id === selectedGesture)?.icon}
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wide text-primary">
                {gestureOptions.find(g => g.id === selectedGesture)?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                This gesture will be required along with your face for authentication
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
