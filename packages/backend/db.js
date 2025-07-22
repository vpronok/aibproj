// File: aibproj/packages/backend/db.js

import { PrismaClient } from '@prisma/client';

// This is a best practice for using Prisma in a development environment.
// It prevents creating a new PrismaClient instance on every hot-reload.
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;