import React, { useState } from 'react';
import { Menu, X, Wallet, Bell, User } from 'lucide-react';
import Button from '../ui/Button';
import { mockUserBalance } from '../../data/mockData';

const GameHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-purple-950 to-purple-800 text-white sticky top-0 z-50 shadow-md">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center">
          <div className="mr-2 text-amber-400 animate-pulse">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8C21 5.79086 19.2091 4 17 4H7C4.79086 4 3 5.79086 3 8V16C3 18.2091 4.79086 20 7 20H17C19.2091 20 21 18.2091 21 16Z" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path d="M12 12L16 8M12 12L8 8M12 12L8 16M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">MatkaKing</h1>
            <p className="text-xs text-amber-200 leading-tight">Royal Gaming Experience</p>
          </div>
        </div>

        {/* Account & Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center bg-purple-800/50 py-1.5 px-3 rounded-lg">
            <Wallet size={18} className="text-amber-400 mr-2" />
            <div>
              <p className="text-xs text-amber-200">Balance</p>
              <p className="font-bold text-sm">₹{mockUserBalance.available.toLocaleString()}</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm" color="accent">
            Add Cash
          </Button>
          
          <button className="relative p-2 hover:bg-purple-800 rounded-full transition">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              3
            </span>
          </button>
          
          <button className="p-1.5 hover:bg-purple-800 rounded-full transition">
            <User size={20} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-900 py-4 px-4 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 bg-purple-800/50 p-3 rounded-lg">
              <Wallet size={20} className="text-amber-400" />
              <div>
                <p className="text-sm text-amber-200">Available Balance</p>
                <p className="font-bold">₹{mockUserBalance.available.toLocaleString()}</p>
              </div>
            </div>
            
            <Button fullWidth color="accent">
              Add Cash
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-purple-800/50 p-3 rounded-lg flex flex-col items-center">
                <Bell size={20} className="mb-1" />
                <span className="text-sm">Notifications</span>
              </button>
              <button className="bg-purple-800/50 p-3 rounded-lg flex flex-col items-center">
                <User size={20} className="mb-1" />
                <span className="text-sm">Profile</span>
              </button>
            </div>
            
            <hr className="border-purple-700" />
            
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="block p-2 hover:bg-purple-800 rounded-md">Home</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-purple-800 rounded-md">Games</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-purple-800 rounded-md">Results</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-purple-800 rounded-md">How to Play</a>
                </li>
                <li>
                  <a href="#" className="block p-2 hover:bg-purple-800 rounded-md">Support</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Navigation - Desktop */}
      <nav className="bg-purple-900 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8">
            <li>
              <a href="#" className="text-white inline-block py-2 border-b-2 border-amber-400 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white inline-block py-2 border-b-2 border-transparent hover:border-amber-400 transition-all">
                Games
              </a>
            </li>
            <li>
              <a href="#" className="text-white inline-block py-2 border-b-2 border-transparent hover:border-amber-400 transition-all">
                Results
              </a>
            </li>
            <li>
              <a href="#" className="text-white inline-block py-2 border-b-2 border-transparent hover:border-amber-400 transition-all">
                How to Play
              </a>
            </li>
            <li>
              <a href="#" className="text-white inline-block py-2 border-b-2 border-transparent hover:border-amber-400 transition-all">
                Support
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default GameHeader;