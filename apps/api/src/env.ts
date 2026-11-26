import { config } from "dotenv";
import { fileURLToPath } from "node:url";

config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} wajib diisi`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: required("DATABASE_URL"),
};
