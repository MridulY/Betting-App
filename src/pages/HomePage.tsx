import React from 'react';
import HeroSection from '../components/home/HeroSection';
import BettingForm from '../components/betting/BettingForm';
import ResultsBoard from '../components/results/ResultsBoard';
import UpcomingDraws from '../components/home/UpcomingDraws';
import BetHistory from '../components/home/BetHistory';
import GameGuide from '../components/home/GameGuide';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <BettingForm />
            <ResultsBoard />
            <GameGuide />
          </div>
          
          <div className="space-y-8">
            <UpcomingDraws />
            <BetHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;