import express from 'express';
import Bet from '../models/Bet.js';
import Game from '../models/Game.js';
import User from '../models/User.js';

const router = express.Router();

// Place a bet
router.post('/place-bet', async (req, res) => {
  try {
    const { gameId, gameType, numbers, amount } = req.body;
    
    const game = await Game.findById(gameId);
    if (!game || game.status !== 'active') {
      return res.status(400).json({ message: 'Game is not active' });
    }
    
    const user = await User.findById(req.user.id);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    
    // Calculate potential winning based on game type
    const multiplier = {
      'single': 9,
      'jodi': 90,
      'panna': 150
    }[gameType];
    
    const potentialWinning = amount * multiplier;
    
    const bet = new Bet({
      user: req.user.id,
      game: gameId,
      gameType,
      numbers,
      amount,
      potentialWinning
    });
    
    // Update user balance
    user.balance -= amount;
    await user.save();
    
    // Update game stats
    game.totalBets += 1;
    game.totalAmount += amount;
    await game.save();
    
    await bet.save();
    res.status(201).json(bet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get user's bets
router.get('/my-bets', async (req, res) => {
  try {
    const bets = await Bet.find({ user: req.user.id })
      .populate('game')
      .sort('-createdAt');
    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all bets for a game (admin only)
router.get('/game/:gameId', async (req, res) => {
  try {
    const bets = await Bet.find({ game: req.params.gameId })
      .populate('user', 'email')
      .sort('-createdAt');
    res.json(bets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;