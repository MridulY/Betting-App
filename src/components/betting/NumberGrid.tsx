import React, { useState } from 'react';
import NumberButton from '../ui/NumberButton';

interface NumberGridProps {
  gridSize?: 'single' | 'jodi';
  onSelectNumbers: (numbers: string[]) => void;
  maxSelections?: number;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  gridSize = 'single',
  onSelectNumbers,
  maxSelections = 2,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  const handleNumberClick = (number: string) => {
    let newSelectedNumbers: string[];
    
    if (selectedNumbers.includes(number)) {
      // If already selected, remove it
      newSelectedNumbers = selectedNumbers.filter(num => num !== number);
    } else {
      // If not selected and haven't reached max, add it
      if (selectedNumbers.length < maxSelections) {
        newSelectedNumbers = [...selectedNumbers, number];
      } else {
        // If max reached, remove first and add new
        newSelectedNumbers = [...selectedNumbers.slice(1), number];
      }
    }
    
    setSelectedNumbers(newSelectedNumbers);
    onSelectNumbers(newSelectedNumbers);
  };

  // Generate numbers based on grid type
  const generateNumbers = () => {
    if (gridSize === 'single') {
      return Array.from({ length: 10 }, (_, i) => i.toString());
    } else {
      // For jodi, generate 00-99
      const numbers: string[] = [];
      for (let i = 0; i < 100; i++) {
        numbers.push(i.toString().padStart(2, '0'));
      }
      return numbers;
    }
  };

  const numbers = generateNumbers();

  return (
    <div className="w-full">
      <div className={`grid ${gridSize === 'single' ? 'grid-cols-5 gap-3' : 'grid-cols-5 md:grid-cols-10 gap-2'}`}>
        {numbers.map((number) => (
          <NumberButton
            key={number}
            number={number}
            selected={selectedNumbers.includes(number)}
            onClick={handleNumberClick}
            size={gridSize === 'single' ? 'lg' : 'md'}
          />
        ))}
      </div>
      
      {/* Selected numbers display */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-700 mb-2">Selected Numbers:</p>
        <div className="flex flex-wrap gap-2">
          {selectedNumbers.length > 0 ? (
            selectedNumbers.map((number) => (
              <span 
                key={number} 
                className="inline-flex items-center justify-center bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full text-sm"
              >
                {number}
              </span>
            ))
          ) : (
            <span className="text-slate-500 text-sm">No numbers selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NumberGrid;