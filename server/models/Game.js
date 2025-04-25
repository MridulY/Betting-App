import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['upcoming', 'active', 'closed', 'resulted'],
    default: 'upcoming'
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  drawTime: {
    type: String,
    required: true
  },
  numbers: {
    type: [String],
    default: []
  },
  totalBets: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Game', gameSchema);