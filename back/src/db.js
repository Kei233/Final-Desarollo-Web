import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_PORT = 3306,
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'duby_sazon',
} = process.env;

// Pool que usa toda la app (dateStrings: las fechas llegan como 'YYYY-MM-DD')
export const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dateStrings: true,
  connectionLimit: 10,
});

// Crea la base de datos y las tablas si no existen
export async function initDb() {
  const conn = await mysql.createConnection({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });
  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await conn.query(`USE \`${DB_NAME}\``);
  await conn.query(fs.readFileSync(new URL('../schema.sql', import.meta.url), 'utf8'));
  await conn.end();
}
