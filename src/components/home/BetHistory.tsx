import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { mockBets } from '../../data/mockData';
import { History } from 'lucide-react';
import Button from '../ui/Button';

const BetHistory: React.FC = () => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-100 text-green-700';
      case 'lost':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getGameTypeLabel = (type: string) => {
    switch (type) {
      case 'single':
        return 'Single';
      case 'jodi':
        return 'Jodi';
      case 'panna':
        return 'Panna';
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="bg-purple-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-lg font-bold text-purple-900 flex items-center mb-2 sm:mb-0">
          <History size={18} className="mr-2 text-purple-700" />
          Recent Bets
        </h2>
        <Button variant="ghost" size="sm" color="secondary">
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {mockBets.length > 0 ? (
          <div className="divide-y divide-slate-200">
            {mockBets.map((bet) => (
              <div key={bet.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium mr-2 bg-purple-100 text-purple-700">
                      {getGameTypeLabel(bet.gameType)}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusStyles(bet.status)}`}>
                      {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">
                      {new Date(bet.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                      })} • {bet.drawTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-600 mr-2">Numbers:</span>
                      <div className="flex">
                        {bet.numbers.map((num, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center justify-center mr-1 h-6 w-6 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-600">Amount: <span className="font-medium">₹{bet.amount}</span></div>
                    {bet.status === 'pending' && (
                      <div className="text-sm text-amber-600">Potential: <span className="font-medium">₹{bet.potentialWinning}</span></div>
                    )}
                    {bet.status === 'won' && (
                      <div className="text-sm text-green-600">Won: <span className="font-medium">₹{bet.potentialWinning}</span></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-slate-500">No recent bets found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BetHistory;