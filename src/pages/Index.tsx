
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hand, Lightbulb } from "lucide-react";
import { TextToSignTranslator } from "@/components/TextToSignTranslator";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const Index = () => {
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const handleStartSession = () => {
    setIsSessionStarted(true);
  };

  const handleBackToHome = () => {
    setIsSessionStarted(false);
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
              <p className="text-sm text-teal-600">Text to Sign Language Translation</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={handleBackToHome}
            className="border-teal-200 text-teal-700 hover:bg-teal-50"
          >
            End Session
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 max-w-2xl mx-auto w-full">
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
                  <li>• Follow the hand position descriptions carefully</li>
                  <li>• Only A-Z letters will be translated</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
