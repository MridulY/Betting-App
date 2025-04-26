import React, { useState } from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import NumberGrid from './NumberGrid';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}


const gameTypes = [
  { id: 'single', name: 'Single', description: 'Pick a single digit number', minBet: 10 },
  { id: 'jodi', name: 'Jodi', description: 'Pick a pair of numbers', minBet: 10 },
  { id: 'panna', name: 'Panna', description: 'Pick a 3-digit number', minBet: 10 },
];

const BettingForm: React.FC = () => {
  const [gameType, setGameType] = useState<'single' | 'jodi' | 'panna'>('single');
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState<number>(10);
  const [drawTime, setDrawTime] = useState<string>('12:00');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectNumbers = (numbers: string[]) => {
    setSelectedNumbers(numbers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const betData = {
      gameId: "680bd218581ddc2594093a77", // You need to provide the actual game ID here
      gameType,
      numbers: selectedNumbers,
      amount: betAmount,
    };

    try {
      const response = await axios.post(
        `${process.env.VITE_API_URL}/api/bets/place-bet`,
        betData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is stored in localStorage
          },
        }
      );
      alert("Bet placed successfully!");
      console.log(response.data);
      // Handle success (e.g., navigate to another page or clear the form)
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data as ErrorResponse;
        setError(errorData.message || "An error occurred");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const quickAmounts = [10, 50, 100, 500, 1000];

  const getMaxSelections = () => {
    switch(gameType) {
      case 'single': return 1;
      case 'jodi': return 1;
      case 'panna': return 3;
      default: return 1;
    }
  };

  const calculatePotentialWinning = () => {
    if (selectedNumbers.length === 0 || betAmount === 0) return 0;
    
    // This is a simplified calculation - in a real app, you'd have
    // different multipliers for different game types
    const multiplier = {
      'single': 9,
      'jodi': 90,
      'panna': 150
    }[gameType];
    
    return betAmount * multiplier;
  };

  return (
    <Card className="mb-8">
      <form onSubmit={handleSubmit}>
        <CardHeader className="border-b border-slate-200">
          <h2 className="text-lg font-bold text-purple-900">Place Your Bet</h2>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Game Type Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Game Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {gameTypes.map((game) => (
                <div
                  key={game.id}
                  className={`
                    cursor-pointer rounded-lg border-2 p-3 transition-all
                    ${gameType === game.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-slate-200 hover:border-purple-300'}
                  `}
                  onClick={() => setGameType(game.id as any)}
                >
                  <div className="font-medium text-slate-900">{game.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{game.description}</div>
                  <div className="text-xs text-purple-600 mt-1">Min: ₹{game.minBet}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Draw Time Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Draw Time
            </label>
            <div className="flex space-x-3">
              <button
                type="button"
                className={`
                  flex-1 py-2 px-4 rounded-lg border text-center transition-all
                  ${drawTime === '12:00' 
                    ? 'bg-purple-100 border-purple-500 text-purple-700' 
                    : 'border-slate-200 text-slate-700 hover:border-purple-300'}
                `}
                onClick={() => setDrawTime('12:00')}
              >
                <div className="font-medium">Morning</div>
                <div className="flex items-center justify-center text-xs mt-1">
                  <Clock size={12} className="mr-1" /> 12:00 PM
                </div>
              </button>
              
              <button
                type="button"
                className={`
                  flex-1 py-2 px-4 rounded-lg border text-center transition-all
                  ${drawTime === '18:00' 
                    ? 'bg-purple-100 border-purple-500 text-purple-700' 
                    : 'border-slate-200 text-slate-700 hover:border-purple-300'}
                `}
                onClick={() => setDrawTime('18:00')}
              >
                <div className="font-medium">Evening</div>
                <div className="flex items-center justify-center text-xs mt-1">
                  <Clock size={12} className="mr-1" /> 6:00 PM
                </div>
              </button>
            </div>
          </div>
          
          {/* Number Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Your Numbers
            </label>
            <NumberGrid 
              gridSize={gameType === 'jodi' ? 'jodi' : 'single'} 
              onSelectNumbers={handleSelectNumbers}
              maxSelections={getMaxSelections()}
            />
          </div>
          
          {/* Bet Amount */}
          <div>
            <label htmlFor="betAmount" className="block text-sm font-medium text-slate-700 mb-2">
              Bet Amount (₹)
            </label>
            <input
              type="number"
              id="betAmount"
              min="10"
              step="10"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="flex flex-wrap gap-2 mt-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-full transition"
                  onClick={() => setBetAmount(amount)}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-slate-50 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center text-sm text-slate-600 mb-1">
              <AlertCircle size={16} className="mr-1 text-amber-500" />
              Potential Win:
            </div>
            <div className="text-xl font-bold text-amber-600">
              ₹{calculatePotentialWinning().toLocaleString()}
            </div>
          </div>
          
          <Button 
            type="submit" 
            color="primary" 
            size="lg"
            disabled={selectedNumbers.length === 0 || betAmount < 10}
            className="animate-pulse hover:animate-none"
          >
            Place Bet <ArrowRight size={16} className="ml-2" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BettingForm;