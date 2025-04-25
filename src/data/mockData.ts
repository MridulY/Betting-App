import { GameResult, Bet, UserBalance, Game, User } from '../types';

export const mockResults: GameResult[] = [
  {
    id: '1',
    date: '2025-05-10',
    drawTime: '12:00',
    numbers: ['2', '8'],
    winningAmount: 98000,
  },
  {
    id: '2',
    date: '2025-05-09',
    drawTime: '18:00',
    numbers: ['5', '3'],
    winningAmount: 76000,
  },
  {
    id: '3',
    date: '2025-05-09',
    drawTime: '12:00',
    numbers: ['9', '0'],
    winningAmount: 110000,
  },
  {
    id: '4',
    date: '2025-05-08',
    drawTime: '18:00',
    numbers: ['1', '4'],
    winningAmount: 88000,
  },
  {
    id: '5',
    date: '2025-05-08',
    drawTime: '12:00',
    numbers: ['7', '2'],
    winningAmount: 95000,
  },
];

export const mockBets: Bet[] = [
  {
    id: 'bet1',
    gameType: 'jodi',
    numbers: ['2', '8'],
    amount: 500,
    date: '2025-05-10',
    drawTime: '12:00',
    status: 'won',
    potentialWinning: 4500,
  },
  {
    id: 'bet2',
    gameType: 'single',
    numbers: ['5'],
    amount: 200,
    date: '2025-05-10',
    drawTime: '18:00',
    status: 'pending',
    potentialWinning: 1800,
  },
  {
    id: 'bet3',
    gameType: 'panna',
    numbers: ['1', '2', '3'],
    amount: 300,
    date: '2025-05-11',
    drawTime: '12:00',
    status: 'pending',
    potentialWinning: 2700,
  },
];

export const mockUserBalance: UserBalance = {
  available: 5000,
  pending: 500,
};

export const upcomingDraws = [
  {
    id: 'draw1',
    date: '2025-05-10',
    time: '18:00',
    remainingTime: '03:45:22',
  },
  {
    id: 'draw2',
    date: '2025-05-11',
    time: '12:00',
    remainingTime: '21:45:22',
  },
];

export const mockGames: Game[] = [
  {
    id: 'game1',
    status: 'active',
    startTime: '2025-05-10T10:00:00',
    endTime: '2025-05-10T11:45:00',
    drawTime: '12:00',
    totalBets: 156,
    totalAmount: 45600,
  },
  {
    id: 'game2',
    status: 'upcoming',
    startTime: '2025-05-10T16:00:00',
    endTime: '2025-05-10T17:45:00',
    drawTime: '18:00',
    totalBets: 0,
    totalAmount: 0,
  },
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'rajesh_kumar',
    email: 'rajesh@example.com',
    balance: 15000,
    status: 'active',
    joinedDate: '2025-01-15',
    lastLogin: '2025-05-10T09:30:00',
  },
  {
    id: 'user2',
    username: 'priya_sharma',
    email: 'priya@example.com',
    balance: 8500,
    status: 'active',
    joinedDate: '2025-02-20',
    lastLogin: '2025-05-10T10:15:00',
  },
  {
    id: 'user3',
    username: 'amit_patel',
    email: 'amit@example.com',
    balance: 12000,
    status: 'suspended',
    joinedDate: '2025-03-05',
    lastLogin: '2025-05-09T18:45:00',
  },
];