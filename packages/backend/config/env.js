// File: aibproj/packages/backend/config/env.js
import dotenv from 'dotenv';
import { z } from 'zod';

// This command reads the .env file and loads its variables
dotenv.config();

// We define a "schema" that our environment MUST follow
const envSchema = z.object({
  // We expect a DATABASE_URL that is a string and a valid URL
  DATABASE_URL: z.string().url(),
  // We expect a PORT that can be converted to a number, defaulting to 3001
  PORT: z.coerce.number().default(3001),
  //add plesk url below this line
  PLESK_API_URL: z.string().url(),
});

// We try to validate the actual environment variables against our schema
const parsedEnv = envSchema.safeParse(process.env);

// If validation fails, we log a detailed error and stop the application
if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors,
  );
  // This is a hard exit to prevent running with bad config
  process.exit(1);
}

// If validation succeeds, we export the clean, typed data for our app to use
export const env = parsedEnv.data;