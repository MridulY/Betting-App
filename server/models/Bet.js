import mongoose from 'mongoose';

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  gameType: {
    type: String,
    enum: ['single', 'jodi', 'panna'],
    required: true
  },
  numbers: {
    type: [String],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 10
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost'],
    default: 'pending'
  },
  potentialWinning: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Bet', betSchema);