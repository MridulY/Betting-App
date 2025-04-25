import React from 'react';
import { Info, Shield, Users, HelpCircle } from 'lucide-react';

const GameFooter: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-start">
            <Shield className="text-amber-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Secure Gaming</h3>
              <p className="text-sm text-slate-300">Advanced encryption and secure transactions</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Users className="text-amber-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">1M+ Players</h3>
              <p className="text-sm text-slate-300">Join our growing community of winners</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <HelpCircle className="text-amber-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">24/7 Support</h3>
              <p className="text-sm text-slate-300">Always here to help with any questions</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Info className="text-amber-400 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium mb-1">Fair Gameplay</h3>
              <p className="text-sm text-slate-300">Transparent results and fair chances</p>
            </div>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-t border-slate-700">
          <div>
            <div className="flex items-center mb-4">
              <div className="mr-2 text-amber-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16Z" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <path d="M12 12L16 8M12 12L8 8M12 12L8 16M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="font-bold text-lg">MatkaKing</h2>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Experience the thrill of Matka betting with our secure and user-friendly platform. Play responsibly and enjoy the royal gaming experience.
            </p>
            <div className="text-sm text-slate-500">
              © 2025 MatkaKing. All rights reserved.
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Games</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Results</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">How to Play</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Wallet</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-amber-400">Important Information</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Responsible Gaming</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Fair Play Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-slate-700 text-xs text-slate-500">
          <p className="mb-2">
            Disclaimer: This site is only for entertainment purposes. Players must be 18+ to use our services. Play responsibly.
          </p>
          <p>
            MatkaKing does not endorse illegal gambling. All games are based on chance and no outcomes are guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GameFooter;