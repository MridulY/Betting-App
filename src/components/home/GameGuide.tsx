import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { BookOpen, MousePointer, DollarSign, Award } from 'lucide-react';
import Button from '../ui/Button';

const GameGuide: React.FC = () => {
  const steps = [
    {
      icon: <MousePointer size={24} className="text-purple-700" />,
      title: 'Select Game Type',
      description: 'Choose from Single, Jodi, or Panna based on your preference and strategy.',
    },
    {
      icon: <DollarSign size={24} className="text-purple-700" />,
      title: 'Place Your Bet',
      description: 'Select your lucky numbers and enter your bet amount. The minimum bet is ₹10.',
    },
    {
      icon: <BookOpen size={24} className="text-purple-700" />,
      title: 'Confirm Details',
      description: 'Review your selected numbers, bet amount, and game type before final submission.',
    },
    {
      icon: <Award size={24} className="text-purple-700" />,
      title: 'Wait for Results',
      description: 'Results are announced at 12 PM and 6 PM. Winners receive instant payouts!',
    },
  ];

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <h2 className="text-lg font-bold text-purple-900 flex items-center">
          <BookOpen size={18} className="mr-2 text-purple-700" />
          How to Play
        </h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {steps.map((step, index) => (
            <div key={index} className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 transition-all hover:shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                {step.icon}
              </div>
              <h3 className="font-medium text-lg mb-2 text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4 md:p-6">
          <h3 className="font-bold text-lg mb-2 text-purple-900">Game Types Explained</h3>
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Single</h4>
              <p className="text-sm text-slate-600">
                Bet on a single digit from 0-9. If your number matches the result, you win 9 times your bet amount.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Jodi</h4>
              <p className="text-sm text-slate-600">
                Bet on a two-digit combination from 00-99. If your combination matches exactly, you win 90 times your bet amount.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-1">Panna</h4>
              <p className="text-sm text-slate-600">
                Bet on a specific three-digit number. If your number matches, you win 150 times your bet amount.
              </p>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline" color="primary">
              Complete Game Rules
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameGuide;