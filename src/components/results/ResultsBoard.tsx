import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { mockResults } from '../../data/mockData';
import { CalendarDays, TrendingUp } from 'lucide-react';

const ResultsBoard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-purple-50">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-purple-900 flex items-center">
            <TrendingUp size={18} className="mr-2 text-purple-700" />
            Latest Results
          </h2>
          <button className="text-sm text-purple-700 flex items-center hover:text-purple-900 transition-colors">
            <CalendarDays size={16} className="mr-1" />
            View All Results
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="py-3 px-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Draw</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-slate-600 uppercase tracking-wider">Result</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-slate-600 uppercase tracking-wider">Pool</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockResults.map((result) => (
                <tr key={result.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-700">
                    {new Date(result.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700">{result.drawTime}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      {result.numbers.map((num, index) => (
                        <div 
                          key={index} 
                          className="h-8 w-8 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center mx-1 text-sm shadow-sm"
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-sm font-medium text-amber-600">
                    ₹{result.winningAmount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsBoard;