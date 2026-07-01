import fs from "node:fs";
import pg from "pg";

function loadEnv(path) {
  if (!fs.existsSync(path)) return {};
  const env = {};
  for (const line of fs.readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

const env = { ...loadEnv(".env"), ...loadEnv(".env.local") };
const connectionString =
  env.DATABASE_URL ||
  env.POSTGRES_URL_NON_POOLING ||
  env.POSTGRES_URL;

if (!connectionString) {
  console.error(
    "Missing DATABASE_URL (or POSTGRES_URL_NON_POOLING from Supabase/Vercel env pull).",
  );
  process.exit(1);
}

const ssl = connectionString.includes("supabase.co")
  ? { rejectUnauthorized: false }
  : undefined;

const client = new pg.Client({ connectionString, ssl });
const sql = fs.readFileSync("supabase/schema.sql", "utf8");

await client.connect();
await client.query(sql);
const { rows } = await client.query(
  "select to_regclass('public.cards') as table_name",
);
console.log("schema_ok", rows[0]);
await client.end();
