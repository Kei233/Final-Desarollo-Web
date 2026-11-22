import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("No se ha definido DATABASE_URL");
}

// Evitar crear múltiples pools durante el desarrollo
declare global {
  var postgresPool: Pool | undefined;
}

export const pool =
  globalThis.postgresPool ??
  new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.postgresPool = pool;
}