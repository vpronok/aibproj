import { env } from './config/env.js';
//above has to be the first import
import express from 'express';
// Import the 'db' instance from our new db.js file
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Health check route
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// New route to test the database connection
app.get('/api/users-test', async (req, res) => {
  try {
    // Use the imported 'db' client here
    const userCount = await db.user.count();
    res.json({
      status: 'ok',
      message: 'Database connection successful!',
      data: {
        userCount: userCount,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed.',
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});