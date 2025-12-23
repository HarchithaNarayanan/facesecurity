import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaceScannerProps {
  onCapture?: (imageData: string) => void;
  isScanning?: boolean;
  scanStatus?: 'idle' | 'detecting' | 'captured' | 'verified' | 'failed';
  showOverlay?: boolean;
}

export const FaceScanner = ({ 
  onCapture, 
  isScanning = false, 
  scanStatus = 'idle',
  showOverlay = true 
}: FaceScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsVideoReady(true);
        };
      }
    } catch (err) {
      setError('Camera access denied. Please enable camera permissions.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  }, []);

  const captureFrame = useCallback(() => {
    if (videoRef.current && canvasRef.current && isVideoReady) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg', 0.8);
        onCapture?.(imageData);
      }
    }
  }, [isVideoReady, onCapture]);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (isScanning && scanStatus === 'detecting') {
      const interval = setInterval(captureFrame, 500);
      return () => clearInterval(interval);
    }
  }, [isScanning, scanStatus, captureFrame]);

  const statusColors = {
    idle: 'border-border',
    detecting: 'border-primary animate-glow-pulse',
    captured: 'border-primary',
    verified: 'border-green-500',
    failed: 'border-destructive'
  };

  const statusMessages = {
    idle: 'Position your face in the frame',
    detecting: 'Scanning...',
    captured: 'Face captured',
    verified: 'Identity verified',
    failed: 'Verification failed'
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Scanner Container */}
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 ${statusColors[scanStatus]} transition-all duration-500`}>
        {/* Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
        
        {/* Hidden Canvas for Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Error State */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90">
            <p className="text-destructive text-center px-4">{error}</p>
          </div>
        )}

        {/* Overlay Effects */}
        {showOverlay && isVideoReady && (
          <>
            {/* Corner Brackets */}
            <div className="absolute inset-8 pointer-events-none">
              <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary" />
            </div>

            {/* Face Oval Guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-48 h-64 border-2 rounded-[50%] ${statusColors[scanStatus]} transition-all duration-300`} />
            </div>

            {/* Scan Line Animation */}
            <AnimatePresence>
              {scanStatus === 'detecting' && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ top: '10%', opacity: 0 }}
                  animate={{ 
                    top: ['10%', '90%', '10%'],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )}
            </AnimatePresence>

            {/* Pulse Rings on Detection */}
            <AnimatePresence>
              {(scanStatus === 'verified' || scanStatus === 'captured') && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className={`w-48 h-64 rounded-[50%] border-2 ${scanStatus === 'verified' ? 'border-green-500' : 'border-primary'}`}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ 
                          duration: 1,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
          </>
        )}
      </div>

      {/* Status Text */}
      <motion.div 
        className="mt-4 text-center"
        key={scanStatus}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className={`font-display text-sm uppercase tracking-wider ${
          scanStatus === 'verified' ? 'text-green-500 glow-text' : 
          scanStatus === 'failed' ? 'text-destructive' : 
          'text-primary'
        }`}>
          {statusMessages[scanStatus]}
        </p>
      </motion.div>
    </div>
  );
};
