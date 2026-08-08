/* eslint-disable */
import 'dotenv/config';
import pg from 'pg';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const poolerUrl = process.env.POSTGRES_PRISMA_URL || '';
const nonPoolingUrl = process.env.POSTGRES_URL_NON_POOLING || '';

if (!poolerUrl && !nonPoolingUrl) {
  console.error('❌ POSTGRES_PRISMA_URL atau POSTGRES_URL_NON_POOLING tidak ditemukan di .env');
  process.exit(1);
}

// Parse URL
const url = new URL(poolerUrl || nonPoolingUrl);
const username = url.username;
const password = url.password;
const hostname = url.hostname;
const port = parseInt(url.port || '5432');
const database = url.pathname.substring(1);

const client = new pg.Client({
  user: username,
  host: hostname,
  database: database,
  password: password,
  port: port,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Terhubung ke Supabase database');

    const sqlPath = path.join(__dirname, '../supabase/migrations/20250808102200_init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    const statements = sql
      .split('\n')
      .filter(line => line.trim() && !line.trim().startsWith('--'))
      .join('\n')
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    let success = 0;
    for (const stmt of statements) {
      try {
        await client.query(stmt);
        success++;
      } catch (err: any) {
        if (err.message.includes('already exists') || err.message.includes('duplicate')) {
          console.log(`⚠️  Dilewati: ${stmt.substring(0, 60).replace(/\n/g, ' ')}...`);
        } else {
          console.error(`❌ Error: ${err.message}`);
        }
      }
    }

    console.log(`✅ Migrasi selesai: ${success}/${statements.length} statement berhasil dieksekusi`);
  } catch (err: any) {
    console.error('❌ Koneksi gagal:', err.message);
  } finally {
    await client.end();
    console.log('🔌 Koneksi ditutup');
  }
}

main();
