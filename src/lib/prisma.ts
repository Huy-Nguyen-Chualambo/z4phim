import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function normalizeEnvUrl(value?: string): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

const directUrl = normalizeEnvUrl(process.env.DIRECT_URL);
const databaseUrl = normalizeEnvUrl(process.env.DATABASE_URL);
const connectionString = databaseUrl || directUrl;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_URL is not configured.");
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
