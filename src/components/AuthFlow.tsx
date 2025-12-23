import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaceScanner } from './FaceScanner';
import { GestureRecorder, GestureType } from './GestureRecorder';
import { Button } from './ui/button';
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

type AuthStep = 'face-scan' | 'gesture-select' | 'gesture-verify' | 'complete' | 'failed';

interface AuthFlowProps {
  mode: 'enroll' | 'login';
  onComplete?: (success: boolean, data?: { gesture: GestureType }) => void;
  onCancel?: () => void;
}

export const AuthFlow = ({ mode, onComplete, onCancel }: AuthFlowProps) => {
  const [step, setStep] = useState<AuthStep>('face-scan');
  const [scanStatus, setScanStatus] = useState<'idle' | 'detecting' | 'captured' | 'verified' | 'failed'>('idle');
  const [selectedGesture, setSelectedGesture] = useState<GestureType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartScan = () => {
    setScanStatus('detecting');
    
    // Simulate face detection
    setTimeout(() => {
      setScanStatus('captured');
      setTimeout(() => {
        setScanStatus('verified');
        if (mode === 'login') {
          // For login, move to gesture verification
          setTimeout(() => setStep('gesture-verify'), 1000);
        }
      }, 1000);
    }, 3000);
  };

  const handleGestureSelect = (gesture: GestureType) => {
    setSelectedGesture(gesture);
  };

  const handleGestureVerify = () => {
    setIsProcessing(true);
    setScanStatus('detecting');
    
    // Simulate gesture verification
    setTimeout(() => {
      setScanStatus('verified');
      setIsProcessing(false);
      setStep('complete');
      onComplete?.(true, { gesture: selectedGesture! });
    }, 2500);
  };

  const handleEnrollComplete = () => {
    if (selectedGesture) {
      setStep('complete');
      onComplete?.(true, { gesture: selectedGesture });
    }
  };

  const stepTitles = {
    'face-scan': mode === 'enroll' ? 'Register Your Face' : 'Face Verification',
    'gesture-select': 'Choose Your Security Gesture',
    'gesture-verify': 'Perform Your Gesture',
    'complete': mode === 'enroll' ? 'Enrollment Complete' : 'Access Granted',
    'failed': 'Verification Failed'
  };

  const stepDescriptions = {
    'face-scan': mode === 'enroll' 
      ? 'Position your face in the frame for biometric registration' 
      : 'Look at the camera to verify your identity',
    'gesture-select': 'Select a facial gesture that will be your secret key',
    'gesture-verify': 'Perform your selected gesture while looking at the camera',
    'complete': mode === 'enroll' 
      ? 'Your cognitive authentication profile has been created' 
      : 'Welcome back! Your identity has been verified',
    'failed': 'Unable to verify your identity. Please try again.'
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {['face-scan', mode === 'enroll' ? 'gesture-select' : 'gesture-verify', 'complete'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-display ${
                step === s 
                  ? 'bg-primary text-primary-foreground' 
                  : (['face-scan', 'gesture-select', 'gesture-verify'].indexOf(step) > i || step === 'complete')
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary text-muted-foreground'
              }`}>
                {i + 1}
              </div>
              {i < 2 && (
                <div className={`w-12 h-0.5 ${
                  (['face-scan', 'gesture-select', 'gesture-verify'].indexOf(step) > i || step === 'complete')
                    ? 'bg-primary'
                    : 'bg-secondary'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Title */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl md:text-3xl text-primary glow-text mb-2">
          {stepTitles[step]}
        </h2>
        <p className="text-muted-foreground">
          {stepDescriptions[step]}
        </p>
      </motion.div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 'face-scan' && (
          <motion.div
            key="face-scan"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <FaceScanner 
              isScanning={scanStatus === 'detecting'}
              scanStatus={scanStatus}
            />
            
            <div className="flex justify-center gap-4 mt-8">
              {onCancel && (
                <Button variant="glass" onClick={onCancel}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              )}
              
              {scanStatus === 'idle' && (
                <Button variant="glow" onClick={handleStartScan}>
                  Start Scan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              {scanStatus === 'verified' && mode === 'enroll' && (
                <Button variant="glow" onClick={() => setStep('gesture-select')}>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'gesture-select' && (
          <motion.div
            key="gesture-select"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <GestureRecorder
              selectedGesture={selectedGesture}
              onSelectGesture={handleGestureSelect}
            />
            
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="glass" onClick={() => setStep('face-scan')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button 
                variant="glow" 
                onClick={handleEnrollComplete}
                disabled={!selectedGesture}
              >
                Complete Enrollment
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'gesture-verify' && (
          <motion.div
            key="gesture-verify"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <FaceScanner 
              isScanning={isProcessing}
              scanStatus={scanStatus}
            />
            
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="glass" onClick={() => setStep('face-scan')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button 
                variant="glow" 
                onClick={handleGestureVerify}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Gesture
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <p className="text-lg text-foreground mb-8">
              {mode === 'enroll' 
                ? 'Your cognitive authentication profile is now active.'
                : 'Identity confirmed. Redirecting to dashboard...'}
            </p>
          </motion.div>
        )}

        {step === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <AlertCircle className="w-12 h-12 text-destructive" />
            </motion.div>
            
            <p className="text-lg text-foreground mb-8">
              Verification failed. Please ensure proper lighting and face visibility.
            </p>
            
            <Button variant="glow" onClick={() => setStep('face-scan')}>
              Try Again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
