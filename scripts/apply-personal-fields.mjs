import fs from "fs";
import pg from "pg";

function loadEnv(path) {
  const env = {};
  for (const line of fs.readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i === -1) continue;
    const key = line.slice(0, i);
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

const env = loadEnv(".env.local");
if (!env.POSTGRES_URL_NON_POOLING) {
  console.log("skip: no POSTGRES_URL_NON_POOLING");
  process.exit(0);
}

const client = new pg.Client({
  connectionString: env.POSTGRES_URL_NON_POOLING,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
const sql = fs.readFileSync(
  "supabase/migrations/20250630_personal_fields.sql",
  "utf8",
);
await client.query(sql);
console.log("personal_fields_migration_ok");
await client.end();
