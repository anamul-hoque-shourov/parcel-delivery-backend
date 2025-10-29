// src/utils/logger.js
import fs from "fs";
import path from "path";

// Path to logs folder inside src
const logsDir = path.join(process.cwd(), "src", "logs");
const logFilePath = path.join(logsDir, "app.log");

// Ensure logs folder exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true }); // create parent folders if needed
}

// Helper to format date
const getTimestamp = () => new Date().toLocaleString();

// Logger object
export const logger = {
  info: (message) => {
    const formatted = `[INFO] [${getTimestamp()}]: ${message}`;
    console.log(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },

  warn: (message) => {
    const formatted = `[WARN] [${getTimestamp()}]: ${message}`;
    console.warn(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },

  error: (message) => {
    const formatted = `[ERROR] [${getTimestamp()}]: ${message}`;
    console.error(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },
};
