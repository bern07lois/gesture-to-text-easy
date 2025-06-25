
import React, { useRef, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Hand, MessageSquare, Lightbulb, ArrowLeftRight, Type } from "lucide-react";
import { SignLanguageDetector } from "@/components/SignLanguageDetector";
import { TextToSignTranslator } from "@/components/TextToSignTranslator";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const Index = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [currentMode, setCurrentMode] = useState<'sign-to-text' | 'text-to-sign'>('sign-to-text');

  const handleStartSession = () => {
    setIsSessionStarted(true);
  };

  const handleBackToHome = () => {
    setIsSessionStarted(false);
    setDetectedText("");
    setCurrentMode('sign-to-text');
  };

  const toggleMode = () => {
    setCurrentMode(prev => prev === 'sign-to-text' ? 'text-to-sign' : 'sign-to-text');
    setDetectedText("");
  };

  if (!isSessionStarted) {
    return <WelcomeScreen onStartSession={handleStartSession} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
              <Hand className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-teal-700">IN TOUCH</h1>
              <p className="text-sm text-teal-600">
                {currentMode === 'sign-to-text' ? 'Sign to Text' : 'Text to Sign'} Translation
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={toggleMode}
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" />
              {currentMode === 'sign-to-text' ? 'Text to Sign' : 'Sign to Text'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              End Session
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {currentMode === 'sign-to-text' ? (
          <div className="grid lg:grid-cols-2 gap-6 h-full">
            {/* Camera Feed */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Camera className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-800">Camera Feed</h2>
              </div>
              <SignLanguageDetector onDetection={setDetectedText} />
            </Card>

            {/* Translation Output */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                <h2 className="text-lg font-semibold text-gray-800">Translation</h2>
              </div>
              <div className="bg-gradient-to-br from-coral-100 to-pink-100 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
                {detectedText ? (
                  <div className="text-center">
                    <p className="text-2xl font-medium text-gray-800 mb-2">Detected:</p>
                    <p className="text-4xl font-bold text-teal-700">{detectedText}</p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Hand className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Show a sign to begin translation</p>
                  </div>
                )}
              </div>
              
              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Tips for better detection:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Position your hand clearly in the camera view</li>
                      <li>• Use good lighting for better recognition</li>
                      <li>• Hold signs steady for 2-3 seconds</li>
                      <li>• Currently supports A-Z alphabet signs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid lg:grid-cols-1 gap-6 h-full max-w-2xl mx-auto">
            {/* Text to Sign Translator */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
              <TextToSignTranslator />
              
              {/* Instructions */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">How to use:</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Type any text in the input field</li>
                      <li>• Click "Play" to see sign instructions for each letter</li>
                      <li>• Each letter will be shown for 2 seconds</li>
                      <li>• Only A-Z letters will be translated</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
