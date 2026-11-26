import knex from "knex";
import { env } from "./env.js";

export const db = knex({
  client: "pg",
  connection: env.databaseUrl,
  pool: { min: 0, max: 10 },
});

export async function checkDatabase(): Promise<void> {
  await db.raw("select 1");
}
