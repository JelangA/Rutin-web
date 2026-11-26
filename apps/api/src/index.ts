import express, {
  type ErrorRequestHandler,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { checkDatabase, db } from "./db.js";
import { env } from "./env.js";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API Express + PostgreSQL siap digunakan" });
});

app.get("/health", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await checkDatabase();
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.get("/db/info", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { rows } = await db.raw("select current_database() as database, version() as version");

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route tidak ditemukan" });
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: "Internal server error" });
};

app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(`API berjalan di http://localhost:${env.port}`);
});

function shutdown(signal: string): void {
  console.log(`Menerima ${signal}, menutup koneksi...`);

  server.close(async () => {
    await db.destroy();
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
