import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured. Please set it in .env.local.");
}

const allowSelfSignedCert = process.env.PGSSL_ALLOW_SELF_SIGNED === "true";

const pool = new Pool({
  connectionString,
  ssl: allowSelfSignedCert ? { rejectUnauthorized: false } : undefined,
});
const adapter = new PrismaPg(pool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
