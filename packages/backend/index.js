// File: aibproj/packages/backend/index.js

// THIS IS THE MOST IMPORTANT STEP.
// The validated 'env' object MUST be imported before anything else.

import { env } from './config/env.js';
import express from 'express';
// 1. Import the shared database client
import { db } from './db.js';

import { createWebsite } from './controllers/websitesController.js';

const app = express();
const PORT = env.PORT;
app.use(express.json());

console.log('--- BACKEND SCRIPT STARTING (WITH DB) ---');

// --- YOUR ROUTES ---
app.get('/api/status', (req, res) => {
  res.status(200).json({ message: 'Backend is alive!' });
});

// 2. Add the new database test route
app.get('/api/users-test', async (req, res) => {
  try {
    const userCount = await db.user.count();
    res.status(200).json({
      message: 'Database connection successful!',
      userCount: userCount,
    });
  } catch (error) {
    console.error('Database test failed:', error);
    res.status(500).json({ message: 'Database connection failed.' });
  }
});

app.post('/api/websites', createWebsite);
// app.post('/api/websites', (req, res) => {
//   res.status(200).json({ message: 'POST /api/websites is working.' });
// });

// --- SERVER LISTENER ---
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});