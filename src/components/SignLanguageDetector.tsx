
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import { Button } from "@/components/ui/button";
import { AlertCircle, Camera, CameraOff } from "lucide-react";

interface SignLanguageDetectorProps {
  onDetection: (letter: string) => void;
}

export const SignLanguageDetector: React.FC<SignLanguageDetectorProps> = ({ onDetection }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detector, setDetector] = useState<handPoseDetection.HandDetector | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    initializeDetector();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeDetector = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize TensorFlow.js
      await tf.ready();

      // Create hand detector
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'tfjs' as const,
        modelType: 'full' as const,
        maxHands: 1,
        detectorModelUrl: undefined,
        landmarkModelUrl: undefined,
      };

      const handDetector = await handPoseDetection.createDetector(model, detectorConfig);
      setDetector(handDetector);

      // Start camera
      await startCamera();
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error initializing detector:', err);
      setError('Failed to initialize hand detection. Please check camera permissions.');
      setIsLoading(false);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: 'user'
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsDetecting(false);
  };

  const startDetection = () => {
    if (!detector || !videoRef.current) return;
    
    setIsDetecting(true);
    detectHands();
  };

  const stopDetection = () => {
    setIsDetecting(false);
  };

  const detectHands = async () => {
    if (!detector || !videoRef.current || !canvasRef.current || !isDetecting) {
      return;
    }

    try {
      const hands = await detector.estimateHands(videoRef.current);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        
        if (hands.length > 0) {
          const hand = hands[0];
          
          // Draw hand landmarks
          drawHandLandmarks(ctx, hand);
          
          // Recognize sign (simplified version)
          const recognizedLetter = recognizeSign(hand);
          if (recognizedLetter) {
            onDetection(recognizedLetter);
          }
        }
      }
    } catch (err) {
      console.error('Detection error:', err);
    }

    // Continue detection loop
    if (isDetecting) {
      requestAnimationFrame(detectHands);
    }
  };

  const drawHandLandmarks = (ctx: CanvasRenderingContext2D, hand: any) => {
    const landmarks = hand.keypoints;
    
    // Draw landmarks
    landmarks.forEach((landmark: any) => {
      ctx.beginPath();
      ctx.arc(landmark.x, landmark.y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#22d3ee';
      ctx.fill();
    });

    // Draw connections (simplified)
    ctx.strokeStyle = '#0891b2';
    ctx.lineWidth = 2;
    
    // Connect finger joints (simplified connections)
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // index
      [0, 9], [9, 10], [10, 11], [11, 12], // middle
      [0, 13], [13, 14], [14, 15], [15, 16], // ring
      [0, 17], [17, 18], [18, 19], [19, 20] // pinky
    ];

    connections.forEach(([start, end]) => {
      if (landmarks[start] && landmarks[end]) {
        ctx.beginPath();
        ctx.moveTo(landmarks[start].x, landmarks[start].y);
        ctx.lineTo(landmarks[end].x, landmarks[end].y);
        ctx.stroke();
      }
    });
  };

  const recognizeSign = (hand: any): string | null => {
    // Simplified sign recognition based on hand landmarks
    // This is a basic implementation - in a real app, you'd use a trained model
    const landmarks = hand.keypoints;
    
    if (!landmarks || landmarks.length < 21) return null;

    // Example: Detect "A" sign (closed fist with thumb on side)
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];

    // Simple heuristics for basic signs
    // In a real implementation, you'd use machine learning models
    
    // "A" - closed fist
    if (isFingerClosed(landmarks, 8) && isFingerClosed(landmarks, 12) && 
        isFingerClosed(landmarks, 16) && isFingerClosed(landmarks, 20)) {
      return 'A';
    }
    
    // "B" - flat hand
    if (isFingerExtended(landmarks, 8) && isFingerExtended(landmarks, 12) && 
        isFingerExtended(landmarks, 16) && isFingerExtended(landmarks, 20)) {
      return 'B';
    }
    
    // "C" - curved hand
    if (isCShape(landmarks)) {
      return 'C';
    }

    // Add more sign recognitions here
    return null;
  };

  const isFingerExtended = (landmarks: any[], fingerTipIndex: number): boolean => {
    const tip = landmarks[fingerTipIndex];
    const pip = landmarks[fingerTipIndex - 2];
    return tip.y < pip.y; // Tip is above PIP joint
  };

  const isFingerClosed = (landmarks: any[], fingerTipIndex: number): boolean => {
    return !isFingerExtended(landmarks, fingerTipIndex);
  };

  const isCShape = (landmarks: any[]): boolean => {
    // Simplified C shape detection
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const distance = Math.sqrt(
      Math.pow(thumbTip.x - indexTip.x, 2) + Math.pow(thumbTip.y - indexTip.y, 2)
    );
    return distance < 50 && distance > 20; // Approximate C shape
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg border border-red-200">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-700 text-center mb-4">{error}</p>
        <Button onClick={initializeDetector} variant="outline" className="border-red-300 text-red-700">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-blue-50 rounded-lg border border-blue-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
        <p className="text-teal-700">Initializing hand detection...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover"
          onLoadedData={() => {
            if (canvasRef.current && videoRef.current) {
              canvasRef.current.width = videoRef.current.videoWidth;
              canvasRef.current.height = videoRef.current.videoHeight;
            }
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        
        {!stream && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <CameraOff className="w-12 h-12 text-white" />
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {!isDetecting ? (
          <Button 
            onClick={startDetection} 
            disabled={!stream}
            className="flex-1 bg-teal-600 hover:bg-teal-700"
          >
            <Camera className="w-4 h-4 mr-2" />
            Start Detection
          </Button>
        ) : (
          <Button 
            onClick={stopDetection} 
            variant="outline"
            className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
          >
            <CameraOff className="w-4 h-4 mr-2" />
            Stop Detection
          </Button>
        )}
        
        {stream && (
          <Button 
            onClick={stopCamera} 
            variant="outline"
            className="border-gray-300"
          >
            Stop Camera
          </Button>
        )}
      </div>
    </div>
  );
};
