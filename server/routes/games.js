import express from 'express';
import { isAdmin } from '../middleware/auth.js';
import Game from '../models/Game.js';
import Bet from '../models/Bet.js';

const router = express.Router();

// Get all games
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().sort('-createdAt');
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start a new game (admin only)
router.post('/startgame', isAdmin, async (req, res) => {
  try {
    const { startTime, endTime, drawTime } = req.body;
    
    const game = new Game({
      startTime,
      endTime,
      drawTime,
      status: 'upcoming'
    });
    
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update game status (admin only)
router.patch('/:id/status', isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    game.status = status;
    await game.save();
    
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Declare results (admin only)
router.post('/:id/results', isAdmin, async (req, res) => {
  try {
    const { numbers } = req.body;
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    game.numbers = numbers;
    game.status = 'resulted';
    await game.save();
    
    // Process bets
    const bets = await Bet.find({ game: game._id, status: 'pending' });
    
    for (const bet of bets) {
      // Implement win logic based on game type and numbers
      const hasWon = checkWin(bet, numbers);
      bet.status = hasWon ? 'won' : 'lost';
      await bet.save();
      
      if (hasWon) {
        // Update user balance
        const user = await User.findById(bet.user);
        user.balance += bet.potentialWinning;
        await user.save();
      }
    }
    
    res.json(game);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function checkWin(bet, winningNumbers) {
  // Implement win checking logic based on game type
  switch (bet.gameType) {
    case 'single':
      return bet.numbers[0] === winningNumbers[0];
    case 'jodi':
      return bet.numbers.join('') === winningNumbers.join('');
    case 'panna':
      return bet.numbers.every((num, i) => num === winningNumbers[i]);
    default:
      return false;
  }
}

export default router;