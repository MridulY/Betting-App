import React from 'react';
import Card, { CardHeader, CardContent } from '../ui/Card';
import { upcomingDraws } from '../../data/mockData';
import { Clock, Timer } from 'lucide-react';

const UpcomingDraws: React.FC = () => {
  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <h2 className="text-lg font-bold text-purple-900 flex items-center">
          <Timer size={18} className="mr-2 text-purple-700" />
          Upcoming Draws
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingDraws.map((draw) => (
            <div 
              key={draw.id}
              className="border border-slate-200 rounded-lg p-4 hover:border-purple-300 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-slate-800">
                  {new Date(draw.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })}
                </div>
                <div className="text-sm text-purple-700 flex items-center">
                  <Clock size={14} className="mr-1" />
                  {draw.time}
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 flex items-center justify-center text-amber-800">
                <div className="text-xs uppercase tracking-wide mr-2">Closing in:</div>
                <div className="font-mono font-bold">{draw.remainingTime}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingDraws;