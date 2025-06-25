
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Hand, Type, Play, RotateCcw } from "lucide-react";
import { SignSymbolDisplay } from "./SignSymbolDisplay";

interface TextToSignTranslatorProps {
  className?: string;
}

export const TextToSignTranslator: React.FC<TextToSignTranslatorProps> = ({ className }) => {
  const [inputText, setInputText] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sign language descriptions for each letter
  const signDescriptions: { [key: string]: string } = {
    'A': 'Make a fist with thumb on the side',
    'B': 'Flat hand with fingers together, thumb across palm',
    'C': 'Curved hand forming a C shape',
    'D': 'Point index finger up, other fingers touching thumb',
    'E': 'Bend all fingertips to touch thumb',
    'F': 'Touch thumb and index finger, other fingers up',
    'G': 'Point index finger and thumb horizontally',
    'H': 'Extend index and middle fingers horizontally',
    'I': 'Make fist with pinky finger up',
    'J': 'Make I sign and draw J in the air',
    'K': 'Index and middle fingers up in V, thumb between them',
    'L': 'Make L shape with thumb and index finger',
    'M': 'Thumb under three fingers',
    'N': 'Thumb under two fingers',
    'O': 'Form O shape with all fingers',
    'P': 'Like K but pointing down',
    'Q': 'Point thumb and index finger down',
    'R': 'Cross index and middle fingers',
    'S': 'Make fist with thumb over fingers',
    'T': 'Thumb between index and middle finger',
    'U': 'Index and middle fingers up together',
    'V': 'Index and middle fingers apart in V',
    'W': 'Index, middle, and ring fingers up',
    'X': 'Hook index finger',
    'Y': 'Thumb and pinky out, other fingers down',
    'Z': 'Draw Z in the air with index finger'
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
      
      // Move to next letter after 2 seconds
      setTimeout(() => {
        playNext(index + 1);
      }, 2000);
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
            {/* Visual Sign Symbol */}
            <div className="flex justify-center mb-6">
              <SignSymbolDisplay letter={currentLetter} />
            </div>
            
            <div className="text-6xl font-bold text-teal-700 mb-4">
              {currentLetter}
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <p className="text-lg font-medium text-gray-800 mb-2">How to sign "{currentLetter}":</p>
              <p className="text-gray-600">{signDescriptions[currentLetter]}</p>
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
            <p className="text-sm mt-2">Currently supports A-Z letters with visual symbols</p>
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
