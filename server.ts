import "module-alias/register";

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";
import db from "./src/database/db";

const port: number = Number(process.env.PORT) || 3000;
const server = http.createServer(app);

async function startServer(): Promise<void> {
  try {
    await db();

    server.listen(port, () => {
      console.log(
        `Server running on port ${port} in ${process.env.ENVIRONMENT} environment.`
      );
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Failed to start server: ${error.message}`);
    } else {
      console.error("Failed to start server:", error);
    }
    process.exit(1);
  }
}

startServer();
