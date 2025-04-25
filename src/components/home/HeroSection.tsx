import React from 'react';
import Button from '../ui/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-32 -right-16 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 left-32 w-64 h-64 bg-amber-400 rounded-full blur-3xl"></div>
      </div>
      
      {/* Numbers floating animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white text-opacity-10 font-bold text-3xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          >
            {Math.floor(Math.random() * 10)}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Experience the Thrill of <span className="text-amber-400">Matka Gaming</span>
            </h1>
            <p className="text-purple-100 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              Play the most popular Matka Jodi games with secure betting, instant results, and big payouts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Button color="accent" size="lg">
                Place Your Bet <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button color="primary" variant="outline" size="lg">
                Learn How to Play
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="mb-4 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-400 text-purple-900 text-xs font-bold mb-2">
                  LIVE DRAW
                </div>
                <h3 className="text-xl font-bold">Morning Results</h3>
                <p className="text-sm text-purple-200">May 10, 2025 • 12:00 PM</p>
              </div>
              
              <div className="flex justify-center mb-4">
                {['2', '8'].map((num, index) => (
                  <div
                    key={index}
                    className="h-16 w-16 mx-2 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-purple-900 text-3xl font-bold shadow-lg animate-pop"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {num}
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-sm text-purple-200 mb-1">Total Prize Pool</p>
                <p className="text-2xl font-bold text-amber-400">₹98,000</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Next Draw</span>
                <span className="inline-block px-2 py-1 rounded-full bg-amber-400 text-purple-900 text-xs font-bold">
                  OPEN
                </span>
              </div>
              <p className="text-lg font-bold mb-1">Evening Draw</p>
              <div className="flex items-center text-amber-300 text-sm mb-3">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Closing in 03:45:22
              </div>
              <Button color="accent" size="sm" fullWidth>
                Bet Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;