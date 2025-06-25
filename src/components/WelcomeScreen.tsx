
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hand, Heart, Play, Smartphone } from "lucide-react";

interface WelcomeScreenProps {
  onStartSession: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartSession }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo and Branding */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg">
            <div className="flex space-x-1">
              <Hand className="w-8 h-8 text-white transform -rotate-12" />
              <Hand className="w-8 h-8 text-white transform rotate-12" />
            </div>
            <Heart className="w-4 h-4 text-yellow-300 absolute transform translate-y-[-8px]" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-teal-700 mb-2">IN TOUCH</h1>
            <p className="text-lg text-teal-600 font-medium">Bridging Voices, Breaking Barriers</p>
          </div>
        </div>

        {/* Start Button */}
        <Button 
          onClick={onStartSession}
          className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 text-white rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          <Play className="w-6 h-6 mr-2" />
          Start Session
        </Button>

        {/* How It Works Section */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg">
          <h2 className="text-xl font-semibold text-teal-700 mb-4">How It Works</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">1</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Position Your Hand</p>
                <p className="text-sm text-gray-600">Show your hand clearly to the camera</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">2</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Make a Sign</p>
                <p className="text-sm text-gray-600">Form letters A-Z using sign language</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-semibold text-sm">3</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Get Translation</p>
                <p className="text-sm text-gray-600">See real-time text translation</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-Time Communication Feature */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Smartphone className="w-6 h-6" />
            <span className="font-semibold text-lg">Real-Time Communication</span>
          </div>
          <p className="text-teal-100 text-sm">
            Experience instant sign language to text translation using advanced AI technology
          </p>
        </div>
      </div>
    </div>
  );
};
