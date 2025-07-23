// File: aibproj/packages/backend/config/env.js
import dotenv from 'dotenv';
import { z } from 'zod';

console.log('--- Loading and validating environment variables... ---');

// Load environment variables from .env file
dotenv.config();

// Define a schema for the environment variables
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3001),
});

// Validate process.env against the schema
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  );
  throw new Error('Invalid environment variables.');
}
console.log('--- Environment variables validated successfully! ---');

// Export the validated and typed environment variables
export const env = parsedEnv.data;
// Import the validated 'env' object AT THE VERY TOP
//import { env } from './config/env.js';

import express from 'express';
//import { db } from './db.js';

const app = express();
// Use the validated PORT from our env object
const PORT = env.PORT;

// Health check route
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// (No changes needed in this route, it uses the db client which is already configured)
app.get('/api/users-test', async (req, res) => {
  try {
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