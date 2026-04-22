import { createConnection } from "mysql2/promise";
import { readFileSync, readdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, ".env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const conn = await createConnection(DATABASE_URL);

// Find all migration SQL files
const sqlFiles = readdirSync(resolve(__dirname, "drizzle"))
  .filter(f => f.endsWith(".sql"))
  .sort();

for (const file of sqlFiles) {
  const sql = readFileSync(resolve(__dirname, "drizzle", file), "utf-8");
  const statements = sql.split("--> statement-breakpoint").map(s => s.trim()).filter(Boolean);
  
  console.log(`\nProcessing ${file}...`);
  for (const stmt of statements) {
    try {
      await conn.execute(stmt);
      console.log("✓", stmt.substring(0, 60).replace(/\n/g, " "));
    } catch (err) {
      if (err.code === "ER_TABLE_EXISTS_ERROR" || err.message.includes("already exists") || err.message.includes("Duplicate")) {
        console.log("⚠ Skip (exists):", stmt.substring(0, 60).replace(/\n/g, " "));
      } else {
        console.error("✗ Error:", err.message.substring(0, 100));
      }
    }
  }
}

await conn.end();
console.log("\nMigration complete!");
