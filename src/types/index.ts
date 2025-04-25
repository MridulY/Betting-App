export interface GameResult {
  id: string;
  date: string;
  drawTime: string;
  numbers: string[];
  winningAmount: number;
}

export interface Bet {
  id: string;
  gameType: GameType;
  numbers: string[];
  amount: number;
  date: string;
  drawTime: string;
  status: BetStatus;
  potentialWinning: number;
}

export interface Game {
  id: string;
  status: GameStatus;
  startTime: string;
  endTime: string;
  drawTime: string;
  totalBets: number;
  totalAmount: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  status: UserStatus;
  joinedDate: string;
  lastLogin: string;
}

export type GameType = 'single' | 'jodi' | 'panna';
export type BetStatus = 'pending' | 'won' | 'lost';
export type GameStatus = 'upcoming' | 'active' | 'closed' | 'resulted';
export type UserStatus = 'active' | 'suspended' | 'blocked';

export interface UserBalance {
  available: number;
  pending: number;
}