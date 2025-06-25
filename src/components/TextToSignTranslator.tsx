
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Hand, Type, Play, RotateCcw } from "lucide-react";

interface TextToSignTranslatorProps {
  className?: string;
}

export const TextToSignTranslator: React.FC<TextToSignTranslatorProps> = ({ className }) => {
  const [inputText, setInputText] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sign language descriptions for each letter
  const signDescriptions: { [key: string]: string } = {
    'A': 'Make a fist with your thumb on the side of your index finger',
    'B': 'Hold your hand flat with fingers together and straight up, thumb folded across your palm',
    'C': 'Curve your hand into a C shape, like holding a small cup',
    'D': 'Point your index finger straight up, touch your thumb to the tips of your other three fingers',
    'E': 'Bend all your fingertips down to touch your thumb tip',
    'F': 'Touch the tip of your thumb to the tip of your index finger, keep other three fingers straight up',
    'G': 'Point your index finger and thumb out horizontally, like making a gun shape',
    'H': 'Extend your index and middle fingers horizontally, side by side',
    'I': 'Make a fist and stick your pinky finger straight up',
    'J': 'Make the "I" sign, then draw the letter J in the air with your pinky',
    'K': 'Hold up your index and middle fingers in a V shape, with your thumb touching the side of your middle finger',
    'L': 'Make an L shape with your thumb and index finger, other fingers folded down',
    'M': 'Make a fist with your thumb tucked under your first three fingers',
    'N': 'Make a fist with your thumb tucked under your first two fingers',
    'O': 'Form an O shape by touching all your fingertips to your thumb tip',
    'P': 'Like the K sign, but point your fingers downward',
    'Q': 'Point your thumb and index finger down, like an upside-down G',
    'R': 'Cross your index finger over your middle finger, both pointing up',
    'S': 'Make a fist with your thumb folded over your fingers',
    'T': 'Make a fist with your thumb poking up between your index and middle finger',
    'U': 'Hold your index and middle fingers straight up, side by side',
    'V': 'Hold your index and middle fingers up in a V shape (peace sign)',
    'W': 'Hold your index, middle, and ring fingers straight up',
    'X': 'Make a fist and hook your index finger',
    'Y': 'Stick out your thumb and pinky, fold down your other three fingers',
    'Z': 'Use your index finger to draw the letter Z in the air'
  };

  const handlePlaySequence = () => {
    if (!inputText.trim()) return;
    
    setIsPlaying(true);
    setCurrentLetterIndex(0);
    
    const letters = inputText.toUpperCase().split('').filter(char => /[A-Z]/.test(char));
    
    const playNext = (index: number) => {
      if (index >= letters.length) {
        setIsPlaying(false);
        setCurrentLetterIndex(-1);
        return;
      }
      
      setCurrentLetterIndex(index);
      
      // Move to next letter after 3 seconds (increased time for reading)
      setTimeout(() => {
        playNext(index + 1);
      }, 3000);
    };
    
    playNext(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentLetterIndex(-1);
  };

  const filteredLetters = inputText.toUpperCase().split('').filter(char => /[A-Z]/.test(char));
  const currentLetter = currentLetterIndex >= 0 ? filteredLetters[currentLetterIndex] : null;

  return (
    <div className={className}>
      {/* Input Section */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Type className="w-5 h-5 text-teal-600" />
          <h2 className="text-lg font-semibold text-gray-800">Text to Sign Language</h2>
        </div>
        
        <div className="flex space-x-2">
          <Input
            placeholder="Enter text to translate (A-Z letters only)"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.toUpperCase())}
            className="flex-1"
            disabled={isPlaying}
          />
          <Button 
            onClick={handlePlaySequence}
            disabled={!inputText.trim() || isPlaying}
            className="bg-teal-600 hover:bg-teal-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Play
          </Button>
          <Button 
            onClick={handleReset}
            variant="outline"
            disabled={!isPlaying}
            className="border-gray-300"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Display Section */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-blue-100 min-h-[400px]">
        {currentLetter ? (
          <div className="text-center space-y-6">
            <div className="text-8xl font-bold text-teal-700 mb-6">
              {currentLetter}
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <p className="text-xl font-medium text-gray-800 mb-3">How to sign "{currentLetter}":</p>
              <p className="text-lg text-gray-700 leading-relaxed">{signDescriptions[currentLetter]}</p>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-teal-600">
              <Hand className="w-4 h-4" />
              <span>Letter {currentLetterIndex + 1} of {filteredLetters.length}</span>
            </div>
          </div>
        ) : inputText.trim() && !isPlaying ? (
          <div className="text-center space-y-4">
            <Hand className="w-16 h-16 mx-auto text-teal-400" />
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">Ready to translate:</p>
              <p className="text-2xl font-bold text-teal-700">{inputText}</p>
              <p className="text-sm text-gray-500 mt-2">
                {filteredLetters.length} letter{filteredLetters.length !== 1 ? 's' : ''} to show
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
            <Type className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg">Enter text above to see sign language instructions</p>
            <p className="text-sm mt-2">Learn American Sign Language alphabet with detailed hand descriptions</p>
          </div>
        )}
      </Card>

      {/* Letter Preview */}
      {inputText.trim() && !isPlaying && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Letters to translate:</h3>
          <div className="flex flex-wrap gap-2">
            {filteredLetters.map((letter, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
