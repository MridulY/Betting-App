import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import gameRoutes from './routes/games.js';
import betRoutes from './routes/bets.js';
import userRoutes from './routes/users.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
  })
);


app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', authenticateToken, gameRoutes);
app.use('/api/bets', authenticateToken, betRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/matka-game')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});