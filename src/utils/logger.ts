import fs from "fs";
import path from "path";

const logsDir = path.join(process.cwd(), "src", "logs");
const logFilePath = path.join(logsDir, "app.log");

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const getTimestamp = (): string => new Date().toLocaleString();

interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
}

const logger: Logger = {
  info: (message: string) => {
    const formatted = `[INFO] [${getTimestamp()}]: ${message}`;
    console.log(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },

  warn: (message: string) => {
    const formatted = `[WARN] [${getTimestamp()}]: ${message}`;
    console.warn(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },

  error: (message: string) => {
    const formatted = `[ERROR] [${getTimestamp()}]: ${message}`;
    console.error(formatted);
    fs.appendFileSync(logFilePath, formatted + "\n");
  },
};

export default logger;
