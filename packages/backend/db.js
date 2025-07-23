import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
// This is a best practice from the Prisma docs.
// It prevents creating too many connections during development hot-reloads.
const prisma = globalForPrisma.prisma  ||new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Export the single, shared instance
export const db = prisma;